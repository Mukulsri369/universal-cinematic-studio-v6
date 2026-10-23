/** Allowlisted diagnostics only; never persist raw response bodies or headers. */
export function sanitize(value,secrets=[]) {
  if (typeof value !== 'string' && typeof value !== 'number') return undefined;
  let text=String(value);
  for (const secret of secrets.filter(x=>typeof x==='string' && x.length)) {
    for (const variant of new Set([secret,encodeURIComponent(secret),JSON.stringify(secret).slice(1,-1)])) text=text.split(variant).join('[REDACTED]');
  }
  return text
    .replace(/-----BEGIN [\s\S]*?PRIVATE KEY-----[\s\S]*?-----END [\s\S]*?PRIVATE KEY-----/g,'[REDACTED]')
    .replace(/\b(?:authorization|proxy-authorization|cookie|set-cookie|x-goog-api-key|api[_-]?key|key|token|secret|access[_-]?token|refresh[_-]?token|password|credential|prompt|input)\b\s*["']?\s*[:=]\s*[^\r\n]+/gi,'[REDACTED FIELD]')
    .replace(/\bBearer\s+\S+/gi,'Bearer [REDACTED]')
    .replace(/\b(?:AIza[\w-]+|gh[pousr]_[\w]+|github_pat_[\w]+|eyJ[\w-]+\.[\w-]+\.[\w-]+)\b/g,'[REDACTED]')
    .replace(/https?:\/\/[^\s"'<>]+/gi,'[REDACTED URL]')
    .replace(/["'`][^"'`\r\n]{1,}["'`]/g,'[REDACTED QUOTED VALUE]')
    .replace(/[A-Za-z0-9+/=_-]{80,}/g,'[REDACTED DATA]')
    .replace(/[\x00-\x1f\x7f]/g,' ').slice(0,2000);
}

function classify(d) {
  const reasons=d.errorInfo.map(x=>x.reason||'').join(' ');
  const metadata=[...d.quotaFailures,...d.errorInfo].map(x=>x.metadata);
  const evidence=[d.message,reasons,...d.quotaFailures.map(x=>x.description),...metadata.flatMap(x=>Object.values(x))].join(' ');
  if (/billing[_ ](?:disabled|not[_ ]enabled|account)|billing.*(?:required|inactive|suspend)|payment required/i.test(evidence)) return 'BILLING_RESTRICTION';
  if (metadata.some(x=>/^(?:0|0\.0+)$/.test(x.quotaValue||x.quota_limit_value||'')) || /(?:quota|limit)[^.;\n]{0,60}(?:is zero|[:=] ?0\b)/i.test(evidence)) return 'ZERO_QUOTA';
  if (/capacity|overloaded|MODEL_CAPACITY_EXHAUSTED/i.test(evidence)) return 'MODEL_CAPACITY';
  if (/daily|per.?day/i.test(evidence) && /exceed|exhaust|quota/i.test(evidence)) return 'DAILY_QUOTA_EXHAUSTED';
  if (/RATE_LIMIT_EXCEEDED|rate limit|per.?minute|per.?second/i.test(evidence)) return 'TEMPORARY_RATE_LIMIT';
  if (d.quotaFailures.length && /exceed|exhaust|QUOTA_EXCEEDED/i.test(evidence)) return 'QUOTA_EXHAUSTED';
  return 'UNKNOWN';
}

export async function errorDiagnostics(response,{secrets=[]}={}) {
  const clean=v=>sanitize(v,secrets);
  const d={httpStatus:response.status,bodyFormat:'empty',googleCode:null,message:null,status:null,retryAfter:clean(response.headers?.get('retry-after'))||null,quotaFailures:[],errorInfo:[],retryInfo:[]};
  let text;
  try { text=await response.text(); } catch { d.bodyFormat='unreadable'; }
  if (text?.trim()) {
    if (text.length>65536) { d.bodyFormat='oversized'; }
    else {
      let body;
      try { body=JSON.parse(text); d.bodyFormat='json'; } catch { d.bodyFormat=/^\s*[\[{]/.test(text)?'malformed-json':'text'; }
      // Arbitrary text is not echoed: it may contain an entire request or HTML.
      const e=body?.error;
      if (e && typeof e==='object') {
        d.googleCode=typeof e.code==='number'?e.code:null;
        d.message=clean(e.message)||null;d.status=clean(e.status)||null;
        for (const detail of Array.isArray(e.details)?e.details.slice(0,30):[]) {
          const type=detail?.['@type'];
          if (type==='type.googleapis.com/google.rpc.QuotaFailure') {
            for (const v of Array.isArray(detail.violations)?detail.violations.slice(0,30):[]) {
              const metadata={};
              for (const k of ['quotaMetric','quotaId','quotaValue','quota_metric','quota_limit','quota_limit_value']) if (clean(v?.[k])!==undefined) metadata[k]=clean(v[k]);
              const dimensions={};
              for (const k of ['model','location']) if (clean(v?.quotaDimensions?.[k])!==undefined) dimensions[k]=clean(v.quotaDimensions[k]);
              d.quotaFailures.push({description:clean(v?.description)||null,metadata,dimensions});
            }
          }
          if (type==='type.googleapis.com/google.rpc.ErrorInfo') {
            const metadata={};
            for (const k of ['quota_metric','quota_limit','quota_limit_value','quota_location','service','model']) if (clean(detail.metadata?.[k])!==undefined) metadata[k]=clean(detail.metadata[k]);
            d.errorInfo.push({reason:clean(detail.reason)||null,domain:clean(detail.domain)||null,metadata});
          }
          if (type==='type.googleapis.com/google.rpc.RetryInfo') d.retryInfo.push({retryDelay:clean(detail.retryDelay)||null});
        }
      }
    }
  }
  d.cause=classify(d);
  return d;
}
