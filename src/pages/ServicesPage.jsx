import { motion } from 'motion/react'
import { ArrowRight, CircleCheck, MapPin } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'
import CtaBox, { Section } from '../components/ui/CtaBox.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { AUDIENCE_ICONS } from '../components/sections/Audience.jsx'
import { Link } from '../router/Router.jsx'
import { useI18n } from '../i18n/index.jsx'
import { carById } from '../content/fleet.js'
import { SITE } from '../content/site.js'
import { whatsappHref } from '../lib/contact.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

const RECOMMENDED = {
  business: ['creta', 'dzire', 'innova'],
  government: ['innova', 'creta', 'ertiga'],
  tourists: ['thar', 'swift', 'ertiga'],
  local: ['dzire', 'ertiga', 'swift'],
}
const PHOTO_FOR = { business: 'creta', government: 'innova', tourists: 'bala-quila', local: 'ertiga' }

export default function ServicesPage() {
  const { t, L, href } = useI18n()
  const p = t.pages.services

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} photo="innova" photoAlt={L(carById('innova').name)}>
        <Button href={whatsappHref(t.common.defaultMessage)} size="lg" icon={WhatsAppIcon}>
          {t.common.bookWhatsApp}
        </Button>
      </PageHero>

      {t.audience.items.map((item, i) => {
        const Icon = AUDIENCE_ICONS[item.id]
        const section = p.sections[item.id]
        const flip = i % 2 === 1
        return (
          <Section key={item.id} id={item.id} tone={flip ? 'sand' : 'paper'} aria-labelledby={`${item.id}-title`}>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <motion.div
                className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Photo id={PHOTO_FOR[item.id]} alt="" sizes="(min-width: 1024px) 40vw, 100vw" imgClassName="aspect-[4/3] w-full rounded-[28px] object-cover ring-1 ring-ink/5" />
              </motion.div>
              <div className="lg:col-span-7">
                <span className="grid size-14 place-items-center rounded-2xl bg-saffron text-ink">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h2 id={`${item.id}-title`} className="font-display mt-6 text-[2.2rem] sm:text-5xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/80">{section.lead}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[16px] leading-relaxed">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-whatsapp-deep" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-8 !text-[11.5px] text-stone">{p.recommended}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {RECOMMENDED[item.id].map((id) => {
                    const car = carById(id)
                    return (
                      <li key={id}>
                        <Link to={href('car', car.slug)} className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-4 py-2 text-[14.5px] font-medium ring-1 ring-dune transition-colors hover:bg-ink hover:text-paper">
                          {L(car.name)} <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <Button href={whatsappHref(t.audience.enquiryMessage(item.message))} variant="dark" icon={WhatsAppIcon} className="mt-8">
                  {t.common.bookWhatsApp}
                </Button>
              </div>
            </div>
          </Section>
        )
      })}

      <Section tone="white" aria-labelledby="types-title">
        <SectionHeading id="types-title" eyebrow={p.eyebrow} title={p.typesTitle} />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.types.map((type, i) => (
            <motion.li
              key={type.title}
              className="rounded-[24px] bg-paper p-6 ring-1 ring-dune"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
            >
              <span className="font-display text-3xl text-terracotta">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold [font-stretch:110%]">{type.title}</h3>
              <p className="mt-2 leading-relaxed text-stone">{type.text}</p>
            </motion.li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="areas-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="areas-title" eyebrow={p.eyebrow} title={p.areasTitle} description={p.areasText} />
          </div>
          <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-7 lg:pt-12">
            {L(SITE.areas).map((area) => (
              <li key={area} className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2.5 text-[15px] font-medium">
                <MapPin className="size-4 text-terracotta" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>
        <CtaBox className="mt-16" title={t.contactSec.title.replace(/\*/g, '')} text={t.contactSec.desc} />
      </Section>
    </>
  )
}
