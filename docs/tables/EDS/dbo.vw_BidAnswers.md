# View: `dbo.vw_BidAnswers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidAnswerId` | int | NO |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `BidQuestionId` | int | NO |  |  |
| 4 | `CountyId` | int | NO |  |  |
| 5 | `BidTradeId` | int | NO |  |  |
| 6 | `VendorBidTMAnswerId` | int | YES |  |  |
| 7 | `BidAnswerJournalId` | int | YES |  |  |
| 8 | `SessionId` | int | YES |  |  |
| 9 | `DateModified` | datetime | YES |  |  |
| 10 | `Sequence` | int | YES |  |  |
| 11 | `BidAnswer` | varchar(512) | YES |  |  |
| 12 | `BidAnswerExtended` | varchar(512) | YES |  |  |
| 13 | `VendorBidTMAnswerJournalId` | int | YES |  |  |
| 14 | `BidEntryDisplayLabel` | varchar(255) | YES |  |  |
| 15 | `QuestionText` | varchar(max) | NO |  |  |
| 16 | `QuestionQty` | int | YES |  |  |
| 17 | `AnswerTypeId` | int | YES |  |  |
| 18 | `AnswerTypeMask` | varchar(50) | YES |  |  |
| 19 | `ExtdCalcMask` | varchar(50) | YES |  |  |
| 20 | `UOM` | varchar(50) | NO |  |  |
| 21 | `BidSection` | varchar(255) | YES |  |  |
| 22 | `Weight` | decimal(9,5) | YES |  |  |
| 23 | `ExtdCalcTypeId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidAnswers` | USER_TABLE |
| `BidAnswersJournal` | USER_TABLE |
| `BidQuestions` | USER_TABLE |
| `TM_UOM` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidMgrBidTradeCountyTotals`](dbo.BidMgrBidTradeCountyTotals.md) | VIEW |
| `dbo.sp_ImportVendorsBid` | SQL_STORED_PROCEDURE |
| `dbo.vw_BidAnswers_Update` | SQL_TRIGGER |
| [`dbo.vw_BidTradesVendorDetailForReports`](dbo.vw_BidTradesVendorDetailForReports.md) | VIEW |
| [`dbo.vw_BidTradesVendorsAnswers`](dbo.vw_BidTradesVendorsAnswers.md) | VIEW |
| [`dbo.vw_BidTradesVendorsAnswersBySession`](dbo.vw_BidTradesVendorsAnswersBySession.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_BidAnswers]
as
select BidAnswers.BidAnswerId, BidAnswers.BidImportId, BidAnswers.BidQuestionId, BidAnswers.CountyId, BidAnswers.BidTradeId, BidAnswers.VendorBidTMAnswerId, 
       BidAnswersJournal.BidAnswerJournalId, BidAnswersJournal.SessionId, BidAnswersJournal.DateModified, BidQuestions.Sequence, BidAnswersJournal.BidAnswer, BidAnswersJournal.BidAnswerExtended, BidAnswersJournal.VendorBidTMAnswerJournalId, 
       BidQuestions.BidEntryDisplayLabel, BidQuestions.QuestionText, BidQuestions.QuestionQty, BidQuestions.AnswerTypeId, BidQuestions.AnswerTypeMask, BidQuestions.ExtdCalcMask, 
       Isnull(TM_UOM.Description,'') UOM, BidQuestions.BidSection, BidQuestions.Weight, BidQuestions.ExtdCalcTypeId
  from BidAnswers
  join BidQuestions on BidQuestions.BidQuestionId = BidAnswers.BidQuestionId
  left outer join TM_UOM on TM_UOM.TM_UOMId = BidQuestions.QuestionUOMId
  left outer join BidAnswersJournal on BidAnswersJournal.BidAnswerId = BidAnswers.BidAnswerId
                                   and BidAnswersJournal.BidAnswerJournalId =
    (select Top 1 baj.BidAnswerJournalId
       from BidAnswersJournal baj with (nolock)
      where baj.BidAnswerId = BidAnswers.BidAnswerId
      order by DateModified desc, baj.BidAnswerJournalId desc)
```
