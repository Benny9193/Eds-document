# Table: `dbo.ProductVersion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Product` | nvarchar(50) | NO | `('')` |  |
| 3 | `LatestMajor` | int | NO | `((0))` |  |
| 4 | `LatestMinor` | int | NO | `((0))` |  |
| 5 | `LatestBuild` | int | NO | `((0))` |  |
| 6 | `LatestRevision` | int | NO | `((0))` |  |
| 7 | `MinimumMajor` | int | NO | `((0))` |  |
| 8 | `MinimumMinor` | int | NO | `((0))` |  |
| 9 | `MinimumBuild` | int | NO | `((0))` |  |
| 10 | `MinimumRevision` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
