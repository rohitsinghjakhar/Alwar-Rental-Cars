import { motion } from 'motion/react'
import { CalendarRange, CircleCheck, Clock, Gauge, Route } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import { PhotoCredit } from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import CtaBox, { Section } from '../components/ui/CtaBox.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { RouteMap, TripCards } from '../components/sections/RoadTrips.jsx'
import { FleetGrid } from '../components/sections/Fleet.jsx'
import { FaqList } from '../components/sections/Faq.jsx'
import { useI18n } from '../i18n/index.jsx'
import { destinationBySlug } from '../content/destinations.js'
import { carById } from '../content/fleet.js'
import { tripFaqs } from '../content/derived.js'
import { whatsappHref } from '../lib/contact.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

export default function TripPage({ slug }) {
  const { t, lang, L } = useI18n()
  const d = destinationBySlug(slug)
  const p = t.pages.trip
  const name = L(d.name)
  const message = t.trips.planMessage(name)
  const glance = [
    { icon: Gauge, label: p.distance, value: `~${d.km} km` },
    { icon: Clock, label: p.time, value: L(d.time) },
    { icon: CalendarRange, label: p.best, value: L(d.bestTime) },
    { icon: Route, label: p.route, value: L(d.route) },
  ]

  return (
    <>
      <PageHero eyebrow={L(d.kind)} title={p.h1(L(d.fullName))} intro={L(d.note)} photo={d.photo} photoAlt={L(d.fullName)}>
        <Button href={whatsappHref(message)} size="lg" icon={WhatsAppIcon}>
          {t.trips.plan(name)}
        </Button>
      </PageHero>

      <Section aria-labelledby="trip-glance-title">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="trip-glance-title" className="sr-only">
              {p.glance}
            </h2>
            <div className="grid gap-4 text-[17px] leading-relaxed text-ink/80">
              {L(d.intro).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <PhotoCredit id={d.photo} className="mt-6" />

            <h2 className="mt-12 text-2xl font-extrabold [font-stretch:112%]">{p.seeTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {L(d.see).map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-paper-2 px-4 py-3.5 ring-1 ring-dune">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-whatsapp-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-extrabold [font-stretch:112%]">{p.tipsTitle}</h2>
            <ul className="mt-5 grid gap-3">
              {L(d.tips).map((tip) => (
                <li key={tip} className="flex gap-3 text-[16px] leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="grid gap-5 lg:sticky lg:top-28">
              <motion.div className="rounded-[28px] bg-paper-2 p-6 ring-1 ring-dune sm:p-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, ease: EASE }}>
                <p className="eyebrow text-terracotta">{p.glance}</p>
                <dl className="mt-4 divide-y divide-dune">
                  {glance.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-3.5 py-3.5">
                      <Icon className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden="true" />
                      <div>
                        <dt className="text-[13.5px] text-stone">{label}</dt>
                        <dd className="text-[15.5px] font-semibold">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </motion.div>
              <div className="rounded-[28px] bg-night p-3">
                <RouteMap activeId={d.id} />
                <p className="px-2 pt-3 pb-1 text-[12px] text-paper/45">{t.trips.mapNote}</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="sand" aria-labelledby="trip-cars-title">
        <SectionHeading id="trip-cars-title" eyebrow={t.fleetSec.eyebrow} title={p.cars} />
        <FleetGrid cars={d.cars.map(carById)} filterable={false} className="mt-10" />
      </Section>

      <Section tone="white" aria-labelledby="trip-faq-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="trip-faq-title" eyebrow={t.faqSec.eyebrow} title={p.faqTitle} />
          </div>
          <div className="lg:col-span-7">
            <FaqList items={tripFaqs(d, lang)} />
          </div>
        </div>
      </Section>

      <Section aria-labelledby="trip-more-title">
        <CtaBox title={p.ctaTitle(name)} text={p.ctaText} message={message} />
        <div className="mt-20">
          <SectionHeading id="trip-more-title" eyebrow={t.trips.eyebrow} title={p.otherTrips} />
          <TripCards exclude={d.id} className="mt-10" />
        </div>
      </Section>
    </>
  )
}
