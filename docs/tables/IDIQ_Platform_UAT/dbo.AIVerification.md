# Table: `dbo.AIVerification`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 89

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `entityType` | nvarchar(1000) | NO |  |  |
| 3 | `entityId` | nvarchar(1000) | NO |  |  |
| 4 | `justificationText` | nvarchar(max) | NO |  |  |
| 5 | `contractContext` | nvarchar(max) | NO |  |  |
| 6 | `overallScore` | float | NO |  |  |
| 7 | `status` | nvarchar(1000) | NO |  |  |
| 8 | `findings` | nvarchar(max) | NO |  |  |
| 9 | `suggestions` | nvarchar(max) | YES |  |  |
| 10 | `modelUsed` | nvarchar(1000) | NO |  |  |
| 11 | `promptVersion` | nvarchar(1000) | NO |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AIVerificationFeedback`](dbo.AIVerificationFeedback.md) | `verificationId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AIVerification_entityType_entityId_idx` | no | NONCLUSTERED | `entityType`, `entityId` |  |
| `AIVerification_status_idx` | no | NONCLUSTERED | `status` |  |
