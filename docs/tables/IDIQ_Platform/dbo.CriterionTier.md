# Table: `dbo.CriterionTier`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 548

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `criterionId` | nvarchar(1000) | NO |  |  |
| 3 | `label` | nvarchar(1000) | NO |  |  |
| 4 | `points` | int | NO |  |  |
| 5 | `order` | int | NO | `((0))` |  |
| 6 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 7 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CriterionTier_criterionId_fkey` | `criterionId` | [`dbo.EvaluationCriterion.id`](dbo.EvaluationCriterion.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VendorTierSelection`](dbo.VendorTierSelection.md) | `tierId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CriterionTier_criterionId_idx` | no | NONCLUSTERED | `criterionId` |  |
