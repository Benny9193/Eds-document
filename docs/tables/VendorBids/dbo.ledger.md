# Table: `dbo.ledger`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `bidledgerid` | int | NO |  | YES |
| 2 | `registrationid` | int | YES |  |  |
| 3 | `calendarid` | int | YES |  |  |
| 4 | `trantypeid` | int | YES |  |  |
| 5 | `tranamount` | money | YES |  |  |
| 6 | `trandate` | datetime | YES |  |  |
| 7 | `comments` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_BidLedger_BidCalendar` | `calendarid` | [`dbo.bidcalendar.calendarid`](dbo.bidcalendar.md) | NO_ACTION | CASCADE |
| `FK_BidLedger_Registrations` | `registrationid` | [`dbo.registrations.registrationid`](dbo.registrations.md) | CASCADE | CASCADE |
| `FK_BidLedger_TranTypes` | `trantypeid` | [`dbo.trantypes.trantypeid`](dbo.trantypes.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
