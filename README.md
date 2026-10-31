# Alwar Rental Cars — website

Bilingual (English + हिंदी) website for **Alwar Rental Cars** (self drive car rental), Near PNB Bank, Diwakari, Alwar 301001 · +91 83060 35800.

React 19 + Vite, Tailwind CSS 4, Motion (Framer Motion). Every page is pre-rendered to static HTML at build time, so it loads fast and search engines / AI assistants read the full content.

## Quick start

```bash
npm install
npm run dev       # development at http://localhost:5173
npm run build     # production build → dist/  (50 pages + 404, sitemap, robots, llms.txt)
npm run preview   # serve the production build at http://localhost:4173
npm run lint
```

## Pages

Every page exists in English and Hindi (`/hi/…`); the EN / हिं switch in the header keeps you on the same page.

| Page | URL |
| --- | --- |
| Home (hero quick-booking card + full booking form) | `/` |
| Cars (filter + comparison table) | `/cars/` |
| One page per car (with a booking form for that car) | `/cars/maruti-suzuki-swift/` … |
| Services (tourists, local, business, government) | `/services/` |
| How it works | `/how-it-works/` |
| Documents (Aadhaar + DL specimens) | `/documents/` |
| Road trips + one guide per destination | `/road-trips/`, `/road-trips/sariska-tiger-reserve/` … |
| About, FAQ, Contact | `/about/`, `/faq/`, `/contact/` |
| Privacy policy, Terms, Photo credits | `/privacy-policy/`, `/terms/`, `/credits/` |

## Editing content

| What | Where |
| --- | --- |
| Business name, phone, email, address, hours, areas served, **profile links** | `src/content/site.js` |
| Cars | `src/content/fleet.js` |
| Road-trip guides | `src/content/destinations.js` |
| FAQ | `src/content/faqs.js` |
| All other text (both languages) | `src/i18n/en.js` and `src/i18n/hi.js` (same keys) |
| Photos + credits | `src/content/photos.js`, files in `public/images/` |

**Using your own car photos** (recommended): replace `public/images/cars/<id>-640|1024|1600.avif/.webp` with photos of your actual cars (3:2 ratio), or edit `src/content/photos.js` and run `npm run photos` to regenerate from new sources. Update `/credits/` if the photos are yours.

## How bookings reach you

Every booking form — the quick-booking card on the home page, the booking form on the home and contact pages, and the form on each car page — does two things when the customer presses the button:

1. **Email** — the request (name, mobile, car / car type, dates, message, which form and page) is sent to your inbox through [Web3Forms](https://web3forms.com).
2. **WhatsApp** — WhatsApp opens on the customer's device with the same details typed out, ready to send to +91 83060 35800.

The Web3Forms access key is in `.env` (`VITE_WEB3FORMS_KEY`). Emails go to the address the key was created with; to receive them somewhere else, create a new key for that address at web3forms.com, paste it into `.env` and rebuild. If the key is removed, the forms fall back to WhatsApp only.

## Before going live

1. **Domain** — set `VITE_SITE_URL` in `.env` to the real domain (canonical URLs, sitemap, hreflang, structured data).
2. **Fleet** — replace the sample cars in `src/content/fleet.js` with the cars you actually rent.
3. **Opening days** — the site says open every day 8 AM–8 PM. If you close on any day, update `SITE.hours.days` in `src/content/site.js` and the "Open every day" wording in `src/i18n/*.js`.
4. **Email inbox** — send one test booking from the live site and check it arrives (see *How bookings reach you*). If the Web3Forms key is restricted to certain domains, add the live domain in the Web3Forms dashboard.

## After going live — the SEO steps that matter most

The code covers on-page SEO, structured data and AI-readiness. These off-site steps decide most of the local ranking and whether AI assistants recommend you:

1. **Google Business Profile** — create / verify the listing (category: *Car rental agency*), same name, address and phone as the website, hours, photos of your real cars, and the website link. Then add the profile URL to `SITE.profiles` in `src/content/site.js` and rebuild.
2. **Reviews** — ask happy customers to review you on Google. Reviews are the strongest local ranking signal and what AI assistants quote when recommending a rental.
3. **Google Search Console** — verify the domain and submit `https://your-domain/sitemap.xml`.
4. **Bing Webmaster Tools** — verify and submit the sitemap too. ChatGPT search and Copilot rely heavily on Bing's index.
5. **Listings** — the same name / address / phone on JustDial, Sulekha, IndiaMART, Facebook and Instagram; add each URL to `SITE.profiles`.

What's already built in: unique title / description / canonical per page; English–Hindi `hreflang`; Open Graph images per car and destination; schema.org JSON-LD (AutoRental / LocalBusiness, Car, TouristAttraction, TouristTrip, FAQPage, HowTo, BreadcrumbList, Service); a sitemap with language alternates; `robots.txt` that welcomes Google, Bing and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot…); `/llms.txt` with a plain-language fact sheet for AI assistants; question-and-answer content on every page; fast static pages with self-hosted fonts and AVIF/WebP images.

## Deploying

`npm run build` produces a static `dist/` folder:

- **Netlify / Cloudflare Pages** — build command `npm run build`, publish directory `dist`. Headers come from `dist/_headers`; `404.html` is served automatically.
- **Vercel** — import the repo; `vercel.json` sets the build, trailing slashes and security headers.
- **Hostinger / cPanel (Apache)** — upload the *contents* of `dist/` to `public_html`. `dist/.htaccess` forces HTTPS, sets security headers and the 404 page.

## Security

- Strict Content-Security-Policy (meta tag + HTTP headers), HSTS, `X-Frame-Options: DENY`, `nosniff`, restrictive `Permissions-Policy` — defined once in `security.config.js`.
- No third-party scripts, trackers or fonts. Google Maps loads only after the visitor clicks "Show interactive map".
- Form input is validated and sanitised (`src/lib/validation.js`): Indian mobile format, date checks, length limits, control / bidi characters and markup brackets stripped, honeypot field and a resubmit cooldown.
- The Aadhaar / licence images are clearly marked specimens with no government emblems or real data.

## Photos

Car and destination photos are from Wikimedia Commons under CC BY / CC BY-SA / public-domain licences, credited on `/credits/`. Car illustrations, icons and the route map are original artwork.

## Project structure

```
src/
  content/        business facts, fleet, destinations, FAQ, photos (bilingual data)
  i18n/           en.js / hi.js dictionaries + provider
  router/         route table (both languages) + tiny client router
  seo/            per-page <head>, JSON-LD builders, llms.txt
  pages/          one component per page type
  components/     sections (Hero, Fleet, RoadTrips…), layout, UI
scripts/
  prerender.mjs   static HTML for every route + sitemap / robots / llms.txt / headers
  fetch-photos.mjs  downloads + optimises photos (npm run photos)
  generate-assets.mjs  favicons + default social image (npm run assets)
security.config.js  CSP and security headers
```
