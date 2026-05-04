# Table: `dbo.VendorScenarioPrice`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 30

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `scenarioId` | nvarchar(1000) | NO |  |  |
| 4 | `price` | decimal(18,2) | NO |  |  |
| 5 | `calculatedScore` | decimal(5,2) | YES |  |  |
| 6 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 7 | `updatedAt` | datetime2 | NO |  |  |
| 8 | `countyId` | nvarchar(1000) | YES |  |  |
| 9 | `encryptedPrice` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `VendorScenarioPrice_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `VendorScenarioPrice_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | NO_ACTION |
| `VendorScenarioPrice_scenarioId_fkey` | `scenarioId` | [`dbo.PricingScenario.id`](dbo.PricingScenario.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `VendorScenarioPrice_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
| `VendorScenarioPrice_bidId_scenarioId_countyId_key` | YES | NONCLUSTERED | `bidId`, `scenarioId`, `countyId` |  |
| `VendorScenarioPrice_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `VendorScenarioPrice_scenarioId_idx` | no | NONCLUSTERED | `scenarioId` |  |
