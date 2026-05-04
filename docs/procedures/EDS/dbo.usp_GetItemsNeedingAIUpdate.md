# Procedure: `dbo.usp_GetItemsNeedingAIUpdate`

_Generated on 2026-05-04T13:04:24.363Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetItemsNeedingAIUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-27 18:21:27 |
| Modified | 2025-06-30 14:55:37 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_GetItemsNeedingAIUpdate] as
begin
/* Table Changes 
alter table CrossRefs
add 	
HashKey			varbinary(64) null,
ProductNames	nvarchar(4000) null,
TypeAheads		nvarchar(4000) null,
AIShortDesc		nvarchar(1024) null,
AIFullDesc		nvarchar(4000) null,
AIUNSPSC		varchar(20) null,
AIDate			datetime null
*/

declare @SourceCatalogs table (
CatalogId	int not null primary key,
VendorId	int not null,
DatePosted	datetime)

insert @SourceCatalogs (CatalogId, VendorId, DatePosted)
select Catalog.CatalogId, Catalog.VendorId, Catalog.PostDate
  from Catalog with (nolock)
  join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
  join Bids on Bids.BidId = BidsCatalogList.BidId
           and Bids.Active = 1
  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
 where Catalog.Active = 1
   and Catalog.VendorId != 7691
   and Catalog.PostDate is not null
--   and Catalog.CategoryId in (4,51) --2,3,4,51,91,109)
 group by Catalog.CatalogId, Catalog.VendorId, Catalog.PostDate
/*
-- Create a temp table of All Items that already have HashKey that match the existing hash
create table #CurrentTempIds (
CrossRefId	int not null primary key,
HashKey		varbinary(64) not null)

set transaction isolation level read uncommitted;
insert #CurrentTempIds (CrossRefId, HashKey)
select Min(CrossRefs.CrossRefId), CrossRefs.[HashKey]
  from @SourceCatalogs sc 
  join CrossRefs on CrossRefs.CatalogId = sc.CatalogId
                and CrossRefs.Active = 1
 where CrossRefs.AIdate is not null
   and CrossRefs.HashKey is not null
 group by CrossRefs.HashKey

create index SK_HashKeyCrossRefId on #CurrentTempIds ([HashKey],CrossRefId)

-- Fixup any New Items that match
Update CrossRefs
   set ProductNames = xr.ProductNames,
       TypeAheads = xr.TypeAheads,
	   AIShortDesc = xr.AIShortDesc,
	   AIFullDesc = xr.AIFullDesc,
	   AIUNSPSC = xr.AIUNSPSC,
	   AIDate = xr.AIDate,
	   HashKey = xr.HashKey
  from CrossRefs with (rowlock,updlock)
  join #CurrentTempIds t on t.[HashKey] = CrossRefs.HashKey
                        and t.CrossRefId != CrossRefs.CrossRefId
  join CrossRefs xr on xr.CrossRefId = t.CrossRefId
 where CrossRefs.AIDate is null

-- A little housekeeping
drop table #CurrentTempIds
*/
-- Return the list of Id's to process
Select min(CrossRefs.CrossRefId) CrossrefId
  from @SourceCatalogs sc 
  join CrossRefs on CrossRefs.CatalogId = sc.CatalogId
                and CrossRefs.Active = 1
 where CrossRefs.AIdate is null
   and not (    coalesce(trim(CrossRefs.ShortDescription),'') = '' 
            and coalesce(trim(CrossRefs.FullDescription),'') = ''
	    	and coalesce(trim(Crossrefs.Manufacturor),'') = ''
		    and coalesce(trim(CrossRefs.ManufacturorPartNumber),'') = '')
 group by CrossRefs.HashKey

set nocount off
end
```
