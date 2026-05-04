# View: `dbo.vw_BidMSRPRankedManufacturers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ManufacturerId` | int | YES |  |  |
| 3 | `ManufacturerName` | varchar(100) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidRequestManufacturer` | USER_TABLE |
| `Manufacturers` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidMSRPRankedManufacturers] as
select bi.BidHeaderId, bmr.ManufacturerId, m.Name ManufacturerName
  from BidImports bi with (nolock)
  join BidMSRPResults bmr on bmr.BidImportId = bi.BidImportId
                         and bmr.Active = 1
  join Manufacturers m on m.ManufacturerId = bmr.ManufacturerId
                      and m.Active = 1
 where bi.Active = 1
 group by bi.BidHeaderId, bmr.ManufacturerId, m.Name
union (
  select brm.BidHeaderId, brm.ManufacturerId, m.Name ManufacturerName
    from BidRequestManufacturer brm with (nolock)
    join Manufacturers m on m.ManufacturerId = brm.ManufacturerId
                        and m.Active = 1
   where brm.Active = 1 and m.Name != '(WRITEINS)'
   group by brm.BidHeaderId, brm.ManufacturerId, m.Name
)
```
