# Table: `dbo.bidcalendar`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6539

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `calendarid` | int | NO |  | YES |
| 2 | `dateavailable` | datetime | YES |  |  |
| 3 | `openingdate` | datetime | YES |  |  |
| 4 | `description` | varchar(255) | YES |  |  |
| 5 | `categoryname` | varchar(255) | YES |  |  |
| 6 | `comments` | varchar(4096) | YES |  |  |
| 7 | `status` | varchar(255) | YES |  |  |
| 8 | `state` | char(2) | YES |  |  |
| 9 | `priceplan` | varchar(16) | YES |  |  |
| 10 | `totalawardminimumdiscount` | decimal(9,5) | YES |  |  |
| 11 | `allowtotalaward` | tinyint | YES |  |  |
| 12 | `active` | tinyint | YES |  |  |
| 13 | `requirevendoritemcode` | tinyint | YES |  |  |
| 14 | `requirepagenumber` | tinyint | YES |  |  |
| 15 | `requireitemsperunit` | tinyint | YES |  |  |
| 16 | `BSCId` | int | YES |  |  |
| 17 | `BidManagerId` | int | YES |  |  |
| 18 | `CategoryType` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ledger`](dbo.ledger.md) | `calendarid` | `calendarid` | NO_ACTION | CASCADE |
| [`dbo.vendorbids`](dbo.vendorbids.md) | `calendarid` | `calendarid` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
