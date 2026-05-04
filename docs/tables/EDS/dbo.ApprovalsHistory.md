# Table: `dbo.ApprovalsHistory`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 341747

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ApprovalId` | int | NO |  | YES |
| 2 | `ApprovalById` | int | YES |  |  |
| 3 | `Level` | tinyint | YES |  |  |
| 4 | `StatusId` | int | YES |  |  |
| 5 | `RequisitionId` | int | YES |  |  |
| 6 | `ApprovalDate` | datetime | YES |  |  |
| 7 | `ApproverId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Requisition` | no | NONCLUSTERED | `RequisitionId` |  |
