# Table: `dbo.DebarmentRecord`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 329

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `vendorName` | nvarchar(1000) | NO |  |  |
| 3 | `vendorTaxId` | nvarchar(1000) | YES |  |  |
| 4 | `listingDate` | datetime2 | NO |  |  |
| 5 | `expirationDate` | datetime2 | YES |  |  |
| 6 | `source` | nvarchar(1000) | NO |  |  |
| 7 | `violationType` | nvarchar(1000) | YES |  |  |
| 8 | `details` | nvarchar(max) | YES |  |  |
| 9 | `importedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ContractTermination`](dbo.ContractTermination.md) | `debarmentRecordId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Subcontractor`](dbo.Subcontractor.md) | `debarmentRecordId` | `id` | SET_NULL | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `DebarmentRecord_source_idx` | no | NONCLUSTERED | `source` |  |
| `DebarmentRecord_vendorName_idx` | no | NONCLUSTERED | `vendorName` |  |
| `DebarmentRecord_vendorTaxId_idx` | no | NONCLUSTERED | `vendorTaxId` |  |
