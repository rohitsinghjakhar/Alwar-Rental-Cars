import { motion } from 'motion/react'
import { CarFront, ShieldCheck } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import CtaBox, { Section } from '../components/ui/CtaBox.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import Documents from '../components/sections/Documents.jsx'
import { FaqList } from '../components/sections/Faq.jsx'
import { useI18n } from '../i18n/index.jsx'
import { FAQ_GROUPS } from '../content/faqs.js'
import { whatsappHref } from '../lib/contact.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

function TipCard({ icon: Icon, title, items, delay }) {
  return (
    <motion.div
      className="rounded-[28px] bg-paper-2 p-7 ring-1 ring-dune sm:p-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-saffron text-ink">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-2xl font-extrabold [font-stretch:112%]">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[16px] leading-relaxed">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function HowPage() {
  const { t, L } = useI18n()
  const p = t.pages.how
  const faqs = FAQ_GROUPS.find((g) => g.id === 'booking').items.map((f) => ({ q: L(f.q), a: L(f.a) }))

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        <Button href={whatsappHref(t.common.defaultMessage)} size="lg" icon={WhatsAppIcon}>
          {t.common.bookWhatsApp}
        </Button>
      </PageHero>

      <HowItWorks index={null} details showLink={false} />

      <Section aria-label={`${p.beforeTitle} / ${p.onRoadTitle}`}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <TipCard icon={ShieldCheck} title={p.beforeTitle} items={p.before} delay={0} />
          <TipCard icon={CarFront} title={p.onRoadTitle} items={p.onRoad} delay={0.1} />
        </div>
      </Section>

      <Documents index={null} />

      <Section tone="white" aria-labelledby="how-faq-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="how-faq-title" eyebrow={t.faqSec.eyebrow} title={FAQ_GROUPS[0].title[t.lang]} />
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
