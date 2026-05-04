# View: `dbo.vw_BidMSRPRankedManufacturerProductLines`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ManufacturerId` | int | YES |  |  |
| 3 | `ManufacturerName` | varchar(100) | NO |  |  |
| 4 | `ManufacturerProductLineId` | int | NO |  |  |
| 5 | `ProductLineName` | varchar(100) | NO |  |  |
| 6 | `MSRPOptionId` | int | NO |  |  |
| 7 | `OptionName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |
| `BidRequestManufacturer` | USER_TABLE |
| `BidRequestOptions` | USER_TABLE |
| `BidRequestProductLines` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |
| `Manufacturers` | USER_TABLE |
| `MSRPOptions` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_AwardBidHeader` | SQL_STORED_PROCEDURE |
| `dbo.uf_BidMSRPRankedManufacturerProductLinesOrdered` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.usp_BidRanking` | SQL_STORED_PROCEDURE |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered.md) | VIEW |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) | VIEW |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved.md) | VIEW |
| [`dbo.vw_WinningMSRPEntryPrices`](dbo.vw_WinningMSRPEntryPrices.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_BidMSRPRankedManufacturerProductLines] as
select bi.BidHeaderId, bmr.ManufacturerId, m.Name ManufacturerName, mpl.ManufacturerProductLineId, mpl.Name ProductLineName, mo.MSRPOptionId, mo.MSRPOptionName OptionName
  from BidImports bi with (nolock)
  join BidMSRPResults bmr on bmr.BidImportId = bi.BidImportId
                         and bmr.Active = 1
  join Manufacturers m on m.ManufacturerId = bmr.ManufacturerId
                      and m.Active = 1
  join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsId = bmr.BidMSRPResultsId
  join ManufacturerProductLines mpl on mpl.ManufacturerProductLineId = bmrpl.ManufacturerProductLineId
                                   and mpl.Active = 1
  join MSRPOptions mo on mo.MSRPOptionName = bmrpl.OptionName
                     and mo.Active = 1
 where bi.Active = 1
 group by bi.BidHeaderId, bmr.ManufacturerId, m.Name, mpl.ManufacturerProductLineId, mpl.Name, mo.MSRPOptionId, mo.MSRPOptionName
union (
  select brm.BidHeaderId, brm.ManufacturerId, m.Name ManufacturerName, mpl.ManufacturerProductLineId, mpl.Name ProductLineName, mo.MSRPOptionId, mo.MSRPOptionName OptionName
    from BidRequestManufacturer brm with (nolock)
    join Manufacturers m on m.ManufacturerId = brm.ManufacturerId
                        and m.Active = 1
    join BidRequestProductLines brpl on brpl.BidRequestManufacturerId = brm.BidRequestManufacturerId
                                    and brpl.Active = 1
    join ManufacturerProductLines mpl on mpl.ManufacturerProductLineId = brpl.ManufacturerProductLineId
                                     and mpl.Active = 1
    join BidRequestOptions bro on bro.BidRequestManufacturerId = brm.BidRequestManufacturerId
                              and bro.BidRequestProductLineId = brpl.BidRequestProductLineId
    join MSRPOptions mo on mo.MSRPOptionId = bro.OptionId
                       and mo.Active = 1
   where brm.Active = 1
   group by brm.BidHeaderId, brm.ManufacturerId, m.Name, mpl.ManufacturerProductLineId, mpl.Name, mo.MSRPOptionId, mo.MSRPOptionName
)
```
