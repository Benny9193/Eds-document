# Table: `dbo.Sites`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SiteID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(100) | NO |  |  |
| 3 | `Host` | nvarchar(100) | NO |  |  |
| 4 | `Website` | nvarchar(255) | YES |  |  |
| 5 | `Status` | int | NO | `((0))` |  |
| 6 | `StatusDescription` | nvarchar(255) | YES |  |  |
| 7 | `Enabled` | bit | NO | `((1))` |  |
| 8 | `Tag` | nvarchar(40) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
