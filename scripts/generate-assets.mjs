/**
 * Generates favicons, app icons and the social-share image into /public.
 * Run once (or after a brand change): npm run assets
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { carSvgGroup } from './car-svg.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(root, 'public')

const C = { ink: '#11131a', night: '#141b2d', night2: '#1b2440', paper: '#f6f1e7', saffron: '#f2a33a' }

// Same mark as <LogoMark>: a road vanishing to the horizon / an "A".
const markGroup = (rx = 11) => `
  <rect width="40" height="40" rx="${rx}" fill="${C.saffron}"/>
  <path d="M8.5 33 L17.6 7.5 h4.8 L31.5 33 Z" fill="${C.ink}"/>
  <path d="M13.2 24.5 h13.6" stroke="${C.saffron}" stroke-width="1.6"/>
  <g fill="${C.saffron}">
    <rect x="19.1" y="27.5" width="1.8" height="4" rx=".4"/>
    <rect x="19.3" y="19.5" width="1.4" height="2.8" rx=".4"/>
    <rect x="19.45" y="13.5" width="1.1" height="2" rx=".3"/>
    <rect x="19.6" y="9.4" width=".8" height="1.3" rx=".2"/>
  </g>`

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${markGroup()}</svg>`

// Maskable icon: full-bleed background with the mark inside the safe zone.
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" fill="${C.saffron}"/>
  <g transform="translate(8 8) scale(.6)">${markGroup(0)}</g>
</svg>`

// Wraps a PNG in a single-image .ico container (supported by all modern browsers).
function pngToIco(png, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  const entry = Buffer.alloc(16)
  entry.writeUInt8(size >= 256 ? 0 : size, 0)
  entry.writeUInt8(size >= 256 ? 0 : size, 1)
  entry.writeUInt8(0, 2)
  entry.writeUInt8(0, 3)
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(22, 12)
  return Buffer.concat([header, entry, png])
}

function contour(cx, cy, r, seed) {
  const pts = []
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const rr = r * (1 + 0.09 * Math.sin(3 * a + seed) + 0.05 * Math.sin(5 * a + seed * 1.7))
    pts.push(`${(cx + Math.cos(a) * rr * 1.35).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`)
  }
  return `M${pts.join(' L')}Z`
}

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.night}"/>
  <g fill="none" stroke="${C.paper}" stroke-opacity=".07">
    ${Array.from({ length: 9 }, (_, i) => `<path d="${contour(1000, 120, 40 + i * 34, 1.2)}"/>`).join('')}
  </g>
  <defs><radialGradient id="glow"><stop offset="0" stop-color="${C.saffron}" stop-opacity=".16"/><stop offset="1" stop-color="${C.saffron}" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="420" cy="20" rx="560" ry="300" fill="url(#glow)"/>

  <g transform="translate(72 64) scale(1.4)">${markGroup()}</g>
  <text x="140" y="96" font-family="${FONT}" font-size="30" font-weight="800" fill="${C.paper}">Alwar</text>
  <text x="140" y="120" font-family="${FONT}" font-size="14" font-weight="600" letter-spacing="4" fill="${C.paper}" fill-opacity=".65">RENTAL CARS</text>

  <text x="72" y="222" font-family="${FONT}" font-size="22" font-weight="700" letter-spacing="4" fill="${C.saffron}">SELF DRIVE CAR RENTAL IN ALWAR</text>
  <text x="70" y="300" font-family="${FONT}" font-size="76" font-weight="900" letter-spacing="-2" fill="${C.paper}">Drive Alwar</text>
  <text x="70" y="380" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="84" fill="${C.saffron}">your way.</text>

  <rect x="72" y="420" width="318" height="56" rx="28" fill="${C.saffron}"/>
  <text x="231" y="456" text-anchor="middle" font-family="${FONT}" font-size="25" font-weight="800" fill="${C.ink}">+91 83060 35800</text>
  <text x="72" y="522" font-family="${FONT}" font-size="21" fill="${C.paper}" fill-opacity=".72">Near PNB Bank, Diwakari · 8 AM – 8 PM</text>

  <path d="M0 560 L1200 560 L1200 630 L0 630 Z" fill="#0c111e"/>
  <path d="M0 560 L1200 560" stroke="${C.paper}" stroke-opacity=".12" stroke-width="3"/>
  ${Array.from({ length: 14 }, (_, i) => `<rect x="${i * 96}" y="594" width="48" height="3" fill="#f7bd62" opacity=".7"/>`).join('')}
  <g transform="translate(660 408) scale(1.1)">${carSvgGroup('suv', '#E9E3D8', 'og')}</g>
</svg>`

await fs.mkdir(pub, { recursive: true })
await fs.writeFile(path.join(pub, 'favicon.svg'), faviconSvg)

const icon = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer()

await fs.writeFile(path.join(pub, 'favicon.ico'), pngToIco(await icon(faviconSvg, 48), 48))
await fs.writeFile(path.join(pub, 'apple-touch-icon.png'), await icon(maskableSvg, 180))
await fs.writeFile(path.join(pub, 'icon-192.png'), await icon(faviconSvg, 192))
await fs.writeFile(path.join(pub, 'icon-512.png'), await icon(faviconSvg, 512))
await fs.writeFile(path.join(pub, 'icon-maskable-512.png'), await icon(maskableSvg, 512))
await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(pub, 'og-image.jpg'))

console.log('✓ favicon.svg · favicon.ico · apple-touch-icon.png · icon-192/512 · icon-maskable-512 · og-image.jpg')
