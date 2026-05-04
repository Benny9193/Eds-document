# Procedure: `dbo.sp_VendorOverrideLine`

_Generated on 2026-05-04T13:04:00.486Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VendorOverrideLine` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-03-06 21:26:34 |
| Modified | 2014-01-10 17:08:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pBidResultsId` | IN | int |  |
| 3 | `@pSelected` | IN | int |  |
| 4 | `@pVOMId` | IN | int |  |
| 5 | `@pReason` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `BidResultsChangeLog` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DetailChangeLog` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.uf_BidAnalysisDetailItem` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--sp_AwardBidHeader 1023
--select * from BidRequestItems where BidRequestItemid = 2049100
--sp_VendorOverride 6335194, 48041683, 0, 'Test2'
--select count(*) from BidResultsChangeLog
--select * from Detail where DetailId = 6335194
--select * from BidResults where BidRequestItemId = 2049100
--select * from BidHeaders where BidHeaderId = 1023
--select * from BidHeaderDetail where DetailId = 6335194
--select * from Requisitions where RequisitionId = 190930
--select * from BidItems join Bids on Bids.BidId = BidItems.BidId and Bids.BidHeaderId = 1023 where ItemId = 1797763
--delete BidItems where BidItemId = 3679686

CREATE    procedure [dbo].[sp_VendorOverrideLine] @pSessionId int, @pBidResultsId int, @pSelected int, @pVOMId int, @pReason varchar(4096) as

declare @Type int,
	@BidRequestItemId int,
        @ItemId int,
	@BidHeaderId int,
	@BidImportId int,
	@BRChangeLogId int,
	@BidStatus int,
	@BidItemStatus int,
	@NewSortKey varchar(255)

insert DebugMsgs (Msg)
 values ('VOL Session=' + isnull(cast(@pSessionId as varchar(16)),'<NULL>') + ' BRI=' + isnull(cast(@pBidResultsId as varchar(16)),'<NULL>') + ' Selected=' + isnull(cast(@pSelected as varchar(16)),'<NULL>') + ' VOM=' + isnull(cast(@pVOMId as varchar(16)),'<NULL>') + ' Reason="' + isnull(@pReason,'<NULL>') + '"')

-- Selected States as Follows
-- Null = Do Nothing
-- 1 = Deactivate Item - Reason must be given why and selected item has not been overridden before
-- 2 = Activate Item - new selected item 
-- 3 = Deactivate Item - Reason must be given why and item has been overridden before
-- 4 = Activate Item - Reason does not matter as this item is higher than selected item, only used if item was deactivated before

if @pSelected = 1 -- or @pSelected = 2
begin
  insert BidResultsChangeLog (ChangeDate, BidResultsId, SessionId, UserId, Reason, VOMId)
    select getdate(), @pBidResultsId, @pSessionId, Sessiontable.UserId, @pReason, @pVOMId
      from BidResults
      left outer join SessionTable on SessionTable.SessionId = @pSessionId
     where BidResults.BidResultsId = @pBidResultsId

  select @BRChangeLogId = scope_identity()

  -- Deactivate Item if Active
  Update BidResults
     set Active = 0,
         VOMId = @pVOMId,
         Comments = rtrim(@pReason)
   where BidResultsId = @pBidResultsId
     and Active = 1
end

if @pSelected = 3 
begin
  -- nothing is happening to this line item, but if the reason for decline is changed, update it
  Update BidResults
     set VOMId = @pVOMId,
         Comments = rtrim(@pReason)
   where BidResultsId = @pBidResultsId
end

if @pSelected = 4 -- or @pSelected = 2
begin
  insert BidResultsChangeLog (ChangeDate, BidResultsId, SessionId, UserId, Reason, VOMId)
    select getdate(), @pBidResultsId, @pSessionId, Sessiontable.UserId, @pReason, @pVOMId
      from BidResults
      left outer join SessionTable on SessionTable.SessionId = @pSessionId
     where BidResults.BidResultsId = @pBidResultsId

  select @BRChangeLogId = scope_identity()

  select @BidStatus = isnull(BidImports.Active,0),
         @BidItemStatus = isnull(BidResults.Active,0),
         @BidImportId = BidImports.BidImportId
    from BidResults with (nolock)
    join BidImports on BidImports.BidImportId = BidResults.BidImportId
   where BidResults.BidResultsId = @pBidResultsId

  if @BidStatus = 0
  begin
    Update BidResults
       set Active = 0
     where BidImportId = @BidImportId
       and Active = 1

    Update BidImports
       set Active = 1
     where BidImportId = @BidImportId
       and isnull(Active,0) = 0
  end

  -- activate Item if inActive
  Update BidResults
     set Active = 1,
         VOMId = null,
         Comments = null
   where BidResultsId = @pBidResultsId
