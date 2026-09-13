# ContractorOS — Architecture & Build Plan

## Brand
Working brand name: **ContractorOS** (see `/Brand/Brand_Kit.md`). Single source of truth for the two variables every asset should reference:
- `BRAND_NAME = ContractorOS`
- `SALES_EMAIL = spokoini1313@gmail.com`

## Product Line
| # | Folder | Product | Sold |
|---|---|---|---|
| 1 | `01-Pricing` | Smart Pricing & Profit Calculator | Standalone / Starter / Ultimate |
| 2 | `02-Budget` | Project Budget Controller | Standalone / Professional / Ultimate |
| 3 | `03-Quote` | Smart Quote Builder | Standalone / Starter / Ultimate |
| 4 | `04-Collection` | Payment & Collection Manager | Standalone / Starter / Ultimate |
| 5 | `05-CashFlow` | Cash Flow Planner | Standalone / Professional / Ultimate |
| 6 | `06-Labor` | Employee & Labor Cost Tracker | Standalone / Professional / Ultimate |
| 7 | `07-CRM` | Contractor CRM | Standalone / Professional / Ultimate |
| 8 | `08-Inventory` | Inventory & Materials Manager | Standalone / Professional / Ultimate |
| 9 | `09-Extras` | Change Order & Extras Manager | Standalone / Professional / Ultimate |
| 10 | `10-Project-Control` | Project Execution Dashboard | Standalone / Professional / Ultimate |
| 11 | `11-Business-Control-Center` | Contractor Business Control Center | Ultimate only |

## Standard Product Package (every folder 01–11)
```
Product.xlsx
README.html
Quick_Start.pdf   (generated from README quick-start section)
Product_Description.txt
Sales_Copy.txt
FAQ.txt
Social_Media_Copy.txt
/Screenshots
/Cover
```

## Standard Workbook Structure (every Product.xlsx)
1. **Dashboard** — top KPIs + alerts, first tab
2. **Main Workspace** — the core data-entry table
3. **Quick Start** — "what do I do here" in 5 steps
4. **User Guide** — full instructions
5. **Example Data** — pre-filled realistic sample rows
6. Clean Template = same file, Example Data rows cleared (documented in Quick Start: "Home > Clear Example Data")
7. KPI cards on Dashboard, formula-driven
8. Conditional formatting: green/yellow/red status
9. Data-validation dropdowns wherever a field has a fixed set of values
10. All calculations via formulas — no hard-coded results
11. Charts only where they clarify (e.g. cash balance trend, budget vs actual)
12. Alerts block on Dashboard (COUNTIF-driven, e.g. "3 payments overdue")

## Cross-Product Linking (for Product 11)
Every project-based module keys off the **project's name** (e.g. `שיפוץ מטבח - וילה כהן`), typed identically in every module it appears in — Pricing, Budget, Quote, Collection, Labor, Extras, and Project Execution (Inventory and CRM are not project-keyed; Cash Flow is monthly, not project-based). There is no separate numeric Project ID — the name itself is the link. Product 11's Dashboard pulls via `SUMIF`/`SUMIFS`/`COUNTIF` against each module's "שם פרויקט" column. Every product's Quick Start and User Guide reminds the user to keep the project name spelled identically across products; this was verified cell-by-cell across all 10 shipped products (see each product's `QA_Notes.txt` / `01-Pricing/QA_Notes.txt` for the cross-product check).

## Build Phases (this session)
1. ✅ Architecture (this doc)
2. ✅ Brand
3. ⏳ Product 1 — Smart Pricing & Profit Calculator (full build)
4. ⏳ QA Product 1
5. Products 2–10
6. Product 11 — Business Control Center
7. Documentation pass (READMEs for 2–11)
8. Landing Page
9. Marketing Assets
10. Video Assets (script/storyboard/SRT)
11. Full QA pass
12. Final package + ZIP + audit report

Work proceeds in checked-in chunks; each phase is committed and pushed separately so progress is never lost.
