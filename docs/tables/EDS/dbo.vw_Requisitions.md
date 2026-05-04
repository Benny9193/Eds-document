# View: `dbo.vw_Requisitions`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 12 | `AccountCode` | varchar(50) | YES |  |  |
| 13 | `DateEntered` | datetime | YES |  |  |
| 14 | `ShippingPercent` | decimal(9,5) | YES |  |  |
| 15 | `DiscountPercent` | decimal(9,5) | YES |  |  |
| 16 | `ShippingCost` | money | YES |  |  |
| 17 | `TotalItemsCost` | money | YES |  |  |
| 18 | `TotalRequisitionCost` | money | YES |  |  |
| 19 | `Comments` | varchar(1023) | YES |  |  |
| 20 | `ApprovalRequired` | tinyint | YES |  |  |
| 21 | `ApprovalId` | int | YES |  |  |
| 22 | `ApprovalLevel` | tinyint | YES |  |  |
| 23 | `StatusId` | int | YES |  |  |
| 24 | `OrderDate` | datetime | YES |  |  |
| 25 | `DateExported` | datetime | YES |  |  |
| 26 | `BidId` | int | YES |  |  |
| 27 | `BookId` | int | YES |  |  |
| 28 | `SourceId` | int | YES |  |  |
| 29 | `BidHeaderId` | int | YES |  |  |
| 30 | `LastAlteredSessionId` | int | YES |  |  |
| 31 | `DateUpdated` | datetime | YES |  |  |
| 32 | `OrderType` | tinyint | YES |  |  |
| 33 | `NotesCount` | int | YES |  |  |
| 34 | `AddendaTotal` | money | YES |  |  |
| 35 | `ApprovalCount` | int | YES |  |  |
| 36 | `AdditionalShipping` | int | YES |  |  |
| 37 | `ShippingUpdateRequired` | int | YES |  |  |
| 38 | `AdditionalShippingCost` | decimal(38,2) | YES |  |  |
| 39 | `AllowRequestAddenda` | tinyint | NO |  |  |
| 40 | `CSAllowRequestAddenda` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Detail` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Users` | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| `dbo.uf_IsRequisitionLocked` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_Requisitions] as
SELECT Requisitions.[RequisitionId]
      ,Requisitions.[Active]
      ,Requisitions.[RequisitionNumber]
      ,Requisitions.[SchoolId]
      ,Requisitions.[UserId]
      ,Requisitions.[BudgetId]
      ,Requisitions.[BudgetAccountId]
      ,Requisitions.[UserAccountId]
      ,Requisitions.[CategoryId]
      ,Requisitions.[ShippingId]
      ,Requisitions.[Attention]
      ,Requisitions.[AccountCode]
      ,Requisitions.[DateEntered]
      ,Requisitions.[ShippingPercent]
      ,Requisitions.[DiscountPercent]
      ,Requisitions.[ShippingCost]
      ,Requisitions.[TotalItemsCost]
      ,Requisitions.[TotalRequisitionCost]
      ,Requisitions.[Comments]
      ,Requisitions.[ApprovalRequired]
      ,Requisitions.[ApprovalId]
      ,Requisitions.[ApprovalLevel]
      ,Requisitions.[StatusId]
      ,Requisitions.[OrderDate]
      ,Requisitions.[DateExported]
      ,Requisitions.[BidId]
      ,Requisitions.[BookId]
      ,Requisitions.[SourceId]
      ,Requisitions.[BidHeaderId]
      ,Requisitions.[LastAlteredSessionId]
      ,Requisitions.[DateUpdated]
      ,Requisitions.[OrderType]
      ,Requisitions.[NotesCount]
      ,Requisitions.[AddendaTotal]
	  ,Requisitions.[ApprovalCount]
      ,coalesce(det.AdditionalShipping,0) AdditionalShipping 
	  ,coalesce(det.UpdateRequired,0) ShippingUpdateRequired 
	  ,coalesce(det.AdditionalShippingCost,0) AdditionalShippingCost
      ,isnull((select top 1 DistrictCategories.AllowAddenda
                 from DistrictCategories with (nolock)
                 join Category on Category.CategoryId = DistrictCategories.CategoryId
                              and Category.Type = 1
                 join Requisitions r1 on r1.CategoryId = Category.CategoryId
                                     and r1.BudgetId = Budgets.BudgetId
                                     and r1.RequisitionId = Requisitions.RequisitionId
                 join Users on Users.UserId = r1.UserId
                           and Users.AllowAddenda = 1
                where DistrictCategories.DistrictId = Budgets.DistrictId
                  and DistrictCategories.CategoryId = Requisitions.CategoryId
                  and dbo.uf_IsRequisitionLocked(Requisitions.RequisitionId) = 0),0) [AllowRequestAddenda]
       ,isnull((select top 1 DistrictCategories.AllowAddenda
                 from DistrictCategories with (nolock)
                 join Category on Category.CategoryId = DistrictCategories.CategoryId
                              and Category.Type = 1
                 join Requisitions r1 on r1.CategoryId = Category.CategoryId
                                     and r1.BudgetId = Budgets.BudgetId
                                     and r1.RequisitionId = Requisitions.RequisitionId
                where DistrictCategories.DistrictId = Budgets.DistrictId
                  and DistrictCategories.CategoryId = Requisitions.CategoryId
                  and dbo.uf_IsRequisitionLocked(Requisitions.RequisitionId) = 0),0) [CSAllowRequestAddenda]
  FROM [dbo].[Requisitions] with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  outer apply (select max(AdditionalShipping) AdditionalShipping, 
                      max(case when coalesce(Detail.Quantity,0) != coalesce(Detail.ShippingQuantity,0) or Detail.ShippingUpdated is null or coalesce(Detail.ShippingCost,0) = 0 then 1 else 0 end) UpdateRequired,
					  sum(Detail.ShippingCost) AdditionalShippingCost
                 from Detail
				where Detail.RequisitionId = Requisitions.RequisitionId
				  and Detail.AdditionalShipping = 1) det
```
