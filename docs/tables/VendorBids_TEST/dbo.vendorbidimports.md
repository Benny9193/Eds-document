# Table: `dbo.vendorbidimports`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vendorbidimportid` | int | NO |  | YES |
| 2 | `vendorbidid` | int | NO |  |  |
| 3 | `importdate` | datetime | NO | `(getdate())` |  |
| 4 | `sessionId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