end

if @pSelected = 2
begin
  insert BidResultsChangeLog (ChangeDate, BidResultsId, SessionId, UserId, Reason, VOMId)
    select getdate(), @pBidResultsId, @pSessionId, Sessiontable.UserId, @pReason, @pVOMId
      from BidResults
      left outer join SessionTable on SessionTable.SessionId = @pSessionId
     where BidResults.BidResultsId = @pBidResultsId

  select @BRChangeLogId = scope_identity()

  -- Update Bid Results
  Update BidResults
     set VOMId = @pVOMId,
         Comments = rtrim(@pReason)
   where BidResultsId = @pBidResultsId

  create table #DetailChanges (
	DetailId int null,
	RequisitionId int null,
	ItemId int null,
	OrigQty int null,
	OrigBidPrice int null,
	OrigBidItemId int null,
	OrigVendorId int null,
	BRChangeLogId int null)

  begin transaction AwardBidItem

  select @BidStatus = isnull(BidImports.Active,0),
         @BidItemStatus = isnull(BidResults.Active,0),
         @BidImportId = BidImports.BidImportId
    from BidResults with (nolock)
    join BidImports on BidImports.BidImportId = BidResults.BidImportId
   where BidResults.BidResultsId = @pBidResultsId

  if @BidStatus = 0
  begin
    Update BidResults
       set Active = 0
     where BidImportId = @BidImportId
       and Active = 1

    Update BidImports
       set Active = 1
     where BidImportId = @BidImportId
       and isnull(Active,0) = 0
  end

  update BidResults
     set Active = 1--,
