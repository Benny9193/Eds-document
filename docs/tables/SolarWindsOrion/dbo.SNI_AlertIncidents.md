# Table: `dbo.SNI_AlertIncidents`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `InstanceID` | uniqueidentifier | NO |  |  |
| 3 | `AlertObjectID` | int | NO |  |  |
| 4 | `ActionID` | int | NO |  |  |
| 5 | `AlertUrl` | nvarchar(1024) | YES |  |  |
| 6 | `IncidentID` | nvarchar(64) | YES |  |  |
| 7 | `AlertTriggerState` | int | NO |  |  |
| 8 | `LastTriggerTime` | datetime | NO |  |  |
| 9 | `CreatedOn` | datetime | NO | `(getdate())` |  |
| 10 | `IncidentNumber` | nvarchar(256) | YES |  |  |
| 11 | `IncidentUrl` | nvarchar(2096) | YES |  |  |
| 12 | `Assignee` | nvarchar(256) | YES |  |  |
| 13 | `AssignmentGroup` | nvarchar(256) | YES |  |  |
| 14 | `State` | nvarchar(64) | YES |  |  |
| 15 | `Description` | nvarchar(4000) | YES |  |  |
| 16 | `AssignedTo` | nvarchar(256) | YES |  |  |
| 17 | `LogicalState` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
