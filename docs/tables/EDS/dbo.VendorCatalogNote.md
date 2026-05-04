# Table: `dbo.VendorCatalogNote`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorCatalogNoteId` | int | NO |  | YES |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `NoteTitle` | varchar(80) | YES |  |  |
| 5 | `Note` | varchar(4000) | YES |  |  |
| 6 | `NoteDateTime` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
