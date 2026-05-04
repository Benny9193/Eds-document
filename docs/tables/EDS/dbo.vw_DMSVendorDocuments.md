# View: `dbo.vw_DMSVendorDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorCode` | varchar(10) | YES |  |  |
| 2 | `DistrictVisible` | varchar(10) | YES |  |  |
| 3 | `DocType` | varchar(255) | YES |  |  |
| 4 | `ExpirationDate` | varchar(30) | YES |  |  |
| 5 | `DocumentNumber` | varchar(255) | YES |  |  |
| 6 | `DocId` | uniqueidentifier | YES |  |  |
| 7 | `PagesCaptured` | int | YES |  |  |
| 8 | `FileName` | varchar(8000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DMSVendorDocuments` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_DMSVendorDocuments] as
select v.VendorCode, v.DistrictVisible, v.DocType, v.ExpirationDate, v.DocumentNumber, v.DocId, v.PagesCaptured, replace(replace(replace(v.FileName,'fileserver-nj.ed-data.local','ed-data.local'),'fileserver-atl.ed-data.local','ed-data.local'),'192.168.1.102','ed-data.local') FileName
  from DMSVendorDocuments v
```
