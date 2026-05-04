# Procedure: `dbo.usp_GetImageList`

_Generated on 2026-05-04T13:04:00.710Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetImageList` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-05-03 22:29:23 |
| Modified | 2025-03-21 09:02:46 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@mod` | IN | int |  |
| 2 | `@rem` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ImageErrors` | USER_TABLE |  |
| `Images` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_GetImageList 4, 3
CREATE   procedure [dbo].[usp_GetImageList] @mod int = 1, @rem int = 0
as
begin

	create table #ImageList (
		imageId bigint identity(1,1) not null primary key,
		imageURL varchar(512) not null,
		seq		bigint null)

/*
	insert #imageList(imageURL, Seq)
	select trim(il.ImageURL), CHECKSUM(HASHBYTES('SHA2_512',trim(il.ImageURL)))
	  from ImageLog il
	  join Images on Images.ImageURL = ImageLog.ImageURL
	 where coalesce(writeStatus,'') != '200' 
*/
	insert #imageList(imageURL, Seq)
	  select trim(ie.ImageURL), CHECKSUM(HASHBYTES('SHA2_512',trim(ie.ImageURL)))
	    from ImageErrors ie
	   where json_value(error,'$.message') = 'unable to verify the first certificate'
	   group by trim(ie.ImageURL), CHECKSUM(HASHBYTES('SHA2_512',trim(ie.ImageURL)))


/*
	insert #imageList(imageURL, Seq)
	  select trim(CrossRefs.ImageURL), CHECKSUM(HASHBYTES('SHA2_512',trim(CrossRefs.ImageURL)))
	    from BidHeaders
		join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		               and BidImports.Active = 1
		join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		join Catalog on Catalog.CatalogId = BidImportCatalogList.CatalogId
		            and Catalog.Active = 1
		join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId
		              and CrossRefs.Active = 1
					  and CrossRefs.ImageURL like 'http%'
	   where BidHeaders.EffectiveUntil > getdate()
	   group by trim(CrossRefs.ImageURL), CHECKSUM(HASHBYTES('SHA2_512',trim(CrossRefs.ImageURL)))
*/
/*
	insert #imageList(imageURL, Seq)
	  select trim(BidResults.ImageURL), CHECKSUM(HASHBYTES('SHA2_512',trim(BidResults.ImageURL)))
	    from BidHeaders
		join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		               and BidImports.Active = 1
--					   and BidImports.VendorId = 3
		join BidResults on BidResults.BidImportId = BidImports.BidImportId
		               and BidResults.ImageURL like 'http%'
		join BidItems on BidItems.BidResultsId = BidItems.BidResultsId
		left outer join #ImageList il on il.imageURL = BidResults.ImageURL
	   where BidHeaders.EffectiveUntil > getdate()
	     and il.imageId is null
	   group by trim(BidResults.ImageURL), CHECKSUM(HASHBYTES('SHA2_512',trim(BidResults.ImageURL)))
*/
	select *
	  from #ImageList il
	  outer apply (select top 1 ImageId, Images.dateChecked from Images where Images.imageURL = il.ImageURL order by Images.dateLoaded desc) i
	  outer apply (select top 1 ImageErrors.imageErrorId from ImageErrors where ImageErrors.imageURL = il.imageURL /*and json_Value(error,'$.message') = 'Request failed with status code 404'*/) e
	 where (i.imageId is null
	   )/*and e.ImageErrorId is null)*/
	   and abs(CHECKSUM(HASHBYTES('SHA2_512',trim(il.ImageURL))) % @mod) = @rem
--	    or coalesce(datediff(day,i.dateChecked ,getdate()),180) > 90))
	 order by Seq

end
```
