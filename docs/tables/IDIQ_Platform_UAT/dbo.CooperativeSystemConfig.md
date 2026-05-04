# Table: `dbo.CooperativeSystemConfig`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `configKey` | nvarchar(1000) | NO | `('default')` |  |
| 3 | `systemIdentifier` | nvarchar(50) | NO |  |  |
| 4 | `systemName` | nvarchar(200) | NO |  |  |
| 5 | `leadAgencyName` | nvarchar(200) | NO |  |  |
| 6 | `leadAgencyShortName` | nvarchar(50) | NO |  |  |
| 7 | `administratorName` | nvarchar(200) | NO |  |  |
| 8 | `administratorShortName` | nvarchar(50) | NO |  |  |
| 9 | `approvalExpirationDate` | date | NO |  |  |
| 10 | `approvalEffectiveDate` | date | NO |  |  |
| 11 | `dlgsApprovalReference` | nvarchar(100) | YES |  |  |
| 12 | `isActive` | bit | NO | `((1))` |  |
| 13 | `lastModifiedUtc` | datetime2 | NO | `(getdate())` |  |
| 14 | `lastModifiedBy` | nvarchar(100) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CooperativeSystemConfigHistory`](dbo.CooperativeSystemConfigHistory.md) | `configId` | `id` | CASCADE | CASCADE |
| [`dbo.CooperativeSystemConfigSnapshot`](dbo.CooperativeSystemConfigSnapshot.md) | `configId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CooperativeSystemConfig_configKey_isActive_idx` | no | NONCLUSTERED | `configKey`, `isActive` |  |
| `CooperativeSystemConfig_configKey_key` | YES | NONCLUSTERED | `configKey` |  |
