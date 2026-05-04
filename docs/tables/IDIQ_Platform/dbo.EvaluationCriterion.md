# Table: `dbo.EvaluationCriterion`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 578

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `sectionId` | nvarchar(1000) | NO |  |  |
| 3 | `name` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(max) | YES |  |  |
| 5 | `maxPoints` | int | NO |  |  |
| 6 | `scoringType` | nvarchar(1000) | NO |  |  |
| 7 | `order` | int | NO | `((0))` |  |
| 8 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 9 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `EvaluationCriterion_sectionId_fkey` | `sectionId` | [`dbo.EvaluationSection.id`](dbo.EvaluationSection.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CriterionTier`](dbo.CriterionTier.md) | `criterionId` | `id` | CASCADE | CASCADE |
| [`dbo.VendorCriterionResponse`](dbo.VendorCriterionResponse.md) | `criterionId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `EvaluationCriterion_sectionId_idx` | no | NONCLUSTERED | `sectionId` |  |
