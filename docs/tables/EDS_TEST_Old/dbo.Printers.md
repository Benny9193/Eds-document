# Table: `dbo.Printers`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 15

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PrinterId` | int | NO |  | YES |
| 2 | `Name` | varchar(50) | YES |  |  |
| 3 | `PrintPrefix` | varchar(255) | YES |  |  |
| 4 | `PrintSuffix` | varchar(255) | YES |  |  |
| 5 | `PrinterType` | varchar(50) | YES |  |  |
| 6 | `PrintQueue` | varchar(255) | YES |  |  |
| 7 | `Active` | bit | YES | `((1))` |  |
| 8 | `IsOkiPrinter` | bit | YES | `((1))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
