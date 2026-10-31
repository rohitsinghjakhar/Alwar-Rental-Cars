import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/ui/PageHero.jsx'
import Photo from '../components/ui/Photo.jsx'
import { Section } from '../components/ui/CtaBox.jsx'
import { useI18n } from '../i18n/index.jsx'
import { PHOTOS } from '../content/photos.js'
import { carById } from '../content/fleet.js'
import { destinationById } from '../content/destinations.js'

const PLACE_NAMES = { alwar: { en: 'Alwar – Sagar tank', hi: 'अलवर – सागर तालाब' } }

export default function CreditsPage() {
  const { t, L } = useI18n()
  const p = t.pages.credits
  const label = (id) => L(carById(id)?.name ?? destinationById(id)?.fullName ?? PLACE_NAMES[id])

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
      <Section>
        <div className="overflow-x-auto rounded-[24px] bg-paper-2 ring-1 ring-dune">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-dune">
                {p.head.map((h) => (
                  <th key={h} scope="col" className="eyebrow px-5 py-4 !text-[11px] text-stone">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(PHOTOS).map((photo) => (
                <tr key={photo.id} className="border-b border-dune/60 last:border-0">
                  <th scope="row" className="px-5 py-3">
                    <span className="flex items-center gap-4">
                      <Photo id={photo.id} alt="" sizes="96px" imgClassName="aspect-[3/2] w-24 rounded-lg object-cover" />
                      <a href={photo.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold hover:text-terracotta">
                        {label(photo.id)} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </span>
                  </th>
                  <td className="px-5 py-3">{photo.author}</td>
                  <td className="px-5 py-3">
                    {photo.licenseUrl ? (
                      <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline decoration-dune underline-offset-4 hover:decoration-ink">
                        {photo.license}
                      </a>
                    ) : (
                      photo.license
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[14.5px] text-stone">{p.illustrations}</p>
      </Section>
    </>
  )
}
