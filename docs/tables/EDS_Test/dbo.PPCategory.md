# Table: `dbo.PPCategory`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1457

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PPCategoryId` | int | NO |  | YES |
| 2 | `PricePlanId` | int | NO |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `AllowAddenda` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Category` | no | NONCLUSTERED | `CategoryId` |  |
| `SK_PPCat` | no | NONCLUSTERED | `PricePlanId`, `CategoryId` |  |
