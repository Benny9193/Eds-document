# Procedure: `dbo.usp_BidRequestMergeActionsUNDO-wait`

_Generated on 2026-05-04T13:07:57.756Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidRequestMergeActionsUNDO-wait` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-27 13:05:50 |
| Modified | 2015-09-01 16:00:40 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidRequestItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidRequestItemMergeActions` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `dbo.BidRequestItemMergeActions` | USER_TABLE |  |
| `dbo.BidRequestItems` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		Shawn Mason
-- Create date: 08-27-
-- Description:	08-27-2015
-- =============================================
CREATE PROCEDURE [dbo].[usp_BidRequestMergeActionsUNDO-wait] 
	@BidRequestItemId int = 0
	  
AS
BEGIN
	SET NOCOUNT ON;
	-- Verify Item has been merged previously
	Declare @MergedFlag tinyint = 0
	Declare @DestinationBidRequestItemId int = 0

	Select @MergedFlag = Merged, @DestinationBidRequestItemId=DestinationBidRequestItemId  From [dbo].[BidRequestItemMergeActions] Where [BidRequestItemId] = @BidRequestItemId 
	If @MergedFlag = 1 --verifying record was actually merged at one time
	BEGIN
		Declare @BidRequest int = 0
		Declare @RequisitionCount int = 0
		Select @BidRequest = BidRequest, @RequisitionCount = RequisitionCount From [dbo].[BidRequestItems] Where [BidRequestItemId] = @BidRequestItemId

		-- Reduce counts			
		Update BidRequestItems
		Set BidRequest = BidRequest - @BidRequest
			,RequisitionCount = RequisitionCount - @RequisitionCount
		Where BidRequestItemId = @DestinationBidRequestItemId

		--Reactivate BidRequestItem
		Update [dbo].[BidRequestItems]
		Set Active = 1
		Where BidRequestItemId = @BidRequestItemId

		-- Point BidHeaderDetails items back to original target
		Update BidHeaderDetail
			Set BidRequestItemId = BidRequestItems.BidRequestItemId--@BidRequestItemId
		  from BidHeaderDetail
		  join Detail on Detail.DetailId = BidHeaderDetail.DetailId
		  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaderDetail.BidHeaderId
		                      and BidRequestItems.ItemId = Detail.ItemId
		                      and BidRequestItems.Active = 1
		 Where BidHeaderDetail.BidRequestItemId = @DestinationBidRequestItemId

		--Remove merged Record
		Delete BidRequestItemMergeActions
		Where  BidRequestItemId = @BidRequestItemId

		Select 0 -- successful
	END
    ELSE
		Select 1  -- UNDO not possible
	
END
```
