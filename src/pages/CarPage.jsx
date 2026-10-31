import { motion } from 'motion/react'
import { ArrowDown, Briefcase, CircleCheck, Fuel, Phone, Settings2, Tag, Users } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Photo, { PhotoCredit } from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import { Section } from '../components/ui/CtaBox.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading, { RevealTitle } from '../components/ui/SectionHeading.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { FleetGrid } from '../components/sections/Fleet.jsx'
import { FaqList } from '../components/sections/Faq.jsx'
import { TripCards } from '../components/sections/RoadTrips.jsx'
import ContactForm from '../components/sections/ContactForm.jsx'
import { useI18n } from '../i18n/index.jsx'
import { carBySlug } from '../content/fleet.js'
import { DESTINATIONS } from '../content/destinations.js'
import { SITE } from '../content/site.js'
import { carFaqs, carTypeLabel, relatedCars } from '../content/derived.js'
import { telHref, whatsappHref } from '../lib/contact.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

export default function CarPage({ slug }) {
  const { t, lang, L } = useI18n()
  const car = carBySlug(slug)
  const p = t.pages.car
  const name = L(car.name)
  const typeLabel = carTypeLabel(car.type, lang)
  const quote = p.quoteMessage(name)
  const trips = DESTINATIONS.filter((d) => d.cars.includes(car.id)).map((d) => d.id)
  const specs = [
    { icon: Tag, label: p.specLabels.type, value: typeLabel },
    { icon: Users, label: p.specLabels.seats, value: t.common.seats(car.seats) },
    { icon: Fuel, label: p.specLabels.fuel, value: L(car.fuel) },
    { icon: Settings2, label: p.specLabels.transmission, value: L(car.transmission) },
    { icon: Briefcase, label: p.specLabels.bags, value: t.common.bags(car.bags) },
  ]

  return (
    <>
      <section className="grain relative isolate overflow-hidden bg-night pt-28 pb-16 text-paper sm:pt-32 lg:pb-24">
        <div aria-hidden="true" className="absolute -top-40 right-0 -z-10 h-[420px] w-[720px] rounded-full bg-saffron/10 blur-[120px]" />
        <div className="container-x">
          <Breadcrumbs />
          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div className="lg:col-span-7" initial={{ opacity: 0, scale: 0.97, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
              <Photo
                id={car.photo}
                alt={name}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                imgClassName="aspect-[3/2] w-full rounded-[28px] object-cover shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-paper/10"
              />
              <PhotoCredit id={car.photo} className="mt-3 !text-paper/45 [&_a]:decoration-paper/20 [&_a:hover]:text-paper" />
            </motion.div>
            <div className="lg:col-span-5">
              <p className="eyebrow text-saffron">{p.eyebrow(typeLabel)}</p>
              <RevealTitle as="h1" text={p.h1(name)} accentClass="text-saffron" className="font-display mt-4 text-[2.4rem] text-balance sm:text-5xl lg:text-[3.4rem]" />
              <motion.p className="mt-5 text-[17px] leading-relaxed text-paper/70" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}>
                {L(car.summary)}
              </motion.p>
              <motion.dl className="mt-7 grid grid-cols-2 gap-2.5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}>
                {specs.slice(1).map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl bg-paper/[0.06] px-4 py-3 ring-1 ring-paper/10">
                    <Icon className="size-5 shrink-0 text-saffron" aria-hidden="true" />
                    <div>
                      <dt className="text-[12px] text-paper/50">{label}</dt>
                      <dd className="text-[15px] font-semibold">{value}</dd>
                    </div>
                  </div>
                ))}
              </motion.dl>
              <motion.div className="mt-7 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}>
                <Button href={whatsappHref(quote)} variant="whatsapp" size="lg" icon={WhatsAppIcon}>
                  {t.common.getQuote}
                </Button>
                <Button href={telHref} variant="outline-light" size="lg" icon={Phone}>
                  {SITE.phone.short}
                </Button>
              </motion.div>
              <p className="mt-4 text-[13.5px] text-paper/50">
                {t.common.priceLabel}: {t.common.priceOnRequest}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section aria-labelledby="car-about-title">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="car-about-title" eyebrow={typeLabel} title={p.aboutTitle(car.model)} />
            <div className="mt-6 grid gap-4 text-[17px] leading-relaxed text-ink/80">
              {L(car.about).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <h3 className="mt-12 text-xl font-bold [font-stretch:110%]">{p.idealFor}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {L(car.idealFor).map((item) => (
                <li key={item} className="rounded-full bg-sand px-4 py-2 text-[14.5px] font-medium">
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mt-12 text-xl font-bold [font-stretch:110%]">{p.goodToKnow}</h3>
            <ul className="mt-4 grid gap-3">
              {p.goodToKnowItems.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-relaxed">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-whatsapp-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <motion.div
              className="rounded-[28px] bg-paper-2 p-6 ring-1 ring-dune sm:p-8 lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="text-xl font-bold [font-stretch:110%]">{p.specs}</p>
              <dl className="mt-4 divide-y divide-dune">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-3.5">
                    <dt className="flex items-center gap-2.5 text-stone">
                      <Icon className="size-4 text-terracotta" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="text-right font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-dashed border-dune pt-6">
                <p className="text-lg font-bold [font-stretch:110%]">{p.book}</p>
                <p className="mt-1 text-[15px] text-stone">{p.bookText}</p>
                <div className="mt-5 grid gap-2.5">
                  <Button href="#book" variant="dark" trailingIcon={ArrowDown} className="w-full">
                    {p.toForm}
                  </Button>
                  <Button href={whatsappHref(quote)} variant="whatsapp" icon={WhatsAppIcon} className="w-full">
                    {t.common.bookWhatsApp}
                  </Button>
                  <Button href={telHref} variant="outline-dark" icon={Phone} className="w-full">
                    {t.common.call(SITE.phone.display)}
                  </Button>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </Section>

      {trips.length > 0 && (
        <Section tone="sand" aria-labelledby="car-trips-title">
          <SectionHeading id="car-trips-title" eyebrow={t.trips.eyebrow} title={p.tripsTitle(car.model)} />
          <TripCards only={trips} className="mt-10" />
        </Section>
      )}

      <Section tone="white" aria-labelledby="car-faq-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="car-faq-title" eyebrow={t.faqSec.eyebrow} title={p.faqTitle(car.model)} />
          </div>
          <div className="lg:col-span-7">
            <FaqList items={carFaqs(car, lang)} />
          </div>
        </div>
      </Section>

      <Section aria-labelledby="car-related-title">
        <SectionHeading id="car-related-title" eyebrow={t.fleetSec.eyebrow} title={p.otherCars} />
        <FleetGrid cars={relatedCars(car)} filterable={false} className="mt-10" />
      </Section>

      <Section tone="sand" id="book" aria-labelledby="car-book-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading id="car-book-title" eyebrow={p.book} title={p.bookTitle(car.model)} description={p.bookText} />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={whatsappHref(quote)} variant="whatsapp" icon={WhatsAppIcon}>
                {t.common.bookWhatsApp}
              </Button>
              <Button href={telHref} variant="outline-dark" icon={Phone}>
                {SITE.phone.display}
              </Button>
            </div>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <ContactForm car={car} source={`Car page – ${car.name.en}`} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
