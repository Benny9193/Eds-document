# Table: `dbo.BidAnswers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 552512

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Vendor responses to non-pricing bid questions (~552K rows) — terms, certifications, attribute confirmations.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidAnswerId` | int | NO |  | YES |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `BidQuestionId` | int | NO |  |  |
| 4 | `CountyId` | int | NO |  |  |
| 5 | `BidTradeId` | int | NO |  |  |
| 6 | `VendorBidTMAnswerId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidAnswersJournal`](dbo.BidAnswersJournal.md) | `BidAnswerId` | `BidAnswerId` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_ImportTradeCounty_Question` | no | NONCLUSTERED | `BidImportId`, `BidTradeId`, `CountyId` | `BidQuestionId` |
| `SK_QuestionImportTradeCounty` | no | NONCLUSTERED | `BidQuestionId`, `BidImportId`, `CountyId`, `BidTradeId` |  |
| `SK_TradeCountyImport_Question` | no | NONCLUSTERED | `BidTradeId`, `CountyId`, `BidImportId` | `BidQuestionId` |
