# Table: `dbo.AIVerificationFeedback`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `verificationId` | nvarchar(1000) | NO |  |  |
| 3 | `userId` | nvarchar(1000) | NO |  |  |
| 4 | `tenantId` | nvarchar(1000) | NO |  |  |
| 5 | `feedbackType` | nvarchar(1000) | NO |  |  |
| 6 | `originalScore` | float | NO |  |  |
| 7 | `userScore` | float | YES |  |  |
| 8 | `comments` | nvarchar(max) | YES |  |  |
| 9 | `findingsFeedback` | nvarchar(max) | YES |  |  |
| 10 | `exportedForTraining` | bit | NO | `((0))` |  |
| 11 | `exportedAt` | datetime2 | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `AIVerificationFeedback_verificationId_fkey` | `verificationId` | [`dbo.AIVerification.id`](dbo.AIVerification.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AIVerificationFeedback_exportedForTraining_idx` | no | NONCLUSTERED | `exportedForTraining` |  |
| `AIVerificationFeedback_feedbackType_idx` | no | NONCLUSTERED | `feedbackType` |  |
| `AIVerificationFeedback_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `AIVerificationFeedback_verificationId_idx` | no | NONCLUSTERED | `verificationId` |  |
| `AIVerificationFeedback_verificationId_userId_key` | YES | NONCLUSTERED | `verificationId`, `userId` |  |
