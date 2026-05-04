# Table: `dbo.CostEffectivenessDetermination`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `cooperativeId` | nvarchar(1000) | NO |  |  |
| 4 | `contractId` | nvarchar(1000) | YES |  |  |
| 5 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 6 | `determinationType` | nvarchar(1000) | YES |  |  |
| 7 | `analysisDate` | datetime2 | NO | `(getdate())` |  |
| 8 | `preparedById` | nvarchar(1000) | YES |  |  |
| 9 | `expiresAt` | datetime2 | YES |  |  |
| 10 | `comparisonPeriodStart` | datetime2 | YES |  |  |
| 11 | `comparisonPeriodEnd` | datetime2 | YES |  |  |
| 12 | `serviceCharges` | decimal(18,2) | YES |  |  |
| 13 | `materialCosts` | decimal(18,2) | YES |  |  |
| 14 | `deliveryCharges` | decimal(18,2) | YES |  |  |
| 15 | `administrativeFees` | decimal(18,2) | YES |  |  |
| 16 | `otherFactors` | nvarchar(max) | YES |  |  |
| 17 | `cooperativeTotalCost` | decimal(18,2) | YES |  |  |
| 18 | `cooperativePricing` | decimal(18,2) | YES |  |  |
| 19 | `marketPricing` | decimal(18,2) | YES |  |  |
| 20 | `alternativeMethodCost` | decimal(18,2) | YES |  |  |
| 21 | `estimatedSavings` | decimal(18,2) | YES |  |  |
| 22 | `priceSavings` | decimal(18,2) | YES |  |  |
| 23 | `priceSavingsPercentage` | decimal(5,2) | YES |  |  |
| 24 | `savingsPercentage` | decimal(5,2) | YES |  |  |
| 25 | `administrativeSavings` | decimal(18,2) | YES |  |  |
| 26 | `complianceSavings` | decimal(18,2) | YES |  |  |
| 27 | `totalSavings` | decimal(18,2) | YES |  |  |
| 28 | `determination` | nvarchar(1000) | YES |  |  |
| 29 | `justification` | nvarchar(max) | YES |  |  |
| 30 | `isCostEffective` | bit | NO | `((0))` |  |
| 31 | `pricingComparisons` | nvarchar(max) | YES |  |  |
| 32 | `analysisCompletedAt` | datetime2 | YES |  |  |
| 33 | `analysisCompletedById` | nvarchar(1000) | YES |  |  |
| 34 | `analysisNotes` | nvarchar(max) | YES |  |  |
| 35 | `analysisDocumentKey` | nvarchar(1000) | YES |  |  |
| 36 | `supportingDocuments` | nvarchar(1000) | YES |  |  |
| 37 | `approvedAt` | datetime2 | YES |  |  |
| 38 | `approvedById` | nvarchar(1000) | YES |  |  |
| 39 | `approverName` | nvarchar(1000) | YES |  |  |
| 40 | `approverTitle` | nvarchar(1000) | YES |  |  |
| 41 | `approvalNotes` | nvarchar(max) | YES |  |  |
| 42 | `conditionsOfApproval` | nvarchar(max) | YES |  |  |
| 43 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 44 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CostEffectivenessDetermination_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `CostEffectivenessDetermination_cooperativeId_fkey` | `cooperativeId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CostEffectivenessDetermination_contractId_idx` | no | NONCLUSTERED | `contractId` |  |
| `CostEffectivenessDetermination_cooperativeId_idx` | no | NONCLUSTERED | `cooperativeId` |  |
| `CostEffectivenessDetermination_determination_idx` | no | NONCLUSTERED | `determination` |  |
| `CostEffectivenessDetermination_expiresAt_idx` | no | NONCLUSTERED | `expiresAt` |  |
| `CostEffectivenessDetermination_status_idx` | no | NONCLUSTERED | `status` |  |
| `CostEffectivenessDetermination_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
