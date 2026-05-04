# Table: `dbo.Packaging_DatabaseCommittedTask`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | uniqueidentifier | NO |  | YES |
| 2 | `PackageID` | nvarchar(255) | NO |  |  |
| 3 | `Order` | int | NO |  |  |
| 4 | `BeforeActionSqlScript` | nvarchar(max) | NO |  |  |
| 5 | `UninstallActionSqlScript` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
