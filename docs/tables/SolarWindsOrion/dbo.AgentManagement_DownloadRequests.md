# Table: `dbo.AgentManagement_DownloadRequests`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequestId` | uniqueidentifier | NO | `('00000000-0000-0000-0000-000000000000')` | YES |
| 2 | `Data` | nvarchar(1024) | NO |  |  |
| 3 | `ExpirationUtc` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
