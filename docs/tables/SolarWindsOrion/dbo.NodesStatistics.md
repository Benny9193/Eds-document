# Table: `dbo.NodesStatistics`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 110

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `LastBoot` | smalldatetime | YES |  |  |
| 3 | `SystemUpTime` | real | YES |  |  |
| 4 | `LastSystemUpTimePollUtc` | datetime | YES |  |  |
| 5 | `ResponseTime` | smallint | YES |  |  |
| 6 | `PercentLoss` | real | YES |  |  |
| 7 | `AvgResponseTime` | smallint | YES |  |  |
| 8 | `MinResponseTime` | smallint | YES |  |  |
| 9 | `MaxResponseTime` | smallint | YES |  |  |
| 10 | `NextPoll` | datetime | YES | `(dateadd(second,rand()*(5),getdate()))` |  |
| 11 | `LastSync` | datetime | YES |  |  |
| 12 | `NextRediscovery` | datetime | YES | `(dateadd(minute,(30),getdate()))` |  |
| 13 | `CPUCount` | tinyint | YES |  |  |
| 14 | `CPULoad` | smallint | YES | `((-2))` |  |
| 15 | `MemoryUsed` | real | YES | `((-2))` |  |
| 16 | `PercentMemoryUsed` | int | YES |  |  |
| 17 | `BufferNoMemThisHour` | real | YES |  |  |
| 18 | `BufferNoMemToday` | real | YES |  |  |
| 19 | `BufferSmMissThisHour` | real | YES |  |  |
| 20 | `BufferSmMissToday` | real | YES |  |  |
| 21 | `BufferMdMissThisHour` | real | YES |  |  |
| 22 | `BufferMdMissToday` | real | YES |  |  |
| 23 | `BufferBgMissThisHour` | real | YES |  |  |
| 24 | `BufferBgMissToday` | real | YES |  |  |
| 25 | `BufferLgMissThisHour` | real | YES |  |  |
| 26 | `BufferLgMissToday` | real | YES |  |  |
| 27 | `BufferHgMissThisHour` | real | YES |  |  |
| 28 | `BufferHgMissToday` | real | YES |  |  |
| 29 | `LoadAverage1` | real | YES |  |  |
| 30 | `LoadAverage5` | real | YES |  |  |
| 31 | `LoadAverage15` | real | YES |  |  |
| 32 | `CustomPollerLastStatisticsPoll` | datetime | NO | `((-2))` |  |
| 33 | `CustomPollerLastStatisticsPollSuccess` | datetime | NO | `((-2))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
