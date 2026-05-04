# Table: `dbo.AlertActiveObjects`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertActiveID` | bigint | NO |  | YES |
| 2 | `EntityUri` | nvarchar(400) | YES |  |  |
| 3 | `EntityType` | nvarchar(250) | YES |  |  |
| 4 | `EntityCaption` | nvarchar(1024) | YES |  |  |
| 5 | `EntityDetailsUrl` | nvarchar(max) | YES |  |  |
| 6 | `RelatedNodeCaption` | nvarchar(1024) | YES |  |  |
| 7 | `RelatedNodeUri` | nvarchar(400) | YES |  |  |
| 8 | `RelatedNodeDetailsUrl` | nvarchar(max) | YES |  |  |
| 9 | `RealEntityUri` | nvarchar(400) | YES |  |  |
| 10 | `RealEntityType` | nvarchar(250) | YES |  |  |
| 11 | `AlertActiveObjectID` | bigint | NO |  | YES |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
