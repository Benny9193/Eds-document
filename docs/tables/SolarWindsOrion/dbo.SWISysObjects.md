# Table: `dbo.SWISysObjects`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 56461

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ObjectID` | varchar(100) | NO |  | YES |
| 2 | `Vendor` | nvarchar(100) | NO |  |  |
| 3 | `SearchOrder` | int | NO | `((0))` |  |
| 4 | `Description` | nvarchar(250) | NO |  |  |
| 5 | `EnterpriseID` | int | NO |  |  |
| 6 | `ObjectCategory` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_EnterpriseID` | no | NONCLUSTERED | `EnterpriseID` |  |
| `IX_SearchOrder` | no | NONCLUSTERED | `SearchOrder` |  |
| `IX_Vendor` | no | NONCLUSTERED | `Vendor` |  |
