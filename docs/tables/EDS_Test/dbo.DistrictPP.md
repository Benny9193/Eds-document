# Table: `dbo.DistrictPP`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9247

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictPPId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `PricePlanId` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DistrictPP_PricePlans` | `PricePlanId` | [`dbo.PricePlans.PricePlanId`](dbo.PricePlans.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_DistrictId` | no | NONCLUSTERED | `DistrictId` |  |
| `SK_DistrictPP` | no | NONCLUSTERED | `DistrictId`, `PricePlanId` |  |
| `SK_PPDistrict` | no | NONCLUSTERED | `PricePlanId`, `DistrictId` |  |
