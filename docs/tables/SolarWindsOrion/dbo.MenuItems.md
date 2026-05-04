# Table: `dbo.MenuItems`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 37

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MenuItemID` | int | NO |  | YES |
| 2 | `Title` | nvarchar(200) | YES |  |  |
| 3 | `Link` | nvarchar(255) | YES |  |  |
| 4 | `System` | char(1) | YES |  |  |
| 5 | `NewWindow` | char(1) | YES |  |  |
| 6 | `Description` | nvarchar(255) | YES |  |  |
| 7 | `GUID` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
