# Table: `archive.ApprovalsHistory`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 447389

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ApprovalId` | int | NO |  |  |
| 2 | `ApprovalById` | int | YES |  |  |
| 3 | `Level` | tinyint | YES |  |  |
| 4 | `StatusId` | int | YES |  |  |
| 5 | `RequisitionId` | int | YES |  |  |
| 6 | `ApprovalDate` | datetime | YES |  |  |
| 7 | `ApproverId` | int | YES |  |  |
| 8 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
