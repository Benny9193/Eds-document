# Table: `dbo.biddocumentacks`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 18

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `biddocumentackid` | int | NO |  | YES |
| 2 | `biddocumentid` | int | NO |  |  |
| 3 | `sessionid` | int | NO |  |  |
| 4 | `ackdatetime` | datetime | YES |  |  |
| 5 | `ackname` | varchar(50) | YES |  |  |
| 6 | `vendorbidid` | int | YES |  |  |
| 7 | `Acknowledged` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
