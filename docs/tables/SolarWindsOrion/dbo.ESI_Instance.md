# Table: `dbo.ESI_Instance`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `InstanceID` | uniqueidentifier | NO |  | YES |
| 2 | `Type` | nvarchar(64) | NO |  |  |
| 3 | `Name` | nvarchar(512) | NO |  |  |
| 4 | `Url` | nvarchar(1024) | NO |  |  |
| 5 | `CredentialID` | int | NO |  |  |
| 6 | `OperationalState` | int | NO |  |  |
| 7 | `Status` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
