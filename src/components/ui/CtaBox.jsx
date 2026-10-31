import { Phone } from 'lucide-react'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { SITE } from '../../content/site.js'
import { telHref, whatsappHref } from '../../lib/contact.js'

/** Booking call-to-action card used across inner pages. */
export default function CtaBox({ title, text, message, className = '' }) {
  const { t } = useI18n()
  return (
    <Reveal className={`grain relative isolate overflow-hidden rounded-[28px] bg-night p-8 text-paper sm:p-12 ${className}`}>
      <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-saffron/20 blur-3xl" />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-3xl sm:text-4xl">{title}</p>
          {text && <p className="mt-3 text-[17px] leading-relaxed text-paper/70">{text}</p>}
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button href={whatsappHref(message ?? t.common.defaultMessage)} variant="whatsapp" size="lg" icon={WhatsAppIcon}>
            {t.common.bookWhatsApp}
          </Button>
          <Button href={telHref} variant="outline-light" size="lg" icon={Phone}>
            {SITE.phone.display}
          </Button>
        </div>
      </div>
    </Reveal>
  )
}

/** Plain paper-coloured section with standard spacing. */
export function Section({ tone = 'paper', className = '', children, ...props }) {
  const bg = { paper: 'bg-paper', sand: 'bg-sand', white: 'bg-paper-2' }[tone]
  return (
    <section className={`relative py-20 lg:py-28 ${bg} ${className}`} {...props}>
      <div className="container-x">{children}</div>
    </section>
  )
}
