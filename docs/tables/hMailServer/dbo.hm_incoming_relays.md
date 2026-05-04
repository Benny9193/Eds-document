# Table: `dbo.hm_incoming_relays`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `relayid` | int | NO |  | YES |
| 2 | `relayname` | nvarchar(100) | NO |  |  |
| 3 | `relaylowerip1` | bigint | NO |  |  |
| 4 | `relaylowerip2` | bigint | YES |  |  |
| 5 | `relayupperip1` | bigint | NO |  |  |
| 6 | `relayupperip2` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
