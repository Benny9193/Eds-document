# Procedure: `dbo.usp_SetItemAIData`

_Generated on 2026-05-04T13:04:00.754Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SetItemAIData` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-27 18:21:27 |
| Modified | 2025-07-11 15:08:50 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@CrossRefId` | IN | int |  |
| 2 | `@ProductNames` | IN | varchar(4000) |  |
| 3 | `@TypeAheads` | IN | varchar(4000) |  |
| 4 | `@ShortDescription` | IN | varchar(4000) |  |
| 5 | `@FullDescription` | IN | varchar(4000) |  |
| 6 | `@UNSPSC` | IN | varchar(20) |  |

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
CREATE   procedure [dbo].[usp_SetItemAIData] @CrossRefId int, @ProductNames varchar(4000), @TypeAheads varchar(4000), @ShortDescription varchar(4000), @FullDescription varchar(4000), @UNSPSC varchar(20)
as
begin
declare @SourceCatalogs table (
CatalogId	int not null primary key,
VendorId	int not null,
DatePosted	datetime)
declare @SavedHashKey	varbinary(64)

select @SavedHashKey = CrossRefs.HashKey
  from CrossRefs with (nolock)
 where CrossRefs.CrossRefId = @CrossRefId

-- Update First Item with new Data
 Update CrossRefs
   set ProductNames = @ProductNames,
       TypeAheads = @TypeAheads,
	   AIShortDesc = @ShortDescription,
	   AIFullDesc = @FullDescription,
	   AIUNSPSC = @UNSPSC,
	   AIDate = getdate()
  from CrossRefs with (rowlock,updlock)
 where CrossRefs.CrossRefId = @CrossRefId

-- Build table of current Catalogs
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
 group by Catalog.CatalogId, Catalog.VendorId, Catalog.PostDate

-- Get List of Items to Update
Select CrossRefs.CrossRefId into #UpdateList
  from CrossRefs xr with (rowlock,updlock)
  join CrossRefs on CrossRefs.HashKey = xr.HashKey
                and CrossRefs.Active = 1
  join @SourceCatalogs sc on sc.CatalogId = CrossRefs.CatalogId
 where xr.CrossRefId = @CrossRefId
   and xr.CrossRefId != CrossRefs.CrossRefId 

-- Update Everything that has the same HashKey
Update CrossRefs
   set ProductNames = @ProductNames,
       TypeAheads = @TypeAheads,
	   AIShortDesc = @ShortDescription,
	   AIFullDesc = @FullDescription,
	   AIUNSPSC = @UNSPSC,
	   AIDate = getdate()
  from CrossRefs with (rowlock,updlock)
  join #UpdateList ul on ul.CrossRefId = CrossRefs.CrossRefId
 option (maxdop 1)

end
```
