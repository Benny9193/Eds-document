# Table: `dbo.AlertMigrationLog`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OldAlertDefinitionIdGuid` | uniqueidentifier | NO |  |  |
| 2 | `OldAlertName` | nvarchar(1024) | NO |  |  |
| 3 | `NewAlertId` | int | YES |  |  |
| 4 | `AlertMigrationCode` | int | NO |  |  |
| 5 | `Messages` | nvarchar(max) | YES |  |  |
| 6 | `EnabledBeforeMigration` | bit | NO |  |  |
| 7 | `MigrationID` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
