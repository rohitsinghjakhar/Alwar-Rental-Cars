// String version of <CarIllustration> for build-time images (no React needed).
import { CAR_SHAPES, GROUND_Y, spokePath, wellPath } from '../src/components/ui/carShapes.js'

const INK = '#11131a'

export function carSvgGroup(shapeName, color, id = 'c') {
  const s = CAR_SHAPES[shapeName]
  const wheel = ({ cx, cy, r }) => `
    <g transform="translate(${cx} ${cy})">
      <circle r="${r}" fill="${INK}"/>
      <circle r="${r - 3}" fill="none" stroke="#2c303a" stroke-width="2"/>
      <circle r="${r * 0.64}" fill="#c9cdd3"/>
      <circle r="${r * 0.64}" fill="url(#${id}-rim)"/>
      <path d="${spokePath(r)}" fill="#7d838d"/>
      <circle r="${r * 0.17}" fill="#5c616b"/>
    </g>`

  return `
  <defs>
    <linearGradient id="${id}-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".38"/>
      <stop offset=".38" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".7" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".28"/>
    </linearGradient>
    <linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".28"/>
      <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="${id}-rim">
      <stop offset=".55" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#fff" stop-opacity=".5"/>
    </radialGradient>
    <clipPath id="${id}-gclip"><path d="${s.glass}"/></clipPath>
    <radialGradient id="${id}-shadow">
      <stop offset="0" stop-color="#000" stop-opacity=".35"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="246" cy="${GROUND_Y}" rx="220" ry="12" fill="url(#${id}-shadow)"/>
  ${s.spare ? `<circle cx="${s.spare.cx}" cy="${s.spare.cy}" r="${s.spare.r}" fill="${INK}"/><circle cx="${s.spare.cx}" cy="${s.spare.cy}" r="${s.spare.r * 0.55}" fill="#3a3f49"/>` : ''}
  <path d="${s.body}" fill="${color}"/>
  <path d="${s.body}" fill="url(#${id}-shade)" stroke="${INK}" stroke-opacity=".35" stroke-width="1.5"/>
  <path d="${s.glass}" fill="#1c2232"/>
  <path d="${s.glass}" fill="url(#${id}-glass)"/>
  <g clip-path="url(#${id}-gclip)">${s.pillars.map((x) => `<rect x="${x - 4}" y="40" width="8" height="70" fill="${color}"/>`).join('')}</g>
  ${s.cladding ? `<path d="${s.cladding}" fill="none" stroke="${INK}" stroke-width="8" opacity=".9"/>` : ''}
  <path d="${s.lines}" fill="none" stroke="${INK}" stroke-opacity=".28" stroke-width="1.5"/>
  ${s.handles.map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="4" rx="2" fill="${INK}" opacity=".45"/>`).join('')}
  <path d="${s.extra}" fill="${INK}" stroke="${INK}" stroke-width="3" opacity=".8"/>
  <path d="${s.mirror}" fill="${INK}"/>
  <path d="${s.head}" fill="#fff4d6"/>
  <path d="${s.tail}" fill="#9b2b16"/>
  ${s.rails ? `<path d="${s.rails}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` : ''}
  ${s.wheels.map((w) => `<path d="${wellPath(s.arch, w.cx)}" fill="#15171d"/>`).join('')}
  ${s.wheels.map(wheel).join('')}`
}
