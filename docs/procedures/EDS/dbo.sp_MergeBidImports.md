# Procedure: `dbo.sp_MergeBidImports`

_Generated on 2026-05-04T14:49:07.293Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MergeBidImports` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-04-14 00:29:47 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceBidImportId` | IN | int |  |
| 2 | `@pTargetBidImportId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidResults` | USER_TABLE |  |
| `dbo.BidResults` | USER_TABLE | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_MergeBidImports @pSourceBidImportId int, @pTargetBidImportId int as

INSERT INTO [EDS].[dbo].[BidResults]([BidImportId], [BidHeaderId], [BidRequestItemId], [CategoryId], [DistrictId], [ItemId], [ItemCode], [Units], [Alternate], [Quantity], [ItemBidType], [UnitPrice], [Cost], [VendorItemCode], [QuantityBid], [ItemsPerUnit], [UnitId], [Status], [Comments], [Active])
  SELECT @pTargetBidImportId, BidResults.[BidHeaderId], BidResults.[BidRequestItemId], BidResults.[CategoryId], BidResults.[DistrictId], BidResults.[ItemId], BidResults.[ItemCode], BidResults.[Units], BidResults.[Alternate], BidResults.[Quantity], BidResults.[ItemBidType], BidResults.[UnitPrice], BidResults.[Cost], BidResults.[VendorItemCode], BidResults.[QuantityBid], BidResults.[ItemsPerUnit], BidResults.[UnitId], BidResults.[Status], BidResults.[Comments], BidResults.[Active] 
    FROM [EDS].[dbo].[BidResults] 
    left outer join BidResults br0 on br0.BidImportId = @pTargetBidImportId
                                  and br0.BidRequestItemId = BidResults.BidRequestItemId
   WHERE BidResults.BidImportId = @pSourceBidImportId
     AND br0.BidResultsId is null

UPDATE [EDS].[dbo].[BidResults]
   SET [CategoryId]=ss.CategoryId, 
       [DistrictId]=ss.DistrictId, 
       [ItemId]=ss.ItemId,
       [ItemCode]=ss.ItemCode,
       [Units]=ss.Units,
       [Alternate]=ss.Alternate,
       [Quantity]=ss.Quantity,
       [ItemBidType]=ss.ItemBidType,
       [UnitPrice]=ss.UnitPrice,
       [Cost]=ss.Cost,
       [VendorItemCode]=ss.VendorItemCode,
       [QuantityBid]=ss.QuantityBid,
       [ItemsPerUnit]=ss.ItemsPerUnit,
       [UnitId]=ss.UnitId,
       [Status]=ss.Status,
       [Comments]=ss.Comments,
       [Active]=ss.Active
  FROM BidResults
  JOIN (
    SELECT [BidResultsId], [BidImportId], [BidHeaderId], [BidRequestItemId], [CategoryId], [DistrictId], [ItemId], [ItemCode], [Units], [Alternate], [Quantity], [ItemBidType], [UnitPrice], [Cost], [VendorItemCode], [QuantityBid], [ItemsPerUnit], [UnitId], [Status], [Comments], [Active] 
      FROM [EDS].[dbo].[BidResults]
     WHERE BidResults.BidImportId = @pSourceBidImportId
       AND isnull(BidResults.UnitPrice,0) != 0
       AND isnull(BidResults.ItemBidType,'') != ''
        ) ss on ss.BidRequestItemId = BidResults.BidRequestItemId
 WHERE BidResults.BidImportId = @pTargetBidImportId
   AND isnull(BidResults.UnitPrice,0) = 0
```
