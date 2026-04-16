#!/usr/bin/env node
/**
 * sync-logos.js
 * ─────────────
 * Downloads company logos to public/logos/ and generates src/data/logoManifest.js
 *
 * Usage:  node scripts/sync-logos.js
 *         npm run sync-logos
 *         FORCE=1 node scripts/sync-logos.js   # re-download everything
 *
 * Resolution order per company:
 *   1. LinkedIn company page    (og:image scrape)
 *   2. Company website          (og:image scrape)
 *   3. Google Favicon CDN       (https://www.google.com/s2/favicons?domain=…&sz=256)
 *   4. DuckDuckGo icon service  (https://icons.duckduckgo.com/ip3/…)
 *   5. Wikipedia logo           (direct Wikimedia Commons URL per company)
 *   6. Initials fallback        (no download — shown in React)
 */

import fs   from 'fs';
import path from 'path';
import https from 'https';
import http  from 'http';
import { fileURLToPath } from 'url';

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.resolve(__dirname, '..');
const LOGOS_DIR  = path.join(ROOT, 'public', 'logos');
const MANIFEST   = path.join(ROOT, 'src',    'data',  'logoManifest.js');
const TIMEOUT_MS = 15_000;
const MAX_BYTES  = 2 * 1024 * 1024;
const FORCE      = process.env.FORCE === '1';

