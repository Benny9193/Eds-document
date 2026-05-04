# Table: `dbo.AwardRecommendation`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `createdByCooperativeId` | nvarchar(1000) | NO |  |  |
| 4 | `createdByUserId` | nvarchar(1000) | NO |  |  |
| 5 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 6 | `submittedAt` | datetime2 | YES |  |  |
| 7 | `leadAgencyId` | nvarchar(1000) | YES |  |  |
| 8 | `decidedByUserId` | nvarchar(1000) | YES |  |  |
| 9 | `decision` | nvarchar(1000) | YES |  |  |
| 10 | `decisionComments` | nvarchar(max) | YES |  |  |
| 11 | `decidedAt` | datetime2 | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `AwardRecommendation_createdByCooperativeId_fkey` | `createdByCooperativeId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `AwardRecommendation_createdByUserId_fkey` | `createdByUserId` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `AwardRecommendation_decidedByUserId_fkey` | `decidedByUserId` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `AwardRecommendation_leadAgencyId_fkey` | `leadAgencyId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `AwardRecommendation_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.RecommendedVendor`](dbo.RecommendedVendor.md) | `recommendationId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AwardRecommendation_createdByCooperativeId_idx` | no | NONCLUSTERED | `createdByCooperativeId` |  |
| `AwardRecommendation_leadAgencyId_idx` | no | NONCLUSTERED | `leadAgencyId` |  |
| `AwardRecommendation_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `AwardRecommendation_status_idx` | no | NONCLUSTERED | `status` |  |
