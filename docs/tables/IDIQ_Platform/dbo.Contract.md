# Table: `dbo.Contract`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `contractNumber` | nvarchar(1000) | NO |  |  |
| 4 | `title` | nvarchar(1000) | NO |  |  |
| 5 | `description` | nvarchar(max) | YES |  |  |
| 6 | `type` | nvarchar(1000) | NO |  |  |
| 7 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 8 | `minValue` | decimal(18,2) | NO |  |  |
| 9 | `maxValue` | decimal(18,2) | NO |  |  |
| 10 | `currentValue` | decimal(18,2) | NO | `((0))` |  |
| 11 | `startDate` | datetime2 | NO |  |  |
| 12 | `endDate` | datetime2 | NO |  |  |
| 13 | `prevailingWageRequired` | bit | NO | `((0))` |  |
| 14 | `hasSolicitationDeterminations` | bit | NO | `((0))` |  |
| 15 | `cooperativeEligible` | bit | NO | `((0))` |  |
| 16 | `pricingType` | nvarchar(1000) | NO | `('UNIT_PRICE')` |  |
| 17 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 18 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Contract_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Bid`](dbo.Bid.md) | `awardedContractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractTermination`](dbo.ContractTermination.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.CostEffectivenessDetermination`](dbo.CostEffectivenessDetermination.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.MiniBid`](dbo.MiniBid.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.PayrollRecordWithholding`](dbo.PayrollRecordWithholding.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Solicitation`](dbo.Solicitation.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.StopWorkOrder`](dbo.StopWorkOrder.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkerWageProtest`](dbo.WorkerWageProtest.md) | `contractId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Contract_status_idx` | no | NONCLUSTERED | `status` |  |
| `Contract_tenantId_contractNumber_key` | YES | NONCLUSTERED | `tenantId`, `contractNumber` |  |
| `Contract_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
