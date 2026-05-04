# Table: `dbo.DistrictPP`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9306

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

District ↔ `PricePlans` junction (~9.3K rows). Lists which price plans a district has access to. FK to `PricePlans`. Combined with `VendorCategoryPP` (vendor / category visibility per plan), this is the primary control on what catalog the buyer sees.

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
