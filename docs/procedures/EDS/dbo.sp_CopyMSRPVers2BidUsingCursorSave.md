# Procedure: `dbo.sp_CopyMSRPVers2BidUsingCursorSave`

_Generated on 2026-05-04T13:43:18.756Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyMSRPVers2BidUsingCursorSave` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-01-17 16:57:13 |
| Modified | 2015-11-24 23:37:42 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pOldBidHeaderId` | IN | varchar(50) |  |
| 2 | `@pNewBidHeaderId` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
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
-- Create date: 1-16-2014
-- Description:	Copy MSRP (Version 2) Bid
-- =============================================
CREATE procedure [dbo].[sp_CopyMSRPVers2BidUsingCursorSave] @pOldBidHeaderId  varchar(50), @pNewBidHeaderId  varchar(50)
AS
BEGIN

set nocount on

declare @LoopCount int    -- THIS WAS USED TO LIMIT THE COUNT FOR INITIAL TESTING
declare @CopyFromBidHeaderId int, @CopyToBidHeaderId int

Select @CopyFromBidHeaderId=CAST(@pOldBidHeaderId as int)
Select @CopyToBidHeaderId=CAST(@pNewBidHeaderId as int)

declare @BidRequestManufacturerId int, @NewBidRequestManufacturerId int
declare @BidRequestProductLineId int, @NewBidRequestProductLineId int
declare @BidRequestPriceRangeId int, @NewBidRequestPriceRangeId int
declare @BidRequestOptionId int, @NewBidRequestOptionId int

-- Copy BidRequestManufacturer records
declare BRMCur cursor fast_forward read_only for
  select BidRequestManufacturerId
    from BidRequestManufacturer
   where BidHeaderId = @CopyFromBidHeaderId
order by BidRequestManufacturerId

Select @LoopCount = 0

open BRMCur
fetch next from BRMCur into @BidRequestManufacturerId
while @@fetch_Status = 0  --and @LoopCount < 5   -- REMOVE COMMENT TO LIMIT COUNT FOR TESTING
begin

  INSERT INTO BidRequestManufacturer
        (Active, BidHeaderId,        ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions)
  SELECT Active, @CopyToBidHeaderId, ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions
  FROM BidRequestManufacturer
  WHERE BidRequestManufacturerId=@BidRequestManufacturerId

  select @NewBidRequestManufacturerId = Scope_Identity() --DCH 11/24/2015 @@Identity from BidRequestManufacturer
  --Print 'Old BidRequestManufacturerId = ' + cast(@BidRequestManufacturerId as Varchar(30)) + '  New BidRequestManufacturerId = ' + cast(@NewBidRequestManufacturerId as Varchar(30))
 
  -- Copy related BidRequestProductLines
  declare BRPLCur cursor fast_forward read_only for
    select BidRequestProductLineId
      from BidRequestProductLines
     where BidRequestManufacturerId = @BidRequestManufacturerId
  order by BidRequestProductLineId    

  open BRPLCur
  fetch next from BRPLCur into @BidRequestProductLineId
  while @@fetch_Status = 0 
  begin
    INSERT INTO BidRequestProductLines
          (Active, BidRequestManufacturerId,     ManufacturerProductLineId, UseOptions)
    SELECT Active, @NewBidRequestManufacturerId, ManufacturerProductLineId, UseOptions
    FROM BidRequestProductLines
    WHERE BidRequestProductLineId = @BidRequestProductLineId

    select @NewBidRequestProductLineId = Scope_Identity() --DCH 11/24/2015 @@Identity from BidRequestProductLines
    --Print 'Old BidRequestProductLineId = ' + cast(@BidRequestProductLineId as Varchar(30)) + '  New BidRequestProductLineId = ' + cast(@NewBidRequestProductLineId as Varchar(30))


    -- Copy related BidRequestPriceRanges
    INSERT INTO BidRequestPriceRanges
          (BidHeaderId,        BidRequestManufacturerId,     BidRequestProductLineId,     RangeBase, RangeWeight)
    SELECT @CopyToBidHeaderId, @NewBidRequestManufacturerId, @NewBidRequestProductLineId, RangeBase, RangeWeight
    FROM BidRequestPriceRanges
    WHERE BidRequestProductLineId = @BidRequestProductLineId
    
    -- Copy related BidRequestOptions
    INSERT INTO BidRequestOptions
          (BidHeaderId,        ManufacturerId, ManufacturerProductLineId, OptionId, BidRequestManufacturerId,     BidRequestProductLineId,     [Name], [Weight])
    SELECT @CopyToBidHeaderId, ManufacturerId, ManufacturerProductLineId, OptionId, @NewBidRequestManufacturerId, @NewBidRequestProductLineId, [Name], [Weight]
    FROM BidRequestOptions
    WHERE BidRequestProductLineId = @BidRequestProductLineId


    fetch next from BRPLCur into @BidRequestProductLineId
  end
  close BRPLCur
  deallocate BRPLCur
  --

  Select @LoopCount = @LoopCount + 1 
  
  fetch next from BRMCur into @BidRequestManufacturerId
end

close BRMCur
deallocate BRMCur
--

set nocount off

END
```
