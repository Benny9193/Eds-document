# Table: `dbo.ActiveDiagnosticsDetail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6336

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MethodName` | varchar(100) | NO |  | YES |
| 2 | `ClassName` | varchar(300) | NO |  | YES |
| 3 | `EngineID` | int | NO |  | YES |
| 4 | `EndDate` | datetime | NO |  | YES |
| 5 | `Duration` | bigint | NO |  |  |
| 6 | `Status` | int | NO |  |  |
| 7 | `Json` | nvarchar(max) | NO |  |  |
| 8 | `JobID` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IActiveDiagnosticsDetail_JobID` | no | NONCLUSTERED | `JobID` |  |
