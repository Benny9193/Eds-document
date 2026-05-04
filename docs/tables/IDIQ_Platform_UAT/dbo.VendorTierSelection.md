# Table: `dbo.VendorTierSelection`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 522

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `responseId` | nvarchar(1000) | NO |  |  |
| 3 | `tierId` | nvarchar(1000) | NO |  |  |
| 4 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `VendorTierSelection_responseId_fkey` | `responseId` | [`dbo.VendorCriterionResponse.id`](dbo.VendorCriterionResponse.md) | CASCADE | CASCADE |
| `VendorTierSelection_tierId_fkey` | `tierId` | [`dbo.CriterionTier.id`](dbo.CriterionTier.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `VendorTierSelection_responseId_idx` | no | NONCLUSTERED | `responseId` |  |
| `VendorTierSelection_responseId_tierId_key` | YES | NONCLUSTERED | `responseId`, `tierId` |  |
| `VendorTierSelection_tierId_idx` | no | NONCLUSTERED | `tierId` |  |
