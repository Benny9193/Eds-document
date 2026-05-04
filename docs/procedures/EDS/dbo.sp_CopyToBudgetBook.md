# Procedure: `dbo.sp_CopyToBudgetBook`

_Generated on 2026-05-04T13:04:24.100Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyToBudgetBook` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-10-31 10:42:20 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pOrderBookId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pPricePlanId` | IN | int |  |
| 4 | `@pDistrictId` | IN | int |  |
| 5 | `@pAwardId` | IN | int |  |
| 6 | `@pCategoryDescription` | IN | varchar(255) |  |
| 7 | `@pPricePlanDescription` | IN | varchar(255) |  |
| 8 | `@pMarkup` | IN | decimal(9,5) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Items` | USER_TABLE |  |
| `dbo.OrderBookDetail` | USER_TABLE | `EDS` |
| `dbo.OrderBooks` | USER_TABLE | `EDS` |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_OrderBookMaint` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE      procedure dbo.sp_CopyToBudgetBook @pOrderBookId int, @pCategoryId int, @pPricePlanId int, @pDistrictId int, @pAwardId int, @pCategoryDescription varchar(255), @pPricePlanDescription varchar(255), @pMarkup decimal(9,5) as

set nocount on
declare @OrderBookId int

INSERT INTO [EDS].[dbo].[OrderBooks]([PricePlanDescription], [Category], [CategoryId], [PricePlanId], [AwardId], [Type], [DistrictId], [Markup], Active)
  values (@pPricePlanDescription, @pCategoryDescription, @pCategoryId, @pPricePlanId, @pAwardId, 'B', @pDistrictId, @pMarkup, 1)

select @OrderBookId = SCOPE_identity()

INSERT INTO [EDS].[dbo].[OrderBookDetail]([OrderBookId], [Active], [ItemId], [BidItemId], [Weight], [BasePrice], [CatalogId])
SELECT @OrderBookId, OrderBookDetail.[Active], OrderBookDetail.[ItemId], null, OrderBookDetail.[Weight], Items.ListPrice, OrderBookDetail.CatalogId --ob.[BidPrice], ob.CatalogId
  FROM [EDS].[dbo].[OrderBookDetail]
  join Items on Items.ItemId = OrderBookdetail.ItemId
--  join uf_OrderBook (@pOrderBookId, 0, 0) ob on ob.ItemId = OrderBookDetail.ItemId
 where OrderBookDetail.OrderBookId = @pOrderBookId

set nocount off

select @OrderBookId OrderBookId
return
```
