# Table: `dbo.LimitationTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LimitationTypeID` | int | NO |  | YES |
| 2 | `LimitationTypeName` | nvarchar(255) | YES |  |  |
| 3 | `LimitationTypeTable` | varchar(50) | YES |  |  |
| 4 | `LimitationTypeField` | nvarchar(200) | YES |  |  |
| 5 | `Method` | varchar(50) | YES |  |  |
| 6 | `System` | char(1) | YES |  |  |
| 7 | `Advanced` | char(1) | YES |  |  |
| 8 | `Description` | nvarchar(255) | YES |  |  |
| 9 | `IsSwisLimitation` | bit | NO | `((0))` |  |
| 10 | `IsGroupOfEntity` | bit | NO | `((0))` |  |
| 11 | `EntityType` | nvarchar(200) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.LimitationTypesMetadata`](dbo.LimitationTypesMetadata.md) | `LimitationTypeID` | `LimitationTypeID` | CASCADE | NO_ACTION |

## Indexes

_No non-PK indexes._
