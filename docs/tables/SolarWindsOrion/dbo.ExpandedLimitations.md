# Table: `dbo.ExpandedLimitations`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ExpandedLimitationID` | int | NO |  | YES |
| 2 | `LimitationID` | int | NO |  | YES |
| 3 | `LimitationTypeID` | int | YES |  |  |
| 4 | `OwnerEntityID` | int | YES |  |  |
| 5 | `OwnerEntityType` | nvarchar(255) | YES |  |  |
| 6 | `TableName` | nvarchar(255) | YES |  |  |
| 7 | `Definition` | nvarchar(max) | YES |  |  |
| 8 | `WhereClause` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ExpandedLimitations_OwnerEntity` | no | NONCLUSTERED | `OwnerEntityID`, `OwnerEntityType` |  |
