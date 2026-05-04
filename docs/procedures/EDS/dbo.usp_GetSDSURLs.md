# Procedure: `dbo.usp_GetSDSURLs`

_Generated on 2026-05-04T13:04:00.724Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetSDSURLs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-06-07 12:38:34 |
| Modified | 2021-07-23 14:19:40 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@IdList` | IN | table type |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `SafetyDataSheets` | USER_TABLE |  |
| `utv_IdsList` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create     procedure [dbo].[usp_GetSDSURLs] @IdList utv_IdsList readonly
as
begin
declare @PassedIdCount int

	select @PassedIdCount = count(*) from @IDList

	insert SafetyDataSheets(sdsURL, Seq)
	  select trim(CrossRefs.MSDSRef), CHECKSUM(HASHBYTES('SHA2_512',trim(CrossRefs.MSDSRef)))
	    from BidHeaders
		join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		               and BidImports.Active = 1
		join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		join Catalog on Catalog.CatalogId = BidImportCatalogList.CatalogId
		            and Catalog.Active = 1
		join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId
		              and CrossRefs.Active = 1
					  and CrossRefs.MSDSRef like 'http%'
		left outer join SafetyDataSheets il on il.SDSURL = trim(CrossRefs.MSDSRef)
	   where BidHeaders.EffectiveUntil > getdate()
	     and il.SafetyDataSheetId is null
	   group by trim(CrossRefs.MSDSRef), CHECKSUM(HASHBYTES('SHA2_512',trim(CrossRefs.MSDSRef)))

	insert SafetyDataSheets(sdsURL, Seq)
	  select trim(BidResults.SDS_URL), CHECKSUM(HASHBYTES('SHA2_512',trim(BidResults.SDS_URL)))
	    from BidHeaders
		join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		               and BidImports.Active = 1
		join BidResults on BidResults.BidImportId = BidImports.BidImportId
		               and BidResults.SDS_URL like 'http%'
		join BidItems on BidItems.BidResultsId = BidItems.BidResultsId
		left outer join SafetyDataSheets il on il.SDSURL = trim(BidResults.SDS_URL)
	   where BidHeaders.EffectiveUntil > getdate()
	     and il.SafetyDataSheetId is null
	   group by trim(BidResults.SDS_URL), CHECKSUM(HASHBYTES('SHA2_512',trim(BidResults.SDS_URL)))

	select *
	  from SafetyDataSheets il
	  left outer join @IdList ids on ids.Id = il.SafetyDataSheetId
	 where @PassedIdCount = 0
	    or (ids.Id = il.SafetyDataSheetId)
--	 sdsURL not like 'http://imv.complyplus.com/grainger/loadmsds.asp%'
	 order by Seq

end
```
