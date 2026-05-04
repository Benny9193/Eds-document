# Table: `dbo.ScannerZones`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ScannerZoneId` | int | NO |  | YES |
| 2 | `ScanJobId` | int | NO |  |  |
| 3 | `DocTypeFieldRecognitionZoneId` | uniqueidentifier | NO |  |  |
| 4 | `LeftPosition` | decimal(7,2) | NO |  |  |
| 5 | `TopPosition` | decimal(7,2) | NO |  |  |
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
