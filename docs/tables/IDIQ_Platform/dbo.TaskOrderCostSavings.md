# Table: `dbo.TaskOrderCostSavings`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `taskOrderId` | nvarchar(1000) | NO |  |  |
| 4 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 5 | `cooperativePrice` | decimal(18,2) | YES |  |  |
| 6 | `comparisonPrice` | decimal(18,2) | YES |  |  |
| 7 | `comparisonMethods` | nvarchar(max) | YES |  |  |
| 8 | `otherMethodDetail` | nvarchar(max) | YES |  |  |
| 9 | `estimatedSavings` | decimal(18,2) | YES |  |  |
| 10 | `savingsPercentage` | decimal(5,2) | YES |  |  |
| 11 | `additionalFactors` | nvarchar(max) | YES |  |  |
| 12 | `supportingDetail` | nvarchar(max) | YES |  |  |
| 13 | `determination` | nvarchar(1000) | YES |  |  |
| 14 | `certifiedByName` | nvarchar(1000) | YES |  |  |
| 15 | `certifiedByTitle` | nvarchar(1000) | YES |  |  |
| 16 | `certifiedAt` | datetime2 | YES |  |  |
| 17 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 18 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `TaskOrderCostSavings_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `TaskOrderCostSavings_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `TaskOrderCostSavings_taskOrderId_key` | YES | NONCLUSTERED | `taskOrderId` |  |
| `TaskOrderCostSavings_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
