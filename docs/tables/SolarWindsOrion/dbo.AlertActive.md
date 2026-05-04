# Table: `dbo.AlertActive`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 51

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertActiveID` | bigint | NO |  | YES |
| 2 | `Acknowledged` | tinyint | YES |  |  |
| 3 | `AcknowledgedBy` | nvarchar(100) | YES |  |  |
| 4 | `AcknowledgedDateTime` | datetime | YES |  |  |
| 5 | `AcknowledgedNote` | nvarchar(max) | YES |  |  |
| 6 | `AlertObjectID` | int | NO |  |  |
| 7 | `TriggeredDateTime` | datetime | YES |  |  |
| 8 | `TriggeredMessage` | nvarchar(max) | YES |  |  |
| 9 | `NumberOfNotes` | bigint | YES |  |  |
| 10 | `LastExecutedEscalationLevel` | int | YES |  |  |
| 11 | `LastExecutedEscalationLevelTime` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_AlertActive_AlertObjects` | `AlertObjectID` | [`dbo.AlertObjects.AlertObjectID`](dbo.AlertObjects.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertObjectID` | no | NONCLUSTERED | `AlertObjectID` |  |
