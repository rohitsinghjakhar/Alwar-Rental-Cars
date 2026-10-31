import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import ContactForm from './ContactForm.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { SITE, fullAddress } from '../../content/site.js'
import { mailHref, mapsEmbedSrc, mapsHref, telHref, whatsappHref } from '../../lib/contact.js'
import { useOpenNow } from '../../hooks/useLiveStatus.js'
import { EASE, VIEWPORT } from '../../lib/motion.js'

export function ContactMethods() {
  const { t, lang } = useI18n()
  const methods = [
    { icon: Phone, label: t.contactSec.callUs, value: SITE.phone.display, href: telHref },
    { icon: WhatsAppIcon, label: t.common.whatsapp, value: t.contactSec.whatsappValue, href: whatsappHref(t.common.defaultMessage), external: true },
    { icon: Mail, label: t.contactSec.email, value: SITE.email, href: mailHref },
    { icon: MapPin, label: t.contactSec.visit, value: fullAddress(lang), href: mapsHref, external: true },
  ]
  return (
    <ul className="grid gap-3">
      {methods.map(({ icon: Icon, label, value, href, external }, i) => (
        <motion.li key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}>
          <a
            href={href}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            className="group flex items-center gap-4 rounded-2xl bg-paper-2/70 p-4 ring-1 ring-dune/70 transition-all duration-300 hover:bg-paper-2 hover:ring-dune"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-saffron transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="eyebrow block !text-[11px] text-stone">{label}</span>
              <span className="mt-0.5 block text-[16px] font-semibold [overflow-wrap:anywhere]">{value}</span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-stone transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" aria-hidden="true" />
          </a>
        </motion.li>
      ))}
    </ul>
  )
}

export function HoursCard({ className = '' }) {
  const { t, L } = useI18n()
  const open = useOpenNow()
  return (
    <Reveal delay={0.3} className={`flex items-center gap-4 rounded-2xl bg-night p-5 text-paper ${className}`}>
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-paper/10 text-saffron">
        <Clock className="size-5" aria-hidden="true" />
      </span>
      <div className="flex-1">
        <p className="eyebrow !text-[11px] text-paper/50">{t.contactSec.hours}</p>
        <p className="mt-0.5 text-[16px] font-semibold">{L(SITE.hours.label)}</p>
      </div>
      {open !== null && (
        <span className={`rounded-full px-3 py-1 text-[12.5px] font-semibold ${open ? 'bg-whatsapp/15 text-whatsapp' : 'bg-terracotta/20 text-[#ff9d7a]'}`}>
          {open ? t.common.openNow : t.common.closedNow}
        </span>
      )}
    </Reveal>
  )
}

/** Click-to-load map: no Google requests (or cookies) until the visitor asks for it. */
export function MapEmbed() {
  const { t, L } = useI18n()
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative h-[340px] overflow-hidden rounded-[28px] bg-night ring-1 ring-dune sm:h-[400px]">
      {loaded ? (
        <iframe
          title={t.contactSec.mapTitle}
          src={mapsEmbedSrc}
          className="h-full w-full border-0 grayscale-[30%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          allowFullScreen
        />
      ) : (
        <div className="grain relative grid h-full place-items-center overflow-hidden text-paper">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-paper/[0.07]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
            <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
              <path d="M-20 260 C160 230 260 300 420 250 S700 140 820 170" />
              <path d="M300 -20 C320 120 380 200 420 250 S470 380 460 420" />
              <path d="M-20 90 C140 110 220 60 360 90 S560 60 820 40" strokeWidth="6" />
              <path d="M600 -20 C590 100 640 200 700 420" strokeWidth="6" />
            </g>
          </svg>
          <div className="relative flex flex-col items-center px-6 text-center">
            <span className="relative grid size-16 place-items-center">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-saffron/40" aria-hidden="true" />
              <span className="relative grid size-14 place-items-center rounded-full bg-saffron text-ink">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
            </span>
            <p className="mt-5 text-xl font-bold [font-stretch:112%]">
              {L(SITE.address.street)}, {L(SITE.address.city)}
            </p>
            <p className="mt-1 text-paper/60">
              {L(SITE.address.state)} {SITE.address.pin}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => setLoaded(true)} className="h-11 rounded-full bg-paper px-5 text-[14.5px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
                {t.contactSec.showMap}
              </button>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-paper/25 px-5 text-[14.5px] font-semibold transition-colors hover:bg-paper/10">
                {t.contactSec.directions} <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/** Contact methods + booking form + map. `heading={false}` when the page already has an H1. */
export default function Contact({ index = '09', heading = true }) {
  const { t } = useI18n()
  return (
    <section id="contact" aria-labelledby={heading ? 'contact-title' : undefined} className="relative bg-sand py-24 lg:py-32">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          {heading && <SectionHeading id="contact-title" index={index} eyebrow={t.contactSec.eyebrow} title={t.contactSec.title} description={t.contactSec.desc} />}
          <div className={heading ? 'mt-10' : ''}>
            <ContactMethods />
          </div>
          <HoursCard className="mt-3" />
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <ContactForm />
        </Reveal>
        <Reveal className="lg:col-span-12">
          <MapEmbed />
        </Reveal>
      </div>
    </section>
  )
}
