import PageHero from '../components/ui/PageHero.jsx'
import { Section } from '../components/ui/CtaBox.jsx'
import { useI18n } from '../i18n/index.jsx'

/** Privacy policy / terms of use. */
export default function LegalPage({ page }) {
  const { t } = useI18n()
  const p = t.pages[page]
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.updated} />
      <Section>
        <div className="max-w-3xl">
          {p.sections.map((s) => (
            <section key={s.h} className="border-b border-dune py-8 first:pt-0 last:border-0">
              <h2 className="text-2xl font-extrabold [font-stretch:112%]">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para} className="mt-3 text-[17px] leading-relaxed text-ink/80">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  )
}
