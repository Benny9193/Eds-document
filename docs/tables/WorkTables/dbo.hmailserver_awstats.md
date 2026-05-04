# Table: `dbo.hmailserver_awstats`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 669246

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Datestamp` | varchar(50) | YES |  |  |
| 2 | `SentBy` | varchar(512) | YES |  |  |
| 3 | `SendTo` | varchar(512) | YES |  |  |
| 4 | `SentFrom` | varchar(512) | YES |  |  |
| 5 | `ReceivingServer` | varchar(512) | YES |  |  |
| 6 | `Protocol` | varchar(50) | YES |  |  |
| 7 | `QuestionMark` | varchar(50) | YES |  |  |
| 8 | `Status` | varchar(50) | YES |  |  |
| 9 | `MsgSize` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
