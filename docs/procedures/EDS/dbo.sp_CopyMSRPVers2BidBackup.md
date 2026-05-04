# Procedure: `dbo.sp_CopyMSRPVers2BidBackup`

_Generated on 2026-05-04T13:43:18.755Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyMSRPVers2BidBackup` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-02-11 16:46:56 |
| Modified | 2014-02-11 16:46:56 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pOldBidHeaderId` | IN | varchar(50) |  |
| 2 | `@pNewBidHeaderId` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidMSRPResults` | USER_TABLE |  |
| `BidRequestManufacturer` | USER_TABLE |  |
| `BidRequestOptions` | USER_TABLE |  |
| `BidRequestPriceRanges` | USER_TABLE |  |
| `BidRequestProductLines` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		Kevin
-- Create date: 1-17-2014
-- Description:	Copy MSRP (Version 2) Bid
-- =============================================
CREATE procedure [dbo].[sp_CopyMSRPVers2BidBackup] @pOldBidHeaderId  varchar(50), @pNewBidHeaderId  varchar(50)
AS
BEGIN

set nocount on

declare @CopyFromBidHeaderId int, @CopyToBidHeaderId int

Select @CopyFromBidHeaderId=CAST(@pOldBidHeaderId as int)
Select @CopyToBidHeaderId=CAST(@pNewBidHeaderId as int)


INSERT INTO BidRequestManufacturer
  (Active, BidHeaderId, ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions)
SELECT Active, @CopyToBidHeaderId, ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions
FROM BidRequestManufacturer
WHERE BidHeaderId=@CopyFromBidHeaderId
      and BidRequestManufacturerId NOT IN
      (SELECT BidRequestManufacturerId FROM BidMSRPResults WHERE BidHeaderId = @CopyFromBidHeaderId)


INSERT INTO BidRequestProductLines
  (Active, BidRequestManufacturerId, ManufacturerProductLineId, UseOptions)
SELECT OldBRPL.Active, NewBRM.BidRequestManufacturerId, OldBRPL.ManufacturerProductLineId, OldBRPL.UseOptions
FROM BidRequestProductLines OldBRPL
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId and NewBRM.BidHeaderId = @CopyToBidHeaderId


INSERT INTO BidRequestPriceRanges
  (BidHeaderId, BidRequestManufacturerId, BidRequestProductLineId, RangeBase, RangeWeight)
SELECT @CopyToBidHeaderId, NewBRM.BidRequestManufacturerId, NewBRPL.BidRequestProductLineId, OldBRPR.RangeBase, OldBRPR.RangeWeight
FROM BidRequestPriceRanges OldBRPR
JOIN BidRequestProductLines OldBRPL ON OldBRPL.BidRequestProductLineId = OldBRPR.BidRequestProductLineId
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
JOIN BidRequestProductLines NewBRPL ON NewBRPL.ManufacturerProductLineId = OldBRPL.ManufacturerProductLineId
                                   and NewBRPL.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId and NewBRM.BidHeaderId = @CopyToBidHeaderId


INSERT INTO BidRequestOptions
  (BidHeaderId, ManufacturerId, ManufacturerProductLineId, OptionId, BidRequestManufacturerId, BidRequestProductLineId, [Name], [Weight])
SELECT @CopyToBidHeaderId, OldBROpt.ManufacturerId, OldBROpt.ManufacturerProductLineId, OldBROpt.OptionId, NewBRM.BidRequestManufacturerId, NewBRPL.BidRequestProductLineId, OldBROpt.[Name], OldBROpt.[Weight]
FROM BidRequestOptions OldBROpt
JOIN BidRequestProductLines OldBRPL ON OldBRPL.BidRequestProductLineId = OldBROpt.BidRequestProductLineId
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
JOIN BidRequestProductLines NewBRPL ON NewBRPL.ManufacturerProductLineId = OldBRPL.ManufacturerProductLineId
                                   and NewBRPL.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId and NewBRM.BidHeaderId = @CopyToBidHeaderId


set nocount off

END
```
