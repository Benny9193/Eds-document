# Table: `dbo.AlertHistory`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4638

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertHistoryID` | int | NO |  | YES |
| 2 | `EventType` | smallint | NO |  |  |
| 3 | `Message` | nvarchar(max) | YES |  |  |
| 4 | `TimeStamp` | datetime | YES |  |  |
| 5 | `AccountID` | nvarchar(100) | YES |  |  |
| 6 | `AlertActiveID` | bigint | YES |  |  |
| 7 | `AlertObjectID` | int | NO |  |  |
| 8 | `ActionID` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertActiveID` | no | NONCLUSTERED | `AlertActiveID` |  |
| `IX_AlertObjectID` | no | NONCLUSTERED | `AlertObjectID` |  |
| `IX_EventType` | no | NONCLUSTERED | `EventType` |  |
| `IX_TimeStamp` | no | NONCLUSTERED | `TimeStamp` |  |
