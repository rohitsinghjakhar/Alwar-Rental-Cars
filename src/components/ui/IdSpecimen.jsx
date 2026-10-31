import { useI18n } from '../../i18n/index.jsx'

/**
 * Specimen ID cards that show customers what to bring. Deliberately NOT replicas: no State Emblem,
 * no UIDAI / transport-department marks, masked numbers and a SPECIMEN watermark on every card.
 * Text is sized in container units (cqw) so the card scales as one piece.
 */

function Silhouette() {
  return (
    <svg viewBox="0 0 60 72" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="72" fill="#e7dcc6" />
      <circle cx="30" cy="27" r="12" fill="#b9a98a" />
      <path d="M8 72c2-16 11-24 22-24s20 8 22 24Z" fill="#b9a98a" />
    </svg>
  )
}

function Guilloche({ color }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 252" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="0.6" opacity="0.18">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M0 ${30 + i * 12} C 80 ${10 + i * 12}, 160 ${50 + i * 12}, 240 ${30 + i * 12} S 360 ${10 + i * 12}, 400 ${32 + i * 12}`} />
        ))}
      </g>
    </svg>
  )
}

function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden" aria-hidden="true">
      <span className="-rotate-[16deg] text-[13cqw] leading-none font-extrabold tracking-[0.12em] whitespace-nowrap text-terracotta/[0.16] [font-stretch:120%]">
        SPECIMEN
      </span>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-[2.6cqw] leading-tight text-ink/55">{label}</dt>
      <dd className="text-[3.6cqw] leading-tight font-bold text-ink">{value}</dd>
    </div>
  )
}

export function AadhaarSpecimen({ className = '' }) {
  const { t } = useI18n()
  const f = t.docs.fields
  return (
    <figure
      className={`@container relative aspect-[1.586] w-full overflow-hidden rounded-[4.5cqw] bg-white text-ink shadow-[0_30px_60px_-25px_rgb(17_19_26/0.45)] ring-1 ring-ink/10 ${className}`}
      aria-label={`${t.docs.aadhaar.title} — ${t.docs.specimen}`}
    >
      <Guilloche color="#c4512b" />
      <div className="relative flex h-[19%] items-center justify-between bg-gradient-to-r from-[#f6a65a] via-[#fffaf1] to-[#79c27c] px-[5%]">
        <span className="text-[5cqw] leading-none font-extrabold text-ink">
          <span lang="hi">आधार</span> <span className="text-[3.4cqw] font-bold tracking-[0.18em] text-ink/70">AADHAAR</span>
        </span>
        <span className="rounded-[1cqw] bg-terracotta px-[1.6cqw] py-[0.6cqw] text-[2.6cqw] font-bold tracking-wider text-white">
          SPECIMEN · <span lang="hi">नमूना</span>
        </span>
      </div>

      <div className="relative flex gap-[5%] px-[5%] pt-[5%]">
        <div className="aspect-[5/6] w-[23%] shrink-0 overflow-hidden rounded-[1.5cqw] ring-1 ring-ink/10">
          <Silhouette />
        </div>
        <dl className="grid content-start gap-[1.6cqw]">
          <Field label={f.name} value={f.sampleName} />
          <Field label={f.dob} value="01/01/1990" />
          <Field label={f.gender} value={f.male} />
        </dl>
      </div>

      <p className="absolute inset-x-0 bottom-[13%] text-center font-mono text-[6cqw] font-bold tracking-[0.18em] text-ink/85">XXXX XXXX 0000</p>
      <p className="absolute inset-x-0 bottom-0 flex h-[9%] items-center justify-center bg-[#d7321f] text-[2.5cqw] font-semibold text-white">
        {t.docs.illustrationOnly}
      </p>
      <Watermark />
    </figure>
  )
}

export function LicenceSpecimen({ className = '' }) {
  const { t } = useI18n()
  const f = t.docs.fields
  return (
    <figure
      className={`@container relative aspect-[1.586] w-full overflow-hidden rounded-[4.5cqw] bg-[#f4f1ea] text-ink shadow-[0_30px_60px_-25px_rgb(17_19_26/0.45)] ring-1 ring-ink/10 ${className}`}
      aria-label={`${t.docs.dl.title} — ${t.docs.specimen}`}
    >
      <Guilloche color="#1f3a68" />
      <div className="relative flex h-[19%] items-center justify-between bg-gradient-to-r from-[#1f3a68] to-[#2f5596] px-[5%] text-white">
        <span className="leading-none">
          <span className="block text-[4.2cqw] font-extrabold tracking-[0.08em]">DRIVING LICENCE</span>
          <span lang="hi" className="mt-[0.6cqw] block text-[2.8cqw] font-semibold text-white/80">
            ड्राइविंग लाइसेंस
          </span>
        </span>
        <span className="rounded-[1cqw] bg-saffron px-[1.6cqw] py-[0.6cqw] text-[2.6cqw] font-bold tracking-wider text-ink">
          SPECIMEN · <span lang="hi">नमूना</span>
        </span>
      </div>

      <div className="relative flex gap-[5%] px-[5%] pt-[4.5%]">
        <div className="flex w-[23%] shrink-0 flex-col gap-[2cqw]">
          <div className="aspect-[5/6] overflow-hidden rounded-[1.5cqw] ring-1 ring-ink/10">
            <Silhouette />
          </div>
          {/* Smart-card chip */}
          <div className="aspect-[4/3] w-[70%] rounded-[1.2cqw] bg-gradient-to-br from-[#f7d58a] via-[#d9a441] to-[#b9822a] ring-1 ring-black/10" />
        </div>
        <dl className="grid flex-1 grid-cols-2 content-start gap-x-[3cqw] gap-y-[1.6cqw]">
          <div className="col-span-2">
            <Field label={f.dlNo} value="RJ02 XXXX XXXXXXX" />
          </div>
          <div className="col-span-2">
            <Field label={f.name} value={f.sampleName} />
          </div>
          <Field label={f.dob} value="01-01-1990" />
          <Field label={f.valid} value="31-12-2040" />
          <Field label={f.cov} value="LMV · MCWG" />
          <Field label={f.issued} value="RJ-02" />
        </dl>
      </div>

      <p className="absolute inset-x-0 bottom-0 flex h-[9%] items-center justify-center bg-[#1f3a68] text-[2.5cqw] font-semibold text-white">
        {t.docs.illustrationOnly}
      </p>
      <Watermark />
    </figure>
  )
}
