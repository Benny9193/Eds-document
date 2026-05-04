# View: `dbo.rs_DistrictSummary`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `DistrictName` | varchar(50) | YES |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `ItemCode` | varchar(50) | YES |  |  |
| 5 | `SortSeq` | varchar(50) | YES |  |  |
| 6 | `Description` | varchar(1536) | YES |  |  |
| 7 | `UnitCode` | varchar(16) | YES |  |  |
| 8 | `Quantity` | int | YES |  |  |
| 9 | `VendorCode` | varchar(10) | YES |  |  |
| 10 | `UnitPrice` | money | YES |  |  |
| 11 | `ExtendedPrice` | money | YES |  |  |
| 12 | `BidPrice` | money | YES |  |  |
| 13 | `GrossPrice` | money | YES |  |  |
| 14 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 15 | `UseGrossPrices` | tinyint | YES |  |  |
| 16 | `VendorId` | int | YES |  |  |
| 17 | `VendorItemCode` | varchar(50) | YES |  |  |
| 18 | `Alternate` | varchar(1024) | YES |  |  |
| 19 | `DistrictId` | int | YES |  |  |
| 20 | `CategoryId` | int | YES |  |  |
| 21 | `PricePlanId` | int | YES |  |  |
| 22 | `AwardId` | int | YES |  |  |
| 23 | `BudgetId` | int | YES |  |  |
| 24 | `VendorTotal` | money | YES |  |  |
| 25 | `VendorCount` | int | YES |  |  |
| 26 | `CategoryTotal` | money | YES |  |  |
| 27 | `CategoryCount` | int | YES |  |  |
| 28 | `DistrictTotal` | money | YES |  |  |
| 29 | `DistrictCount` | int | YES |  |  |
| 30 | `ListId` | int | YES |  |  |
| 31 | `BidHeaderId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.uf_DistrictSummaryBid` | SQL_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[rs_DistrictSummary] as
select * from dbo.uf_DistrictSummaryBid(1,1,1)
```
