# Procedure: `dbo.usp_MakeZC`

_Generated on 2026-05-04T14:49:07.474Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_MakeZC` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-12-02 15:35:16 |
| Modified | 2022-12-03 20:51:20 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `sp_AwardBidHeader` | unresolved |  |
| `sp_BidCopyChangePP` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_MakeZC] as
declare @BidHeaderId int,
		@BidRequestItemId int
--select * from Priceplans where Code like 'Z%'
declare bc cursor for
select BidHeaderId
  from BidHeaders
 where PriceplanId = 1
   and getdate() between EffectiveFrom and EffectiveUntil

open bc

fetch next from bc into @BidHeaderId

while @@FETCH_STATUS = 0
begin
	print 'Copying Bid ' + cast(@BidHeaderId as varchar) + ' to ZC'
	exec sp_BidCopyChangePP @BidHeaderId,4,1

	-- Award New Bid
	exec sp_AwardBidHeader @BidHeaderId

	-- Wait 2 Minutes
	waitfor delay '00:02:00'

	fetch next from bc into @BidHeaderId
end

close bc
deallocate bc

-- Get Bids where Blick was Awarded
declare bc cursor for
select BidHeaderId
  from BidHeaders
 where PriceplanId = 4
   and getdate() between EffectiveFrom and EffectiveUntil
   and exists(select BidId from Bids where Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.VendorId = 4 and Bids.Active = 1)

open bc

fetch next from bc into @BidHeaderId

while @@FETCH_STATUS = 0
begin
	print 'Removing Blick Items from Bid ' + cast(@BidHeaderId as varchar)

	-- Remove Items where Blick was Awarded
	Update BidRequestItems 
	   set Active = 0
	  from BidItems
	  join Bids on Bids.BidHeaderId = @BidHeaderId
	           and Bids.VendorId = 4
			   and Bids.Active = 1
			   and Bids.BidId = BidItems.BidId
	  join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
	  join BidRequestItems on BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId

	-- Remove Blicks Submission
	Update BidImports
	   set Active = 0
	  from BidItems
	  join Bids on Bids.BidHeaderId = @BidHeaderId
	           and Bids.VendorId = 4
			   and Bids.Active = 1
	  join BidImports on BidImports.BidImportId = Bids.BidImportId

	-- Reaward Bid without Blick items
	exec sp_AwardBidHeader @BidHeaderId

	fetch next from bc into @BidHeaderId
end

close bc
deallocate bc
```
