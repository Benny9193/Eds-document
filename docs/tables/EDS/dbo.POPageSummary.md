# Table: `dbo.POPageSummary`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 73456

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-PO line / page count summary (~73K rows). Aggregate of how many lines and printed pages a `POId` produces, scoped by district / category. Used by the print pipeline to size jobs.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POPageId` | uniqueidentifier | NO | `(newsequentialid())` | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `POId` | int | NO |  |  |
| 5 | `LineCount` | int | YES |  |  |
| 6 | `PageCount` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
