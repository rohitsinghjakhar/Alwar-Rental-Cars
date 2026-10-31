import { useId } from 'react'
import { motion } from 'motion/react'
import { CAR_SHAPES, CAR_VIEWBOX, GROUND_Y, spokePath, wellPath } from './carShapes.js'

const INK = '#11131a'

function Wheel({ cx, cy, r, rimId, rotate, spinClass }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill={INK} />
      <circle r={r - 3} fill="none" stroke="#2c303a" strokeWidth="2" />
      <motion.g style={{ rotate }} className={spinClass}>
        <circle r={r * 0.64} fill="#c9cdd3" />
        <circle r={r * 0.64} fill={`url(#${rimId})`} />
        <path d={spokePath(r)} fill="#7d838d" />
        <circle r={r * 0.17} fill="#5c616b" />
      </motion.g>
    </g>
  )
}

/**
 * Side-profile car drawing.
 * - `wheelRotate`: a MotionValue (degrees) to roll the wheels from code.
 * - `spinClass`: CSS class applied to the rims (e.g. spin on parent hover).
 * - `headlight`: draws a soft beam in front of the car.
 */
export default function CarIllustration({
  shape = 'suv',
  color = '#4A505A',
  wheelRotate,
  spinClass,
  headlight = false,
  title,
  className = '',
}) {
  const s = CAR_SHAPES[shape] ?? CAR_SHAPES.suv
  const uid = `car${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const id = (name) => `${uid}-${name}`

  return (
    <svg
      viewBox={headlight ? '0 0 680 200' : CAR_VIEWBOX}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      overflow="visible"
    >
      <defs>
        <linearGradient id={id('shade')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" />
          <stop offset=".38" stopColor="#fff" stopOpacity="0" />
          <stop offset=".7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('rim')}>
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".5" />
        </radialGradient>
        <radialGradient id={id('shadow')}>
          <stop offset="0" stopColor="#000" stopOpacity=".35" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('beam')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe7b0" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffe7b0" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id('gclip')}>
          <path d={s.glass} />
        </clipPath>
      </defs>

      {headlight && <path d="M440 116 L680 76 L680 176 Z" fill={`url(#${id('beam')})`} />}
      <ellipse cx="246" cy={GROUND_Y} rx="220" ry="12" fill={`url(#${id('shadow')})`} />

      {s.spare && (
        <>
          <circle cx={s.spare.cx} cy={s.spare.cy} r={s.spare.r} fill={INK} />
          <circle cx={s.spare.cx} cy={s.spare.cy} r={s.spare.r * 0.55} fill="#3a3f49" />
        </>
      )}

      <path d={s.body} fill={color} />
      <path d={s.body} fill={`url(#${id('shade')})`} stroke={INK} strokeOpacity=".35" strokeWidth="1.5" />
      <path d={s.glass} fill="#1c2232" />
      <path d={s.glass} fill={`url(#${id('glass')})`} />
      <g clipPath={`url(#${id('gclip')})`}>
        {s.pillars.map((x) => (
          <rect key={x} x={x - 4} y="40" width="8" height="70" fill={color} />
        ))}
      </g>
      {s.cladding && <path d={s.cladding} fill="none" stroke={INK} strokeWidth="8" opacity=".9" />}
      <path d={s.lines} fill="none" stroke={INK} strokeOpacity=".28" strokeWidth="1.5" />
      {s.handles.map(([x, y]) => (
        <rect key={x} x={x} y={y} width="14" height="4" rx="2" fill={INK} opacity=".45" />
      ))}
      {s.extra && <path d={s.extra} fill={INK} stroke={INK} strokeWidth="3" opacity=".8" />}
      {s.rails && <path d={s.rails} fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />}
      <path d={s.mirror} fill={INK} />
      <path d={s.head} fill="#fff4d6" />
      <path d={s.tail} fill="#9b2b16" />

      {s.wheels.map((w) => (
        <path key={`well-${w.cx}`} d={wellPath(s.arch, w.cx)} fill="#15171d" />
      ))}
      {s.wheels.map((w) => (
        <Wheel key={w.cx} {...w} rimId={id('rim')} rotate={wheelRotate} spinClass={spinClass} />
      ))}
    </svg>
  )
}
