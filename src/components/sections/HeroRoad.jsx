import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { ChevronsDown } from 'lucide-react'
import CarIllustration from '../ui/CarIllustration.jsx'
import { useI18n } from '../../i18n/index.jsx'

const CAR_VIEW_W = 680 // viewBox width of the car incl. headlight beam
const CAR_BODY_W = 480 // the car itself, without the beam
const WHEEL_R = 29 // SUV wheel radius in viewBox units

// Bala Quila crowning the Aravalli ridge, as a silhouette.
function fortPath() {
  let d = 'M968 64 L968 46'
  for (let x = 968; x < 1168; x += 9) d += ` L${x} 40 L${x + 4.5} 40 L${x + 4.5} 46 L${x + 9} 46`
  d += ' L1168 64 Z'
  const towers = [972, 1040, 1104, 1162]
    .map((x) => `M${x - 9} 64 L${x - 9} 30 L${x - 6} 30 L${x - 6} 26 L${x - 2} 26 L${x - 2} 30 L${x + 2} 30 L${x + 2} 26 L${x + 6} 26 L${x + 6} 30 L${x + 9} 30 L${x + 9} 64 Z`)
    .join(' ')
  const chhatri = 'M1062 40 L1062 28 Q1072 12 1082 28 L1082 40 Z M1071 14 L1073 14 L1073 8 L1071 8 Z'
  return `${d} ${towers} ${chhatri}`
}
const FORT = fortPath()

/**
 * The hero road. The car drives in on load, then travels left → right across the whole
 * width as the visitor scrolls. Wheels roll exactly as far as the car moves; the body
 * leans and speed lines appear with scroll speed.
 */
export default function HeroRoad({ progress }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const roadRef = useRef(null)
  const carRef = useRef(null)
  const dims = useRef({ road: 1280, car: 600 })

  const intro = useMotionValue(0) // 0 → 1: from off-screen left to the starting spot
  const opacity = useMotionValue(0)
  // Scroll-linked, so it moves only when the visitor scrolls — kept even with reduced motion.
  const travel = useTransform(progress, [0, 0.85], [0, 1], { clamp: true })

  const x = useTransform(() => {
    const { road, car } = dims.current
    const start = Math.max(16, road * 0.04)
    const offLeft = -car * 0.75
    const end = road + 24
    return offLeft + (start - offLeft) * intro.get() + (end - start) * travel.get()
  })
  const wheelRotate = useTransform(x, (v) => {
    const pxPerUnit = dims.current.car / CAR_VIEW_W
    return (v / (WHEEL_R * pxPerUnit)) * (180 / Math.PI)
  })

  const { scrollY } = useScroll()
  const speed = useSpring(useVelocity(scrollY), { stiffness: 220, damping: 40 })
  const lean = useTransform(speed, [-2500, 0, 2500], [1.4, 0, -1.4])
  const speedLines = useTransform(speed, (v) => Math.min(1, Math.abs(v) / 1400))
  const hint = useTransform(travel, [0, 0.06], [1, 0])

  const hillsX = useTransform(progress, [0, 1], [0, reduce ? 0 : -80])
  const farHillsX = useTransform(progress, [0, 1], [0, reduce ? 0 : -30])

  useEffect(() => {
    const measure = () => {
      dims.current = {
        road: roadRef.current?.getBoundingClientRect().width ?? 1280,
        car: carRef.current?.getBoundingClientRect().width ?? 600,
      }
    }
    measure()
    window.addEventListener('resize', measure)
    opacity.set(1)
    let drive
    if (reduce) intro.set(1)
    else drive = animate(intro, 1, { duration: 2.2, ease: [0.25, 1, 0.4, 1], delay: 0.45 })
    return () => {
      drive?.stop()
      window.removeEventListener('resize', measure)
    }
  }, [reduce, intro, opacity])

  return (
    <div ref={roadRef} aria-hidden="true" className="relative mt-4 h-[190px] sm:mt-0 sm:h-[230px] lg:h-[232px]">
      <motion.svg
        style={{ x: farHillsX }}
        className="absolute inset-x-0 bottom-[64px] h-[120px] w-[110%] sm:bottom-[78px] sm:h-[150px]"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150 L0 96 C90 70 160 40 260 58 S420 92 520 60 S700 8 820 36 S1000 86 1120 52 S1320 20 1440 58 L1440 150 Z"
          className="fill-night-3/50"
        />
      </motion.svg>
      <motion.svg
        style={{ x: hillsX }}
        className="absolute bottom-[64px] left-0 h-[90px] w-[120%] sm:bottom-[78px] sm:h-[110px]"
        viewBox="0 0 1440 110"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          d="M0 110 L0 84 C80 70 150 52 240 66 S400 96 520 80 S700 48 800 70 S900 72 960 64 L1168 64 C1220 70 1300 84 1440 74 L1440 110 Z"
          className="fill-night-2"
        />
        <path d={FORT} className="fill-night-2" />
      </motion.svg>

      {/* Road */}
      <div className="absolute inset-x-0 bottom-0 h-[64px] bg-[#0c111e] sm:h-[78px]">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-paper/10" />
        <div className="road-dashes absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 opacity-70" />
        <div className="absolute inset-x-0 bottom-2 h-px bg-paper/10" />
      </div>

      {/* Scroll hint */}
      <motion.p
        style={{ opacity: hint }}
        className="absolute right-4 bottom-[88px] hidden items-center gap-2 text-[12.5px] font-medium tracking-wide text-paper/55 sm:right-8 sm:bottom-[104px] md:flex"
      >
        {t.hero.scrollHint}
        <ChevronsDown className="size-4 animate-bounce" />
      </motion.p>

      {/* Car */}
      <motion.div
        ref={carRef}
        style={{ x, opacity }}
        className="absolute bottom-[26px] left-0 w-[min(88vw,470px)] will-change-transform sm:bottom-[30px] sm:w-[560px] lg:w-[620px]"
      >
        {/* Speed lines trailing the car */}
        <motion.div style={{ opacity: speedLines }} className="absolute top-[38%] -left-[18%] flex w-[22%] flex-col items-end gap-[10px]">
          {[100, 70, 85].map((w, i) => (
            <span key={i} style={{ width: `${w}%` }} className="h-[2px] rounded-full bg-gradient-to-r from-transparent to-paper/50" />
          ))}
        </motion.div>
        <motion.div style={{ rotate: lean, transformOrigin: `${(CAR_BODY_W / CAR_VIEW_W) * 50}% 90%` }}>
          <CarIllustration shape="suv" color="#E9E3D8" wheelRotate={wheelRotate} headlight />
        </motion.div>
      </motion.div>
    </div>
  )
}