// ─────────────────────────────────────────────────────────────────────────────
// Company list — add `wiki` for a known-good Wikimedia Commons image URL
// ─────────────────────────────────────────────────────────────────────────────
const COMPANIES = [
  {
    id: 'oracle',
    domain: 'oracle.com',
    linkedin: 'https://www.linkedin.com/company/oracle/',
    site: 'https://www.oracle.com',
    wiki: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png',
  },
  {
    id: 'techolution',
    domain: 'techolution.com',
    linkedin: 'https://www.linkedin.com/company/techolution/',
    site: 'https://www.techolution.com',
    wiki: null,
  },
  {
    id: 'ford',
    domain: 'ford.com',
    linkedin: 'https://www.linkedin.com/company/ford-motor-company/',
    site: 'https://www.ford.com',
    wiki: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/512px-Ford_logo_flat.svg.png',
  },
  {
    id: 'bytexl',
    domain: 'bytexl.com',
    linkedin: 'https://www.linkedin.com/company/bytexl/',
    site: 'https://www.bytexl.com',
    wiki: null,
  },
  {
    id: 'jpmc',
    domain: 'jpmorganchase.com',
    linkedin: 'https://www.linkedin.com/company/jpmorganchase/',
    site: 'https://www.jpmorganchase.com',
    wiki: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J_P_Morgan_Logo_2008_1.svg/512px-J_P_Morgan_Logo_2008_1.svg.png',
  },
  {
    id: 'interactive_brokers',
    domain: 'interactivebrokers.com',
    linkedin: 'https://www.linkedin.com/company/interactive-brokers/',
    site: 'https://www.interactivebrokers.com',
    wiki: null,
  },
  {
    id: 'idfc',
    domain: 'idfcfirstbank.com',
    linkedin: 'https://www.linkedin.com/company/idfcfirstbank/',
    site: 'https://www.idfcfirstbank.com',
    wiki: null,
  },
  {
    id: 'morgan_stanley',
    domain: 'morganstanley.com',
    linkedin: 'https://www.linkedin.com/company/morgan-stanley/',
    site: 'https://www.morganstanley.com',
    wiki: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Morgan_Stanley_Logo_1.svg/512px-Morgan_Stanley_Logo_1.svg.png',
  },
  {
    id: 'mthree',
    domain: 'mthree.com',
    linkedin: 'https://www.linkedin.com/company/wiley-edge/',
    site: 'https://www.mthree.com',
    wiki: null,
  },
  {
    id: 'cognizant',
    domain: 'cognizant.com',
    linkedin: 'https://www.linkedin.com/company/cognizant/',
    site: 'https://www.cognizant.com',
    wiki: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Cognizant_logo_2022.svg/512px-Cognizant_logo_2022.svg.png',
  },
  {
    id: 'mindtree',
    domain: 'ltimindtree.com',
    linkedin: 'https://www.linkedin.com/company/ltimindtree/',
    site: 'https://www.ltimindtree.com',
    wiki: null,
  },
  {
    id: 'accenture',
    domain: 'accenture.com',
    linkedin: 'https://www.linkedin.com/company/accenture/',
    site: 'https://www.accenture.com',
    wiki: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/512px-Accenture.svg.png',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function fetchBuffer(url, timeoutMs = TIMEOUT_MS, redirectCount = 0) {
  if (redirectCount > 6) return Promise.reject(new Error('Too many redirects'));
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/124.0.0.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
        },
        timeout: timeoutMs,
      },
      (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          const next = new URL(res.headers.location, url).href;
          resolve(fetchBuffer(next, timeoutMs, redirectCount + 1));
          return;
        }
        const chunks = [];
        let size = 0;
        res.on('data', (chunk) => {
          size += chunk.length;
          if (size > MAX_BYTES) { req.destroy(); reject(new Error('Too large')); return; }
          chunks.push(chunk);
        });
        res.on('end',   () => resolve({ statusCode: res.statusCode, headers: res.headers, buffer: Buffer.concat(chunks) }));
        res.on('error', reject);
      }
    );
    req.on('error',   reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function extractOgImage(html) {
  const matchers = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /"logo"\s*:\s*\{\s*"@type"\s*:\s*"[^"]+"\s*,\s*"url"\s*:\s*"([^"]+)"/i,
  ];
  for (const re of matchers) {
    const m = html.match(re);
    if (m && m[1].startsWith('http')) return m[1];
  }
  return null;
}

function validateImage(buffer, contentType) {
  if (!buffer || buffer.length < 50) return false;
  const hex     = buffer.slice(0, 8).toString('hex');
  const isPng   = hex.startsWith('89504e47');
  const isJpeg  = hex.startsWith('ffd8');
  const isWebp  = buffer.slice(0, 4).toString('ascii') === 'RIFF' && buffer.slice(8, 12).toString('ascii') === 'WEBP';
  const isSvg   = buffer.slice(0, 500).toString('utf8').trimStart().startsWith('<svg')
                  || buffer.slice(0, 500).toString('utf8').includes('xmlns="http://www.w3.org/2000/svg"');
  const isGif   = hex.startsWith('47494638');
  const mimeOk  = /image\/(png|jpeg|jpg|webp|svg|gif)/.test(contentType || '');
  // Reject HTML pages masquerading as images
  const isHtml  = buffer.slice(0, 200).toString('utf8').toLowerCase().includes('<!doctype');
  return !isHtml && (isPng || isJpeg || isWebp || isSvg || isGif || mimeOk);
}

function resolveExt(contentType, url) {
  if (/png/.test(contentType))                   return '.png';
  if (/webp/.test(contentType))                  return '.webp';
  if (/svg/.test(contentType))                   return '.svg';
  if (/gif/.test(contentType))                   return '.gif';
  if (/jpe?g/.test(contentType))                 return '.jpg';
  const m = url.match(/\.(png|jpg|jpeg|webp|svg|gif)(\?|$)/i);
  if (m) return '.' + m[1].toLowerCase();
  return '.png';
}

function findExisting(id) {
  for (const ext of ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']) {
    const f = path.join(LOGOS_DIR, `${id}${ext}`);
    if (fs.existsSync(f)) return `${id}${ext}`;
  }
  return null;
}

async function tryScrapeOgImage(pageUrl) {
  try {
    const { statusCode, buffer } = await fetchBuffer(pageUrl, TIMEOUT_MS);
    if (statusCode !== 200) return null;
    const html = buffer.toString('utf8');
    return extractOgImage(html);
  } catch {
    return null;
  }
}

async function tryDownload(url) {
  try {
    const { statusCode, headers, buffer } = await fetchBuffer(url);
    if (statusCode !== 200) return null;
    const ct = headers['content-type'] || '';
    if (!validateImage(buffer, ct)) return null;
    return { buffer, contentType: ct };
  } catch {
    return null;
  }
}

async function saveImage(id, result, url) {
  const ext  = resolveExt(result.contentType, url);
  const name = `${id}${ext}`;
  fs.writeFileSync(path.join(LOGOS_DIR, name), result.buffer);
  const kb = (result.buffer.length / 1024).toFixed(1);
  console.log(`  ✅ Saved → logos/${name} (${kb} KB)`);
  return name;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function sync() {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });

  const manifest = {};

  for (const co of COMPANIES) {
    console.log(`\n─── ${co.id} ─────────────────────`);

    // Skip if file already exists and FORCE not set
    if (!FORCE) {
      const existing = findExisting(co.id);
      if (existing) {
        console.log(`  ♻  Already exists — logos/${existing}`);
        manifest[co.id] = `/logos/${existing}`;
        continue;
      }
    }

    let saved = null;

    // ── 1. LinkedIn og:image ──────────────────────────────────────────────
    console.log(`  🔍 [1] LinkedIn scrape…`);
    const liOg = await tryScrapeOgImage(co.linkedin);
    if (liOg && liOg.includes('licdn.com')) {
      console.log(`      → Found LinkedIn image`);
      const res = await tryDownload(liOg);
      if (res) saved = await saveImage(co.id, res, liOg);
    }

    // ── 2. Company site og:image ──────────────────────────────────────────
    if (!saved && co.site) {
      console.log(`  🔍 [2] Company site og:image…`);
      const siteOg = await tryScrapeOgImage(co.site);
      if (siteOg) {
        const res = await tryDownload(siteOg);
        if (res) saved = await saveImage(co.id, res, siteOg);
      }
    }

    // ── 3. Wikipedia / Wikimedia Commons ─────────────────────────────────
    if (!saved && co.wiki) {
      console.log(`  🔍 [3] Wikipedia/Wikimedia…`);
      const res = await tryDownload(co.wiki);
      if (res) saved = await saveImage(co.id, res, co.wiki);
    }

    // ── 4. Google Favicon CDN ─────────────────────────────────────────────
    if (!saved && co.domain) {
      const gUrl = `https://www.google.com/s2/favicons?domain=${co.domain}&sz=256`;
      console.log(`  🔍 [4] Google Favicon CDN…`);
      const res = await tryDownload(gUrl);
      if (res) saved = await saveImage(co.id, res, gUrl);
    }

    // ── 5. DuckDuckGo icon service ────────────────────────────────────────
    if (!saved && co.domain) {
      const ddUrl = `https://icons.duckduckgo.com/ip3/${co.domain}.ico`;
      console.log(`  🔍 [5] DuckDuckGo icon…`);
      const res = await tryDownload(ddUrl);
      if (res) saved = await saveImage(co.id, res, ddUrl);
    }

    if (saved) {
      manifest[co.id] = `/logos/${saved}`;
    } else {
      console.log(`  ❌ No logo found — React will show initials`);
      manifest[co.id] = null;
    }
  }

  // ── Write manifest ────────────────────────────────────────────────────────
  const lines = [
    '// AUTO-GENERATED by scripts/sync-logos.js — do not edit manually',
    `// Last synced: ${new Date().toISOString()}`,
    '',
    'export const logoManifest = {',
    ...Object.entries(manifest).map(([id, p]) => `  '${id}': ${p ? `'${p}'` : 'null'},`),
    '};',
    '',
  ];
  fs.writeFileSync(MANIFEST, lines.join('\n'));
  console.log(`\n📄 Manifest → src/data/logoManifest.js`);

  const found   = Object.values(manifest).filter(Boolean).length;
  const missing = COMPANIES.length - found;
  console.log(`✨ Done! ${found}/${COMPANIES.length} logos saved. ${missing} will use initials fallback.\n`);
}

sync().catch(e => { console.error('Fatal:', e); process.exit(1); });
