# Table: `dbo.Dependencies`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DependencyId` | int | NO |  |  |
| 2 | `Name` | nvarchar(250) | NO |  |  |
| 3 | `ParentUri` | nvarchar(250) | NO |  |  |
| 4 | `ChildUri` | nvarchar(250) | NO |  |  |
| 5 | `LastUpdateUTC` | datetime | NO |  |  |
| 6 | `AutoManaged` | bit | NO | `((0))` |  |
| 7 | `EngineID` | int | NO | `((0))` |  |
| 8 | `Category` | int | NO | `((0))` |  |
| 9 | `ParentEntityType` | nvarchar(250) | NO | `('UNKNOWN')` |  |
| 10 | `ParentNetObjectID` | int | NO | `((-1))` |  |
| 11 | `ChildEntityType` | nvarchar(250) | NO | `('UNKNOWN')` |  |
| 12 | `ChildNetObjectID` | int | NO | `((-1))` |  |
| 13 | `IncludeInStatusCalculation` | bit | NO | `((1))` |  |
| 14 | `Description` | nvarchar(max) | NO | `('')` |  |
| 15 | `Owner` | nvarchar(250) | NO | `('')` |  |
| 16 | `FoundAsAutoManaged` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Dependencies_AutoManaged` | no | NONCLUSTERED | `AutoManaged` |  |
| `IX_Dependencies_ChildUri` | no | NONCLUSTERED | `ChildUri` |  |
| `IX_Dependencies_DependencyId` | YES | CLUSTERED | `DependencyId` |  |
| `IX_Dependencies_IncludeInStatusCalculation` | no | NONCLUSTERED | `IncludeInStatusCalculation` |  |
