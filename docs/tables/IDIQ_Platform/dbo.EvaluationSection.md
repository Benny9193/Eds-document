# Table: `dbo.EvaluationSection`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 90

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `frameworkId` | nvarchar(1000) | NO |  |  |
| 3 | `sectionNumber` | int | NO |  |  |
| 4 | `title` | nvarchar(1000) | NO |  |  |
| 5 | `sectionType` | nvarchar(1000) | NO |  |  |
| 6 | `maxPoints` | int | NO |  |  |
| 7 | `instructions` | nvarchar(max) | YES |  |  |
| 8 | `order` | int | NO | `((0))` |  |
| 9 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 10 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `EvaluationSection_frameworkId_fkey` | `frameworkId` | [`dbo.EvaluationFramework.id`](dbo.EvaluationFramework.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.EvaluationCriterion`](dbo.EvaluationCriterion.md) | `sectionId` | `id` | CASCADE | CASCADE |
| [`dbo.PricingScenario`](dbo.PricingScenario.md) | `sectionId` | `id` | CASCADE | CASCADE |
| [`dbo.ReferencePricingIndex`](dbo.ReferencePricingIndex.md) | `sectionId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `EvaluationSection_frameworkId_idx` | no | NONCLUSTERED | `frameworkId` |  |
