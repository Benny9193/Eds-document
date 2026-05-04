# Table: `dbo.Document`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `entityType` | nvarchar(1000) | NO |  |  |
| 4 | `entityId` | nvarchar(1000) | NO |  |  |
| 5 | `filename` | nvarchar(1000) | NO |  |  |
| 6 | `fileType` | nvarchar(1000) | NO |  |  |
| 7 | `fileSize` | int | NO |  |  |
| 8 | `storageKey` | nvarchar(1000) | NO |  |  |
| 9 | `version` | int | NO | `((1))` |  |
| 10 | `accessLevel` | nvarchar(1000) | NO | `('PRIVATE')` |  |
| 11 | `retentionDate` | datetime2 | YES |  |  |
| 12 | `uploadedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Document_entityType_entityId_idx` | no | NONCLUSTERED | `entityType`, `entityId` |  |
| `Document_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
