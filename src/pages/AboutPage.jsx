import { motion } from 'motion/react'
import { BadgeIndianRupee, Clock, FileCheck2, PhoneCall } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import { PhotoCredit } from '../components/ui/Photo.jsx'
import CtaBox, { Section } from '../components/ui/CtaBox.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import { useI18n } from '../i18n/index.jsx'
import { SITE, fullAddress } from '../content/site.js'
import { mailHref, telHref } from '../lib/contact.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

const PROMISE_ICONS = [BadgeIndianRupee, FileCheck2, PhoneCall, Clock]

export default function AboutPage() {
  const { t, lang, L } = useI18n()
  const p = t.pages.about
  const details = [
    { label: p.details.name, value: lang === 'hi' ? `${SITE.nameHi} (${SITE.name})` : SITE.name },
    { label: p.details.address, value: fullAddress(lang) },
    { label: p.details.phone, value: <a href={telHref} className="underline decoration-dune underline-offset-4 hover:decoration-ink">{SITE.phone.display}</a> },
    { label: p.details.email, value: <a href={mailHref} className="underline decoration-dune underline-offset-4 [overflow-wrap:anywhere] hover:decoration-ink">{SITE.email}</a> },
    { label: p.details.hours, value: L(SITE.hours.label) },
    { label: p.details.serves, value: p.servesValue },
  ]

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} photo="alwar" photoAlt={p.photoAlt} />

      <Section aria-labelledby="who-title">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="who-title" eyebrow={p.eyebrow} title={p.whoTitle} />
            <div className="mt-6 grid gap-4 text-[17px] leading-relaxed text-ink/80">
              {p.who.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <PhotoCredit id="alwar" className="mt-8" />
          </div>
          <motion.div
            className="rounded-[28px] bg-paper-2 p-6 ring-1 ring-dune sm:p-8 lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-xl font-bold [font-stretch:110%]">{p.detailsTitle}</h2>
            <dl className="mt-4 divide-y divide-dune">
              {details.map((d) => (
                <div key={d.label} className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <dt className="text-[14px] text-stone">{d.label}</dt>
                  <dd className="text-[15.5px] font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Section>

      <Section tone="sand" aria-labelledby="promise-title">
        <SectionHeading id="promise-title" eyebrow={p.eyebrow} title={p.promiseTitle} />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.promise.map((item, i) => {
            const Icon = PROMISE_ICONS[i]
            return (
              <motion.li
                key={item.title}
                className="rounded-[24px] bg-paper-2 p-6 ring-1 ring-dune"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-ink text-saffron">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold [font-stretch:110%]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{item.text}</p>
              </motion.li>
            )
          })}
        </ul>
      </Section>

      <WhyUs index={null} bordered={false} />

      <Section className="!pt-0">
        <CtaBox title={t.contactSec.title.replace(/\*/g, '')} text={t.contactSec.desc} />
      </Section>
    </>
  )
}
