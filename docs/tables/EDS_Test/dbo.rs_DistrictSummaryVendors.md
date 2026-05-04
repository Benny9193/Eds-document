# View: `dbo.rs_DistrictSummaryVendors`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `BidHeaderId` | int | YES |  |  |
| 5 | `LineCount` | int | YES |  |  |
| 6 | `GrossCost` | money | YES |  |  |
| 7 | `DiscountAmount` | money | YES |  |  |
| 8 | `NetCost` | money | YES |  |  |
| 9 | `TotalLineCount` | int | YES |  |  |
| 10 | `TotalGrossCost` | money | YES |  |  |
| 11 | `TotalDiscountAmount` | money | YES |  |  |
| 12 | `TotalNetCost` | money | YES |  |  |
| 13 | `VendorCode` | varchar(20) | YES |  |  |
| 14 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.uf_DistrictSummaryVendorsBid` | SQL_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[rs_DistrictSummaryVendors] as
select * from dbo.uf_DistrictSummaryVendorsBid(1,1,1)
```
