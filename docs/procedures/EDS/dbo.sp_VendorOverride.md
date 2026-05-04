# Procedure: `dbo.sp_VendorOverride`

_Generated on 2026-05-04T13:07:57.555Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VendorOverride` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-01-31 21:26:21 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidResultsId` | IN | int |  |
| 2 | `@pSessionId` | IN | int |  |
| 3 | `@pReason` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `BidResultsChangeLog` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DetailChangeLog` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
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


CREATE      procedure dbo.sp_VendorOverride @pBidResultsId int, @pSessionId int, @pReason varchar(4096) as

declare @Type int,
	@BidRequestItemId int,
        @ItemId int,
	@BidHeaderId int,
	@BidImportId int,
	@BRChangeLogId int,
	@NewSortKey varchar(255)

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

insert BidResultsChangeLog (ChangeDate, BidResultsId, SessionId, UserId, Reason)
  select getdate(), @pBidResultsId, @pSessionId, Sessiontable.UserId, @pReason
    from BidResults
    left outer join SessionTable on SessionTable.SessionId = @pSessionId
   where BidResults.BidResultsId = @pBidResultsId

select @BRChangeLogId = scope_identity()

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

-- Get Current Ranking of Items
select * 
  into #BidSummary1
  from dbo.uf_BidAnalysisDetailItem(@BidRequestItemId)

select @NewSortKey = SortKey
  from #BidSummary1
 where BidResultsId = @pBidResultsId

if @@rowcount > 0
begin
  -- Deactivate other BidResults for this Item that have a higher ranking
  Update BidResults
     set Active = 0,
         Comments = case isnull(rtrim(ltrim(BidResults.Comments)),'')
                      when '' then @pReason
/*                        
                        case isnull(BidResults.ItemBidType,'') 
                          when 'A' then 'Bid in Error'
                          when 'C' then 'Item not Compliant'
                          when 'N' then 'Non-Compliant Item'
                         else BidResults.Comments
                        end */
                      else
                        BidResults.Comments + @pReason
                    end
    from BidResults
    join BidImports on BidImports.BidImportId = BidResults.BidImportId
    join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
                   and BidHeaders.BidHeaderId = @BidHeaderId
    join Items on Items.ItemId = BidResults.ItemId
   where BidResults.BidRequestItemId = @BidRequestItemId
--     and BidResults.BidResultsId != @pBidResultsId
       and isnull(Items.SortSeq,'') + 
         case isnull(BidImports.Active,0) 
           when 0 then '1' 
           else '0' 
         end +
         case isnull(BidResults.Active,0) 
           when 0 then '1' 
           else '0' 
         end +
         case isnull(BidResults.ItemBidType,'') 
           when '' then '1' 
           when 'N' then '1' 
           when 'C' then '0' 
           when 'S' then '0' 
           else '1'
         end +
         right(replicate('0',20) + convert(varchar(32),convert(int,round(isnull(BidResults.UnitPrice,0) * (1 - (isnull(BidImports.BidItemDiscountRate,0) / 100)),2) * 100)),20) +
         case isnull(BidResults.ItemBidType,'')
           when 'S' then '0'
           when 'C' then '1'
           else '2'
         end +
         right(replicate('0',18) + convert(varchar(18),isnull(BidResults.BidResultsId,0)),18) < @NewSortKey
end

-- Verify Item Active
Update BidResults
   set Active = 1
 where BidResultsId = @pBidResultsId
   and Active != 1

-- Deactivate Other Items if Import is Inactive
Update BidResults
   set Active = 0
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
                 and BidImports.Active = 0
                 and BidImports.BidImportId = @BidImportId
 where BidResults.BidResultsId != @pBidResultsId

-- Verify Import is Active
Update BidImports
   set Active = 1
  from BidImports
 where BidImports.BidImportId = @BidImportId
   and BidImports.Active = 1

drop table #BidSummary1

  select * 
    into #BidSummary
    from dbo.uf_BidAnalysisDetailItem(@BidRequestItemId)

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
    select Bids.BidId, BidRequestItems.ItemId, case isnull(BidImports.VendorId,0) when 0 then 0 when 7691 then 0 else BidResults.UnitPrice end UnitPrice, BidResults.Alternate, BidResults.QuantityBid, BidRequestItems.BidRequest, Awards.AwardId, case isnull(BidResults.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId where CrossRefs.ItemId = BidRequestItems.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) else BidResults.VendorItemCode end, case isnull(BidResults.VendorItemCode,'') when '' then (select top 1 CrossRefs.CrossRefId from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId where CrossRefs.ItemId = BidRequestItems.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) else (select top 1 CrossRefs.CrossRefId from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId where CrossRefs.PackedCode = BidResults.PackedVendorItemCode and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) end, case isnull(BidResults.ItemBidType,'') when '' then 'Not Specified' when 'N' then 'Non-Compliant' when 'C' then 'Compliant' when 'S' then 'As Specified' else 'Unknown' end ItemBidType, (select top 1 PackedCode from Items where Items.ItemId = BidRequestItems.ItemId order by Items.ItemId), case isnull(BidResults.VendorItemCode,'') when '' then (select top 1 CrossRefs.PackedCode from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId where CrossRefs.ItemId = BidRequestItems.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) else BidResults.PackedVendorItemCode end, BidResults.PageNo, BidResults.BidResultsId
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
```
