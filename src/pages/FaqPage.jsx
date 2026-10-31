import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import { Section } from '../components/ui/CtaBox.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { AskCard, FaqList } from '../components/sections/Faq.jsx'
import { useI18n } from '../i18n/index.jsx'
import { FAQ_GROUPS } from '../content/faqs.js'
import { whatsappHref } from '../lib/contact.js'

export default function FaqPage() {
  const { t, L } = useI18n()
  const p = t.pages.faq
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        <Button href={whatsappHref(t.common.defaultMessage)} size="lg" icon={WhatsAppIcon}>
          {t.faqSec.ask}
        </Button>
      </PageHero>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <nav aria-label={p.title} className="hidden lg:col-span-3 lg:block">
            <ul className="sticky top-28 grid gap-1">
              {FAQ_GROUPS.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-ink/70 transition-colors hover:bg-sand hover:text-ink">
                    {L(g.title)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-16 lg:col-span-9">
            {FAQ_GROUPS.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-faq`}>
                <h2 id={`${g.id}-faq`} className="font-display text-3xl sm:text-4xl">
                  {L(g.title)}
                </h2>
                <div className="mt-6">
                  <FaqList items={g.items.map((f) => ({ q: L(f.q), a: L(f.a) }))} defaultOpen={-1} />
                </div>
              </section>
            ))}
            <AskCard />
          </div>
        </div>
      </Section>
    </>
  )
}
