# View: `dbo.vw_AVVendorsBySession`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorName` | varchar(50) | YES |  |  |
| 4 | `VendorCode` | varchar(16) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_AVBidsVendorsCategoriesBySession` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_AVVendorsBySession] as
select SessionId, VendorId, VendorName, VendorCode
  from vw_AVBidsVendorsCategoriesBySession with (nolock)
 group by SessionId, VendorId, VendorName, VendorCode
```
