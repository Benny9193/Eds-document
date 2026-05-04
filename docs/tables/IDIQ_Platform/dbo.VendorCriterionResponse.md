# Table: `dbo.VendorCriterionResponse`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3300

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `criterionId` | nvarchar(1000) | NO |  |  |
| 4 | `countyId` | nvarchar(1000) | YES |  |  |
| 5 | `passed` | bit | YES |  |  |
| 6 | `autoScore` | decimal(5,2) | YES |  |  |
| 7 | `manualScore` | decimal(5,2) | YES |  |  |
| 8 | `evaluatorNotes` | nvarchar(max) | YES |  |  |
| 9 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 10 | `updatedAt` | datetime2 | NO |  |  |
| 11 | `encryptedData` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `VendorCriterionResponse_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `VendorCriterionResponse_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | NO_ACTION |
| `VendorCriterionResponse_criterionId_fkey` | `criterionId` | [`dbo.EvaluationCriterion.id`](dbo.EvaluationCriterion.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VendorTierSelection`](dbo.VendorTierSelection.md) | `responseId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `VendorCriterionResponse_bidId_criterionId_countyId_key` | YES | NONCLUSTERED | `bidId`, `criterionId`, `countyId` |  |
| `VendorCriterionResponse_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
| `VendorCriterionResponse_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `VendorCriterionResponse_criterionId_idx` | no | NONCLUSTERED | `criterionId` |  |
