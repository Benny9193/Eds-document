# Table: `dbo.ChargeTypes`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ChargeTypeId` | int | NO |  | YES |
| 2 | `Active` | int | YES |  |  |
| 3 | `Description` | varchar(50) | YES |  |  |
| 4 | `RTK` | int | YES |  |  |
| 5 | `Frequency` | int | YES |  |  |
| 6 | `Repeats` | int | YES |  |  |
| 7 | `FrequencyData` | varchar(50) | YES |  |  |
| 8 | `AccountingChargeCode` | varchar(50) | YES |  |  |
| 9 | `LM` | tinyint | YES |  |  |
| 10 | `ContinuanceDesc` | varchar(128) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
