# View: `dbo.vw_BidDocumentTypeNames`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentName` | varchar(50) | NO |  |  |
| 2 | `MinBidDocumentTypeId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidDocumentTypes`](dbo.BidDocumentTypes.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidDocumentTypeNames]
AS
SELECT Name DocumentName, Min(BidDocumentTypeId) MinBidDocumentTypeId
FROM dbo.BidDocumentTypes
Group By Name
```
