# View: `dbo.vw_ARStatuses`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Tagged` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `BudgetId` | int | NO |  |  |
| 4 | `StatusId` | int | NO |  |  |
| 5 | `StatusDesc` | varchar(104) | NO |  |  |
| 6 | `StatusCode` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `vw_RequisitionStatus` | VIEW |
| `dbo.uf_UserInApprovalChain` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ARStatuses] as 
select 1 Tagged, SessionTable.SessionId, Budgets.BudgetId, rs.StatusId, rs.StatusDesc, rs.StatusCode
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join SessionTable on SessionTable.DistrictId = Budgets.DistrictId
  join vw_RequisitionStatus rs on rs.RequisitionId = Requisitions.RequisitionId
 where case isnull(SessionTable.RepUserId,0) when 0 then dbo.uf_UserInApprovalChain(SessionTable.UserId, Requisitions.UserId, '') else 1 end = 1
 group by SessionTable.SessionId, Budgets.BudgetId, rs.StatusId, rs.StatusDesc, rs.StatusCode
```
