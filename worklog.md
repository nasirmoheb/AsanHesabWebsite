# Work Log — AsanHesab Landing Page Improvements

## Date: 2025

## Summary
Made comprehensive improvements to the AsanHesab landing page at `/home/z/my-project/src/app/page.tsx`. All changes compiled successfully with `npx next build` and passed ESLint checks.

---

## Changes Made

### 1. Fixed Empty Space Between Hero and Next Section
- **Reduced hero section padding** from `pb-32 md:pb-36` to `pb-8 md:pb-10`
- **Reduced scroll indicator margin** from `mt-10 md:mt-14` to `mt-6 md:mt-8`
- The marquee trust bar now transitions smoothly from the hero section

### 2. Creative Typography & Marketing Line
- **Added `RotatingPhrase` component** that cycles through benefit phrases with smooth crossfade animation:
  - "به زبان دری" (In Dari)
  - "بدون اینترنت" (Without Internet)
  - "تقویم شمسی" (Solar Calendar)
  - "ساده و آسان" (Simple & Easy)
  - "کاملاً آفلاین" (Completely Offline)
- Phrases rotate every 2.8 seconds with blur+translate animation
- Uses gradient text (`text-gradient`) for the rotating phrases
- Added a secondary subtitle with delayed fade-in: "بدون نیاز به دانش حسابداری — همین امروز شروع کنید!"
- The overall marketing line reads: "نرم‌افزار حسابداری [rotating phrase] مخصوص کسب‌وکار شما"

### 3. Rewrote HeroTiltCard (Dashboard Mockup)
- **More compact** — reduced card width from `300-440px` to `280-420px` (~10%)
- **Glowing edge effect on hover** — dynamic boxShadow that transitions between default and hover states with blue glow
- **Frosted glass sidebar** — added a left sidebar with gradient background and blur effect, containing 6 navigation icons (Home, Dashboard, Receipt, Spreadsheet, Chart, Users) with active state styling
- **Proper traffic light dots** — macOS-style red/yellow/green dots with hover scale animation
- **KPI cards with gradient backgrounds** — subtle gradient fills instead of flat gray backgrounds
- **Animated number counters** (`KpiCounter` component) inside KPI values that count up when visible
- **Breathing/pulse animation** on the ambient glow behind the card (scale oscillation)
- **Floating notification badge** — red "۳" badge on the bell icon with pulsing animation
- **Realistic desktop app title bar** — with traffic light dots, separator, and window title
- **Subtle gradient overlay** at the bottom of the card for depth
- **Kept all existing features**: 3D tilt on mouse move, live transaction feed, charts, invoice preview

### 4. Additional Improvements
- **Back-to-top floating button** — fixed at bottom-right, appears on scroll with scale animation, smooth scrolls to top
- **WhatsApp-style contact button** — fixed at bottom-left, green with pulsing notification badge, scales on hover
- **"بیشتر بدانید" text** below scroll indicator chevrons with breathing opacity animation
- **Parallax effect on hero blobs** — wrapped three background gradient blobs with `ParallaxSection` component at different speeds (0.15, 0.2, 0.1)
- **Floating user counter badge** — "+۵,۰۰۰ کاربر فعال" badge positioned near CTA button area on desktop with spring animation and live pulse indicator

### New Imports Added
- `useMotionValueEvent` from framer-motion
- `ArrowUp`, `MessageCircle`, `Home as HomeIcon`, `LayoutDashboard`, `Settings`, `LogOut`, `FileSpreadsheet` from lucide-react

### New Components Added
- `RotatingPhrase` — Animated rotating benefit phrases with crossfade
- `KpiCounter` — Animated number counter for KPI cards in the HeroTiltCard

### Build Results
- ✅ `npx next build` — Compiled successfully
- ✅ `bun run lint` — 0 errors, 1 pre-existing warning (unrelated to changes)

---

## Files Modified
- `/home/z/my-project/src/app/page.tsx` — All changes in this single file
