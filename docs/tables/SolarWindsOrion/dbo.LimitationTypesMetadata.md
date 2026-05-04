# Table: `dbo.LimitationTypesMetadata`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 21

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LimitationTypeID` | int | NO |  | YES |
| 2 | `FieldTypeName` | nvarchar(128) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_LimitationTypesMetadata_LimitationTypeID` | `LimitationTypeID` | [`dbo.LimitationTypes.LimitationTypeID`](dbo.LimitationTypes.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
