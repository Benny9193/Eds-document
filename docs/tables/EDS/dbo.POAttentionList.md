# View: `dbo.POAttentionList`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | YES |  |  |
| 2 | `PONumber` | varchar(24) | YES |  |  |
| 3 | `AttentionName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[POAttentionList] 
AS SELECT Budgets.DistrictId, PO.PONumber, Requisitions.Attention As AttentionName
FROM PO WITH(nolock) 
JOIN Requisitions ON Requisitions.RequisitionId = PO.RequisitionId 
JOIN Budgets ON Budgets.BudgetId = Requisitions.BudgetId 
JOIN Users ON Users.UserId = Requisitions.UserId 
JOIN UserAccounts ON UserAccounts.UserId = Users.UserId 
JOIN Accounts ON Accounts.AccountId = UserAccounts.AccountId 
GROUP BY Budgets.DistrictId, PO.PONumber, Requisitions.Attention
```
