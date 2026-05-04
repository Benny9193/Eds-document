# Table: `dbo.EmailBlastLog`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1546811

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Audit of every transactional / marketing email sent from the platform (~1.5M rows). Captures sender, recipient, CC/BCC, send date, and the rendered XML payload. `Attachment` is the file name, not the content.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EmailBlastLogId` | int | NO |  | YES |
| 2 | `EmailBlastId` | int | YES |  |  |
| 3 | `PrimaryRecipient` | varchar(50) | YES |  |  |
| 4 | `ContactFullName` | varchar(100) | YES |  |  |
| 5 | `EmailSentTo` | varchar(500) | YES |  |  |
| 6 | `EmailFrom` | varchar(500) | YES |  |  |
| 7 | `EmailCC` | varchar(500) | YES |  |  |
| 8 | `EmailBCC` | varchar(500) | YES |  |  |
| 9 | `SendDate` | datetime | YES |  |  |
| 10 | `XMLData` | varchar(8000) | YES |  |  |
| 11 | `Attachment` | varchar(1000) | YES |  |  |
| 12 | `PrimaryRecipientId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
