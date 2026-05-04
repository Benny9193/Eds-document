# Procedure: `dbo.sp_CopyBidImport`

_Generated on 2026-05-04T13:04:24.090Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyBidImport` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-04-14 00:27:38 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidImportId` | IN | int |  |
| 2 | `@pNewImportId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidImports` | USER_TABLE |  |
| `dbo.BidImports` | USER_TABLE | `EDS` |
| `dbo.BidResults` | USER_TABLE | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_CopyBidImport @pBidImportId int, @pNewImportId int output as
declare @BidImportId int

select @BidImportId = max(BidImportId) + 1 from BidImports

INSERT INTO [EDS].[dbo].[BidImports]([BidImportId], [BidHeaderId], [Active], [VendorId], [BidItemDiscountRate], [CatalogId], [CatalogDiscountRate], [VendorBidNumber], [ItemsBid], [AmountBid], [MinimumOrder], [FreeDeliveryMinimum], [Status], [Comments])
  SELECT @BidImportId, [BidHeaderId], [Active], [VendorId], [BidItemDiscountRate], [CatalogId], [CatalogDiscountRate], [VendorBidNumber], [ItemsBid], [AmountBid], [MinimumOrder], [FreeDeliveryMinimum], [Status], [Comments] 
    FROM [EDS].[dbo].[BidImports]
   WHERE BidImports.BidImportId = @pBidImportId

INSERT INTO [EDS].[dbo].[BidResults]([BidImportId], [BidHeaderId], [BidRequestItemId], [CategoryId], [DistrictId], [ItemId], [ItemCode], [Units], [Alternate], [Quantity], [ItemBidType], [UnitPrice], [Cost], [VendorItemCode], [QuantityBid], [ItemsPerUnit], [UnitId], [Status], [Comments], [Active])
  SELECT @BidImportId, [BidHeaderId], [BidRequestItemId], [CategoryId], [DistrictId], [ItemId], [ItemCode], [Units], [Alternate], [Quantity], [ItemBidType], [UnitPrice], [Cost], [VendorItemCode], [QuantityBid], [ItemsPerUnit], [UnitId], [Status], [Comments], [Active] 
    FROM [EDS].[dbo].[BidResults]
   WHERE BidResults.BidImportId = @pBidImportId

select @pNewImportId = @BidImportId
```
