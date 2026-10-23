# Media connectivity validation — 2026-10-23

Repository: `Mukulsri369/universal-cinematic-studio-v6`.
Working branch: `feature/realistic-media`. No changes to main.

| Check | Result |
| --- | --- |
| Environment secret accessibility | PASS: nonempty GEMINI_API_KEY; value never printed or written |
| HTTPS API connectivity | PASS: root GET returned HTTP 404; authenticated models GET returned HTTP 200 |
| Authentication | PASS: x-goog-api-key authenticated read-only GET /v1beta/models |
| Image model availability | PASS: models/gemini-3.1-flash-image present among 60 models across all pages |
| Interactions entitlement | UNVERIFIED: model listing advertises generateContent, countTokens, batchGenerateContent; it does not prove Interactions authorization or billing/quota availability |
| Parser and approval gating | PASS: 14 focused media tests; full npm test passed 31 tests |

No generation POST, paid request, image generation, or asset mutation was performed.
CLI tests replace fetch with a throwing stub before importing the generator and use a dummy key.
Hero selection is exactly one image. Without --execute it is a dry run; --execute without --approve-spend fails before fetch.

## Payload and parser review

Google documentation pages on ai.google.dev are blocked here by the network proxy (HTTP 403), including pricing.
The user's confirmation of model/endpoint support was supplemented by Google's official Python SDK source at commit `92f72b3a236a5bc56e8e3327ab9563f77dd119c3`:

- https://github.com/googleapis/python-genai/blob/92f72b3a236a5bc56e8e3327ab9563f77dd119c3/google/genai/_gaos/types/interactions/imageresponseformat.py
- https://github.com/googleapis/python-genai/blob/92f72b3a236a5bc56e8e3327ab9563f77dd119c3/google/genai/_gaos/types/interactions/interaction.py
- https://github.com/googleapis/python-genai/blob/92f72b3a236a5bc56e8e3327ab9563f77dd119c3/google/genai/_gaos/types/interactions/imagecontent.py

Request retains model/input and response_format type=image, aspect_ratio=16:9 for hero, image_size=2K.
Added delivery=inline; removed optional forced image/png MIME because SDK lists image/jpeg as the explicit MIME option.
Writer chooses extension from returned raster bytes; output is not guaranteed to be PNG.
Parser handles output_image, model_output step content, and compatibility outputs arrays.
It rejects missing inline images, malformed structures/base64, unsupported raster signatures, MIME mismatches, noncompleted interactions, invalid JSON, and API errors.
At the initial validation commit, HTTP errors reported only status and asset ID. See the recovery update below for the replacement diagnostics.
Raster header validation is not a full image decoder or visual quality review.

## Remaining before one hero generation

No missing key or model configuration was observed. Account Interactions entitlement, billing and quota remain unverified without generation.
Current pricing could not be independently retrieved. A prior approximate standard 2K output estimate is US$0.101 per image, plus input/other token charges; this is NOT verified as the current published price. Confirm https://ai.google.dev/gemini-api/docs/pricing before cost approval.
Implementation is ready for an explicitly authorized single-hero attempt, subject to those account/pricing uncertainties.
Generation remains stopped pending user approval. Actual output must be reviewed before further images or visual-readiness claims.

## Error diagnostics and recovery update — 2026-10-23

The historical hero requests returned HTTP 429 and HTTP 400. Their bodies and headers were discarded by the previous handler, so neither exact cause can be established retroactively. The 429 alone cannot distinguish billing, zero/daily quota, minute limits or capacity. The 400 alone does not identify an invalid field.

The replacement handler reports HTTP status, Google code/message/status, allowlisted QuotaFailure violations and model/location dimensions, ErrorInfo reason/domain/quota metadata, RetryInfo retryDelay, and Retry-After. Only these fields are exposed; raw JSON/text/HTML and unrelated headers are never persisted. Known API key and full request text/reference data are explicitly redacted, alongside credential labels, bearer tokens, recognized token patterns, URLs, quoted values, long encoded data and control characters. Empty, unreadable, oversized, malformed JSON and plain-text responses produce body-format diagnostics without echoing their raw contents. Redaction can remove useful fragments; missing diagnostics remain unknown.

Cause reporting requires explicit message/reason/metadata evidence: temporary rate limit, zero quota, daily quota exhausted, other quota exhausted, billing restriction, model capacity, or unknown. Retry hints are informational; they never trigger another request. The generator still requires both spend flags and exits on its first API error. No automatic retry was added.

Compatibility: the official documentation page was requested again and returned HTTP 403. A fresh fetch of Google's official Python SDK main showed no changes to the checked request definitions at the source revision linked above. Model identifier, string or typed image/text input, image response_format, 2K size, 16:9/4:5 ratios, and inline delivery remain consistent with that SDK evidence. The parser continues supporting output_image, model_output content and compatibility outputs. No payload incompatibility was established, so no parameters were changed speculatively. Live Interactions compatibility remains unverified.

Validation: npm test passed all 37 tests; npm run typecheck, npm run build, npm run site:doctor, npm run audit:recipes and git diff --check passed. Vite reported large output chunk warnings. New tests mock HTTP 400/403/429/500, quota/retry fields, cause discrimination, redaction, invalid/missing bodies and one-request CLI failure. No real generation request was made.

Before another attempt, the account owner must check the API key's project billing status, model-specific nonzero quota, current usage/reset window, and published pricing. Any newly approved attempt must use NODE_USE_ENV_PROXY=1 in this environment. If it fails again, inspect the new sanitized diagnostics and address the reported request field, quota, billing or capacity issue before authorizing another request. The implementation is ready for one explicitly approved diagnostic generation attempt, not a guarantee of model access or image success.
