# View: `dbo.vw_VendorBlast_RegisteredByCategory`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | YES |  |  |
| 2 | `CategoryId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_BidVendorList` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorBlast_RegisteredByCategory] as
select VendorId, CategoryId
  from vw_BidVendorList bvl with (nolock)
 group by VendorId, CategoryId
```
