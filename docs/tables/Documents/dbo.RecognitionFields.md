# Table: `dbo.RecognitionFields`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `RecognitionZoneId` | uniqueidentifier | NO |  |  |
| 3 | `FieldId` | uniqueidentifier | NO |  |  |
| 4 | `TopPosition` | decimal(7,2) | NO |  |  |
| 5 | `LeftPosition` | decimal(7,2) | NO |  |  |
| 6 | `Width` | decimal(7,2) | NO |  |  |
| 7 | `Height` | decimal(7,2) | NO |  |  |
| 8 | `HorizontalTolerance` | decimal(7,2) | NO |  |  |
| 9 | `VerticalTolerance` | decimal(7,2) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
