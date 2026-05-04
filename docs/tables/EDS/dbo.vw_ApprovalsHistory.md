# View: `dbo.vw_ApprovalsHistory`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `ApprovalDate` | datetime | YES |  |  |
| 3 | `Submitter` | varchar(56) | NO |  |  |
| 4 | `Approver` | varchar(56) | NO |  |  |
| 5 | `StatusName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ApprovalsHistory] as
select Requisitions.RequisitionId, 
       Approvals.ApprovalDate, 
       isnull(right('00000' + isnull(cast(a1.CometId as varchar),''),5),'') + ' ' + isnull(a1.Attention,'') Submitter,
       isnull(right('00000' + cast(a2.CometId as varchar),5),'') + ' ' + isnull(a2.Attention,'') Approver,
       isnull(StatusTable.Name,'') StatusName
  from Requisitions with (nolock)
  left outer join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
  left outer join Users a1 on a1.UserId = Approvals.ApprovalById
  left outer join Users a2 on a2.UserId = Approvals.ApproverId
  left outer join StatusTable on StatusTable.StatusId = Approvals.StatusId
```
