# View: `dbo.RequisitionsView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 4 | `SchoolId` | int | YES |  |  |
| 5 | `UserId` | int | YES |  |  |
| 6 | `BudgetId` | int | YES |  |  |
| 7 | `BudgetAccountId` | int | YES |  |  |
| 8 | `UserAccountId` | int | YES |  |  |
| 9 | `CategoryId` | int | YES |  |  |
| 10 | `ShippingId` | int | YES |  |  |
| 11 | `Attention` | varchar(50) | YES |  |  |
| 12 | `DateEntered` | datetime | YES |  |  |
| 13 | `ShippingPercent` | decimal(9,5) | YES |  |  |
| 14 | `DiscountPercent` | decimal(9,5) | YES |  |  |
| 15 | `ShippingCost` | money | YES |  |  |
| 16 | `TotalItemsCost` | money | YES |  |  |
| 17 | `TotalRequisitionCost` | money | YES |  |  |
| 18 | `Comments` | varchar(1023) | YES |  |  |
| 19 | `ApprovalRequired` | tinyint | YES |  |  |
| 20 | `ApprovalId` | int | YES |  |  |
| 21 | `OrderDate` | datetime | YES |  |  |
| 22 | `DateExported` | datetime | YES |  |  |
| 23 | `StatusId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[RequisitionsView]
AS
SELECT     RequisitionId, Active, RequisitionNumber, SchoolId, UserId, BudgetId, BudgetAccountId, UserAccountId, CategoryId, ShippingId, Attention, DateEntered, 
                      ShippingPercent, DiscountPercent, ShippingCost, TotalItemsCost, TotalRequisitionCost, Comments, ApprovalRequired, ApprovalId, OrderDate, 
                      DateExported, StatusId
FROM         dbo.Requisitions with (nolock)
```
