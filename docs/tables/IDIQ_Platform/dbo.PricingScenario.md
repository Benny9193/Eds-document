# Table: `dbo.PricingScenario`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `sectionId` | nvarchar(1000) | NO |  |  |
| 3 | `title` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(max) | NO |  |  |
| 5 | `maxPoints` | int | NO |  |  |
| 6 | `order` | int | NO | `((0))` |  |
| 7 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `PricingScenario_sectionId_fkey` | `sectionId` | [`dbo.EvaluationSection.id`](dbo.EvaluationSection.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VendorScenarioPrice`](dbo.VendorScenarioPrice.md) | `scenarioId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PricingScenario_sectionId_idx` | no | NONCLUSTERED | `sectionId` |  |
