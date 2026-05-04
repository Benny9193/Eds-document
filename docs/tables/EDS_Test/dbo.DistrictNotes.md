# Table: `dbo.DistrictNotes`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 76

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictNotesId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `NoteTitle` | varchar(80) | YES |  |  |
| 4 | `NoteType` | char(1) | YES |  |  |
| 5 | `Note` | varchar(4000) | YES |  |  |
| 6 | `DateOfNote` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
