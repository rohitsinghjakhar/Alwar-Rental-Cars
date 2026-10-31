import { motion } from 'motion/react'
import { MapPin, Route } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import CtaBox, { Section } from '../components/ui/CtaBox.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import RoadTrips, { TripCards } from '../components/sections/RoadTrips.jsx'
import { FaqList } from '../components/sections/Faq.jsx'
import { useI18n } from '../i18n/index.jsx'
import { MORE_PLACES } from '../content/destinations.js'
import { FAQ_GROUPS } from '../content/faqs.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

export default function TripsPage() {
  const { t, L } = useI18n()
  const p = t.pages.trips
  const faqs = FAQ_GROUPS.find((g) => g.id === 'trips').items.map((f) => ({ q: L(f.q), a: L(f.a) }))

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} photo="sariska" photoAlt={L({ en: 'Spotted deer crossing a forest road in Sariska Tiger Reserve', hi: 'सरिस्का टाइगर रिज़र्व में जंगल की सड़क पार करता चीतल' })} />

      <Section aria-labelledby="guides-title">
        <SectionHeading id="guides-title" eyebrow={p.eyebrow} title={p.guidesTitle} />
        <TripCards className="mt-10" />
      </Section>

      <RoadTrips index={null} />

      <Section tone="sand" aria-label={`${p.moreTitle} / ${p.tipsTitle}`}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div className="rounded-[28px] bg-paper-2 p-7 ring-1 ring-dune sm:p-9" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, ease: EASE }}>
            <h2 className="text-2xl font-extrabold [font-stretch:112%]">{p.moreTitle}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {L(MORE_PLACES).map((place) => (
                <li key={place} className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3.5 py-2 text-[14.5px] font-medium">
                  <MapPin className="size-3.5 text-terracotta" aria-hidden="true" />
                  {place}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="rounded-[28px] bg-night p-7 text-paper sm:p-9" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
            <span className="grid size-12 place-items-center rounded-2xl bg-saffron text-ink">
              <Route className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold [font-stretch:112%]">{p.tipsTitle}</h2>
            <ul className="mt-5 grid gap-3">
              {p.tips.map((tip) => (
                <li key={tip} className="flex gap-3 leading-relaxed text-paper/80">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-saffron" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="trips-faq-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="trips-faq-title" eyebrow={t.faqSec.eyebrow} title={FAQ_GROUPS.find((g) => g.id === 'trips').title[t.lang]} />
          </div>
          <div className="lg:col-span-7">
            <FaqList items={faqs} />
          </div>
        </div>
        <CtaBox className="mt-16" title={t.contactSec.title.replace(/\*/g, '')} text={t.contactSec.desc} />
      </Section>
    </>
  )
}
