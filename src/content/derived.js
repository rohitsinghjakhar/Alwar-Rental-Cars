// Content assembled from several sources, shared by pages and structured data so both always match.
import { FLEET, carById } from './fleet.js'
import { DICTIONARIES, localize } from '../i18n/index.jsx'
import { CAR_TYPES } from './site.js'

export function joinList(items, lang) {
  if (items.length < 2) return items.join('')
  const and = lang === 'hi' ? ' और ' : ' and '
  return `${items.slice(0, -1).join(', ')}${and}${items.at(-1)}`
}

export const carTypeLabel = (type, lang) => localize(CAR_TYPES.find((c) => c.id === type)?.label, lang)

export function carFaqs(car, lang) {
  return DICTIONARIES[lang].pages.car.faq({ name: car.name[lang], seats: car.seats, bags: car.bags }, car.model)
}

export function tripFaqs(d, lang) {
  const view = {
    name: d.name[lang],
    fullName: d.fullName[lang],
    time: d.time[lang],
    bestTime: d.bestTime[lang],
    carNames: joinList(d.cars.map((id) => carById(id).name[lang]), lang),
  }
  return DICTIONARIES[lang].pages.trip.faq(view, d.km)
}

export const relatedCars = (car, count = 3) => {
  const sameType = FLEET.filter((c) => c.id !== car.id && c.type === car.type)
  const others = FLEET.filter((c) => c.id !== car.id && c.type !== car.type)
  return [...sameType, ...others].slice(0, count)
}
