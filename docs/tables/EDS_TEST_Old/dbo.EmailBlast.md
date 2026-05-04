# Table: `dbo.EmailBlast`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16144

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EmailBlastId` | int | NO |  | YES |
| 2 | `BlastName` | varchar(100) | YES |  |  |
| 3 | `BlastDescription` | varchar(2000) | YES |  |  |
| 4 | `BlastHTML` | varchar(8000) | YES |  |  |
| 5 | `SQLStmt` | varchar(8000) | YES |  |  |
| 6 | `ReportWhereClause` | varchar(8000) | YES |  |  |
| 7 | `SentDate` | datetime | YES |  |  |
| 8 | `EmailFrom` | varchar(500) | YES |  |  |
| 9 | `EmailCC` | varchar(500) | YES |  |  |
| 10 | `EmailBCC` | varchar(500) | YES |  |  |
| 11 | `EmailSubject` | varchar(250) | YES |  |  |
| 12 | `ReadReceipt` | tinyint | YES |  |  |
| 13 | `HighPriority` | tinyint | YES |  |  |
| 14 | `AddressFromRep` | tinyint | YES |  |  |
| 15 | `Attachments` | varchar(2000) | YES |  |  |
| 16 | `UseDefaultReadReceiptEmail` | tinyint | YES |  |  |
| 17 | `ReadReceiptEmail` | varchar(500) | YES |  |  |
| 18 | `BlastVar1` | varchar(250) | YES |  |  |
| 19 | `BlastVar2` | varchar(250) | YES |  |  |
| 20 | `Reference1Id` | int | YES |  |  |
| 21 | `Reference2Id` | int | YES |  |  |
| 22 | `VarDataSQL` | varchar(8000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
