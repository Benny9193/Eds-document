# Table: `dbo.RequisitionNotes`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 25480

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionNoteID` | int | NO |  | YES |
| 2 | `RequisitionID` | int | NO |  |  |
| 3 | `Note` | varchar(max) | YES |  |  |
| 4 | `CreateDate` | datetime | NO |  |  |
| 5 | `CreatedByUserID` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_RequisitionId` | no | NONCLUSTERED | `RequisitionID` |  |
