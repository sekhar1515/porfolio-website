import { useState } from 'react';
import { logoManifest } from '../data/logoManifest';

/**
 * CompanyLogo
 * ──────────────────────────────────────────────────────────────────────────────
 * Resolution order:
 *   1. Local /logos/<id>.<ext>  — from logoManifest (downloaded by sync-logos.js)
 *   2. Clearbit CDN             — live fallback if manifest has no entry
 *   3. Initials avatar          — if all image sources fail
 *
 * Props:
 *   id       – company ID (matches key in logoManifest & data files)
 *   name     – company display name (used for alt text & initials)
 *   domain   – company domain (used for Clearbit fallback)
 *   initials – short initials to show if all images fail
 *   color    – brand accent colour (used for initials avatar background)
 *   size     – pixel size (square), default 48
 *   className – extra Tailwind classes on the wrapper
 */
export default function CompanyLogo({
  id,
  name,
  domain,
  initials,
  color = '#86868b',
  size = 48,
  className = '',
}) {
  const radius = Math.round(size * 0.22);

  // Calculate which sources to try (in order)
  const manifestPath = logoManifest[id] ?? null;
  const clearbitUrl  = domain ? `https://logo.clearbit.com/${domain}?size=${Math.min(size * 2, 256)}` : null;

  // srcList: ordered list of image URLs to try
  const srcList = [
    manifestPath,
    clearbitUrl,
  ].filter(Boolean);

  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    const next = srcIndex + 1;
    if (next < srcList.length) {
      setSrcIndex(next);
    } else {
      setFailed(true);
    }
  };

  const abbr = initials || (name ? name.slice(0, 2).toUpperCase() : '??');
  const fontSize = Math.round(size * 0.38);

  return (
    <div
      role="img"
      aria-label={`${name} logo`}
      className={`flex-shrink-0 flex items-center justify-center overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: failed ? `${color}18` : 'rgba(255,255,255,0.05)',
        border: `1px solid rgba(255,255,255,0.1)`,
      }}
    >
      {!failed && srcList.length > 0 ? (
        <img
          key={srcIndex}
          src={srcList[srcIndex]}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: size > 32 ? '4px' : '2px',
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          style={{
            color: color,
            fontWeight: 700,
            fontSize,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-0.03em',
            userSelect: 'none',
          }}
        >
          {abbr}
        </span>
      )}
    </div>
  );
}
