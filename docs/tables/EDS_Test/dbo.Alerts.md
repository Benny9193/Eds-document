# Table: `dbo.Alerts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertID` | int | NO |  | YES |
| 2 | `DistrictID` | int | YES |  |  |
| 3 | `DisplayStart` | datetime | YES |  |  |
| 4 | `DisplayEnd` | datetime | YES |  |  |
| 5 | `Message` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
