# Table: `dbo.ProcurementType`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `slug` | nvarchar(1000) | NO |  |  |
| 3 | `displayName` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(max) | NO |  |  |
| 5 | `version` | int | NO | `((1))` |  |
| 6 | `effectiveDate` | datetime2 | NO |  |  |
| 7 | `sunsetDate` | datetime2 | YES |  |  |
| 8 | `active` | bit | NO | `((1))` |  |
| 9 | `terminology` | nvarchar(max) | NO |  |  |
| 10 | `statutes` | nvarchar(max) | NO |  |  |
| 11 | `rules` | nvarchar(max) | NO |  |  |
| 12 | `legalNotice` | nvarchar(max) | NO |  |  |
| 13 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 14 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ProcurementType_active_idx` | no | NONCLUSTERED | `active` |  |
| `ProcurementType_slug_key` | YES | NONCLUSTERED | `slug` |  |
