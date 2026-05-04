# Table: `dbo.ReferencePricingIndex`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 33

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `sectionId` | nvarchar(1000) | NO |  |  |
| 3 | `maxPoints` | int | NO | `((5))` |  |
| 4 | `roles` | nvarchar(max) | NO |  |  |
| 5 | `markupTypes` | nvarchar(max) | NO |  |  |
| 6 | `disclaimer` | nvarchar(max) | YES |  |  |
| 7 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ReferencePricingIndex_sectionId_fkey` | `sectionId` | [`dbo.EvaluationSection.id`](dbo.EvaluationSection.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VendorPricingIndex`](dbo.VendorPricingIndex.md) | `indexId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ReferencePricingIndex_sectionId_key` | YES | NONCLUSTERED | `sectionId` |  |
