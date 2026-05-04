# Procedure: `dbo.sp_DBCheck`

_Generated on 2026-05-04T13:07:57.428Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DBCheck` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-13 01:12:41 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure sp_DBCheck AS


print 'Checking for Catalogs Not Matching Awarded Vendor'

select *
  from Awards
  join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
  join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId
  join Category on Category.CategoryId = Awards.CategoryId
               and Category.Type != 2
 where Awards.BidStartDate <= getdate()
   and Awards.BidEndDate >= getdate()
   and Awards.VendorId != Catalog.VendorId
```