--         VomId = null,
--         Comments = null
   where BidResultsId = @pBidResultsId

  select @BidRequestItemId = BidResults.BidRequestItemId,
         @BidHeaderId = BidRequestItems.BidHeaderId,
         @ItemId = BidRequestItems.ItemId,
         @Type = Category.Type,
         @BidImportId = BidResults.BidImportId
    from BidResults
    join BidRequestItems on BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId
    join BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
    join Category on Category.CategoryId = BidHeaders.CategoryId
   where BidResults.BidResultsId = @pBidResultsId

  insert #DetailChanges (DetailId, RequisitionId, ItemId, OrigQty, OrigBidPrice, OrigBidItemId, OrigVendorId, BRChangeLogId)
    select Detail.DetailId, Detail.RequisitionId, Detail.ItemId, Detail.Quantity, Detail.BidPrice, Detail.BidItemId, Detail.VendorId, @BRChangeLogId
      from Detail
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
     where PO.POId is null
       and case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end = @BidHeaderId
       and Detail.ItemId = @ItemId

  select * 
    into #BidSummary
    from dbo.uf_BidAnalysisDetailItem(@BidRequestItemId)
   order by SortKey
   
 -- Following Code added 06/26/2013 DCH
 	  insert Bids (Active, EffectiveFrom, EffectiveUntil, Name, PricePlanId, CategoryId, VendorId, BidDiscountRate, VendorBidNumber, DistrictId, ItemsBid, AmountBid, Description, BidHeaderId, BidImportId, AdditionalHandlingAmount, FreeHandlingAmount, FreeHandlingStart, FreeHandlingEnd, WebsiteLink)
		select 1,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   Vendors.Name Name,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   BidImports.VendorId,
			   BidImports.BidItemDiscountRate,
			   BidImports.VendorBidNumber,
			   BidHeaders.DistrictId,
			   BidImports.ItemsBid,
			   BidImports.AmountBid,
			   '' Description,
			   BidHeaders.BidHeaderId,
			   BidImports.BidImportId,
			   BidImports.AdditionalHandlingAmount, 
			   BidImports.FreeHandlingAmount, 
			   BidImports.FreeHandlingStart, 
			   BidImports.FreeHandlingEnd,
			   BidImports.WebsiteLink
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						 and BidImports.Active = 1 -- Added 11/01/2009 Not Sure why it was missing
		  join Vendors on Vendors.VendorId = BidImports.VendorId
		  left outer join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
		                      and Bids.VendorId = BidImports.VendorId
		                      and Bids.Active = 1
		 where BidHeaders.BidHeaderId = @BidHeaderId
		   and Bids.BidId is null
		union (
		select 1,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   Vendors.Name Name,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   Vendors.VendorId,
			   null,
			   null,
			   BidHeaders.DistrictId,
			   0,
			   0,
			   '' Description,
			   BidHeaders.BidHeaderId,
			   null,
			   null,
			   null,
			   null,
			   null,
			   null
		  from BidHeaders
		  join Vendors on Vendors.VendorId = 7691
		  left outer join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
		                      and Bids.VendorId = Vendors.VendorId
		                      and Bids.Active = 1
		 where BidHeaders.BidHeaderId = @BidHeaderId
		   and Bids.BidId is null
		)

	  insert BidsCatalogList (BidId, CatalogId, DiscountRate)
		select Bids.BidId, BidImportCatalogList.CatalogId, BidImportCatalogList.DiscountRate
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		  left outer join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
		                                 and BidsCatalogList.CatalogId = BidImportCatalogList.CatalogId
		 where BidHeaders.BidHeaderId = @BidHeaderId
		   and BidsCatalogList.BidCatalogId is null

	  insert Awards (Active, BidId, VendorId, PricePlanId, CategoryId, BidStartDate, BidEndDate, VendorBidNumber, ItemsBid, AmountBid, BidDiscountRate, StateContractDiscount, BidHeaderId)
		select 1,
			   Bids.BidId,
			   BidImports.VendorId,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   BidImports.VendorBidNumber,
			   BidImports.ItemsBid,
			   BidImports.AmountBid,
			   BidImports.BidItemDiscountRate,
			   null,
			   BidHeaders.BidHeaderId
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						 and BidImports.Active = 1
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		 left outer join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
		                       and Awards.VendorId = BidImports.VendorId
		                       and Awards.BidId = Bids.BidId
		                       and Awards.Active = 1
		 where BidHeaders.BidHeaderId = @BidHeaderId
		   and Awards.AwardId is null
		union (
		select 1,
			   Bids.BidId,
			   Vendors.VendorId,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   null,
			   null,
			   null,
			   null,
			   null,
			   BidHeaders.BidHeaderId
		  from BidHeaders
		  join Vendors on Vendors.VendorId = 7691
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = Vendors.VendorId
				   and Bids.Active = 1
  		  left outer join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
		                        and Awards.VendorId = Bids.VendorId
		                        and Awards.BidId = Bids.BidId
		                        and Awards.Active = 1
		 where BidHeaders.BidHeaderId = @BidHeaderId
		   and Awards.AwardId is null
		)

	  insert AwardsCatalogList (AwardId, CatalogId, DiscountRate)
		select Awards.AwardId, BidImportCatalogList.CatalogId, BidImportCatalogList.DiscountRate
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		  join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
					 and Awards.VendorId = BidImports.VendorId
					 and Awards.Active = 1
		  left outer join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
		                                   and AwardsCatalogList.CatalogId = BidImportCatalogList.CatalogId
		 where BidHeaders.BidHeaderId = @BidHeaderId
           and AwardsCatalogList.AwardCatalogId is null
           
  -- End of added code 06/26/2013 DCH

  -- Update Existing BidItems
  Update BidItems
     set ItemId = BidResults.ItemId,
         Price = BidResults.UnitPrice, 
         Alternate = BidResults.Alternate, 
         BidQuantity = BidResults.QuantityBid,
         BidRequest = BidResults.Quantity,
         BidId = (select top 1 b.BidId from BidImports bi join Bids b on b.BidImportId = bi.BidImportId and b.Active = 1 where bi.BidImportId = BidResults.BidImportId order by b.BidId desc),
         AwardId = (select top 1 a.AwardId from BidImports bi join Awards a on a.BidImportId = bi.BidImportId and a.Active = 1 where bi.BidImportId = BidResults.BidImportId order by a.AwardId desc),
         VendorItemCode = case isnull(BidResults.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) else BidResults.VendorItemCode end,
         CrossRefId = (select top 1 CrossRefs.CrossRefId from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId),
         ItemBidType = case isnull(BidResults.ItemBidType,'') when '' then 'Not Specified' when 'N' then 'Non-Compliant' when 'C' then 'Compliant' when 'S' then 'As Specified' else 'Unknown' end,
         PackedItemCode = Items.PackedCode,
         PackedVendorItemCode = case isnull(BidResults.VendorItemCode,'') when '' then (select top 1 CrossRefs.PackedCode from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) else BidResults.PackedVendorItemCode end, 
         PageNo = case isnull(BidResults.PageNo,0) when 0 then convert(int,(select top 1 CrossRefs.Page from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 and isnumeric(CrossRefs.Page) = 1 order by CrossRefs.CrossRefId)) else BidResults.PageNo end,
         BidResultsId = BidResults.BidResultsId
    from BidHeaders
    join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                        and BidRequestItems.Active = 1
                        and BidRequestItems.BidRequestItemId = @BidRequestItemId
    join Items on Items.ItemId = BidRequestItems.ItemId
              and Items.Active = 1
    join BidItems on BidItems.ItemId = Items.ItemId
    join Bids on Bids.BidId = BidItems.BidId
             and Bids.Active = 1
             and Bids.BidHeaderId = BidHeaders.BidHeaderId
    join BidImports on BidImports.BidImportId = Bids.BidImportId
