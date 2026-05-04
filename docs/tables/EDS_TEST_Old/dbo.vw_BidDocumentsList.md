# View: `dbo.vw_BidDocumentsList`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidDocumentTypes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidDocumentsList] as
select Name
  from BidDocumentTypes
 where isnull(VendorSpecific ,0) = 0
 group by Name
```
