# Table: `dbo.ReportDefinitions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 110

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ReportID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(255) | NO |  |  |
| 3 | `Title` | nvarchar(255) | NO |  |  |
| 4 | `SubTitle` | nvarchar(255) | YES |  |  |
| 5 | `Type` | nvarchar(127) | NO |  |  |
| 6 | `Description` | nvarchar(max) | YES |  |  |
| 7 | `Category` | nvarchar(127) | YES |  |  |
| 8 | `LegacyPath` | nvarchar(255) | YES |  |  |
| 9 | `Definition` | nvarchar(max) | NO |  |  |
| 10 | `ModuleTitle` | nvarchar(63) | YES |  |  |
| 11 | `RecipientList` | nvarchar(511) | YES |  |  |
| 12 | `LimitationCategory` | nvarchar(255) | YES |  |  |
| 13 | `Owner` | nvarchar(100) | YES |  |  |
| 14 | `LastRenderDuration` | int | YES |  |  |
| 15 | `Hash` | varchar(64) | YES |  |  |
| 16 | `OrionFeatureName` | nvarchar(100) | YES |  |  |
| 17 | `Comments` | nvarchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
