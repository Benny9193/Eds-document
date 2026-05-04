# Table: `dbo.AuditingEvents`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 117

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AuditEventID` | int | NO |  | YES |
| 2 | `TimeLoggedUtc` | datetime | NO | `(getutcdate())` |  |
| 3 | `AccountID` | nvarchar(100) | NO |  |  |
| 4 | `ActionTypeID` | int | NO |  |  |
| 5 | `AuditEventMessage` | nvarchar(1024) | NO |  |  |
| 6 | `NetworkNode` | int | YES |  |  |
| 7 | `NetObjectID` | int | YES |  |  |
| 8 | `NetObjectType` | char(10) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AuditingEvents_TimeLoggedUtc` | no | CLUSTERED | `TimeLoggedUtc` |  |
