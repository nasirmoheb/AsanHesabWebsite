# Worklog — AsanHesab Landing Page: Online → Offline Desktop App Content Update

**Date**: 2025
**File**: `src/app/page.tsx`
**Goal**: Convert all content references from online/web/SaaS features to reflect an offline desktop application.

---

## Changes Made (21 items)

### 1. Browser Chrome → Desktop App Title Bar (HeroTiltCard)
- Removed browser dots (red/yellow/green), Lock icon, and URL bar
- Replaced with Windows-style desktop app title bar showing Calculator icon + "آسان حساب — داشبورد مدیریت" and window control squares (minimize/maximize/close)

### 2. "آنلاین" Status Badge → "آفلاین"
- Changed green `آنلاین` badge to blue `آفلاین` badge in the dashboard header

### 3. Transaction "سفارش آنلاین #۲۳۱" → "سفارش #۲۳۱"
- Removed "آنلاین" from transaction name, changed Globe icon to Store icon

### 4. "واردات زنده حسابداری" → "آخرین تراکنش‌های حسابداری"
- Changed dark panel header text in live transaction section

### 5. "واردات زنده" → "ثبت خودکار"
- Changed bottom text in transaction feed animation

### 6. Hero CTA Button
- Changed "۱۴ روز رایگان شروع کنید" → "دانلود رایگان نسخه آزمایشی"

### 7. Feature "هر جا، هر وقت" → "نصب آسان"
- Changed icon from Smartphone to Monitor
- Changed title to "نصب آسان"
- Changed description to emphasize desktop installation and offline usage

### 8. All "شروع رایگان" Buttons → "دانلود رایگان"
- Navbar button (desktop)
- Mobile menu button
- Two pricing plan CTA buttons

### 9. How It Works Step 1: Registration → Download
- Changed title from "ثبت‌نام ۳۰ ثانیه‌ای" → "دانلود و نصب"
- Changed description to emphasize download and offline installation

### 10. FAQ: Mobile → Offline
- Changed question from "آیا می‌توانم از موبایل استفاده کنم؟" → "آیا برای استفاده نیاز به اینترنت دارم؟"
- Changed answer to explain fully offline functionality

### 11. FAQ: Security — Removed Server References
- Updated to emphasize local encryption, local backup, no internet data transmission

### 12. Fixed Chinese Text in FAQ
- Changed "۱۴ روز رایگان试用" (mixed Persian/Chinese) → "نسخه آزمایشی رایگان با تمام امکانات. بدون نیاز به اینترنت و بدون تعهد."

### 13. Dashboard Showcase URL
- Changed "app.asanhesab.af/dashboard" → "آسان حساب — داشبورد مدیریت"

### 14. Pricing Plan Features
- "پشتیبانی آنلاین" → "پشتیبانی تلفنی"
- "دسترسی موبایل و دسکتاپ" → "نصب روی چند کامپیوتر"

### 15. Pricing Section Subtitle
- Changed to "نسخه آزمایشی رایگان — بدون نیاز به اینترنت"

### 16. Trust Signals
- "بدون کارت بانکی" → "بدون نیاز به اینترنت"
- "بدون تعهد" → "کاملاً آفلاین"

### 17. Final CTA Button
- Changed "شروع رایگان ۱۴ روزه" → "دانلود رایگان"

### 18. Footer: "API" → "نسخه دسکتاپ"
- Updated product links in footer

### 19. Bento Features: Auto-Backup Description
- Changed to emphasize local computer backup

### 20. Pricing Header (same as #15)
- Ensured pricing subtitle reads "نسخه آزمایشی رایگان — بدون نیاز به اینترنت"

### 21. Final CTA Footer Text
- Changed to "بدون نیاز به اینترنت • کاملاً آفلاین • هر وقت بخواهید"

---

## Build Verification
- ✅ `npm run build` completed successfully with no errors
- All changes are text-only; no styling, CSS, animations, or layout modifications were made
