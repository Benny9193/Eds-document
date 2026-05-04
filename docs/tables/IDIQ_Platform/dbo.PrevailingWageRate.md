# Table: `dbo.PrevailingWageRate`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 238

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `state` | nvarchar(1000) | NO |  |  |
| 3 | `county` | nvarchar(1000) | NO |  |  |
| 4 | `trade` | nvarchar(1000) | NO |  |  |
| 5 | `classification` | nvarchar(1000) | NO |  |  |
| 6 | `hourlyRate` | decimal(10,2) | NO |  |  |
| 7 | `fringeRate` | decimal(10,2) | NO |  |  |
| 8 | `totalRate` | decimal(10,2) | NO |  |  |
| 9 | `effectiveDate` | datetime2 | NO |  |  |
| 10 | `expirationDate` | datetime2 | YES |  |  |
| 11 | `sourceDocumentId` | nvarchar(1000) | YES |  |  |
| 12 | `importedAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `PrevailingWageRate_sourceDocumentId_fkey` | `sourceDocumentId` | [`dbo.WageRateImport.id`](dbo.WageRateImport.md) | SET_NULL | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PrevailingWageRate_effectiveDate_idx` | no | NONCLUSTERED | `effectiveDate` |  |
| `PrevailingWageRate_sourceDocumentId_idx` | no | NONCLUSTERED | `sourceDocumentId` |  |
| `PrevailingWageRate_state_county_idx` | no | NONCLUSTERED | `state`, `county` |  |
| `PrevailingWageRate_trade_idx` | no | NONCLUSTERED | `trade` |  |
