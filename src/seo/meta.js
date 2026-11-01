/**
 * Per-page <head>: title, description, canonical, hreflang alternates, Open Graph and JSON-LD.
 * Used at build time (pre-rendered HTML) and in the browser on client-side navigation.
 */
import { DICTIONARIES } from '../i18n/index.jsx'
import { alternatePath } from '../router/routes.js'
import { carBySlug } from '../content/fleet.js'
import { DESTINATIONS, destinationBySlug } from '../content/destinations.js'
import { FAQ_GROUPS, ALL_FAQS, HOME_FAQS } from '../content/faqs.js'
import { SITE } from '../content/site.js'
import { ogImageFor } from '../content/photos.js'
import { carFaqs, tripFaqs } from '../content/derived.js'
import {
  SITE_URL,
  abs,
  attractionSchema,
  breadcrumbSchema,
  businessSchema,
  carListSchema,
  carSchema,
  faqSchema,
  howToSchema,
  tripSchema,
  webPageSchema,
  websiteSchema,
} from './schema.js'

const LOCALE = { en: 'en-IN', hi: 'hi-IN' }
const OG_LOCALE = { en: 'en_IN', hi: 'hi_IN' }

const localFaqs = (items, lang) => items.map((f) => ({ q: f.q[lang], a: f.a[lang] }))
const groupFaqs = (id, lang) => localFaqs(FAQ_GROUPS.find((g) => g.id === id).items, lang)

/** Breadcrumb trail for a route, as [{ name, path }]. Shared with the visible breadcrumbs. */
export function breadcrumbsFor(route) {
  const t = DICTIONARIES[route.lang]
  const p = (page, param) => alternatePath({ page, param }, route.lang)
  const home = { name: t.nav.home, path: p('home') }
  switch (route.page) {
    case 'home':
    case 'notFound':
      return [home]
    case 'car': {
      const car = carBySlug(route.param)
      return [home, { name: t.nav.cars, path: p('cars') }, { name: car.name[route.lang], path: route.path }]
    }
    case 'trip': {
      const d = destinationBySlug(route.param)
      return [home, { name: t.nav.trips, path: p('trips') }, { name: d.name[route.lang], path: route.path }]
    }
    default:
      return [home, { name: t.nav[route.page] ?? t.pages[route.page]?.title, path: route.path }]
  }
}

