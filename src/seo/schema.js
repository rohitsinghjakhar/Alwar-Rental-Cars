/**
 * schema.org JSON-LD builders. Every page links back to one business entity (@id …/#business),
 * which is what search engines and AI assistants use to understand who we are.
 */
import { SITE, CAR_TYPES } from '../content/site.js'
import { FLEET } from '../content/fleet.js'
import { ogImageFor } from '../content/photos.js'
import { DICTIONARIES } from '../i18n/index.jsx'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.alwarrentalcars.in').replace(/\/+$/, '')
export const abs = (path) => `${SITE_URL}${path}`
const ID = { business: `${SITE_URL}/#business`, website: `${SITE_URL}/#website` }
const LOCALE = { en: 'en-IN', hi: 'hi-IN' }

const BODY_TYPE = { hatchback: 'Hatchback', sedan: 'Sedan', suv: 'SUV', seven: 'MPV' }

export function businessSchema(lang) {
  const t = DICTIONARIES[lang]
  return {
    '@type': ['AutoRental', 'LocalBusiness'],
    '@id': ID.business,
    name: SITE.name,
    alternateName: [SITE.nameHi, 'Alwar Rental Car'],
    description: t.glance.text,
    slogan: 'Drive Alwar your way.',
    url: abs('/'),
    logo: abs('/icon-512.png'),
    image: [abs('/og-image.jpg'), ...FLEET.map((c) => abs(ogImageFor(c.photo)))],
    telephone: SITE.phone.tel,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street.en,
      addressLocality: SITE.address.city.en,
      addressRegion: SITE.address.state.en,
      postalCode: SITE.address.pin,
      addressCountry: SITE.address.country,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SITE.hours.days,
        opens: `${String(SITE.hours.open).padStart(2, '0')}:00`,
        closes: `${String(SITE.hours.close).padStart(2, '0')}:00`,
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Alwar' },
      { '@type': 'AdministrativeArea', name: 'Alwar district' },
      ...SITE.areas.en.slice(2).map((name) => ({ '@type': 'Place', name })),
      { '@type': 'Place', name: 'Delhi NCR' },
      { '@type': 'State', name: 'Rajasthan' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone.tel,
      contactType: 'reservations',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    knowsLanguage: ['en', 'hi'],
    currenciesAccepted: 'INR',
    ...(SITE.profiles.length && { sameAs: SITE.profiles }),
    makesOffer: FLEET.map((car) => ({
      '@type': 'Offer',
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
      itemOffered: { '@id': `${abs(`/cars/${car.slug}/`)}#car` },
      areaServed: { '@type': 'City', name: 'Alwar' },
    })),
    knowsAbout: ['Self drive car rental', 'Car hire in Alwar', 'Road trips in Rajasthan', 'Sariska Tiger Reserve', 'Delhi NCR travel'],
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: abs('/'),
    name: SITE.name,
    alternateName: SITE.nameHi,
    inLanguage: ['en-IN', 'hi-IN'],
    publisher: { '@id': ID.business },
  }
}

export function webPageSchema({ type = 'WebPage', url, name, description, lang, image, breadcrumbId, about }) {
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: LOCALE[lang],
    isPartOf: { '@id': ID.website },
    about: about ?? { '@id': ID.business },
    publisher: { '@id': ID.business },
    ...(image && { primaryImageOfPage: { '@type': 'ImageObject', url: image } }),
    ...(breadcrumbId && { breadcrumb: { '@id': breadcrumbId } }),
  }
}

export function breadcrumbSchema(url, items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: abs(item.path) })),
  }
}

export function faqSchema(url, faqs) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
}

export function carSchema(car, lang) {
  const url = abs(`/cars/${car.slug}/`)
  return {
    '@type': 'Car',
    '@id': `${url}#car`,
    name: car.name[lang],
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    bodyType: BODY_TYPE[car.type],
    vehicleSeatingCapacity: car.seats,
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission.en,
    description: car.summary[lang],
    image: abs(ogImageFor(car.photo)),
    url,
    category: CAR_TYPES.find((c) => c.id === car.type)?.label.en,
  }
}

export function carListSchema(lang) {
  return {
    '@type': 'ItemList',
    name: lang === 'hi' ? 'अलवर में किराये की सेल्फ ड्राइव कारें' : 'Self drive cars for rent in Alwar',
    itemListElement: FLEET.map((car, i) => ({ '@type': 'ListItem', position: i + 1, item: carSchema(car, lang) })),
  }
}

export function attractionSchema(d, lang, url) {
  return {
    '@type': 'TouristAttraction',
    '@id': `${url}#place`,
    name: d.fullName[lang],
    description: d.intro[lang][0],
    image: abs(ogImageFor(d.photo)),
    address: { '@type': 'PostalAddress', addressRegion: d.id === 'delhi' ? 'Delhi NCR' : 'Rajasthan', addressCountry: 'IN' },
  }
}

export function tripSchema(d, lang, url) {
  return {
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: lang === 'hi' ? `अलवर से ${d.name.hi} सेल्फ ड्राइव यात्रा` : `Alwar to ${d.name.en} by self drive car`,
    description: d.note[lang],
    touristType: ['Self drive travellers', 'Families', 'Business travellers'],
    provider: { '@id': ID.business },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, item: { '@type': 'City', name: 'Alwar' } },
        { '@type': 'ListItem', position: 2, item: { '@id': `${url}#place` } },
      ],
    },
  }
}

export function howToSchema(lang, url) {
  const t = DICTIONARIES[lang]
  return {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: t.pages.how.title,
    description: t.pages.how.intro,
    step: t.how.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: [s.text, ...t.pages.how.details[i]].join(' '),
    })),
  }
}
