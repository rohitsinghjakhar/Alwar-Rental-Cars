import { useId, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Plus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { HOME_FAQS } from '../../content/faqs.js'
import { whatsappHref } from '../../lib/contact.js'
import { EASE } from '../../lib/motion.js'

/** Accordion of [{ q, a }] (already localised). */
export function FaqList({ items, defaultOpen = 0, headingLevel = 'h3' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <ul className="border-t border-dune">
      {items.map((item, i) => (
        <FaqItem key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} Heading={headingLevel} />
      ))}
    </ul>
  )
}

function FaqItem({ item, open, onToggle, index, Heading }) {
  const id = useId()
  return (
    <motion.li
      className="border-b border-dune"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 6) * 0.05 }}
    >
      <Heading>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="text-[17.5px] font-semibold [font-stretch:105%] sm:text-lg">{item.q}</span>
          <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? 'bg-ink text-paper' : 'bg-sand text-ink group-hover:bg-dune'}`}>
            <Plus className={`size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? 'rotate-[135deg]' : ''}`} aria-hidden="true" />
          </span>
        </button>
      </Heading>
      {/* Answers always stay in the HTML (collapsed + inert) so search engines and AI crawlers read them. */}
      <motion.div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pr-12 pb-6 leading-relaxed text-stone">{item.a}</p>
      </motion.div>
    </motion.li>
  )
}

export function AskCard({ className = '' }) {
  const { t } = useI18n()
  return (
    <Reveal delay={0.3} className={`rounded-[24px] bg-sand p-6 sm:p-7 ${className}`}>
      <p className="text-lg font-bold [font-stretch:110%]">{t.faqSec.stillTitle}</p>
      <p className="mt-1.5 text-stone">{t.faqSec.stillText}</p>
      <Button href={whatsappHref(t.common.defaultMessage)} variant="dark" icon={WhatsAppIcon} className="mt-5">
        {t.faqSec.ask}
      </Button>
    </Reveal>
  )
}

/** Home-page FAQ preview. */
export default function Faq({ index = '08' }) {
  const { t, L, href } = useI18n()
  const items = HOME_FAQS.map((f) => ({ q: L(f.q), a: L(f.a) }))
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-paper py-24 lg:py-32">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" index={index} eyebrow={t.faqSec.eyebrow} title={t.faqSec.title} description={t.faqSec.desc} />
            <AskCard className="mt-10" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <FaqList items={items} />
          <Link to={href('faq')} className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-terracotta">
            {t.common.allFaqs}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
