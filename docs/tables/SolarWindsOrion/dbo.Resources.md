# Table: `dbo.Resources`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 299

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ResourceID` | int | NO |  | YES |
| 2 | `ViewID` | int | YES |  |  |
| 3 | `ViewColumn` | smallint | YES |  |  |
| 4 | `Position` | smallint | YES |  |  |
| 5 | `ResourceName` | nvarchar(250) | YES |  |  |
| 6 | `ResourceFile` | varchar(255) | YES |  |  |
| 7 | `ResourceTitle` | nvarchar(255) | YES |  |  |
| 8 | `ResourceSubTitle` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ResourceUserSetting`](dbo.ResourceUserSetting.md) | `ResourceID` | `ResourceID` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
