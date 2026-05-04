# View: `dbo.vw_BidImportMostRecentContactInfo`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidImportId` | int | NO |  |  |
| 2 | `UseVendorContactInfo` | tinyint | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `CategoryId` | int | YES |  |  |
| 5 | `ContactEmail` | varchar(255) | YES |  |  |
| 6 | `ContactName` | varchar(50) | YES |  |  |
| 7 | `ContactPhone` | varchar(20) | YES |  |  |
| 8 | `ContactFax` | varchar(20) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidImportMostRecentContactInfo] as
SELECT BidImports.BidImportId, BidImports.UseVendorContactInfo, BidImports.VendorId, BidHeaders.CategoryId, 
       BidImports.ContactEmail, BidImports.ContactName, BidImports.ContactPhone, BidImports.ContactFax
FROM [EDS].[dbo].[BidImports]
Join BidHeaders ON BidHeaders.BidHeaderId = BidImports.BidHeaderId
--where isnull(BidImports.UseVendorContactInfo,1)=0 And BidImports.VendorId = 4436 And BidHeaders.CategoryId = 47
--order by BidImportId desc
```
