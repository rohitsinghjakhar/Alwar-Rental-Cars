import { AnimatePresence, motion } from 'motion/react'
import { LoaderCircle } from 'lucide-react'

/** Shared controls for the booking forms (ContactForm and the hero QuickBook). */

export function Field({ label, required, error, hint, id, children }) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="eyebrow !text-[11.5px] text-stone">
          {label}
          {required && <span className="text-terracotta"> *</span>}
        </label>
        {hint && <span className="text-[12px] text-stone/70 tabular-nums">{hint}</span>}
      </div>
      {children}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  )
}

export function FieldError({ id, error }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p id={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pt-1.5 text-[13px] text-terracotta">
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

/** Indian mobile number with a fixed +91 prefix. */
export function PhoneInput(props) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[15px] text-stone">+91</span>
      <input {...props} type="tel" inputMode="tel" autoComplete="tel-national" maxLength={16} placeholder="98XXXXXXXX" className="field !pl-13 tabular-nums" />
    </div>
  )
}

/** Spam trap: hidden from people and assistive tech, so only bots fill it in. */
export function Honeypot({ id, label, value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>{label}</label>
      <input id={id} name="company" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  )
}

export function Spinner(props) {
  return <LoaderCircle {...props} className={`${props.className} animate-spin`} />
}
