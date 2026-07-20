---
target: hero section
total_score: 33
p0_count: 1
p1_count: 2
timestamp: 2026-07-20T10-25-35Z
slug: src-components-asanhesab-hero-tsx
---
Method: dual-agent

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Excellent: live count badge, animated ping, star rating immediately visible |
| 2 | Match System / Real World | 4 | Strong: Dari/Pashto RTL, Afghan currency, Solar Hijri, Windows 10/11 explicit |
| 3 | User Control and Freedom | 3 | Good exits, but primary CTA downloads .exe immediately without confirmation |
| 4 | Consistency and Standards | 4 | Design tokens throughout, consistent spacing/corners, RTL respected |
| 5 | Error Prevention | 2 | No file size warning (85MB), no OS check, no confirmation for metered connections |
| 6 | Recognition Rather Than Recall | 4 | Universal icons, native script, color-coded trust pills |
| 7 | Flexibility and Efficiency | 3 | Theme toggle works, mobile wraps, no keyboard shortcuts or download mirrors |
| 8 | Aesthetic and Minimalist Design | 4 | Clean focus; -1 for 6 decorative orbs |
| 9 | Error Recovery | 2 | No download retry, no help link |
| 10 | Help and Documentation | 3 | Badge explains offline value, trust pills answer questions; CTA lacks what-happens-next |

**Total: 33/40 — Good**

## Anti-Patterns Verdict
Verdict: Clean. Detector exit code 0, 0 findings. No gradient text, no contrast violations, no banned patterns.

## Priority Issues

**[P0]** Primary CTA downloads 85MB .exe with no size warning or OS check. Fix: add micro-copy below CTA: 85MB, Windows 10/11, free forever. Add client-side OS detection gate.

**[P1]** Social proof (4.9 stars, 800+ reviews) has no human face or testimonial. Replace star row with mini-testimonial card pulling from t.testimonials.t1Quote.

**[P1]** Six decorative orb blurs create visual clutter. Remove top-left emerald + top-right violet orbs; keep 3 total.

**[P2]** Badge groups two unrelated facts (offline feature + user count). Split into two separate badges.

**[P2]** Secondary CTA href="#video" may not resolve to an actual video element. Fix label or implement modal.

## Persona Red Flags
- Fatima (first-timer, metered connection): abandons at download click — no file size warning
- Hassan (power user, wholesaler): trust degraded by star count without face

## Minor Observations
- Trust pill text contrast borderline; could go text-slate-700
- Reveal progressive enhancement is solid
- num-fa class: verify formatNumber swaps to Eastern Arabic digits
