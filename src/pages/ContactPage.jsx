import { Phone } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import Contact from '../components/sections/Contact.jsx'
import { useI18n } from '../i18n/index.jsx'
import { SITE } from '../content/site.js'
import { telHref, whatsappHref } from '../lib/contact.js'

export default function ContactPage() {
  const { t } = useI18n()
  const p = t.pages.contact
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        <Button href={whatsappHref(t.common.defaultMessage)} size="lg" icon={WhatsAppIcon}>
          {t.common.bookWhatsApp}
        </Button>
        <Button href={telHref} variant="outline-light" size="lg" icon={Phone}>
          {SITE.phone.display}
        </Button>
      </PageHero>
      <Contact heading={false} />
    </>
  )
}
