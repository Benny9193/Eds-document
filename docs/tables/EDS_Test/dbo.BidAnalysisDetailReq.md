# View: `dbo.BidAnalysisDetailReq`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `PricePlanName` | varchar(278) | NO |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidRequestItemId` | int | NO |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `DistrictName` | varchar(50) | NO |  |  |
| 7 | `ItemCode` | varchar(50) | YES |  |  |
| 8 | `Description` | varchar(1024) | YES |  |  |
| 9 | `UnitCode` | varchar(20) | YES |  |  |
| 10 | `VendorName` | varchar(50) | NO |  |  |
| 11 | `VendorCode` | varchar(16) | NO |  |  |
| 12 | `BidUnits` | varchar(16) | YES |  |  |
| 13 | `BidRequest` | int | YES |  |  |
| 14 | `BidType` | varchar(13) | YES |  |  |
| 15 | `QuantityBid` | int | YES |  |  |
| 16 | `UnitPrice` | decimal(34,13) | YES |  |  |
| 17 | `ExtendedCost` | decimal(38,6) | YES |  |  |
| 18 | `Alternate` | varchar(max) | YES |  |  |
| 19 | `VendorItemCode` | varchar(50) | YES |  |  |
| 20 | `BidRequestStatus` | varchar(50) | YES |  |  |
| 21 | `Status` | varchar(51) | YES |  |  |
| 22 | `BidResultsId` | int | YES |  |  |
| 23 | `Comments` | varchar(1024) | YES |  |  |
| 24 | `ItemComments` | varchar(1024) | YES |  |  |
| 25 | `PriceVarianceLevel` | decimal(9,5) | YES |  |  |
| 26 | `FirstPrice` | decimal(34,13) | YES |  |  |
| 27 | `FirstPriceBidResultsId` | int | YES |  |  |
| 28 | `SecondPrice` | decimal(34,13) | YES |  |  |
| 29 | `SecondPriceBidResultsId` | int | YES |  |  |
| 30 | `Compliant1st` | int | YES |  |  |
| 31 | `OtherReqs` | int | NO |  |  |
| 32 | `SortKey` | varchar(124) | YES |  |  |
| 33 | `Variance` | decimal(38,6) | YES |  |  |
| 34 | `ItemStatus` | varchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.uf_BidAnalysisDetailReq` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidAnalysisDetailReq] as
select *
  from dbo.uf_BidAnalysisDetailReq(705, 94554)
```
