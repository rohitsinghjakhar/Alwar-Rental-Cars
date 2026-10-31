/**
 * Side-profile car illustrations (facing right), drawn on a 480 × 200 canvas.
 * Shared by <CarIllustration> and scripts/generate-assets.mjs (social image).
 */

export const CAR_VIEWBOX = '0 0 480 200'
export const GROUND_Y = 178

export const CAR_SHAPES = {
  hatchback: {
    body: 'M48 154 L44 132 Q42 116 52 106 L82 72 Q92 62 110 61 L236 57 Q252 57 264 66 L318 101 L412 110 Q440 114 446 130 L448 146 Q448 154 440 154 L393 154 A33 33 0 0 0 327 154 L161 154 A33 33 0 0 0 95 154 Z',
    glass: 'M88 102 L108 74 Q114 68 124 67 L232 64 Q244 64 254 72 L294 102 Z',
    pillars: [184],
    lines: 'M186 106 L186 150 M298 106 Q300 128 296 150 M88 106 Q84 128 92 146',
    handles: [[200, 114], [310, 112]],
    head: 'M418 115 Q438 117 445 129 L425 128 Z',
    tail: 'M45 112 L60 108 L58 126 L45 128 Z',
    mirror: 'M298 96 L314 91 L320 100 L304 103 Z',
    extra: 'M430 141 L448 141',
    arch: { r: 33, y: 154 },
    wheels: [
      { cx: 128, cy: 152, r: 26 },
      { cx: 360, cy: 152, r: 26 },
    ],
  },
  sedan: {
    body: 'M44 154 L40 130 Q40 114 54 110 L112 104 Q124 102 134 92 L156 70 Q164 62 178 62 L250 60 Q264 60 276 68 L326 102 L416 110 Q442 114 448 130 L450 146 Q450 154 442 154 L397 154 A33 33 0 0 0 331 154 L165 154 A33 33 0 0 0 99 154 Z',
    glass: 'M140 100 L162 76 Q168 70 178 70 L248 68 Q260 68 270 75 L304 101 Z',
    pillars: [212],
    lines: 'M214 106 L214 150 M308 106 Q310 128 306 150 M140 106 Q136 126 142 140 M62 112 L112 106',
    handles: [[228, 114], [318, 112]],
    head: 'M422 115 Q440 117 447 129 L428 128 Z',
    tail: 'M42 116 L62 112 L62 122 L42 127 Z',
    mirror: 'M306 97 L322 92 L328 101 L312 104 Z',
    extra: 'M432 141 L450 141',
    arch: { r: 33, y: 154 },
    wheels: [
      { cx: 132, cy: 152, r: 26 },
      { cx: 364, cy: 152, r: 26 },
    ],
  },
  suv: {
    body: 'M42 150 L38 114 Q38 100 48 94 L62 64 Q68 52 84 51 L252 47 Q268 47 280 57 L326 94 L420 102 Q446 106 452 122 L454 142 Q454 150 446 150 L399 150 A37 37 0 0 0 325 150 L169 150 A37 37 0 0 0 95 150 Z',
    glass: 'M66 92 L78 66 Q82 59 92 59 L248 55 Q260 55 270 63 L302 92 Z',
    pillars: [150, 228],
    lines: 'M230 96 L230 146 M318 96 Q322 122 318 146 M152 96 Q148 120 154 140',
    handles: [[244, 106], [328, 104]],
    head: 'M418 107 L449 113 L447 120 L420 115 Z',
    tail: 'M40 104 L57 100 L57 116 L40 118 Z',
    mirror: 'M306 88 L322 83 L328 93 L312 96 Z',
    extra: '',
    rails: 'M102 49 L107 44 L236 41 L241 46',
    arch: { r: 37, y: 150 },
    cladding: 'M95 150 A37 37 0 0 1 169 150 M325 150 A37 37 0 0 1 399 150 M169 147 L325 147',
    wheels: [
      { cx: 132, cy: 148, r: 29 },
      { cx: 362, cy: 148, r: 29 },
    ],
  },
  offroad: {
    body: 'M46 150 L44 102 L54 98 L58 54 Q59 46 67 46 L226 46 Q234 46 237 52 L262 98 L432 102 Q444 103 444 114 L446 144 Q446 150 440 150 L399 150 A39 39 0 0 0 321 150 L173 150 A39 39 0 0 0 95 150 Z',
    glass: 'M72 92 L74 56 L222 56 L246 92 Z',
    pillars: [160],
    lines: 'M252 100 L252 146 M162 100 L162 146',
    handles: [[176, 108], [266, 108]],
    head: 'M425 114 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 Z',
    tail: 'M44 106 L54 106 L54 120 L44 120 Z',
    mirror: 'M248 90 L262 84 L266 94 L254 97 Z',
    extra: 'M38 134 L54 134 L54 148 L38 148 Z M432 134 L452 134 L452 148 L432 148 Z',
    cladding: 'M95 150 A39 39 0 0 1 173 150 M321 150 A39 39 0 0 1 399 150',
    spare: { cx: 36, cy: 108, r: 24 },
    arch: { r: 39, y: 150 },
    wheels: [
      { cx: 134, cy: 146, r: 31 },
      { cx: 360, cy: 146, r: 31 },
    ],
  },
  muv: {
    body: 'M38 152 L34 114 Q34 100 42 94 L56 66 Q62 55 78 54 L268 50 Q284 50 296 60 L338 98 L422 106 Q446 110 452 126 L454 144 Q454 152 446 152 L401 152 A35 35 0 0 0 331 152 L163 152 A35 35 0 0 0 93 152 Z',
    glass: 'M60 94 L72 68 Q76 61 86 61 L264 58 Q276 58 286 66 L316 94 Z',
    pillars: [128, 226],
    lines: 'M228 98 L228 148 M326 98 Q330 124 326 148 M130 98 Q126 124 132 144',
    handles: [[242, 108], [336, 106]],
    head: 'M424 112 L450 118 L450 126 L428 122 Z',
    tail: 'M36 102 L52 98 L52 118 L36 120 Z',
    mirror: 'M318 92 L334 87 L340 97 L324 100 Z',
    extra: 'M436 143 L454 143',
    rails: 'M104 52 L109 47 L250 44 L255 49',
    arch: { r: 35, y: 152 },
    wheels: [
      { cx: 128, cy: 150, r: 27 },
      { cx: 366, cy: 150, r: 27 },
    ],
  },
}

/** Five-spoke alloy: returns the spoke path for a wheel centred at 0,0. */
export function spokePath(r) {
  const inner = r * 0.2
  const outer = r * 0.58
  const half = 0.16 // radians, spoke half-width at the rim
  let d = ''
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
    const p = (ang, rad) => `${(Math.cos(ang) * rad).toFixed(2)} ${(Math.sin(ang) * rad).toFixed(2)}`
    d += `M${p(a - 0.32, inner)} L${p(a - half, outer)} L${p(a + half, outer)} L${p(a + 0.32, inner)} Z `
  }
  return d.trim()
}

/** Dark wheel-well behind each wheel, matching the body's arch cut-out. */
export function wellPath(arch, cx) {
  return `M${cx - arch.r + 1} ${arch.y} A${arch.r - 1} ${arch.r - 1} 0 0 1 ${cx + arch.r - 1} ${arch.y} Z`
}
