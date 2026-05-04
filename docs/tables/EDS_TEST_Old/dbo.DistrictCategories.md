# Table: `dbo.DistrictCategories`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 124493

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictCategoryId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `DistrictId` | int | YES |  |  |
| 5 | `Title` | varchar(50) | YES |  |  |
| 6 | `Charge` | money | YES |  |  |
| 7 | `AllowAddenda` | tinyint | YES |  |  |
| 8 | `AllowIncidentals` | tinyint | YES |  |  |
| 9 | `OrderBookTypeId` | int | YES |  |  |
| 10 | `BidItemsOnly` | bit | YES |  |  |
| 11 | `EarlyAccess` | tinyint | YES |  |  |
| 12 | `RTKLocation` | varchar(50) | YES |  |  |
| 13 | `AllowBudgetBooks` | tinyint | YES |  |  |
| 14 | `AllowOrderBooks` | tinyint | YES |  |  |
| 15 | `Description` | varchar(2048) | YES |  |  |
| 16 | `Priority` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_DistrictCategories_7_1550680622__K4_K3_K1_5` | no | NONCLUSTERED | `DistrictId`, `CategoryId`, `DistrictCategoryId` | `Title` |
| `_dta_index_DistrictCategories_9_763149764__K3_K4_K9` | no | NONCLUSTERED | `CategoryId`, `DistrictId`, `AllowAddenda` |  |
| `SK_Category` | no | NONCLUSTERED | `CategoryId` |  |
| `SK_DistrictCategory` | no | NONCLUSTERED | `DistrictId`, `CategoryId` |  |
| `SK_DKAAllow` | no | NONCLUSTERED | `AllowAddenda`, `DistrictId`, `CategoryId`, `Active` |  |
| `SKI_ActiveCategory_District` | no | NONCLUSTERED | `Active`, `CategoryId` | `DistrictId` |
| `SKI_DistrictCategory_Active` | no | NONCLUSTERED | `DistrictId`, `CategoryId` | `DistrictCategoryId`, `Active`, `Title`, `AllowAddenda`, `AllowIncidentals`, `OrderBookTypeId`, `BidItemsOnly` |
