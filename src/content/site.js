/**
 * Business facts — edit here to update the whole website (both languages).
 */

const NAME = 'Alwar Rental Cars'

export const SITE = {
  name: NAME,
  nameHi: 'अलवर रेंटल कार्स',
  phone: {
    display: '+91 83060 35800',
    short: '83060 35800',
    tel: '+918306035800',
    whatsapp: '918306035800',
  },
  email: 'alwarselfdrivecar@gmail.com',
  address: {
    street: { en: 'Near PNB Bank, Diwakari', hi: 'पीएनबी बैंक के पास, दिवाकरी' },
    city: { en: 'Alwar', hi: 'अलवर' },
    state: { en: 'Rajasthan', hi: 'राजस्थान' },
    pin: '301001',
    country: 'IN',
  },
  hours: {
    open: 8, // 24h clock, Asia/Kolkata
    close: 20,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    label: { en: '8:00 AM – 8:00 PM', hi: 'सुबह 8:00 – रात 8:00' },
    short: { en: '8 AM – 8 PM', hi: 'सुबह 8 – रात 8' },
    opensAt: { en: '8 AM', hi: 'सुबह 8 बजे' },
  },
  /**
   * Your public profiles — add the Google Business Profile (Maps) link first, then any others
   * (Facebook, Instagram, JustDial…). Search engines and AI assistants use these to confirm
   * the business is real, so this is one of the most valuable things to fill in.
   */
  profiles: [],
  mapsQuery: `${NAME}, Diwakari, Alwar, Rajasthan 301001`,
  mapsEmbedQuery: 'Punjab National Bank, Diwakari, Alwar, Rajasthan 301001',
  /** Towns whose residents commonly pick up from Alwar — used for "areas we serve". */
  areas: {
    en: ['Alwar city', 'Diwakari', 'Bhiwadi', 'Neemrana', 'Behror', 'Tijara', 'Khairthal', 'Rajgarh', 'Thanagazi', 'Malakhera', 'Laxmangarh', 'Kishangarh Bas'],
    hi: ['अलवर शहर', 'दिवाकरी', 'भिवाड़ी', 'नीमराना', 'बहरोड़', 'तिजारा', 'खैरथल', 'राजगढ़', 'थानागाजी', 'मालाखेड़ा', 'लक्ष्मणगढ़', 'किशनगढ़ बास'],
  },
}

export const CAR_TYPES = [
  { id: 'hatchback', label: { en: 'Hatchback', hi: 'हैचबैक' } },
  { id: 'sedan', label: { en: 'Sedan', hi: 'सेडान' } },
  { id: 'suv', label: { en: 'SUV', hi: 'एसयूवी' } },
  { id: 'seven', label: { en: '7-Seater', hi: '7-सीटर' } },
]

export const fullAddress = (lang = 'en') =>
  `${SITE.address.street[lang]}, ${SITE.address.city[lang]}, ${SITE.address.state[lang]} ${SITE.address.pin}`
