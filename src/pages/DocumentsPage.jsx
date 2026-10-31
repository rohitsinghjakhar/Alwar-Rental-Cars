import { motion } from 'motion/react'
import { CircleCheck, Info } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import CtaBox, { Section } from '../components/ui/CtaBox.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { AadhaarSpecimen, LicenceSpecimen } from '../components/ui/IdSpecimen.jsx'
import { AskCard, FaqList } from '../components/sections/Faq.jsx'
import { useI18n } from '../i18n/index.jsx'
import { FAQ_GROUPS } from '../content/faqs.js'
import { EASE, VIEWPORT } from '../lib/motion.js'

function HeroCards() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[460px] sm:h-[360px]">
      <motion.div className="absolute top-[16%] left-0 w-[80%]" initial={{ opacity: 0, rotate: 0, y: 40 }} animate={{ opacity: 1, rotate: -6, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}>
        <AadhaarSpecimen />
      </motion.div>
      <motion.div className="absolute top-0 right-0 w-[80%]" initial={{ opacity: 0, rotate: 0, y: 40 }} animate={{ opacity: 1, rotate: 5, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}>
        <LicenceSpecimen />
      </motion.div>
    </div>
  )
}

function DocBlock({ Card, title, points, delay }) {
  return (
    <motion.article
      className="rounded-[28px] bg-paper-2 p-6 ring-1 ring-dune sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <Card />
      <h2 className="mt-8 text-2xl font-extrabold [font-stretch:112%]">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-[16px] leading-relaxed">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-whatsapp-deep" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function DocumentsPage() {
  const { t, L } = useI18n()
  const p = t.pages.documents
  const faqs = FAQ_GROUPS.find((g) => g.id === 'documents').items.map((f) => ({ q: L(f.q), a: L(f.a) }))

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} aside={<HeroCards />} />

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DocBlock Card={AadhaarSpecimen} title={p.aadhaarTitle} points={p.aadhaarText} delay={0} />
          <DocBlock Card={LicenceSpecimen} title={p.dlTitle} points={p.dlText} delay={0.1} />
        </div>
        <p className="mt-8 flex items-start gap-2.5 rounded-2xl bg-sand px-5 py-4 text-[14.5px] text-ink/75">
          <Info className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden="true" />
          {p.specimenNote}
        </p>
      </Section>

      <Section tone="white" aria-labelledby="docs-faq-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="docs-faq-title" eyebrow={t.faqSec.eyebrow} title={p.faqTitle} />
            <AskCard className="mt-8" />
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
