# Table: `dbo.CooperativeSystemConfigSnapshot`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 35

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `configId` | nvarchar(1000) | NO |  |  |
| 4 | `configHistoryId` | nvarchar(1000) | NO |  |  |
| 5 | `systemIdentifier` | nvarchar(50) | NO |  |  |
| 6 | `approvalExpirationDate` | date | NO |  |  |
| 7 | `approvalEffectiveDate` | date | NO |  |  |
| 8 | `generatedAtUtc` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CooperativeSystemConfigSnapshot_configHistoryId_fkey` | `configHistoryId` | [`dbo.CooperativeSystemConfigHistory.id`](dbo.CooperativeSystemConfigHistory.md) | NO_ACTION | NO_ACTION |
| `CooperativeSystemConfigSnapshot_configId_fkey` | `configId` | [`dbo.CooperativeSystemConfig.id`](dbo.CooperativeSystemConfig.md) | NO_ACTION | NO_ACTION |
| `CooperativeSystemConfigSnapshot_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CooperativeSystemConfigSnapshot_configHistoryId_idx` | no | NONCLUSTERED | `configHistoryId` |  |
| `CooperativeSystemConfigSnapshot_solicitationId_key` | YES | NONCLUSTERED | `solicitationId` |  |
