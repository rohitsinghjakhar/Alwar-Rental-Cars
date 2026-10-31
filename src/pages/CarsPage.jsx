import { motion } from 'motion/react'
import { ArrowRight, Info, Phone } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import CtaBox, { Section } from '../components/ui/CtaBox.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { FleetGrid } from '../components/sections/Fleet.jsx'
import { AskCard, FaqList } from '../components/sections/Faq.jsx'
import { Link } from '../router/Router.jsx'
import { useI18n } from '../i18n/index.jsx'
import { FLEET, carById } from '../content/fleet.js'
import { FAQ_GROUPS } from '../content/faqs.js'
import { SITE } from '../content/site.js'
import { carTypeLabel } from '../content/derived.js'
import { telHref, whatsappHref } from '../lib/contact.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

function Collage() {
  const { L } = useI18n()
  const picks = ['swift', 'creta', 'thar', 'innova'].map(carById)
  return (
    <div className="grid grid-cols-2 gap-3">
      {picks.map((car, i) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.08 }}
          className={i % 2 ? 'translate-y-6' : ''}
        >
          <Photo id={car.photo} alt={L(car.name)} priority={i < 2} sizes="(min-width: 1024px) 20vw, 50vw" imgClassName="aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-paper/10" />
        </motion.div>
      ))}
    </div>
  )
}

export default function CarsPage() {
  const { t, lang, L, href } = useI18n()
  const p = t.pages.cars
  const faqs = FAQ_GROUPS.find((g) => g.id === 'cars').items.map((f) => ({ q: L(f.q), a: L(f.a) }))

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} aside={<Collage />}>
        <Button href={whatsappHref(t.common.defaultMessage)} size="lg" icon={WhatsAppIcon}>
          {t.common.bookWhatsApp}
        </Button>
        <Button href={telHref} variant="outline-light" size="lg" icon={Phone}>
          {SITE.phone.display}
        </Button>
      </PageHero>

      <Section>
        <FleetGrid />
        <p className="mt-8 flex items-start gap-2.5 text-[14.5px] text-stone">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t.fleetSec.note}
        </p>
      </Section>

      <Section tone="sand" aria-labelledby="compare-title">
        <SectionHeading id="compare-title" eyebrow={p.eyebrow} title={p.compareTitle} />
        <motion.div
          className="mt-10 overflow-x-auto rounded-[24px] bg-paper-2 ring-1 ring-dune"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <table className="w-full min-w-[720px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-dune">
                {p.compareHead.map((h) => (
                  <th key={h} scope="col" className="eyebrow px-5 py-4 !text-[11px] text-stone">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FLEET.map((car) => (
                <tr key={car.id} className="border-b border-dune/60 last:border-0 hover:bg-sand/40">
                  <th scope="row" className="px-5 py-4 font-semibold">
                    <Link to={href('car', car.slug)} className="hover:text-terracotta">
                      {L(car.name)}
                    </Link>
                  </th>
                  <td className="px-5 py-4">{carTypeLabel(car.type, lang)}</td>
                  <td className="px-5 py-4 tabular-nums">{car.seats}</td>
                  <td className="px-5 py-4">{L(car.fuel)}</td>
                  <td className="px-5 py-4">{L(car.transmission)}</td>
                  <td className="px-5 py-4">{t.common.bags(car.bags)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Section>

      <Section aria-labelledby="choose-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="choose-title" eyebrow={p.eyebrow} title={p.chooseTitle} />
          </div>
          <ul className="grid gap-3 lg:col-span-7">
            {p.choose.map((item, i) => {
              const car = carById(item.car)
              return (
                <motion.li key={item.car} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}>
                  <Link to={href('car', car.slug)} className="group flex items-center gap-4 rounded-2xl bg-paper-2 p-3 pr-5 ring-1 ring-dune transition-colors hover:bg-sand/60">
                    <Photo id={car.photo} alt="" sizes="96px" imgClassName="aspect-[4/3] w-24 shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] text-stone">{item.need}</span>
                      <span className="block text-[17px] font-bold [font-stretch:110%]">{L(car.name)}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-stone transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="cars-faq-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="cars-faq-title" eyebrow={t.faqSec.eyebrow} title={p.faqTitle} />
            <AskCard className="mt-8" />
          </div>
          <div className="lg:col-span-7">
            <FaqList items={faqs} />
          </div>
        </div>
      </Section>

      <Section>
        <CtaBox title={t.contactSec.title.replace(/\*/g, '')} text={t.contactSec.desc} />
      </Section>
    </>
  )
}