export function getHead(route) {
  const { lang } = route
  const t = DICTIONARIES[lang]
  const url = abs(route.path)
  const crumbs = breadcrumbsFor(route)
  const graph = [businessSchema(lang), websiteSchema()]
  let meta = t.meta[route.page] ?? t.meta.notFound
  let image = abs('/og-image.jpg')
  let imageAlt = `${SITE.name} – ${t.hero.eyebrow}`
  let pageType = 'WebPage'

  switch (route.page) {
    case 'home':
      graph.push(faqSchema(url, localFaqs(HOME_FAQS, lang)))
      break
    case 'cars':
      pageType = 'CollectionPage'
      graph.push(carListSchema(lang), faqSchema(url, groupFaqs('cars', lang)))
      break
    case 'car': {
      const car = carBySlug(route.param)
      meta = t.meta.car({
        name: car.name[lang],
        seats: car.seats,
        fuelEn: car.fuel.en,
        fuelHi: car.fuel.hi,
        transmissionEn: car.transmission.en.toLowerCase(),
        transmissionHi: car.transmission.hi,
        summaryEn: car.summary.en,
        summaryHi: car.summary.hi,
      })
      image = abs(ogImageFor(car.photo))
      imageAlt = car.name[lang]
      pageType = 'ItemPage'
      graph.push(carSchema(car, lang), faqSchema(url, carFaqs(car, lang)))
      break
    }
    case 'services':
      graph.push(
        ...t.audience.items.map((item) => ({
          '@type': 'Service',
          name: `${t.hero.eyebrow} – ${item.title}`,
          serviceType: 'Self drive car rental',
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: [{ '@type': 'City', name: 'Alwar' }, { '@type': 'State', name: 'Rajasthan' }],
          audience: { '@type': 'Audience', audienceType: item.title },
          description: item.text,
        })),
      )
      break
    case 'about':
      pageType = 'AboutPage'
      image = abs(ogImageFor('alwar'))
      break
    case 'how':
      graph.push(howToSchema(lang, url))
      break
    case 'documents':
      graph.push(faqSchema(url, groupFaqs('documents', lang)))
      break
    case 'trips':
      pageType = 'CollectionPage'
      image = abs(ogImageFor('sariska'))
      graph.push({
        '@type': 'ItemList',
        itemListElement: DESTINATIONS.map((d, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(alternatePath({ page: 'trip', param: d.slug }, lang)),
          name: d.fullName[lang],
        })),
      })
      break
    case 'trip': {
      const d = destinationBySlug(route.param)
      meta = t.meta.trip({ id: d.id, name: d.name[lang], fullName: d.fullName[lang], km: d.km, time: d.time[lang] })
      image = abs(ogImageFor(d.photo))
      imageAlt = d.fullName[lang]
      graph.push(attractionSchema(d, lang, url), tripSchema(d, lang, url), faqSchema(url, tripFaqs(d, lang)))
      break
    }
    case 'faq':
      pageType = 'FAQPage'
      graph.push(faqSchema(url, localFaqs(ALL_FAQS, lang)))
      break
    case 'contact':
      pageType = 'ContactPage'
      break
    default:
      break
  }

  const indexable = route.page !== 'notFound'
  if (indexable) {
    if (crumbs.length > 1) graph.push(breadcrumbSchema(url, crumbs))
    graph.push(
      webPageSchema({
        type: pageType === 'FAQPage' ? 'WebPage' : pageType,
        url,
        name: meta.title,
        description: meta.description,
        lang,
        image,
        breadcrumbId: crumbs.length > 1 ? `${url}#breadcrumb` : undefined,
      }),
    )
  }

  // Link previews (WhatsApp, Facebook, X) show only this title, so it always names the business.
  const brand = lang === 'hi' ? SITE.nameHi : SITE.name
  const shareTitle = meta.title.includes(brand) ? meta.title : `${meta.title} | ${brand}`

  return {
    lang: LOCALE[lang],
    title: meta.title,
    description: meta.description,
    robots: indexable ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, follow',
    canonical: indexable ? url : null,
    alternates: indexable
      ? [
          { hreflang: 'en-IN', href: abs(alternatePath(route, 'en')) },
          { hreflang: 'hi-IN', href: abs(alternatePath(route, 'hi')) },
          { hreflang: 'x-default', href: abs(alternatePath(route, 'en')) },
        ]
      : [],
    og: {
      type: route.page === 'home' ? 'website' : 'article',
      url,
      title: shareTitle,
      description: meta.description,
      image,
      imageAlt,
      locale: OG_LOCALE[lang],
      localeAlt: OG_LOCALE[lang === 'en' ? 'hi' : 'en'],
    },
    jsonLd: { '@context': 'https://schema.org', '@graph': graph },
  }
}

/** Head tags as [tag, attributes] pairs; JSON-LD is handled separately. */
export function headTags(head) {
  const tags = [
    ['meta', { name: 'description', content: head.description }],
    ['meta', { name: 'robots', content: head.robots }],
    ['meta', { property: 'og:type', content: head.og.type }],
    ['meta', { property: 'og:site_name', content: SITE.name }],
    ['meta', { property: 'og:url', content: head.og.url }],
    ['meta', { property: 'og:title', content: head.og.title }],
    ['meta', { property: 'og:description', content: head.og.description }],
    ['meta', { property: 'og:image', content: head.og.image }],
    ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: head.og.imageAlt }],
    ['meta', { property: 'og:locale', content: head.og.locale }],
    ['meta', { property: 'og:locale:alternate', content: head.og.localeAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: head.og.title }],
    ['meta', { name: 'twitter:description', content: head.og.description }],
    ['meta', { name: 'twitter:image', content: head.og.image }],
    ['meta', { name: 'twitter:image:alt', content: head.og.imageAlt }],
  ]
  if (head.canonical) tags.push(['link', { rel: 'canonical', href: head.canonical }])
  for (const alt of head.alternates) tags.push(['link', { rel: 'alternate', hreflang: alt.hreflang, href: alt.href }])
  return tags
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Prevents "</script>" inside JSON from closing the tag early.
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

export function headToHtml(head) {
  const tags = headTags(head).map(
    ([tag, attrs]) => `<${tag} data-h ${Object.entries(attrs).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ')} />`,
  )
  return [
    `<title>${escapeText(head.title)}</title>`,
    ...tags,
    `<script type="application/ld+json" data-h>${serializeJsonLd(head.jsonLd)}</script>`,
  ].join('\n    ')
}

