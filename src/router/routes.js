import { FLEET } from '../content/fleet.js'
import { DESTINATIONS } from '../content/destinations.js'

export const LANGS = ['en', 'hi']

const STATIC_PAGES = {
  home: '/',
  cars: '/cars/',
  services: '/services/',
  about: '/about/',
  how: '/how-it-works/',
  documents: '/documents/',
  trips: '/road-trips/',
  faq: '/faq/',
  contact: '/contact/',
  privacy: '/privacy-policy/',
  terms: '/terms/',
  credits: '/credits/',
}

const withLang = (lang, path) => (lang === 'hi' ? `/hi${path}` : path)

/** URL for a page in a language. `param` is the car / trip slug. */
export function pathFor(page, lang = 'en', param) {
  if (page === 'car') return withLang(lang, `/cars/${param}/`)
  if (page === 'trip') return withLang(lang, `/road-trips/${param}/`)
  return withLang(lang, STATIC_PAGES[page] ?? '/')
}

/** Every pre-rendered page, in both languages. */
export const ROUTES = LANGS.flatMap((lang) => [
  ...Object.keys(STATIC_PAGES).map((page) => ({ page, lang, path: pathFor(page, lang) })),
  ...FLEET.map((car) => ({ page: 'car', lang, param: car.slug, path: pathFor('car', lang, car.slug) })),
  ...DESTINATIONS.map((d) => ({ page: 'trip', lang, param: d.slug, path: pathFor('trip', lang, d.slug) })),
])

const BY_PATH = new Map(ROUTES.map((r) => [r.path, r]))

export function normalizePath(pathname = '/') {
  let p = String(pathname).split(/[?#]/)[0].replace(/\/index\.html$/, '/').replace(/\/{2,}/g, '/')
  if (!p.startsWith('/')) p = `/${p}`
  if (!p.endsWith('/')) p += '/'
  return p
}

// The 404 page is a single bilingual file, so it always renders in its English shell.
export const NOT_FOUND = { page: 'notFound', lang: 'en', path: '/404/' }

export function matchRoute(pathname) {
  return BY_PATH.get(normalizePath(pathname)) ?? { ...NOT_FOUND, path: normalizePath(pathname) }
}

export function alternatePath(route, lang) {
  return route.page === 'notFound' ? pathFor('home', lang) : pathFor(route.page, lang, route.param)
}
