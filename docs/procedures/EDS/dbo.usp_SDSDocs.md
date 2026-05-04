# Procedure: `dbo.usp_SDSDocs`

_Generated on 2026-05-04T13:04:00.740Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SDSDocs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-02-21 12:45:25 |
| Modified | 2025-07-24 16:03:22 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pDetailId` | IN | int |  |
| 3 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `SDSDocs` | USER_TABLE |  |
| `vw_DMSSDSDocuments` | VIEW |  |
| `vw_SDSItems` | VIEW |  |
| `vw_SDSItemsAll` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_SDSDocs 13573286,null,12880
CREATE   procedure [dbo].[usp_SDSDocs] @pItemId int, @pDetailId int, @pBidHeaderId int = null
as
begin
declare @ItemId int = null,
		@BidItemId int = null,
		@CrossRefId int = null

declare @BidList table (
BidHeaderId int)

declare @Docs table (
Id	uniqueidentifier null,
ItemId	int not null,
CrossRefId	int null,
MSDSId		int null,
[URL]		varchar(1024) not null,
DocId		uniqueidentifier null)

if @pItemId is null and @pDetailId is not null
begin
	select @ItemId = Detail.ItemId,
			@BidItemId = Detail.BidItemId,
			@CrossRefId = Detail.CrossRefId
	  from Detail
	 where Detail.DetailId = @pDetailId

	insert @Docs (ItemId, CrossRefId, MSDSId, [URL])
	  select BidItems.ItemId, BidItems.CrossRefId, si.SafetyDataSheetId, si.SDSURL
	  from BidResults
	  join vw_SDSItemsAll si on si.SDSURL = trim(BidResults.SDS_URL)
	  join BidItems on BidItems.BidResultsId = BidResults.BidResultsId
	               and BidItems.BidItemId = coalesce(@BidItemId,0)
	  left outer join @Docs d on d.URL = si.SDSURL
	 where BidResults.SDS_URL like 'http%'
	   and d.ItemId is null

	insert @Docs (ItemId, CrossRefId, MSDSId, [URL])
	  select CrossRefs.ItemId, CrossRefs.CrossRefId, si.SafetyDataSheetId, si.SDSURL
	  from CrossRefs
	  join vw_SDSItemsAll si on si.SDSURL = trim(CrossRefs.MSDSRef)
	  left outer join @Docs d on d.URL = si.SDSURL
	 where CrossRefs.MSDSRef like 'http%'
	   and d.ItemId is null
	   and CrossRefs.CrossRefId = coalesce(@CrossRefId,0)
end
else
begin
	select @ItemId = @pItemId

	insert @BidList (BidHeaderId)
	select BidHeaders.BidHeaderId
	  from BidHeaders
	 Where BidHeaders.BidHeaderId = @pBidHeaderId

	while @@ROWCOUNT > 0
	begin
		insert @BidList (BidHeaderId)
		  select BidHeaders.BidHeaderId
		    from BidHeaders
			left outer join @BidList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
		   where ParentBidHeaderId in (Select BidHeaderId from @BidList)
		     and bl.BidHeaderId is null
	end

	insert @Docs (ItemId, CrossRefId, MSDSId, [URL])
	  select BidItems.ItemId, BidItems.CrossRefId, si.SafetyDataSheetId, si.SDSURL
	  from BidResults
	  join vw_SDSItemsAll si on si.SDSURL = BidResults.SDS_URL
	  join BidItems on BidItems.BidResultsId = BidResults.BidResultsId
	               and BidItems.ItemId = coalesce(@ItemId,0)
	  join Bids on Bids.BidId = BidItems.BidId
	           and Bids.BidHeaderId in (Select BidHeaderId from @BidList)
	  left outer join @Docs d on d.URL = si.SDSURL
	 where BidResults.SDS_URL like 'http%'
	   and d.ItemId is null

	insert @Docs (ItemId, CrossRefId, MSDSId, [URL])
	  select CrossRefs.ItemId, CrossRefs.CrossRefId, si.SafetyDataSheetId, si.SDSURL
	  from CrossRefs
	  join BidsCatalogList on BidsCatalogList.CatalogId = CrossRefs.CatalogId
	  join Bids on Bids.BidId = BidsCatalogList.BidId
	           and Bids.Active = 1
			   and Bids.BidHeaderId in (Select BidHeaderId from @BidList)
	  join vw_SDSItemsAll si on si.SDSURL = CrossRefs.MSDSRef
	  left outer join @Docs d on d.URL = si.SDSURL
	 where CrossRefs.MSDSRef like 'http%'
	   and d.ItemId is null
	   and CrossRefs.ItemId = coalesce(@ItemId,0)
end

insert @Docs (Id, ItemId, CrossRefId, MSDSId, [URL])
  select SDSDocs.Id, SDSDocs.ItemId, SDSDocs.CrossRefId, SDSDocs.MSDSId, SDSDocs.OrigURL
    from SDSDocs
	left outer join @Docs d on d.URL = SDSDocs.OrigURL
   where d.ItemId = @ItemId
     and d.ItemId is null

insert @Docs(ItemId, MSDSId, [URL])
  select si.ItemId, si.MSDSId, 'https://edsiq.ed-data.com/SDS/SDSDocViewer?DocId=' + cast(dd.DocId as varchar(50))
    from vw_SDSItems si
	join vw_DMSSDSDocuments dd on dd.MSDSId = si.MSDSId
	left outer join @Docs d on d.URL = 'https://edsiq.ed-data.com/SDS/SDSDocViewer?DocId=' + cast(dd.DocId as varchar(50))
   where si.ItemId = @ItemId
     and d.ItemId is null

select [URL] from @Docs group by [URL] order by [URL]

end
```
