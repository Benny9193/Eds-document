# Table: `dbo.testrc`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2117

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `regcalendarid` | int | NO |  |  |
| 2 | `registrationid` | int | YES |  |  |
| 3 | `calendarid` | int | YES |  |  |
| 4 | `validfrom` | datetime | YES |  |  |
| 5 | `validuntil` | datetime | YES |  |  |
| 6 | `granted` | datetime | YES |  |  |
| 7 | `charge` | money | YES |  |  |
| 8 | `requested` | datetime | YES |  |  |
| 9 | `BSCId` | int | YES |  |  |
| 10 | `ShowBidTabs` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
