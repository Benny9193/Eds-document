# Procedure: `dbo.usp_BidRequestMergeActions`

_Generated on 2026-05-04T13:04:00.689Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidRequestMergeActions` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-24 16:13:59 |
| Modified | 2015-11-24 23:37:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidRequestItemIdSource` | IN | int |  |
| 2 | `@BidRequestItemIdTarget` | IN | int |  |
| 3 | `@ExcludeFlag` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `dbo.BidRequestItemMergeActions` | USER_TABLE |  |
| `dbo.BidRequestItems` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		Shawn Mason
-- Create date: 07/31/2015
-- Description:	Fulfills required action on BidRequestMerge Screen
-- =============================================
CREATE procedure [dbo].[usp_BidRequestMergeActions] 
	-- Add the parameters for the stored procedure here
	@BidRequestItemIdSource int = 0
	,@BidRequestItemIdTarget int = 0
	,@ExcludeFlag int = 0    -- 1 indicates to exclude this item source from ever merging

	  
AS
BEGIN
	SET NOCOUNT ON;
	------------------------
	-- Merging into new item
	-- Create new item from old item in ITEMS table
	Declare @Return int = 0
	Declare @ItemIdOld int = 0
	Declare @ItemIdNew int = 0
    Declare @CategoryId int = 0

	Select @ItemIdOld = ItemId, @CategoryId = BidHeaders.CategoryId 
	From BidRequestItems inner join 
		BidHeaders ON BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
	Where BidRequestItemId = @BidRequestItemIdSource

	-- Merging into new item
	If (@BidRequestItemIdTarget = 0) And (@BidRequestItemIdSource != 0) And (@ExcludeFlag = 0)    -- create new item
	BEGIN
		-- Determine next ItemCode value
		Declare @NextNumber varchar(64)

	  select top 1 @NextNumber= 'EDS' + right('00000' + cast(cast(SUBSTRING(Items.SortSeq,9,16) as int) + 1 as varchar),5)
		from dbo.Items
		left outer join Items i1 on i1.CategoryId = Items.CategoryId
								and i1.ItemCode = 'EDS' + right('00000' + cast(cast(SUBSTRING(Items.SortSeq,9,16) as int) + 1 as varchar),5)
	   where Items.CategoryId = @CategoryId
		 and LEN(Items.ItemCode) = 8
		 and substring(Items.SortSeq,1,8) = 'EDS'
		 and ISNUMERIC(substring(Items.SortSeq,9,16)) = 1
		 and i1.ItemId is null
	   order by Items.SortSeq desc

		if @@rowcount = 0
		  begin
			select @NextNumber = 'EDS00001'
		  end

		INSERT INTO [dbo].[Items]
			   ([Active]
			   ,[CategoryId]
			   ,[ItemCode]
			   ,[Description]
			   ,[UnitId]
			   ,[ParentCatalogId]
			   ,[HeadingId]
			   ,[RTK]
			   ,[SortSeq]
			   ,[EditionId]
			   ,[CopyrightYear]
			   ,[PackedCode]
			   ,[DateDeactivated]
			   ,[DistrictId]
			   ,[BrandName]
			   ,[ManufacturorNumber]
			   ,[VendorId]
			   ,[VendorPartNumber]
			   ,[ItemsPerUnit]
			   ,[ListPrice]
			   ,[ExtraDetail]
			   ,[ShortDescription]
			   ,[KeywordId]
			   ,[AlternateItemCode]
			   ,[SectionId]
			   ,[UOMDivisor]
			   ,[RedirectedItemId]
			   ,[ListPriceSource]
			   ,[FullDescription]
			   ,[CrossRefText]
			   ,[StandardItem]
			   ,[BidderToSupplyVendor]
			   ,[BidderToSupplyVendorPartNbr]
			   ,[ManufacturerId]
			   ,[VendorToSupplyManufacturer])
		 SELECT
			   Active
			   ,CategoryId
			   ,ItemCode = @NextNumber
			   ,[Description] --= @MasterDesc
			   ,UnitId
			   ,ParentCatalogId
			   ,HeadingId
			   ,RTK
			   ,SortSeq
			   ,EditionId
			   ,CopyrightYear
			   ,PackedCode
			   ,DateDeactivated
			   ,DistrictId
			   ,BrandName
			   ,ManufacturorNumber
			   ,VendorId
			   ,VendorPartNumber
			   ,ItemsPerUnit
			   ,ListPrice
			   ,ExtraDetail
			   ,ShortDescription
			   ,KeywordId
			   ,AlternateItemCode
			   ,SectionId
			   ,UOMDivisor
			   ,RedirectedItemId
			   ,ListPriceSource
			   ,FullDescription 
			   ,CrossRefText
			   ,StandardItem
			   ,BidderToSupplyVendor
			   ,BidderToSupplyVendorPartNbr
			   ,ManufacturerId
			   ,VendorToSupplyManufacturer
			   From Items 
			   WHERE ItemId = @ItemIdOld

			   Set @ItemIdNew  = (Select Scope_Identity()) --DCH 11/24/2015 @@IDENTITY)

			-- Create CrossRef needed for system
			insert into [dbo].[CrossRefs]
			       ([Active]
			       ,[ItemId]
			       ,[VendorItemCode]
			       ,[PackedCode])
			    values (1
			            , @ItemIdNew
			            , @NextNumber
			            , dbo.uf_PackCode(@NextNumber))

			-- Create new item in BidRequestItems pointing to newly created ItemId and sum qty items, num of requ, BidReq, and ReqCnt
			INSERT INTO [dbo].[BidRequestItems]
				   ([BidHeaderId]
				   ,[ItemId]
				   ,[BidRequest]
				   ,[Active]
				   ,[RequisitionCount]
				   ,[Status]
				   ,[Comments]
				   ,[BidRequestAmount]
				   ,[Checksum])
			 SELECT
					BidHeaderId
				   ,ItemId = @ItemIdNew
				   ,BidRequest
				   ,Active
				   ,RequisitionCount
				   ,Status
				   ,Comments
				   ,BidRequestAmount
				   ,Checksum
				   From BidRequestItems
				   WHERE BidRequestItemId = @BidRequestItemIdSource

			   Set @BidRequestItemIdTarget = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

			   -- Now add in counts from both BidRequestItemIds


			-- Create new entry for each item being merged in table "BidRequestItemMergeActions" for historical purposes
			Insert INTO dbo.BidRequestItemMergeActions
				([BidRequestItemId]
				,[DestinationBidRequestItemId]
				,[Merged]
				)
				VALUES
				(@BidRequestItemIdSource
				,@BidRequestItemIdTarget
				,1
				)

			-- Deactivate all items merged

			Update BidRequestItems
			Set Active = 0
				--,MasterItemCodePtr = @ItemIdNew
			Where BidRequestItemId = @BidRequestItemIdSource

			-- Update BidHeaderDetail for items that relate to items being merged pointing to new BidRequestItemId
			Update BidHeaderDetail
			Set BidRequestItemId = @BidRequestItemIdTarget
			Where BidRequestItemId = @BidRequestItemIdSource

			Set @Return = @BidRequestItemIdTarget  --@BidRequestItemIdTarget
		END  -- End Merge into new item section
	ELSE If @ExcludeFlag = 1
		BEGIN -- exclude item from ever being merged
			Insert INTO dbo.BidRequestItemMergeActions
				([BidRequestItemId]
				,[DestinationBidRequestItemId]
				,[Merged]
				)
				VALUES
				(@BidRequestItemIdSource
				,0
				,0
				)

			Select @Return = 0
		END -- End of item ever begin merged
	-----------------------
	Else
		Begin
		-- Merging items into existing item
		Declare @RequisitionCount int = 0
		Declare @BidRequest int = 0

		Select @RequisitionCount = RequisitionCount, 
			   @BidRequest = BidRequest
		From BidRequestItems
		Where BidRequestItemId = @BidRequestItemIdSource

		-- Merge counts from source to target
		Update BidRequestItems 
		Set RequisitionCount = RequisitionCount + @RequisitionCount
			,BidRequest = BidRequest + @BidRequest
		Where BidRequestItemId = @BidRequestItemIdTarget 

		-- Deactivate all items merged

		Update BidRequestItems
		Set Active = 0
		Where BidRequestItemId = @BidRequestItemIdSource

		-- Update BidHeaderDetail for items that relate to items being merged pointing to new BidRequestItemId
		Update BidHeaderDetail
		Set BidRequestItemId = @BidRequestItemIdTarget
		Where BidRequestItemId = @BidRequestItemIdSource

		-- Create new entry for each item being merged in table "BidRequestItemMergeActions" for historical purposes
		Insert INTO dbo.BidRequestItemMergeActions
			([BidRequestItemId]
			,[DestinationBidRequestItemId]
			,[Merged]
			)
			VALUES
			(@BidRequestItemIdSource
			,@BidRequestItemIdTarget
			,1
			)

		Select @Return = 0
	End
	
	Select @Return
END
```
