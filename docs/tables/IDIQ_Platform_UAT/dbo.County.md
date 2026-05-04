# Table: `dbo.County`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 83

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `state` | nvarchar(1000) | NO |  |  |
| 3 | `code` | nvarchar(1000) | NO |  |  |
| 4 | `name` | nvarchar(1000) | NO |  |  |
| 5 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidCounty`](dbo.BidCounty.md) | `countyId` | `id` | NO_ACTION | CASCADE |
| [`dbo.BidCountyAward`](dbo.BidCountyAward.md) | `countyId` | `id` | NO_ACTION | CASCADE |
| [`dbo.BidCountyLineItem`](dbo.BidCountyLineItem.md) | `countyId` | `id` | NO_ACTION | CASCADE |
| [`dbo.MiniBid`](dbo.MiniBid.md) | `countyId` | `id` | NO_ACTION | CASCADE |
| [`dbo.RecommendedVendor`](dbo.RecommendedVendor.md) | `countyId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.SolicitationCounty`](dbo.SolicitationCounty.md) | `countyId` | `id` | NO_ACTION | CASCADE |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `countyId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Tenant`](dbo.Tenant.md) | `countyId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.VendorCriterionResponse`](dbo.VendorCriterionResponse.md) | `countyId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.VendorPricingIndex`](dbo.VendorPricingIndex.md) | `countyId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.VendorScenarioPrice`](dbo.VendorScenarioPrice.md) | `countyId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `County_state_code_key` | YES | NONCLUSTERED | `state`, `code` |  |
| `County_state_idx` | no | NONCLUSTERED | `state` |  |
