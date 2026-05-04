# Table: `dbo.RequisitionNoteEmails`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16689

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-note email-recipient list (~17K rows). Junction `RequisitionNotes` × `Users` — one row per user that should be emailed when a note is added.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionNoteEmailID` | int | NO |  | YES |
| 2 | `RequisitionNoteID` | int | NO |  |  |
| 3 | `UserID` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
