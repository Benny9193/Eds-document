# Table: `dbo.Suppression`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5983

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Email` | varchar(100) | YES |  |  |
| 3 | `Type` | varchar(50) | YES |  |  |
| 4 | `District` | varchar(100) | YES |  |  |
| 5 | `Locator` | varchar(200) | YES |  |  |
| 6 | `Phone` | varchar(20) | YES |  |  |
| 7 | `Reason` | varchar(300) | YES |  |  |
| 8 | `Handled` | bit | YES | `((1))` |  |
| 9 | `CreatedAt` | datetime | YES | `(getdate())` |  |
| 10 | `UpdatedAt` | datetime | YES |  |  |
| 11 | `CreatedBy` | int | YES | `((0))` |  |
| 12 | `UpdatedBy` | int | YES | `((0))` |  |
| 13 | `BelongsTo` | varchar(50) | YES |  |  |
| 14 | `SuppressionType` | varchar(50) | YES |  |  |
| 15 | `SuppressionAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Suppression_uindex` | YES | NONCLUSTERED | `Email`, `SuppressionType` |  |
