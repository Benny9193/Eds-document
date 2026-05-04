# Table: `dbo.Category`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 134

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Top-level product taxonomy (~134 rows). Small, stable lookup — used for browse, reporting rollups, and price-plan scoping.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryNumber` | int | YES |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `EDSId` | int | YES |  |  |
| 6 | `Prefix` | varchar(10) | YES |  |  |
| 7 | `NextNumber` | int | YES |  |  |
| 8 | `AllowAddenda` | int | YES |  |  |
| 9 | `HeadingTitle` | varchar(32) | YES |  |  |
| 10 | `ExtraTitle` | varchar(128) | YES |  |  |
| 11 | `KeywordExamples` | varchar(50) | YES |  |  |
| 12 | `OnSavingsReport` | int | YES |  |  |
| 13 | `Code` | varchar(16) | YES |  |  |
| 14 | `Type` | int | YES |  |  |
| 15 | `BreakOnHeadingChange` | int | YES |  |  |
| 16 | `MasterBookCopies` | int | YES |  |  |
| 17 | `Grouping` | varchar(50) | YES |  |  |
| 18 | `AppendBidMessage` | tinyint | YES |  |  |
| 19 | `DefaultHeadingID` | int | YES |  |  |
| 20 | `AvgDiscountFactor` | decimal(9,5) | YES | `((0.6))` |  |
| 21 | `useCatalogViewer` | tinyint | YES |  |  |
| 22 | `RTKLocation` | varchar(50) | YES |  |  |
| 23 | `Description` | varchar(2048) | YES |  |  |
| 24 | `Priority` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Catalog`](dbo.Catalog.md) | `CategoryId` | `CategoryId` | NO_ACTION | CASCADE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | `CategoryId` | `CategoryId` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Active` | no | NONCLUSTERED | `Active` |  |
| `SK_CategoryType` | no | NONCLUSTERED | `Type`, `CategoryId` |  |
| `SK_EDS` | no | NONCLUSTERED | `EDSId` |  |
| `SK_Name` | no | NONCLUSTERED | `Name` |  |
| `SKI_Category_NameExtraTitle` | YES | NONCLUSTERED | `CategoryId` | `Name`, `ExtraTitle` |
