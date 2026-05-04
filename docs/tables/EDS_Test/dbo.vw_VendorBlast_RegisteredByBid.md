# View: `dbo.vw_VendorBlast_RegisteredByBid`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | YES |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_BidVendorList` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorBlast_RegisteredByBid] as
select VendorId, BidHeaderId
  from vw_BidVendorList bvl with (nolock)
 group by VendorId, BidHeaderId
```
