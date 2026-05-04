# Procedure: `dbo.usp_SetBidItemAIData`

_Generated on 2026-05-04T14:49:07.483Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SetBidItemAIData` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-07-10 10:02:05 |
| Modified | 2025-11-03 15:47:21 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidResultsId` | IN | int |  |
| 2 | `@ProductNames` | IN | varchar(4000) |  |
| 3 | `@TypeAheads` | IN | varchar(4000) |  |
| 4 | `@ShortDescription` | IN | varchar(4000) |  |
| 5 | `@FullDescription` | IN | varchar(4000) |  |
| 6 | `@UNSPSC` | IN | varchar(20) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidResults` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_SetBidItemAIData] @BidResultsId int, @ProductNames varchar(4000), @TypeAheads varchar(4000), @ShortDescription varchar(4000), @FullDescription varchar(4000), @UNSPSC varchar(20)
as
begin

-- Update First Item with new Data
 Update BidResults
   set ProductNames = @ProductNames,
       TypeAheads = @TypeAheads,
	   AIShortDesc = @ShortDescription,
	   AIFullDesc = @FullDescription,
	   AIUNSPSC = @UNSPSC,
	   AIDate = getdate()
  from BidResults with (rowlock,updlock)
 where BidResults.BidResultsId = @BidResultsId

-- Get List of Items to Update
Select BidResults.BidResultsId into #UpdateList
  from BidResults xr with (rowlock,updlock)
  join BidResults on BidResults.HashKey = xr.HashKey
                 and BidResults.Active = 1
 where xr.BidResultsId = @BidResultsId
   and xr.BidResultsId != BidResults.BidResultsId

/*
-- Update Everything that has the same HashKey
Update BidResults
   set ProductNames = @ProductNames,
       TypeAheads = @TypeAheads,
	   AIShortDesc = @ShortDescription,
	   AIFullDesc = @FullDescription,
	   AIUNSPSC = @UNSPSC,
	   AIDate = getdate()
  from BidResults with (rowlock,updlock)
  join #UpdateList ul on ul.BidResultsId = BidResults.BidResultsId
 option (maxdop 1)
*/
end
```
