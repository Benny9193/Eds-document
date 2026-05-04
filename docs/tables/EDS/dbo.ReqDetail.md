# View: `dbo.ReqDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `UserId` | int | YES |  |  |
| 5 | `BudgetId` | int | YES |  |  |
| 6 | `BudgetAccountId` | int | YES |  |  |
| 7 | `UserAccountId` | int | YES |  |  |
| 8 | `CategoryId` | int | YES |  |  |
| 9 | `ShippingId` | int | YES |  |  |
| 10 | `Attention` | varchar(50) | YES |  |  |
| 11 | `AccountCode` | varchar(50) | YES |  |  |
| 12 | `DateEntered` | datetime | YES |  |  |
| 13 | `ShippingPercent` | decimal(9,5) | YES |  |  |
| 14 | `DiscountPercent` | decimal(9,5) | YES |  |  |
| 15 | `ShippingCost` | money | YES |  |  |
| 16 | `TotalItemsCost` | money | YES |  |  |
| 17 | `TotalRequisitionCost` | money | YES |  |  |
| 18 | `Comments` | varchar(1023) | YES |  |  |
| 19 | `ApprovalRequired` | tinyint | YES |  |  |
| 20 | `ApprovalId` | int | YES |  |  |
| 21 | `ApprovalLevel` | tinyint | YES |  |  |
| 22 | `StatusId` | int | YES |  |  |
| 23 | `OrderDate` | datetime | YES |  |  |
| 24 | `BidId` | int | YES |  |  |
| 25 | `DateExported` | datetime | YES |  |  |
| 26 | `DetailId` | int | NO |  |  |
| 27 | `CatalogId` | int | YES |  |  |
| 28 | `ItemId` | int | YES |  |  |
| 29 | `AddendumItem` | tinyint | YES |  |  |
| 30 | `ItemCode` | varchar(50) | YES |  |  |
| 31 | `Quantity` | int | YES |  |  |
| 32 | `LastYearsQuantity` | int | YES |  |  |
| 33 | `Description` | varchar(1024) | YES |  |  |
| 34 | `UnitId` | int | YES |  |  |
| 35 | `UnitCode` | varchar(20) | YES |  |  |
| 36 | `BidPrice` | money | YES |  |  |
| 37 | `CatalogPrice` | money | YES |  |  |
| 38 | `GrossPrice` | money | YES |  |  |
| 39 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 40 | `CatalogPage` | char(4) | YES |  |  |
| 41 | `PricePlanId` | int | YES |  |  |
| 42 | `PriceId` | int | YES |  |  |
| 43 | `AwardId` | int | YES |  |  |
| 44 | `VendorId` | int | YES |  |  |
| 45 | `VendorItemCode` | varchar(50) | YES |  |  |
| 46 | `Alternate` | varchar(1024) | YES |  |  |
| 47 | `POId` | int | YES |  |  |
| 48 | `BatchDetailId` | int | YES |  |  |
| 49 | `Modified` | datetime | YES |  |  |
| 50 | `ModifiedById` | int | YES |  |  |
| 51 | `SortSeq` | varchar(64) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[ReqDetail]
AS
SELECT     dbo.Requisitions.RequisitionId, dbo.Requisitions.RequisitionNumber, dbo.Requisitions.SchoolId, dbo.Requisitions.UserId, dbo.Requisitions.BudgetId, 
                      dbo.Requisitions.BudgetAccountId, dbo.Requisitions.UserAccountId, dbo.Requisitions.CategoryId, dbo.Requisitions.ShippingId, 
                      dbo.Requisitions.Attention, dbo.Requisitions.AccountCode, dbo.Requisitions.DateEntered, dbo.Requisitions.ShippingPercent, 
                      dbo.Requisitions.DiscountPercent, dbo.Requisitions.ShippingCost, dbo.Requisitions.TotalItemsCost, dbo.Requisitions.TotalRequisitionCost, 
                      dbo.Requisitions.Comments, dbo.Requisitions.ApprovalRequired, dbo.Requisitions.ApprovalId, dbo.Requisitions.ApprovalLevel, 
                      dbo.Requisitions.StatusId, dbo.Requisitions.OrderDate, dbo.Requisitions.BidId, dbo.Requisitions.DateExported, dbo.Detail.DetailId, 
                      dbo.Detail.CatalogId, dbo.Detail.ItemId, dbo.Detail.AddendumItem, dbo.Detail.ItemCode, dbo.Detail.Quantity, dbo.Detail.LastYearsQuantity, 
                      dbo.Detail.Description, dbo.Detail.UnitId, dbo.Detail.UnitCode, dbo.Detail.BidPrice, dbo.Detail.CatalogPrice, dbo.Detail.GrossPrice, 
                      dbo.Detail.DiscountRate, dbo.Detail.CatalogPage, dbo.Detail.PricePlanId, dbo.Detail.PriceId, dbo.Detail.AwardId, dbo.Detail.VendorId, 
                      dbo.Detail.VendorItemCode, dbo.Detail.Alternate, dbo.Detail.POId, dbo.Detail.BatchDetailId, dbo.Detail.Modified, dbo.Detail.ModifiedById, 
                      dbo.Detail.SortSeq
FROM         dbo.Detail with (nolock) INNER JOIN
                      dbo.Requisitions ON dbo.Detail.RequisitionId = dbo.Requisitions.RequisitionId
WHERE     (dbo.Detail.POId IS NULL)
```
