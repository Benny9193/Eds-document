# Procedure: `dbo.usp_ShowItemURLs`

_Generated on 2026-05-04T13:07:57.809Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_ShowItemURLs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-07-29 15:10:09 |
| Modified | 2019-07-29 15:11:17 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_ShowItemURLs @pItemId int
as
begin
create table #URLs (
Id			int identity(1,1) not null primary key,
VendorId	int null,
CatalogId	int null,
UPC			varchar(20) null,
VendorItemCode varchar(50) null,
PackedCode	varchar(50) null,
ImageURL	varchar(300),
Datestamp	datetime null
)

insert #URLs(VendorId, CatalogId, UPC, VendorItemCode, PackedCode, ImageURL, Datestamp)
  select Catalog.VendorId, Catalog.CatalogId, null, CrossRefs.VendorItemCode, CrossRefs.PackedCode, CrossRefs.ImageURL, CrossRefs.DateUpdated
    from CrossRefs
	join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
				and Catalog.Active = 1
   where CrossRefs.ItemId = @pItemId
     and CrossRefs.ImageURL like 'http%'
	 and CrossRefs.Active = 1

	select *
	  from #URLs
	 order by datestamp desc
end
```
