# View: `dbo.vw_DMSVendorBidDocuments`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorCode` | varchar(10) | YES |  |  |
| 2 | `DistrictVisible` | varchar(10) | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidNbr` | varchar(20) | YES |  |  |
| 5 | `DocType` | varchar(8000) | YES |  |  |
| 6 | `ExpirationDate` | varchar(30) | YES |  |  |
| 7 | `DocumentNumber` | varchar(255) | YES |  |  |
| 8 | `DocId` | uniqueidentifier | YES |  |  |
| 9 | `PagesCaptured` | int | YES |  |  |
| 10 | `FileName` | varchar(8000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DMSVendorBidDocuments` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select top 10 * from vw_DMSVendorBidDocuments where filename not like '\\ed-data.local\%'

CREATE   view  [dbo].[vw_DMSVendorBidDocuments] as
select v.VendorCode, v.DistrictVisible, v.BidHeaderId, v.BidNbr, replace(replace(replace(replace(replace(v.DocType,'&apos;',''''),'&amp;','&'),'&lt;','<'),'&gt;','>'),'&quot;','"') DocType, v.ExpirationDate, v.DocumentNumber, v.DocId, v.PagesCaptured, replace(replace(replace(v.FileName,'fileserver-nj.ed-data.local','ed-data.local'),'fileserver-atl.ed-data.local','ed-data.local'),'192.168.1.102','ed-data.local') FileName
  from DMSVendorBidDocuments v
```
