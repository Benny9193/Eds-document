# Table: `dbo.hm_dnsbl`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `sblid` | int | NO |  | YES |
| 2 | `sblactive` | int | NO |  |  |
| 3 | `sbldnshost` | nvarchar(255) | NO |  |  |
| 4 | `sblresult` | nvarchar(255) | NO |  |  |
| 5 | `sblrejectmessage` | nvarchar(255) | NO |  |  |
| 6 | `sblscore` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