--                   and BidImports.Active = 1
    join Awards on Awards.BidId = Bids.BidId
               and Awards.Active = 1
    join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                   and BidResults.BidResultsId = (select top 1 BidResultsId from #BidSummary bs where bs.BidRequestItemId = BidResults.BidRequestItemId and bs.BidType in ('As Specified','Compliant') and bs.ResultsStatus = 1 order by SortKey, BidResultsId)

  insert BidItems (BidId, ItemId, Price, Alternate, BidQuantity, BidRequest, AwardId, VendorItemCode, CrossRefId, ItemBidType, PackedItemCode, PackedVendorItemCode, PageNo, BidResultsId)
    select Bids.BidId, BidRequestItems.ItemId,
           case isnull(BidImports.VendorId,0) 
             when 0 then 0 
             when 7691 then 0 
             else BidResults.UnitPrice 
           end UnitPrice, 
           BidResults.Alternate, BidResults.QuantityBid, BidRequestItems.BidRequest, Awards.AwardId, 
           case isnull(BidResults.VendorItemCode,'') 
             when '' then 
               (select top 1 CrossRefs.VendorItemCode 
                  from CrossRefs 
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.ItemId = BidRequestItems.ItemId 
                   and CrossRefs.Active = 1 
                 order by CrossRefs.CrossRefId) 
             else BidResults.VendorItemCode 
           end, 
           case isnull(BidResults.VendorItemCode,'') 
             when '' then 
               (select top 1 CrossRefs.CrossRefId 
                  from CrossRefs 
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.ItemId = BidRequestItems.ItemId 
                   and CrossRefs.Active = 1 
                 order by CrossRefs.CrossRefId) 
             else 
               (select top 1 CrossRefs.CrossRefId 
                  from CrossRefs 
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.PackedCode = BidResults.PackedVendorItemCode 
                   and CrossRefs.Active = 1 
                 order by CrossRefs.CrossRefId) 
           end, 
           case isnull(BidResults.ItemBidType,'') 
             when '' then 'Not Specified' 
             when 'N' then 'Non-Compliant' 
             when 'C' then 'Compliant' 
             when 'S' then 'As Specified' 
             else 'Unknown' 
           end ItemBidType, 
           (select top 1 PackedCode 
              from Items 
             where Items.ItemId = BidRequestItems.ItemId 
             order by Items.ItemId), 
           case isnull(BidResults.VendorItemCode,'') 
             when '' then 
               (select top 1 CrossRefs.PackedCode 
                  from CrossRefs 
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.ItemId = BidRequestItems.ItemId 
                   and CrossRefs.Active = 1 
                 order by CrossRefs.CrossRefId) 
             else BidResults.PackedVendorItemCode 
           end, BidResults.PageNo, BidResults.BidResultsId
      from BidHeaders
      join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                          and BidRequestItems.Active = 1
                          and BidRequestItems.BidRequestItemId = @BidRequestItemId
      join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                     and BidResults.BidResultsId = (select top 1 BidResultsId from #BidSummary bs where bs.BidRequestItemId = BidResults.BidRequestItemId and bs.BidType in ('As Specified','Compliant') and bs.ResultsStatus = 1 order by SortKey, BidResultsId)
      join BidImports on BidImports.BidImportId = BidResults.BidImportId
                     and BidImports.Active = 1
      join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.VendorId = isnull(BidImports.VendorId,7691)
               and Bids.Active = 1
      join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
                 and Awards.VendorId = isnull(BidImports.VendorId,7691)
                 and Awards.Active = 1
      left outer join BidItems on BidItems.BidId = Bids.BidId
                              and BidItems.ItemId = BidRequestItems.ItemId
     where BidItems.BidItemId is null
     order by BidRequestItems.ItemId

  -- Update Existing BidItems that don't match to NoBid
  Update BidItems
     set ItemId = BidRequestItems.ItemId,
         Price = 0, 
         Alternate = null, 
         BidQuantity = null,
         BidRequest = null,
         BidId = (select top 1 b.BidId from Bids b where b.BidHeaderId = BidHeaders.BidHeaderId and b.VendorId = 7691 and b.Active = 1 order by b.BidId desc),
         AwardId = (select top 1 a.AwardId from Awards a where a.BidHeaderId = BidHeaders.BidHeaderId and a.VendorId = 7691 and a.Active = 1 order by a.AwardId desc),
         VendorItemCode = null,
         CrossRefId = (select top 1 CrossRefs.CrossRefId from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId),
         ItemBidType = null,
         PackedItemCode = Items.PackedCode,
         PackedVendorItemCode = null, 
         PageNo = null,
         BidResultsId = null
    from BidHeaders
    join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                        and BidRequestItems.Active = 1
                        and BidRequestItems.BidRequestItemId = @BidRequestItemId
    join Items on Items.ItemId = BidRequestItems.ItemId
              and Items.Active = 1
    join BidItems on BidItems.ItemId = Items.ItemId
    join Bids on Bids.BidId = BidItems.BidId
             and Bids.Active = 1
             and Bids.BidHeaderId = BidHeaders.BidHeaderId
    join BidImports on BidImports.BidImportId = Bids.BidImportId
                   and BidImports.Active = 1
    join Awards on Awards.BidImportId = BidImports.BidImportId
               and Awards.Active = 1
    left outer join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                              and BidResults.BidResultsId = (select top 1 BidResultsId from #BidSummary bs where bs.BidRequestItemId = BidResults.BidRequestItemId and bs.BidType in ('As Specified','Compliant') and bs.ResultsStatus = 1 order by SortKey, BidResultsId)
   where BidResults.BidResultsId is null

  -- Remove Working Table
  drop table #BidSummary

  commit transaction AwardBidItem

  -- Force Reprocess of Items
  update Detail
     set Reproc = 1
    from detail
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null
     and case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end = @BidHeaderId
     and Detail.ItemId = @ItemId

-- Log Changes
  insert DetailChangeLog (DetailId, RequisitionId, ItemId, OrigQty, NewQty, OrigBidPrice, NewBidPrice, OrigBidItemId, NewBidItemId, UserId, SessionId, ChangeDate, OrigVendorId, NewVendorId, BRChangeLogId)
    select dc.DetailId, dc.RequisitionId, dc.ItemId, dc.OrigQty, Detail.Quantity, dc.OrigBidPrice, Detail.BidPrice, dc.OrigBidItemId, Detail.BidItemId, Sessiontable.UserId, @pSessionId, getdate(), dc.OrigVendorId, Detail.VendorId, dc.BRChangeLogId
      from #DetailChanges dc
      join Detail on Detail.DetailId = dc.DetailId
      left outer join SessionTable on SessionTable.SessionId = @pSessionId

  drop table #DetailChanges
end
```
