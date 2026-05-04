# Table: `dbo.Approvals`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8042423

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-step approval audit trail (~8M rows). Records who approved or rejected each requisition at each level of the district's approval chain, with timestamp and any comment. Combined with `PendingApprovals` to drive the queue an approver sees in the UI.

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
