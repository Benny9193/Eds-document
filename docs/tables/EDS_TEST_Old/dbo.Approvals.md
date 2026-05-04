# Table: `dbo.Approvals`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7799409

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
| `SK_RequisitionId` | no | NONCLUSTERED | `RequisitionId` |  |
| `SKI_RequisitionApprovaldate_ApprovalidStatusid` | no | NONCLUSTERED | `RequisitionId`, `ApprovalDate` | `ApprovalId`, `StatusId` |
| `SKI_RequisitionStatusApprovalDate_Id` | no | NONCLUSTERED | `RequisitionId`, `StatusId`, `ApprovalDate` | `ApprovalId` |
