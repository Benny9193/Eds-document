# View: `dbo.vw_VendorsByBid`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_ItemsByBid` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorsByBid] as
select BidHeaderId, VendorId, VendorName
  from vw_ItemsByBid
 group by BidHeaderId, VendorId, VendorName
```
