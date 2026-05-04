# Table: `dbo.WageRateImport`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `state` | nvarchar(1000) | NO |  |  |
| 3 | `county` | nvarchar(1000) | YES |  |  |
| 4 | `sourceType` | nvarchar(1000) | NO |  |  |
| 5 | `sourceUrl` | nvarchar(1000) | YES |  |  |
| 6 | `filename` | nvarchar(1000) | NO |  |  |
| 7 | `storageKey` | nvarchar(1000) | NO |  |  |
| 8 | `fileSize` | int | NO |  |  |
| 9 | `fileHash` | nvarchar(1000) | NO |  |  |
| 10 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 11 | `ratesExtracted` | int | NO | `((0))` |  |
| 12 | `ratesImported` | int | NO | `((0))` |  |
| 13 | `ratesUpdated` | int | NO | `((0))` |  |
| 14 | `ratesSkipped` | int | NO | `((0))` |  |
| 15 | `errorMessage` | nvarchar(max) | YES |  |  |
| 16 | `errorDetails` | nvarchar(max) | YES |  |  |
| 17 | `createdById` | nvarchar(1000) | NO |  |  |
| 18 | `processedAt` | datetime2 | YES |  |  |
| 19 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PrevailingWageRate`](dbo.PrevailingWageRate.md) | `sourceDocumentId` | `id` | SET_NULL | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `WageRateImport_createdAt_idx` | no | NONCLUSTERED | `createdAt` |  |
| `WageRateImport_fileHash_idx` | no | NONCLUSTERED | `fileHash` |  |
| `WageRateImport_state_county_idx` | no | NONCLUSTERED | `state`, `county` |  |
| `WageRateImport_status_idx` | no | NONCLUSTERED | `status` |  |
