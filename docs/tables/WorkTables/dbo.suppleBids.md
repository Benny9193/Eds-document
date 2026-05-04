# Table: `dbo.suppleBids`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 18

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `PricePlanId` | int | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `BidDate` | datetime | YES |  |  |
| 7 | `BidAwardDate` | datetime | YES |  |  |
| 8 | `BidMessage` | varchar(1024) | YES |  |  |
| 9 | `BidType` | tinyint | YES |  |  |
| 10 | `PriceVarianceLevel` | decimal(9,5) | YES |  |  |
| 11 | `MinimumPOAmount` | money | YES |  |  |
| 12 | `Section` | int | YES |  |  |
| 13 | `BudgetYearOption` | tinyint | YES |  |  |
| 14 | `DateCreated` | datetime | YES |  |  |
| 15 | `EffectiveFrom` | datetime | YES |  |  |
| 16 | `EffectiveUntil` | datetime | YES |  |  |
| 17 | `Description` | varchar(512) | YES |  |  |
| 18 | `ParentBidHeaderId` | int | YES |  |  |
| 19 | `UpdateHold` | int | YES |  |  |
| 20 | `ScheduledReaward` | datetime | YES |  |  |
| 21 | `AllowTotalAward` | tinyint | YES |  |  |
| 22 | `TotalAwardMinimumDiscount` | decimal(9,5) | YES |  |  |
| 23 | `CalendarId` | int | YES |  |  |
| 24 | `StateId` | int | YES |  |  |
| 25 | `MarkAsOriginal` | int | YES |  |  |
| 26 | `HostDistrictId` | int | YES |  |  |
| 27 | `AwardMsg` | varchar(1024) | YES |  |  |
| 28 | `AlertLink` | varchar(255) | YES |  |  |
| 29 | `AlertMsg` | varchar(4096) | YES |  |  |
| 30 | `BidManagerId` | int | YES |  |  |
| 31 | `CompliantAlert` | tinyint | YES |  |  |
| 32 | `HostAwardDate` | datetime | YES |  |  |
| 33 | `AllowAdditionalManufacturers` | tinyint | YES |  |  |
| 34 | `AllowAdditionalProductLines` | tinyint | YES |  |  |
| 35 | `UseOptions` | tinyint | YES |  |  |
| 36 | `BidHeaderKey` | int | NO |  |  |
| 37 | `ImageURLRuleset` | int | YES |  |  |
| 38 | `ReadyToUseDate` | datetime | YES |  |  |
| 39 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
