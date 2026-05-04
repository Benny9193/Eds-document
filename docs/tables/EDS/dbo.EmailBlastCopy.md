# Table: `dbo.EmailBlastCopy`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EmailBlastId` | int | NO |  | YES |
| 2 | `BlastName` | varchar(50) | YES |  |  |
| 3 | `BlastDescription` | varchar(2000) | YES |  |  |
| 4 | `BlastHTML` | varchar(max) | YES |  |  |
| 5 | `SQLStmt` | varchar(8000) | YES |  |  |
| 6 | `ReportWhereClause` | varchar(8000) | YES |  |  |
| 7 | `SentDate` | datetime | YES |  |  |
| 8 | `EmailFrom` | varchar(500) | YES |  |  |
| 9 | `EmailCC` | varchar(500) | YES |  |  |
| 10 | `EmailBCC` | varchar(500) | YES |  |  |
| 11 | `EmailSubject` | varchar(80) | YES |  |  |
| 12 | `ReadReceipt` | tinyint | YES |  |  |
| 13 | `HighPriority` | tinyint | YES |  |  |
| 14 | `AddressFromRep` | tinyint | YES |  |  |
| 15 | `Attachments` | varchar(2000) | YES |  |  |
| 16 | `UseDefaultReadReceiptEmail` | tinyint | YES |  |  |
| 17 | `ReadReceiptEmail` | varchar(500) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
