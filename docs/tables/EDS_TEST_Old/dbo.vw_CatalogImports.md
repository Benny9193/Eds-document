# View: `dbo.vw_CatalogImports`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `VendorName` | varchar(50) | YES |  |  |
| 3 | `CatalogYear` | char(2) | YES |  |  |
| 4 | `CatalogName` | varchar(50) | YES |  |  |
| 5 | `NumberOfItems` | int | YES |  |  |
| 6 | `DatePosted` | varchar(30) | NO |  |  |
| 7 | `WebLink` | varchar(30) | NO |  |  |
| 8 | `CatalogId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `crossrefs` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_CatalogImports]
AS
SELECT Category.Name AS CategoryName, Vendors.Name AS VendorName, [Catalog].CatalogYear AS CatalogYear, 
      [Catalog].Name AS CatalogName, (select count(*) from crossrefs where catalogid=Catalog.CatalogId) AS NumberOfItems, isnull(convert(varchar, catalog.postdate, 110),'not available') as DatePosted, isnull(convert(varchar, catalog.weblink, 110),'') As WebLink, catalog.CatalogId
FROM [Catalog] INNER
JOIN Vendors ON [Catalog].VendorId = Vendors.VendorId INNER 
JOIN Category ON [Catalog].CategoryId = Category.CategoryId
WHERE ([Catalog].Active = 1) AND ( ([Catalog].CatalogYear = right( year(getdate())-2, 2 ) AND Vendors.Active = 1) OR [Catalog].CatalogYear = right( year(getdate())-1, 2 ) or [Catalog].CatalogYear = right( year(getdate()), 2 ) )
--ORDER BY Category.Name, Vendors.Name, [Catalog].CatalogYear, [Catalog].Name
```
