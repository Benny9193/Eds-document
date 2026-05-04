# View: `dbo.vw_StatusDetailed`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `Status` | varchar(104) | NO |  |  |

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
create   view  [dbo].[vw_StatusDetailed] as
select Requisitions.RequisitionId, isnull((select top 1 StatusTable.Name + case isnull(Approvals.StatusId,0) / 16777216 when 0 then '' else ' by ' + Users.Attention end from StatusTable left outer join Users on Users.UserId = Approvals.StatusId & 16777215 where StatusTable.StatusId = Approvals.StatusId / 16777216),'On Hold') Status
  from Requisitions with (nolock)
  left outer join Approvals on Approvals.ApprovalId =
    (select Top 1 a.ApprovalId
       from Approvals a with (nolock)
      where a.RequisitionId = Requisitions.RequisitionId
      order by a.ApprovalDate desc, a.ApprovalId desc)
```
