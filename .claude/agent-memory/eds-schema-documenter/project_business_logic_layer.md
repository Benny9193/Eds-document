---
name: Business logic documentation layer
description: What was produced in docs/business-logic/, which databases were covered, key institutional knowledge from reading procedure code
type: project
---

## What was produced

8 files under `docs/business-logic/` on 2026-05-04:
- `README.md` — already existed; lists all 7 per-DB docs
- `EDS.md` — full treatment (405 lines): approval workflow, requisition lifecycle, bid award, catalog post pipeline, status state machine, business rules
- `VendorBids.md` — full treatment (265 lines): encrypted bid submission, import validation, journal pattern
- `Catalogs.md` — full treatment (229 lines): sp_PostCatalog pipeline with ImportFormat branching
- `Documents.md` — full treatment (203 lines): soft-delete pattern, XML batch procedures
- `NJ_RTK.md` — full treatment (158 lines): upsert pattern, EDS.RTK_Sites linkage
- `ContentCentral.md` — stub (58 lines): read-only lookup target, no EDS-authored procedures
- `IDIQ_Platform.md` — stub with schema analysis (93 lines): modern schema, no procedures, mostly-empty tables
- `ProcurementAnalytics.md` — stub (83 lines): read-only ETL target, no procedures

**Why:** Synthesized entirely from existing `docs/procedures/<db>/*.md`, `docs/tables/<db>/README.md`, `docs/dependencies/`, and `EDS_GUIDE.md`. No live queries were executed.

**How to apply:** Before adding new business-logic docs, read the README to understand scope. Do not put new docs under `docs/tables/` (auto-wiped by npm run schema).

---

## Key institutional knowledge from procedure reading

### EDS requisition status codes (from sp_ApproveReq)
- `H` = Hold, `P` = Pending, `E` = Changes, `A` = Approved, `I` = At EDS/Inhouse, `O` = PO Printed, `J` = Converted (batch), `M` = Manual
- Raw integer StatusIds also used: 4 = Rejected, 27 = Ready to Bid, 29 = Out to Bid, 45 = Manual PO
- `StatusTable` is the lookup; ids are NOT stable across environments

### sp_ApproveReq business rules (from code)
- Zero-amount requisitions cannot be approved
- Once a PO exists, requisition status is frozen
- ApprovalLevel >= 5 = superuser override
- Hold clears Approvals → ApprovalsHistory and resets DateExported

### sp_PostCatalog (Catalogs DB) pipeline steps
- Deduplication is blocking (RAISERROR on unresolved duplicates)
- ImportFormat 4 and 5 = UniqueItemNumber matching; others = PackedCode
- Each step logs to EDS.dbo.PostCatalogDetail for audit
- New product attribute fields added 2024-09-10

### VendorBids encryption pattern
- All price data encrypted with EncryptByPassPhrase + item-specific associated data
- Import uses BidRequestItemId as associated data; journal uses vendorBidItemId
- sp_ProcessBid re-encrypts from import key to journal key during validation

### Session pattern in EDS
- sp_AttemptLogin → INSERT SessionTable → all procedures receive @pSessionId
- District.Active + School.Active + Users.Active + District.DisableLogins all checked at login
- sp_SetDistrictAndBudgetYear attaches budget context after session creation

### Active flag pattern
- EDS uses both `Active` (tinyint) and `IsActive` (bit) — check per table
- Vendors.Active gates ALL catalog and bid visibility system-wide (mutate with care)
- CrossRefs.Active gates pricing to buyers

### NJ_RTK - EDS linkage
- sp_refreshFacility looks up EDS.dbo.RTK_Sites by NJEIN = FacilityNumber
- DistrictId resolved lazily (only when null on first facility insert, not re-resolved after)
