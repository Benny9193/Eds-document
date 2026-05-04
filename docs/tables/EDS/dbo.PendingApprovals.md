# Table: `dbo.PendingApprovals`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 585350

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | int | NO |  | YES |
| 2 | `SessionId` | int | YES |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `UserId` | int | YES |  |  |
| 5 | `RequisitionId` | int | YES |  |  |
| 6 | `BudgetId` | int | YES |  |  |
| 7 | `AccountId` | int | YES |  |  |
| 8 | `CategoryId` | int | YES |  |  |
| 9 | `StatusId` | int | YES |  |  |
| 10 | `Amount` | money | YES |  |  |
| 11 | `ApprovalLevel` | tinyint | YES |  |  |
| 12 | `ApprovalDate` | datetime | YES |  |  |
| 13 | `LastApprovalId` | int | YES |  |  |
| 14 | `NextApproverId` | int | YES |  |  |
| 15 | `LastApproverId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_LastApproval` | no | NONCLUSTERED | `LastApprovalId` |  |
| `SK_SessionId` | no | NONCLUSTERED | `SessionId` |  |
| `SK_SessionNextApproverStatus` | no | NONCLUSTERED | `SessionId`, `NextApproverId`, `StatusId` |  |
| `SK_SessionRequisition` | no | NONCLUSTERED | `SessionId`, `RequisitionId` |  |
