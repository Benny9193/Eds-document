# View: `dbo.vw_DMSBidDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidNbr` | varchar(max) | YES |  |  |
| 3 | `DocType` | varchar(max) | YES |  |  |
| 4 | `DocId` | uniqueidentifier | YES |  |  |
| 5 | `DistrictVisible` | varchar(max) | YES |  |  |
| 6 | `PagesCaptured` | int | YES |  |  |
| 7 | `FIleName` | varchar(8000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DMSBidDocuments` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_DMSBidDocuments where filename not like '%ed-data.local%'

CREATE     view  [dbo].[vw_DMSBidDocuments] as
SELECT	v.BidHeaderId, v.BidNbr, v.DocType, v.DocId, v.DistrictVisible, v.PagesCaptured, replace(v.FileName,'192.168.1.102','ed-data.local') FIleName
  from DMSBidDocuments v
```
