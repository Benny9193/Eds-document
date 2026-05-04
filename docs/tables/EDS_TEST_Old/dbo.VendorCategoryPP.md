# Table: `dbo.VendorCategoryPP`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 17502

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VCPId` | int | NO |  | YES |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `DistrictId` | int | YES |  |  |
| 5 | `PricePlanId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_VendorId` | no | NONCLUSTERED | `VendorId` |  |
