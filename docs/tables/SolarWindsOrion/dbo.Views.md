# Table: `dbo.Views`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 40

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ViewID` | int | NO |  | YES |
| 2 | `ViewKey` | nvarchar(200) | YES |  |  |
| 3 | `ViewTitle` | nvarchar(200) | YES |  |  |
| 4 | `ViewType` | varchar(50) | YES |  |  |
| 5 | `Columns` | smallint | YES |  |  |
| 6 | `Column1Width` | int | YES |  |  |
| 7 | `Column2Width` | int | YES |  |  |
| 8 | `Column3Width` | int | YES |  |  |
| 9 | `Column4Width` | int | YES |  |  |
| 10 | `Column5Width` | int | YES |  |  |
| 11 | `Column6Width` | int | YES |  |  |
| 12 | `System` | varchar(50) | YES |  |  |
| 13 | `Customizable` | varchar(50) | YES |  |  |
| 14 | `LimitationID` | int | YES |  |  |
| 15 | `ViewGroup` | int | YES |  |  |
| 16 | `ViewIcon` | nvarchar(50) | YES |  |  |
| 17 | `ViewGroupPosition` | int | YES |  |  |
| 18 | `ViewGroupName` | nvarchar(200) | YES |  |  |
| 19 | `NOCView` | bit | NO | `((0))` |  |
| 20 | `NOCViewRotationInterval` | int | YES |  |  |
| 21 | `ReadOnly` | bit | NO | `((0))` |  |
| 22 | `DefaultHomePage` | bit | NO | `((0))` |  |
| 23 | `DefaultHomePagePriority` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
