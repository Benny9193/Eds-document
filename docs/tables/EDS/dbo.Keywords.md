# Table: `dbo.Keywords`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 25267

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Search / browse keywords attached to a `Category` and optional `Heading` (~25K rows). District-scoped via `DistrictId`. Drives keyword-based catalog navigation; tied into pricing rollups via `PricingAddenda.KeywordId` and `HeadingKeywordId`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `KeywordId` | int | NO |  | YES |
| 2 | `Active` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `HeadingId` | int | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `Keyword` | varchar(50) | YES |  |  |
| 7 | `DateCreated` | datetime | YES | `(getdate())` |  |
| 8 | `DateUpdated` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Keywords_7_1246679539__K1_6` | no | NONCLUSTERED | `KeywordId` | `Keyword` |
| `_dta_index_Keywords_7_1246679539__K2_K1_6` | no | NONCLUSTERED | `Active`, `KeywordId` | `Keyword` |
| `SK_Category` | no | NONCLUSTERED | `CategoryId` |  |
| `SK_Heading` | no | NONCLUSTERED | `HeadingId` |  |
| `SKI_KeywordHeadingDistrictActive_KeywordId` | no | NONCLUSTERED | `Keyword`, `HeadingId`, `DistrictId`, `Active` | `KeywordId`, `CategoryId` |
| `SKI_KeywordId_Keyword` | YES | NONCLUSTERED | `KeywordId` | `Keyword` |
