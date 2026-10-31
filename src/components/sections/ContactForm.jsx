import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Send } from 'lucide-react'
import Button from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { Field, Honeypot, PhoneInput, Spinner } from '../ui/FormFields.jsx'
import BookingSent from './BookingSent.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { CAR_TYPES, SITE } from '../../content/site.js'
import { mailHref } from '../../lib/contact.js'
import { LIMITS, validateBooking } from '../../lib/validation.js'
import { useBooking } from '../../hooks/useBooking.js'
import { useTodayIST } from '../../hooks/useLiveStatus.js'

const EMPTY = { name: '', phone: '', carType: '', pickup: '', dropoff: '', message: '', company: '' }

/**
 * Full booking form: e-mails the request and opens WhatsApp with the same details.
 * `car` (a FLEET entry) pre-selects that car, e.g. on its own page.
 */
export default function ContactForm({ defaultCarType = '', car, source = 'Booking form' }) {
  const uid = useId()
  const { t, L } = useI18n()
  const f = t.form
  const today = useTodayIST()
  const initial = { ...EMPTY, carType: car?.type ?? defaultCarType }
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const booking = useBooking({ source, car })
  const { status, emailEnabled } = booking
  const sending = status === 'sending'

  const set = (field) => (event) => {
    const value = event.target.value
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field] || errors.form) setErrors((e) => ({ ...e, [field]: undefined, form: undefined }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (sending) return

    const { data, errors: found, valid } = validateBooking(values)
    setErrors(found)
    if (!valid) {
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus()
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

  const fieldProps = (name) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-error` : undefined,
  })
  const err = (name) => (errors[name] ? f.errors[errors[name]] : undefined)

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-paper-2 p-6 shadow-[0_40px_80px_-50px_rgb(17_19_26/0.5)] ring-1 ring-dune sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <BookingSent key="sent" booking={booking} onReset={reset} className="min-h-[460px]" />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            aria-labelledby={`${uid}-title`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 id={`${uid}-title`} className="text-2xl font-extrabold [font-stretch:115%]">
              {f.title}
            </h3>
            <p className="mt-1.5 text-stone">{car ? f.subCar(L(car.name)) : f.sub}</p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label={f.name} required error={err('name')} id={`${uid}-name`}>
                <input {...fieldProps('name')} type="text" autoComplete="name" maxLength={LIMITS.name} placeholder={f.namePh} className="field" />
              </Field>
              <Field label={f.phone} required error={err('phone')} id={`${uid}-phone`}>
                <PhoneInput {...fieldProps('phone')} />
              </Field>
              <Field label={f.carType} id={`${uid}-carType`}>
                <select
                  {...fieldProps('carType')}
                  className="field appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%236b6455%22%20stroke-width=%222.5%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10"
                >
                  <option value="">{f.any}</option>
                  {CAR_TYPES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {L(c.label)}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label={f.pickup} required error={err('pickup')} id={`${uid}-pickup`}>
                  <input {...fieldProps('pickup')} type="date" min={today || undefined} className="field !px-3 tabular-nums" />
                </Field>
                <Field label={f.dropoff} required error={err('dropoff')} id={`${uid}-dropoff`}>
                  <input {...fieldProps('dropoff')} type="date" min={values.pickup || today || undefined} className="field !px-3 tabular-nums" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={f.message} hint={`${values.message.length}/${LIMITS.message}`} id={`${uid}-message`}>
                  <textarea {...fieldProps('message')} rows={4} maxLength={LIMITS.message} placeholder={f.messagePh} className="field resize-none" />
                </Field>
              </div>

              <Honeypot id={`${uid}-company`} label={f.honeypot} value={values.company} onChange={set('company')} />
            </div>

            <div aria-live="polite" className="min-h-6 pt-4 text-[14px] text-terracotta">
              {errors.form && f[errors.form]}
            </div>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                variant={emailEnabled ? 'dark' : 'whatsapp'}
                size="lg"
                disabled={sending}
                icon={sending ? Spinner : emailEnabled ? Send : WhatsAppIcon}
                trailingIcon={sending ? undefined : ArrowUpRight}
                className="w-full sm:w-auto"
              >
                {sending ? f.sending : emailEnabled ? f.submit : f.submitWhatsApp}
              </Button>
              <p className="text-[13.5px] text-stone">
                {f.preferEmail}{' '}
                <a href={mailHref} className="font-semibold text-ink underline decoration-dune underline-offset-4 [overflow-wrap:anywhere] hover:decoration-ink">
                  {SITE.email}
                </a>
              </p>
            </div>
            {emailEnabled && (
              <p className="mt-4 flex items-start gap-2 text-[13.5px] leading-snug text-stone">
                <WhatsAppIcon className="mt-px size-4 shrink-0 text-whatsapp-deep" />
                {f.bothNote}
              </p>
            )}
            <p className="mt-6 border-t border-dashed border-dune pt-5 text-[12.5px] leading-relaxed text-stone">{f.privacy}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
