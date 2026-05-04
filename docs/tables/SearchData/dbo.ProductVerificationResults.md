# Table: `dbo.ProductVerificationResults`

**Database:** `SearchData` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 91787

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VerificationId` | int | NO |  | YES |
| 2 | `EntryId` | nvarchar(255) | NO |  |  |
| 3 | `VerificationResult` | nvarchar(50) | NO |  |  |
| 4 | `DataChecked` | nvarchar(max) | YES |  |  |
| 5 | `Reasoning` | nvarchar(max) | YES |  |  |
| 6 | `VerifiedAt` | datetime2 | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UQ_EntryId` | YES | NONCLUSTERED | `EntryId` |  |
