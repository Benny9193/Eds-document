# Table: `dbo.ApprovalsHistory`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 341757

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Historical / superseded approval rows (~342K rows). Same shape as `Approvals`; rows accumulate here when a requisition's approval chain is restarted (e.g. amount changed past a threshold) so the prior chain is preserved separately from the active one.

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
