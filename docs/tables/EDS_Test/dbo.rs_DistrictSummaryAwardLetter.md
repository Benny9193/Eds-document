# View: `dbo.rs_DistrictSummaryAwardLetter`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `PricePlanId` | int | YES |  |  |
| 5 | `VendorId` | int | YES |  |  |
| 6 | `ItemsBid` | int | YES |  |  |
| 7 | `AmountBid` | money | YES |  |  |
| 8 | `ItemsAwarded` | int | YES |  |  |
| 9 | `AmountAwarded` | money | YES |  |  |
| 10 | `AwardId` | int | YES |  |  |
| 11 | `BidDate` | datetime | YES |  |  |
| 12 | `BidAwardDate` | datetime | YES |  |  |
| 13 | `TotalItemsAwarded` | int | YES |  |  |
| 14 | `TotalItemsBid` | int | YES |  |  |
| 15 | `TotalAmountBid` | money | YES |  |  |
| 16 | `TotalAmountAwarded` | money | YES |  |  |
| 17 | `BidHeaderId` | int | YES |  |  |
| 18 | `VendorCode` | varchar(20) | YES |  |  |
| 19 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.uf_AwardLetterBid` | SQL_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[rs_DistrictSummaryAwardLetter] as
select * from dbo.uf_AwardLetterBid(1,1,1)
```
