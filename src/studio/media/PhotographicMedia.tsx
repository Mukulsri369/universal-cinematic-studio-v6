import { useState } from 'react';

/** Media truth contract: editorial/retail imagery must be raster; a vector poster is not a photograph. */
export const isPhotographicPath = (path?: string | null): path is string =>
  !!path && /\.(?:avif|webp|png|jpe?g)(?:[?#].*)?$/i.test(path);

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
  kind?: 'hero' | 'product' | 'material' | 'viewer';
};

export function PhotographicMedia({ src, alt, className = '', eager = false, kind = 'product' }: Props) {
  const [failed, setFailed] = useState(false);
  if (!isPhotographicPath(src) || failed) {
    return <div className={`media-needed media-needed--${kind} ${className}`} role="note"
      aria-label={`${alt}: real photography is not provided`}>
      <span className="media-needed__kicker">IMAGE ASSET REQUIRED</span>
      <strong>{alt}</strong>
      <span>Supply a licensed photograph or clearly marked AI-generated campaign image.</span>
    </div>;
  }
  return <img className={`photographic-media ${className}`} src={src} alt={alt}
    loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'}
    decoding="async" onError={() => setFailed(true)} />;
}
