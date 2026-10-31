/**
 * Downloads the photos listed in src/content/photos.js from Wikimedia Commons and writes
 * responsive AVIF/WebP versions plus a 1200×630 social image for each.
 * Run once (needs internet): npm run photos
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { PHOTOS, PHOTO_WIDTHS, PHOTO_RATIO } from '../src/content/photos.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'public', 'images')
const UA = 'AlwarRentalCars-website/1.0 (alwarselfdrivecar@gmail.com)'

async function download(file) {
  const url = `https://commons.wikimedia.org/w/index.php?title=Special:FilePath/${encodeURIComponent(file.replace(/^File:/, ''))}&width=2000`
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.ok) return Buffer.from(await res.arrayBuffer())
    await new Promise((r) => setTimeout(r, 1500 * attempt))
  }
  throw new Error(`Failed to download ${file}`)
}

await fs.mkdir(path.join(out, 'og'), { recursive: true })

for (const photo of Object.values(PHOTOS)) {
  const dir = path.join(out, photo.folder)
  await fs.mkdir(dir, { recursive: true })
  const source = await download(photo.file)
  const position = photo.focus === 'attention' ? sharp.strategy.attention : 'centre'
  const base = sharp(source).rotate()

  for (const width of PHOTO_WIDTHS) {
    const height = Math.round(width / PHOTO_RATIO)
    const resized = base.clone().resize(width, height, { fit: 'cover', position })
    await resized.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(dir, `${photo.id}-${width}.avif`))
    await resized.clone().webp({ quality: 76 }).toFile(path.join(dir, `${photo.id}-${width}.webp`))
  }
  await base
    .clone()
    .resize(1200, 630, { fit: 'cover', position })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(out, 'og', `${photo.id}.jpg`))
  console.log(`✓ ${photo.id}`)
}
