# Table: `dbo.CooperativeSystemConfigHistory`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `configId` | nvarchar(1000) | NO |  |  |
| 3 | `systemIdentifier` | nvarchar(50) | NO |  |  |
| 4 | `systemName` | nvarchar(200) | NO |  |  |
| 5 | `leadAgencyName` | nvarchar(200) | NO |  |  |
| 6 | `leadAgencyShortName` | nvarchar(50) | NO |  |  |
| 7 | `administratorName` | nvarchar(200) | NO |  |  |
| 8 | `administratorShortName` | nvarchar(50) | NO |  |  |
| 9 | `approvalExpirationDate` | date | NO |  |  |
| 10 | `approvalEffectiveDate` | date | NO |  |  |
| 11 | `dlgsApprovalReference` | nvarchar(100) | YES |  |  |
| 12 | `changedAtUtc` | datetime2 | NO | `(getdate())` |  |
| 13 | `changedBy` | nvarchar(100) | NO |  |  |
| 14 | `changeReason` | nvarchar(500) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CooperativeSystemConfigHistory_configId_fkey` | `configId` | [`dbo.CooperativeSystemConfig.id`](dbo.CooperativeSystemConfig.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CooperativeSystemConfigSnapshot`](dbo.CooperativeSystemConfigSnapshot.md) | `configHistoryId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CooperativeSystemConfigHistory_configId_changedAtUtc_idx` | no | NONCLUSTERED | `configId`, `changedAtUtc` |  |
