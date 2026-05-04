# Table: `dbo.DistrictChargesNotes`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictChargeNoteId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `BudgetId` | int | NO |  |  |
| 4 | `NoteDate` | datetime | NO | `(getdate())` |  |
| 5 | `Comments` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
