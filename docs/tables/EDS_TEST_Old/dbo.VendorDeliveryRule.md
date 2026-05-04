# Table: `dbo.VendorDeliveryRule`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorDeliveryRuleId` | int | NO |  |  |
| 2 | `Name` | varchar(50) | YES | `('')` |  |
| 3 | `Description` | varchar(500) | YES | `('')` |  |
| 4 | `DeliveryDays` | varchar(100) | YES | `('')` |  |
| 5 | `DeliveryTime` | int | YES |  |  |
| 6 | `AllowGapDay` | bit | YES | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
