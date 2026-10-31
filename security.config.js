/**
 * Single source of truth for the site's security policy.
 *
 * - The CSP is injected as a <meta> tag into the production HTML (works on any host).
 * - The same policy plus header-only directives is written to dist/_headers
 *   (Netlify / Cloudflare Pages) and dist/.htaccess (Apache / Hostinger) by
 *   scripts/prerender.mjs. Keep vercel.json in sync if you deploy to Vercel.
 */

const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  // 'unsafe-inline' for styles is required by pre-rendered motion styles (style="opacity:0").
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'", 'https://api.web3forms.com'],
  'frame-src': ['https://www.google.com', 'https://maps.google.com'],
  'form-action': ["'self'"],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
  'manifest-src': ["'self'"],
  'upgrade-insecure-requests': [],
}

// Directives browsers ignore inside <meta> — only valid as a real HTTP header.
const HEADER_ONLY_DIRECTIVES = {
  'frame-ancestors': ["'none'"],
}

const serialize = (directives) =>
  Object.entries(directives)
    .map(([key, values]) => [key, ...values].join(' '))
    .join('; ')

export const cspMeta = () => serialize(CSP_DIRECTIVES)
export const cspHeader = () => serialize({ ...CSP_DIRECTIVES, ...HEADER_ONLY_DIRECTIVES })

export const securityHeaders = () => ({
  'Content-Security-Policy': cspHeader(),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
})
