import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import Button from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { Field, FieldError, Honeypot, PhoneInput, Spinner } from '../ui/FormFields.jsx'
import BookingSent from './BookingSent.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { CAR_TYPES } from '../../content/site.js'
import { LIMITS, validateBooking } from '../../lib/validation.js'
import { useBooking } from '../../hooks/useBooking.js'
import { useTodayIST } from '../../hooks/useLiveStatus.js'

// On-screen order, so the first invalid field the visitor sees gets focus.
const FIELD_ORDER = ['pickup', 'dropoff', 'name', 'phone']

/** Compact hero booking card: e-mails the request and opens WhatsApp with the same details. */
export default function QuickBook({ defaultType = 'suv' }) {
  const uid = useId()
  const { t, L } = useI18n()
  const f = t.form
  const today = useTodayIST()
  const initial = { carType: defaultType, pickup: '', dropoff: '', name: '', phone: '', company: '' }
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const booking = useBooking({ source: 'Quick booking (home page)' })
  const { status, emailEnabled } = booking
  const sending = status === 'sending'

  const update = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field] || errors.form) setErrors((e) => ({ ...e, [field]: undefined, form: undefined }))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (sending) return

    const { data, errors: found, valid } = validateBooking(values)
    setErrors(found)
    if (!valid) {
      document.getElementById(`${uid}-${FIELD_ORDER.find((name) => found[name])}`)?.focus()
      return
    }

    if (values.company) {
      booking.pretend()
      return
    }

    if (!(await booking.send(data))) setErrors({ form: 'cooldown' })
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    booking.reset()
  }

  const err = (name) => (errors[name] ? f.errors[errors[name]] : undefined)
  const textProps = (name) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange: (e) => update(name, e.target.value),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-error` : undefined,
  })

  return (
    <div className="relative rounded-[28px] bg-paper p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-black/5 sm:p-7">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <BookingSent key="sent" booking={booking} onReset={reset} className="min-h-[440px]" />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            aria-labelledby={`${uid}-title`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id={`${uid}-title`} className="text-xl font-bold [font-stretch:112%]">
                  {t.quick.title}
                </h2>
                <p className="mt-1 text-sm text-stone">{t.quick.sub}</p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-whatsapp/15 text-whatsapp-deep">
                <WhatsAppIcon className="size-5" />
              </span>
            </div>

            <fieldset className="mt-6">
              <legend className="eyebrow mb-2.5 !text-[11.5px] text-stone">{t.quick.carType}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {CAR_TYPES.map((type) => {
                  const selected = values.carType === type.id
                  return (
                    <label
                      key={type.id}
                      className={`relative cursor-pointer rounded-xl border px-2 py-2.5 text-center text-[14px] font-medium transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-saffron ${
                        selected ? 'border-ink text-paper' : 'border-dune bg-paper-2 hover:border-stone/50'
                      }`}
                    >
                      <input type="radio" name={`${uid}-type`} value={type.id} checked={selected} onChange={() => update('carType', type.id)} className="sr-only" />
                      {selected && (
                        <motion.span
                          layoutId={`${uid}-chip`}
                          className="absolute inset-0 rounded-[11px] bg-ink"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{L(type.label)}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <DateField
                id={`${uid}-pickup`}
                label={t.quick.pickup}
                value={values.pickup}
                min={today || undefined}
                error={err('pickup')}
                onChange={(v) => {
                  update('pickup', v)
                  if (values.dropoff && v > values.dropoff) update('dropoff', v)
                }}
              />
              <DateField
                id={`${uid}-dropoff`}
                label={t.quick.dropoff}
                value={values.dropoff}
                min={values.pickup || today || undefined}
                error={err('dropoff')}
                onChange={(v) => update('dropoff', v)}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              <Field label={f.name} required error={err('name')} id={`${uid}-name`}>
                <input {...textProps('name')} type="text" autoComplete="name" maxLength={LIMITS.name} placeholder={f.namePh} className="field" />
              </Field>
              <Field label={t.quick.phone} required error={err('phone')} id={`${uid}-phone`}>
                <PhoneInput {...textProps('phone')} />
              </Field>
            </div>

            <Honeypot id={`${uid}-company`} label={f.honeypot} value={values.company} onChange={(e) => update('company', e.target.value)} />

            <p aria-live="polite" className="min-h-5 pt-2 text-[13px] text-terracotta">
              {errors.form && f[errors.form]}
            </p>

            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              disabled={sending}
              icon={sending ? Spinner : WhatsAppIcon}
              trailingIcon={sending ? undefined : ArrowUpRight}
              className="mt-1 w-full"
            >
              {sending ? f.sending : emailEnabled ? t.quick.submit : t.quick.submitWhatsApp}
            </Button>
            <p className="mt-3 text-center text-[12.5px] text-stone">{emailEnabled ? t.quick.note : t.quick.noteWhatsApp}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function DateField({ id, label, value, min, error, onChange }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="eyebrow mb-1.5 flex items-center gap-1.5 !text-[11.5px] text-stone">
        <CalendarDays className="size-3.5" aria-hidden="true" />
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field !px-3 tabular-nums"
      />
      <FieldError id={`${id}-error`} error={error} />
    </div>
  )
}
