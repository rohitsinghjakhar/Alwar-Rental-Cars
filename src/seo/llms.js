/**
 * /llms.txt — a plain-language summary of the business for AI assistants and answer engines
 * (ChatGPT, Perplexity, Gemini, Claude …). Generated from the same content as the site.
 */
import { SITE, fullAddress } from '../content/site.js'
import { FLEET } from '../content/fleet.js'
import { DESTINATIONS } from '../content/destinations.js'
import { ALL_FAQS } from '../content/faqs.js'
import { pathFor } from '../router/routes.js'
import { abs } from './schema.js'

export function buildLlmsTxt() {
  const page = (key, param) => abs(pathFor(key, 'en', param))
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} (${SITE.nameHi}) is a self drive car rental in Alwar, Rajasthan, India. It rents hatchbacks, sedans, SUVs and 7-seater cars without a driver to tourists, local customers, business travellers and government employees.`,
    '',
    '## Key facts',
    '',
    `- Business: ${SITE.name} — self drive car rental (car hire without driver)`,
    `- Address: ${fullAddress('en')}, India`,
    `- Phone / WhatsApp: ${SITE.phone.display}`,
    `- Email: ${SITE.email}`,
    `- Opening hours: ${SITE.hours.label.en}, every day (IST)`,
    '- Documents required: Aadhaar card and a valid permanent driving licence (both compulsory). Learner’s licences are not valid for self drive.',
    '- Booking: WhatsApp or call; price is quoted on request for your dates. No online payment.',
    `- Pickup and return: ${fullAddress('en')}`,
    `- Customers come from: ${SITE.areas.en.join(', ')}; also travellers heading to Delhi NCR, Jaipur and across Rajasthan`,
    '- Languages: English, Hindi',
    '',
    '## Cars available for self drive',
    '',
    ...FLEET.map((c) => `- [${c.name.en}](${page('car', c.slug)}): ${c.seats} seats, ${c.fuel.en}, ${c.transmission.en}. ${c.summary.en}`),
    '',
    '## Road trips from Alwar (approximate road distance)',
    '',
    ...DESTINATIONS.map((d) => `- [${d.fullName.en}](${page('trip', d.slug)}): ~${d.km} km, about ${d.time.en}. ${d.note.en}`),
    '',
    '## Pages',
    '',
    `- [Home](${page('home')}): overview of self drive car rental in Alwar`,
    `- [Cars](${page('cars')}): full fleet with comparison table`,
    `- [Services](${page('services')}): for tourists, local customers, business travellers and government employees`,
    `- [How it works](${page('how')}): the four booking steps`,
    `- [Documents](${page('documents')}): Aadhaar card and driving licence requirements`,
    `- [Road trips](${page('trips')}): guides to Sariska, Bhangarh, Neemrana, Jaipur, Delhi NCR and more`,
    `- [FAQ](${page('faq')}): answers to common questions`,
    `- [Contact](${page('contact')}): phone, WhatsApp, email, address and map`,
    `- [हिंदी में वेबसाइट (Hindi version)](${abs(pathFor('home', 'hi'))})`,
    '',
    '## Frequently asked questions',
    '',
    ...ALL_FAQS.flatMap((f) => [`### ${f.q.en}`, '', f.a.en, '']),
  ]
  return lines.join('\n')
}
