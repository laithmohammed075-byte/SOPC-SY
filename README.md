# SOPC — Corporate Website

Bilingual (English / Arabic) corporate landing page for **SOPC — Syrian Oil & Petrochemical Company**
(الشركة السورية للخدمات النفطية والكيميائية).

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run locally

Requires Node.js 18.18+ (tested on Node 22).

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Standalone single-file version (`static-site/index.html`):

```bash
npm run build:static
```

This writes **one self-contained file**, `static-site/index.html` (about 4 MB). All CSS, fonts,
JavaScript and images are embedded, so it needs no other files and no internet connection. Open it
directly in a browser, send it by email, or upload it to any static host. Images in this file are
slightly downsized copies; the originals in `public/images` are unchanged. In this version the contact
form always reports that online submission is not configured, because there is no server.

### Publishing with GitHub Pages

`npm run build:static` also copies the file to `docs/index.html`. To publish it:
GitHub repository → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main**, folder: **/docs** → **Save**.
The site appears at `https://<account>.github.io/<repo>/` after a minute or two.

Quality checks:

```bash
npm run lint
npx tsc --noEmit
```

Open `/?lang=ar` to load the Arabic (RTL) version directly. The visitor's language choice is remembered in the browser.

## Project structure

```
src/
  app/
    layout.tsx              fonts (Manrope, Playfair Display, Cairo), SEO + Open Graph metadata
    page.tsx                renders SiteShell
    globals.css             brand tokens (colors, fonts, shadows), RTL helpers, reduced-motion rules
    api/contact/route.ts    contact form endpoint (integration point, see below)
  components/
    SiteShell.tsx           page composition, language + motion providers
    Header.tsx              sticky translucent navbar, dropdowns, mobile menu
    LanguageSwitcher.tsx    EN / AR toggle
    HeroSlider.tsx          full-width image slider (autoplay, pause, arrows, dots, keyboard)
    WaveDivider.tsx         SVG wave with emerald + gold crest lines
    AboutSection.tsx        intro with the official logo
    ServicesSection.tsx     five circular services, each linking to its own page
    ServicePage.tsx         service detail page, shown at #/services/<id>
    QHSESection.tsx         QHSE with overlapping circular badge
    WhyChooseUs.tsx         four advantages
    ContactSection.tsx      validated contact form + contact info placeholders
    Footer.tsx              light footer with gold divider
    FloatingContactButton.tsx
    ui.tsx                  Reveal, SectionHeading, Logo helpers
  lib/route.ts              small hash router (#/services/<id>) that works in the single-file build
  content/site.ts           ALL editable copy (EN + AR), company details, image manifest
  lib/i18n.tsx              language context (sets <html lang/dir>)
  lib/contact.ts            form validation + submit helper
public/images/              logo and optimized WebP photography
```

## Editing content

Everything visible on the page is in **`src/content/site.ts`**:

- `company.contact` — email, phone, address, working hours. They are `null` now and show
  "To be confirmed". Fill them in once official details are available.
- `company.social` — add official profile URLs. The footer shows nothing while this list is empty.
- `company.siteUrl` — set the production domain (used for canonical and Open Graph URLs).
- `en` / `ar` dictionaries — every heading, paragraph and button label in both languages.
- Service pages: each service's text is in `services.items` (`title`, `short`, `body`) in both
  dictionaries. Page links: `#/services/oil-gas`, `#/services/petrochemical`, `#/services/engineering`,
  `#/services/fabrication`, `#/services/technical-commercial`.
  The **About, Services and QHSE copy is draft text.** Service descriptions are labelled as
  placeholders until SOPC provides official content.

## Contact form integration

The form validates in the browser and POSTs to `/api/contact`. That endpoint validates again and
returns **501 Not Implemented** until a delivery method is configured. Visitors then see a clear
message that their message was **not** sent. The form never pretends a message was delivered.

To go live:

1. Implement `deliver()` in `src/app/api/contact/route.ts` with your provider (SMTP, Resend, SendGrid, CRM webhook…).
   Keep credentials in server-side environment variables.
2. Set `CONTACT_DELIVERY_ENABLED=true` in the deployment environment.

## Images and licensing

All photographs are stored locally in `public/images` (no external image hosting) and come from
[Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license): free for
commercial use, no attribution required. Source photo IDs are listed in `images` in `src/content/site.ts`.
The refinery images were slightly brightened to match the site's light visual direction.

| File | Unsplash ID | Used in |
| --- | --- | --- |
| hero-petrochemical-pipework.webp | photo-1513828583688-c52646db42da | Hero slide 1 |
| hero-technicians-site.webp | supplied by SOPC | Hero slide 2 |
| hero-engineering-facility.webp | photo-1610891015188-5369212db097 | Hero slide 3 |
| hero-refinery-daylight.webp | photo-1516937941344-00b4e0337589 | Hero slide 4 |
| services-refinery-piping.webp | photo-1513828742140-ccaa28f3eda0 | Services background |
| qhse-workers-ppe.webp | supplied by SOPC | QHSE |

**Oil pumpjack image:** there is no pumpjack photo yet. Unsplash's search could not be used from the
build environment. To add one, download a bright daytime pumpjack photo from Unsplash, save it as
`public/images/hero-oil-pumpjack.webp`, add it as the first entry of `images.hero` in
`src/content/site.ts`, and add matching alt text as the first entry of `hero.slides` in both languages.

`sopc-logo.webp` is the official SOPC logo, used unmodified. It is only ever placed on white or light backgrounds.

## Accessibility and performance

- Semantic landmarks, one `h1`, ordered headings, skip link, visible gold focus rings
- Keyboard-operable slider (arrow keys, mirrored in RTL), pause/play control, ARIA carousel roles
- Autoplay and motion are disabled when the visitor prefers reduced motion
- Accessible dropdowns, mobile menu, dialog (Escape to close, focus restored) and form errors
- `next/image` with responsive `sizes`, lazy loading below the fold, WebP sources and graceful fallbacks
