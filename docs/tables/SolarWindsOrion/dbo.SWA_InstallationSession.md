# Table: `dbo.SWA_InstallationSession`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Stage` | varchar(50) | NO |  |  |
| 3 | `StageChangedOn` | datetimeoffset | YES |  |  |
| 4 | `StartedOn` | datetimeoffset | YES |  |  |
| 5 | `EndedOn` | datetimeoffset | YES |  |  |
| 6 | `CreatedOn` | datetimeoffset | NO | `(sysdatetimeoffset())` |  |
| 7 | `ProductCatalogVersion` | int | NO |  |  |
| 8 | `SelectedProducts` | nvarchar(max) | NO |  |  |
| 9 | `IsActive` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SWA_InstallationSession_OnlyOneActive` | YES | NONCLUSTERED | `IsActive` |  |
