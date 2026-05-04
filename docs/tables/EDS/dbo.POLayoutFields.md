# Table: `dbo.POLayoutFields`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 56

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POLayoutFieldId` | int | NO |  | YES |
| 2 | `POLayoutField` | varchar(50) | YES |  |  |
| 3 | `POLayoutSource` | varchar(4096) | YES |  |  |
| 4 | `POLayoutFieldType` | tinyint | YES |  |  |
| 5 | `DetailField` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
