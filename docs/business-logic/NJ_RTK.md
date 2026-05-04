# Business Logic: `NJ_RTK`

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

[← back to business-logic index](README.md)

---

## Table of Contents

1. [Domain Summary](#domain-summary)
2. [Core Entities and Lifecycle](#core-entities-and-lifecycle)
3. [Workflows and Processes](#workflows-and-processes)
4. [Business Rules](#business-rules)
5. [Cross-Database Touchpoints](#cross-database-touchpoints)
6. [Open Questions and Ambiguities](#open-questions-and-ambiguities)
7. [Source Queries](#source-queries)

---

## Domain Summary

`NJ_RTK` is the New Jersey Right-to-Know (RTK) chemical hazard survey tracker. It stores records for employers, their physical facilities, and the surveys that facilities must file annually under New Jersey's Worker and Community Right-to-Know Act. The database is a lightweight operational mirror of an external RTK reporting system — its procedures receive data from that system and upsert it locally, linking facilities back to EDS school districts via facility number cross-references.

The database has 9 tables and 5 procedures/functions. It is a satellite database: EDS reads from it (16 inbound edges from EDS routines), and NJ_RTK reads from `EDS.dbo.RTK_Sites` to resolve employer-to-district mappings.

---

## Core Entities and Lifecycle

### Employer

`Employers` (~62 rows) represents a New Jersey employer (typically a school district or facility operator). Each employer has a GUID primary key and a `DistrictId` FK back to `EDS.dbo.District`, resolved by cross-referencing `EDS.dbo.RTK_Sites.NJEIN` during facility refresh.

### Facility

`Facilities` (~496 rows) represents a physical site (school building, maintenance depot, etc.) under an employer. Each facility has a `FacilityNumber` (NJ state identifier), county, municipality, hazardous-chemical-reported flag, and survey/facility status strings. `lastRefreshed` is stamped on every update.

### Survey

`Surveys` (~1,978 rows) represents a per-facility annual survey submission. The `Year` column is the survey year. Status is stored as a free-form `status` varchar. Deep links (`addLink`, `editLink`, `viewlink`) to the external RTK reporting system are stored alongside the survey row.

### Reference / Lookup Tables

- `CAS` (~3,322 rows) — Chemical Abstracts Service numbers for hazardous substances.
- `ReportProducts` (~216K rows), `ReportSubstances` (~206K rows) — reported chemical product and substance data per survey cycle.
- `ReportSurveys` (~1,982 rows) — survey-level reporting aggregates.
- `Products` and `Substances` — currently empty (0 rows); likely intended as master lookup tables.

---

## Workflows and Processes

### Facility Refresh (Upsert)

```
sp_refreshFacility(
  @EmployerId, @EIN, @FacilityNumber, @Name, @County,
  @HazardousChemicalsReported, @SurveyStatus, @FacilityStatus,
  @SurveyLink, @Municipality
)
  1. Look up Facility by (EmployerId, FacilityNumber) where deletedAt IS NULL
  2. If not found:
       INSERT Facilities (new GUID id)
  3. If found:
       UPDATE Facilities (all metadata fields + lastRefreshed = GETDATE())
  4. If Employer.DistrictId IS NULL:
       SELECT TOP 1 DistrictId FROM EDS.dbo.RTK_Sites
         WHERE NJEIN = @FacilityNumber AND Active = 1
       UPDATE Employers.DistrictId = @DistrictId
  5. RETURN @FacilityId, @DistrictId
```

The EDS district linkage is resolved lazily — only when the `Employer` row has no `DistrictId` yet. `EDS.dbo.RTK_Sites.NJEIN` is the cross-reference key between the NJ facility number and the EDS district.

### Employer Refresh (Upsert)

```
sp_refreshEmployer(@EmployerId, @EIN, @Name, ...)
  → Upsert pattern on Employers table (exact definition not fully traced here)
  → Creates or updates employer record; does not handle DistrictId resolution
    (that is done in sp_refreshFacility)
```

### Survey Upsert

```
usp_UpdateSurvey(
  @FacilityId, @Year, @LastRunDate, @FacilityNumber, @SurveyNumber,
  @addLink, @createdBy, @dateCreated, @dateLastChanged,
  @editLink, @lastChangedBy, @status, @viewlink
)
  1. Look up Survey by (FacilityId, Year)
  2. If not found:
       INSERT Surveys (all parameters)
  3. If found:
       UPDATE Surveys (all mutable fields — excludes FacilityId and Year)
```

This is a pure upsert with no business validation beyond the existence check. All metadata fields (including links and audit timestamps from the external system) are blindly overwritten on each call.

---

## Business Rules

### No Hard Deletes

`Facilities` uses a `deletedAt` soft-delete pattern (consistent with the `Documents` database). `sp_refreshFacility` filters `deletedAt IS NULL` when looking up existing facilities. No procedure hard-deletes any row.

### EDS District Resolution on First Facility Contact

The `Employers.DistrictId` is resolved from `EDS.dbo.RTK_Sites` only when it is null — meaning the resolution happens at most once per employer, on the first facility insert. Subsequent refreshes do not re-resolve the district linkage even if `RTK_Sites` changes.

### External System as Source of Truth

NJ_RTK is a read-only mirror of data from an external RTK reporting platform. All `dateCreated`, `lastChangedBy`, `status`, and link fields originate from that external system; EDS does not modify them independently.

---

## Cross-Database Touchpoints

| Direction | Source | Target | Purpose |
|-----------|--------|--------|---------|
| NJ_RTK → EDS | `sp_refreshFacility` | `EDS.dbo.RTK_Sites` | Resolve NJ facility number to EDS DistrictId |
| EDS → NJ_RTK | ~16 EDS procedures/views | NJ_RTK tables | Read RTK survey and facility data for EDS reporting |

The `vw_DMSCheck` view in NJ_RTK references the `Documents` database (from `EDS_TEST_Old` dependency edges), suggesting that RTK document checks cross into the document management system.

See [`docs/dependencies/NJ_RTK/outbound.md`](../dependencies/NJ_RTK/outbound.md) for the full edge list.

---

## Open Questions and Ambiguities

1. **`sp_refreshEmployer` full definition** was not read in detail during this pass. Whether it also resolves a `DistrictId` linkage or only handles employer metadata is unclear.

2. **`Products` and `Substances` are empty.** These tables have 0 rows. They may be planned for a future feature or may have been superseded by `ReportProducts` and `ReportSubstances`.

3. **`ReportSurveys` vs `Surveys`.** `ReportSurveys` (~1,982 rows) and `Surveys` (~1,978 rows) have nearly the same row count. Their exact relationship — whether `ReportSurveys` is an aggregate or a different view of the same data — is not clear from table names alone.

4. **`uf_SanitizeData` and `uf_SanitizeDataTest`.** These string-sanitization functions suggest that incoming external data is sanitized before storage. The specific transformations applied (stripping control characters, normalizing whitespace, etc.) should be documented.

5. **`vw_DMSCheck` cross-database reference.** This view in NJ_RTK appears to cross-reference the `Documents` database. Whether this is live or a residual dependency from the `EDS_TEST_Old` environment is not confirmed.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/procedures/NJ_RTK/*.md` | Procedure definitions, parameters, dependency lists |
| `docs/tables/NJ_RTK/README.md` | Table list, row counts |
| `docs/dependencies/NJ_RTK/outbound.md` | Cross-database reference edges |
| `SCHEMA.md` | Cross-database dependency matrix |
