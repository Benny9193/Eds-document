# View: `dbo.vw_RequisitionIsVisible`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `RequisitionId` | int | NO |  |  |
| 3 | `IsVisible` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Requisitions` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `dbo.uf_UserInApprovalChain` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_RequisitionList`](dbo.vw_RequisitionList.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_RequisitionIsVisible] as
select SessionTable.SessionId, Requisitions.RequisitionId, case when SessionTable.ApprovalLevel < 5 then dbo.uf_UserInApprovalChain(SessionTable.UserId, Requisitions.UserId, '') else 1 end IsVisible
  from Requisitions with (nolock)
  join SessionTable on SessionTable.BudgetId = Requisitions.BudgetId
```
