# Table: `dbo.ProcurementTypeHistory`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `slug` | nvarchar(1000) | NO |  |  |
| 3 | `version` | int | NO |  |  |
| 4 | `displayName` | nvarchar(1000) | NO |  |  |
| 5 | `description` | nvarchar(max) | NO |  |  |
| 6 | `effectiveDate` | datetime2 | NO |  |  |
| 7 | `sunsetDate` | datetime2 | YES |  |  |
| 8 | `active` | bit | NO |  |  |
| 9 | `terminology` | nvarchar(max) | NO |  |  |
| 10 | `statutes` | nvarchar(max) | NO |  |  |
| 11 | `rules` | nvarchar(max) | NO |  |  |
| 12 | `legalNotice` | nvarchar(max) | NO |  |  |
| 13 | `capturedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ProcurementTypeHistory_slug_idx` | no | NONCLUSTERED | `slug` |  |
| `ProcurementTypeHistory_slug_version_key` | YES | NONCLUSTERED | `slug`, `version` |  |
