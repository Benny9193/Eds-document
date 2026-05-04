# Table: `dbo.PrevailingWageThreshold`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `state` | nvarchar(1000) | NO | `('NJ')` |  |
| 3 | `entityType` | nvarchar(1000) | NO |  |  |
| 4 | `thresholdAmount` | decimal(18,2) | NO |  |  |
| 5 | `effectiveDate` | datetime2 | NO |  |  |
| 6 | `expirationDate` | datetime2 | YES |  |  |
| 7 | `statute` | nvarchar(1000) | YES |  |  |
| 8 | `notes` | nvarchar(max) | YES |  |  |
| 9 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 10 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PrevailingWageThreshold_effectiveDate_idx` | no | NONCLUSTERED | `effectiveDate` |  |
| `PrevailingWageThreshold_state_entityType_effectiveDate_key` | YES | NONCLUSTERED | `state`, `entityType`, `effectiveDate` |  |
| `PrevailingWageThreshold_state_entityType_idx` | no | NONCLUSTERED | `state`, `entityType` |  |
