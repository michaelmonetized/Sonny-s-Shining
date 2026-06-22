# FALLOW REVIEW

## HEALTH

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 2577 |
| Avg Cyclomatic | 2.3 |
| P90 Cyclomatic | 5 |
| Dead Files | 0.0% |
| Dead Exports | 0.0% |
| Maintainability (avg) | 98.2 |
| Circular Deps | 0 |
| Unused Deps | 0 |

## Fallow: 2 high complexity functions

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `app/components/PreorderButton.tsx:21` | `handlePreorder` | high | 7 | 7 | 56.0 **!** | 33 |
| `app/api/checkout/route.ts:6` | `POST` | moderate | 5 | 5 | 30.0 **!** | 58 |

**12** files, **14** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)



## AUDIT

   0.225133250s  WARN node_modules directory not found. Run `npm install` / `pnpm install` first for accurate results.

Audit scope: 6 changed files vs main (f86fb32..HEAD)
✓ No issues in 6 changed files (0.26s)


## DEAD

## Fallow: no issues found



## DUPLICATION

note: hid 18 clone groups below minOccurrences=3 (lower --min-occurrences to see them)
## Fallow: 4 clone groups found (36.8% duplication)

### Duplicates

**Clone group 1** (34 lines, 3 instances)

- `app/privacy/page.tsx:10-42`
- `app/refunds/page.tsx:10-43`
- `app/terms/page.tsx:10-42`

**Clone group 2** (18 lines, 3 instances)

- `app/privacy/page.tsx:101-116`
- `app/refunds/page.tsx:175-192`
- `app/terms/page.tsx:136-153`

**Clone group 3** (24 lines, 3 instances)

- `app/privacy/page.tsx:108-129`
- `app/privacy/page.tsx:146-169`
- `app/terms/page.tsx:185-206`

**Clone group 4** (17 lines, 3 instances)

- `app/privacy/page.tsx:168-183`
- `app/refunds/page.tsx:193-209`
- `app/terms/page.tsx:229-243`

### Clone Families

**Family 1** (3 groups, 69 lines across `app/privacy/page.tsx`, `app/refunds/page.tsx`, `app/terms/page.tsx`)

- Extract 3 shared clone groups (69 lines) from page.tsx, page.tsx, page.tsx into a shared directory (~138 lines saved)

**Family 2** (1 group, 24 lines across `app/privacy/page.tsx`, `app/terms/page.tsx`)

- Extract shared function (24 lines) from page.tsx, page.tsx, page.tsx (~48 lines saved)

**Summary:** 612 duplicated lines (36.8%) across 4 files



## DOCSTRINGS

### Docstring Coverage

- Status: fail
- Coverage: 0.00%
- Documented symbols: 0/15
- Missing docstrings: 15

