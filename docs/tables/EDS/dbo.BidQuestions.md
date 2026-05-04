# Table: `dbo.BidQuestions`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 23509

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidQuestionId` | int | NO |  | YES |
| 2 | `BidTradeId` | int | NO |  |  |
| 3 | `BidSection` | varchar(255) | YES |  |  |
| 4 | `Sequence` | int | YES |  |  |
| 5 | `QuestionPositionX` | int | YES |  |  |
| 6 | `QuestionPositionY` | int | YES |  |  |
| 7 | `QuestionHeight` | int | YES |  |  |
| 8 | `QuestionWidth` | int | YES |  |  |
| 9 | `QuestionText` | varchar(max) | NO |  |  |
| 10 | `QuestionQty` | int | YES |  |  |
| 11 | `QuestionUOMId` | int | YES |  |  |
| 12 | `AnswerPositionX` | int | YES |  |  |
| 13 | `AnswerPositionY` | int | YES |  |  |
| 14 | `AnswerHeight` | int | YES |  |  |
| 15 | `AnswerWidth` | int | YES |  |  |
| 16 | `AnswerTypeId` | int | YES |  |  |
| 17 | `AnswerTypeMask` | varchar(50) | YES |  |  |
| 18 | `Weight` | decimal(9,5) | YES |  |  |
| 19 | `Required` | tinyint | YES |  |  |
| 20 | `ExtendCalculation` | tinyint | YES |  |  |
| 21 | `ExtdCalcTypeId` | int | YES |  |  |
| 22 | `ExtdCalcMask` | varchar(50) | YES |  |  |
| 23 | `UseInCalculation` | tinyint | YES |  |  |
| 24 | `OnChecklist` | tinyint | YES |  |  |
| 25 | `CountyIdSpecific` | int | YES |  |  |
| 26 | `BidEntryDisplayLabel` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_BidQuestions_BidTrades` | `BidTradeId` | [`dbo.BidTrades.BidTradeId`](dbo.BidTrades.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
