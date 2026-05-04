# Table: `dbo.Tenant`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 131

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `name` | nvarchar(1000) | NO |  |  |
| 3 | `shortName` | nvarchar(1000) | YES |  |  |
| 4 | `slug` | nvarchar(1000) | YES |  |  |
| 5 | `type` | nvarchar(1000) | NO |  |  |
| 6 | `state` | nvarchar(1000) | YES |  |  |
| 7 | `cooperativeId` | nvarchar(1000) | YES |  |  |
| 8 | `leadAgencyId` | nvarchar(1000) | YES |  |  |
| 9 | `countyId` | nvarchar(1000) | YES |  |  |
| 10 | `settings` | nvarchar(max) | YES |  |  |
| 11 | `mfaRequired` | bit | NO | `((0))` |  |
| 12 | `mfaRequiredRoles` | nvarchar(1000) | YES |  |  |
| 13 | `mfaGracePeriodDays` | int | YES |  |  |
| 14 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 15 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Tenant_cooperativeId_fkey` | `cooperativeId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `Tenant_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AwardRecommendation`](dbo.AwardRecommendation.md) | `createdByCooperativeId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.AwardRecommendation`](dbo.AwardRecommendation.md) | `leadAgencyId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Contract`](dbo.Contract.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](dbo.ContractorPayrollViolation.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractTermination`](dbo.ContractTermination.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.CostEffectivenessDetermination`](dbo.CostEffectivenessDetermination.md) | `cooperativeId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.FormTemplate`](dbo.FormTemplate.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.JobReference`](dbo.JobReference.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Newspaper`](dbo.Newspaper.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Notification`](dbo.Notification.md) | `tenantId` | `id` | CASCADE | CASCADE |
| [`dbo.PayrollFailure`](dbo.PayrollFailure.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Solicitation`](dbo.Solicitation.md) | `createdByTenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Solicitation`](dbo.Solicitation.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.SolicitationAdvertisement`](dbo.SolicitationAdvertisement.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Subcontractor`](dbo.Subcontractor.md) | `tenantId` | `id` | NO_ACTION | CASCADE |
| [`dbo.Tenant`](dbo.Tenant.md) | `cooperativeId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.User`](dbo.User.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.UserInvitation`](dbo.UserInvitation.md) | `tenantId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Tenant_cooperativeId_idx` | no | NONCLUSTERED | `cooperativeId` |  |
| `Tenant_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `Tenant_slug_key` | YES | NONCLUSTERED | `slug` |  |
| `Tenant_type_idx` | no | NONCLUSTERED | `type` |  |
