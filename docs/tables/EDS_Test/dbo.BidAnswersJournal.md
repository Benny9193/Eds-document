# Table: `dbo.BidAnswersJournal`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1216492

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidAnswerJournalId` | int | NO |  | YES |
| 2 | `BidAnswerId` | int | NO |  |  |
| 3 | `SessionId` | int | YES |  |  |
| 4 | `DateModified` | datetime | NO | `(getdate())` |  |
| 5 | `BidAnswer` | varchar(512) | YES |  |  |
| 6 | `BidAnswerExtended` | varchar(512) | YES |  |  |
| 7 | `VendorBidTMAnswerJournalId` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_BidAnswersJournal_BidAnswers` | `BidAnswerId` | [`dbo.BidAnswers.BidAnswerId`](dbo.BidAnswers.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_BidAnswer` | no | NONCLUSTERED | `BidAnswerId`, `DateModified`, `BidAnswerJournalId` |  |
