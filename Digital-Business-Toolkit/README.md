# ContractorOS — Digital Business Toolkit for Contractors & Tradespeople

A line of 11 commercial-grade Excel/Google Sheets products for
electricians, plumbers, HVAC techs, painters, carpenters, renovation
contractors, and every project-based small business owner.

## Status
This build is proceeding in phases (see `Documentation/Architecture.md`).
Completed so far:
- [x] Phase 1 — Architecture (`Documentation/Architecture.md`)
- [x] Phase 2 — Brand (`Brand/Brand_Kit.md`) → working brand name **ContractorOS**
- [x] Phase 3 — Product 1: Smart Pricing & Profit Calculator (`01-Pricing/`)
- [x] Phase 4 — QA Product 1 (manual review; automated LibreOffice recalc unavailable in this sandbox — see `01-Pricing/QA_Notes.txt`)
- [x] Phase 5 — Products 2–10, each with לוח בקרה/שולחן עבודה/התחלה מהירה/מדריך שימוש + full sales/marketing package:
  - `02-Budget` בקרת תקציב פרויקט
  - `03-Quote` בניית הצעת מחיר חכמה
  - `04-Collection` ניהול גבייה ותשלומים
  - `05-CashFlow` תכנון תזרים מזומנים
  - `06-Labor` מעקב שעות ועלות עובדים
  - `07-CRM` ניהול לקוחות ולידים
  - `08-Inventory` ניהול מלאי וחומרים
  - `09-Extras` ניהול תוספות וחריגים
  - `10-Project-Control` ניהול ביצוע פרויקט
- [x] **Hebrew pass (post-Phase-5 revision)** — all 10 products fully
  reworked per user request:
  - Every sheet tab, title, KPI label, alert, guide and FAQ text is now
    Hebrew (brand name **ContractorOS**, Excel/Google Sheets product
    names, and standard finance terms like Margin/Markup kept as-is —
    same convention used in Hebrew business documents generally).
  - Cross-product linking key changed from a numeric Project ID
    (`PRJ-0001`) to the **project's name** (e.g. `שיפוץ מטבח - וילה כהן`),
    typed identically across every product it appears in. This required
    a structural rebuild of Products 1, 2, 6, 9, and 10 (column layouts
    shifted, formulas re-derived and re-verified) — see
    `01-Pricing/QA_Notes.txt` for the full detail and the cross-product
    verification that confirms every product's example project names
    match byte-for-byte.
  - All 4 supporting docs per product (Product_Description, Sales_Copy,
    FAQ, Social_Media_Copy) rewritten in Hebrew; every README.html/
    Quick_Start.html title and tagline translated.
- [x] Phase 6 — Product 11: מרכז הבקרה העסקי (`11-Business-Control-Center/`)
  — self-contained workbook (Projects / Sales & Leads / Cash Flow /
  Inventory / Labor sheets + Executive Dashboard with 12 KPIs and
  auto-generated Business Insights via INDEX/MATCH/MAX), keyed off שם
  פרויקט like every other product; full Hebrew doc set included.
- [ ] Phase 7 — Documentation pass (root README, launch checklist)
- [x] Phase 8 — Landing Page (`Landing-Page/index.html`) — Hebrew RTL,
  one-sentence pitch per product (each paired with a real status chip
  from that product's own workbook), Product 11 spotlight with
  before/after pricing math, pricing table, FAQ, lead form (mailto to
  SALES_EMAIL). Published as a live Artifact.
- [ ] Phase 9 — Marketing Assets
- [ ] Phase 10 — Video Assets
- [ ] Phase 11 — Full QA
- [ ] Phase 12 — Final Package + ZIP + Audit

## Structure
See `Documentation/Architecture.md` for the full folder map and the
standard package/workbook structure every product follows.
