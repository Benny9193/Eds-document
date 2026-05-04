# View: `EDSIQWebUser.OrderBookView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Reporting view over consolidated order data — top-level grain, suitable for dashboard summaries.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrderBookId` | int | NO |  |  |
| 2 | `PricePlanDescription` | varchar(255) | YES |  |  |
| 3 | `Category` | varchar(255) | YES |  |  |
| 4 | `PricePlanId` | int | YES |  |  |
| 5 | `CategoryId` | int | YES |  |  |
| 6 | `AwardId` | int | YES |  |  |
| 7 | `BookType` | varchar(11) | NO |  |  |
| 8 | `Active` | int | YES |  |  |
| 9 | `BidHeaderId` | int | YES |  |  |
| 10 | `DistrictId` | int | YES |  |  |

## Depends on

_None resolved._

## Used by

_No other objects reference this view._

## Definition

_Definition not available (view may be encrypted, or insufficient permissions)._
