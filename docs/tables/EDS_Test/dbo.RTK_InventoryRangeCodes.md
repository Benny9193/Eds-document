# Table: `dbo.RTK_InventoryRangeCodes`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `InventoryRangeCodesID` | int | NO |  | YES |
| 2 | `RangeCode` | char(2) | NO |  |  |
| 3 | `BegRange` | int | YES |  |  |
| 4 | `EndRange` | int | YES |  |  |
| 5 | `Description` | varchar(25) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
