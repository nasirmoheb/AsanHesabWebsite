# Product

## Register

brand

## Platform

web

## Users

Primary audience is small retail shopkeepers in Afghanistan — store owners who need simple, reliable accounting without prior software experience. Secondary audience is wholesalers and distributors with larger inventory and more complex workflows. Visitors arrive skeptical of foreign software, wary of subscription traps, and often on metered or unreliable connections. The landing page speaks to the shop owner deciding whether to trust and download; the desktop app serves both audiences once installed.

## Product Purpose

AsanHesab is an offline accounting and POS system built specifically for Afghan merchants. This website exists to establish trust, explain value in the visitor's language (Dari, Pashto, English), and drive downloads of the free Windows desktop app. Success means a visitor downloads the .exe with confidence; WhatsApp support catches those who need reassurance before committing. The product must feel local, practical, and safe — not like imported Western SaaS.

## Positioning

Accounting made simple for Afghan shopkeepers — easy enough for first-timers, powerful enough for wholesalers.

## Conversion & proof

- **Primary CTA:** Download the free Windows app (.exe)
- **Secondary CTA:** WhatsApp support for questions before download
- **The line a visitor remembers after 10 seconds:** "The trusted accounting system Afghan shopkeepers actually use"
- **Belief ladder:**
  1. This is built for Afghan shops — Dari, Pashto, Solar Hijri, offline-first
  2. Other shopkeepers already trust it — social proof (reviews, testimonials, user counts)
  3. It's simple enough for me — not intimidating, no accounting degree required
  4. It works without internet — practical for Afghanistan's connectivity reality
  5. Download is free and safe — no subscription trap, clear file size and OS requirements
- **Proof on hand:** Testimonials and stats embedded in the site (800+ reviews, 4.9-star rating, user quotes in `src/components/asanhesab/i18n/dictionary.ts` and testimonial components)

## Brand Personality

Local · Trustworthy · Practical

The voice is warm but direct — a knowledgeable neighbor who runs a shop, not a corporate bank or a Silicon Valley startup. Copy should feel grounded in Afghan commerce: real problems (debt tracking, inventory, daily sales), real language, real constraints (offline, metered data). Trust is the dominant emotional register; every section should earn credibility before asking for action.

## Anti-references

- Generic Western SaaS landing pages (Stripe/Linear clones, cream/sand backgrounds, hero metric grids, identical card sections)
- Cheap template sites (stock photos, fake urgency timers, cluttered layouts, gradient text)
- Corporate bank websites (cold, bureaucratic, intimidating forms and jargon)
- AI-generated landing page scaffolds (tiny uppercase eyebrows on every section, numbered 01/02/03 markers, decorative glass cards with no purpose)

## Design Principles

1. **Earn trust before asking** — Show local proof, explain offline value, and address download anxiety (file size, OS compatibility) before the primary CTA.
2. **Speak like a shopkeeper, not a vendor** — Copy in native script, Afghan currency and calendar, concrete workflows (sales, debt, inventory) over abstract feature lists.
3. **Practice what you preach** — The site itself should feel as reliable and straightforward as the product it sells; no dark patterns, no hidden costs.
4. **Respect the connection** — Assume metered or slow connections; avoid heavy assets without purpose, surface download size upfront, keep animations purposeful and reduced-motion safe.
5. **Local first, globally polished** — RTL-native layout, bilingual switching, and Afghan context are non-negotiable; polish serves clarity, not decoration.

## Accessibility & Inclusion

WCAG 2.1 AA compliance with RTL and bilingual accessibility as first-class requirements. Support Dari (RTL), Pashto (RTL), and English (LTR) with proper `dir` switching. Respect `prefers-reduced-motion`. Ensure contrast meets AA on both light and dark themes. Keyboard navigation and screen reader labels on all interactive elements (nav, CTAs, theme/language toggles).
