# Table: `archive.BidRequestManufacturer`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestManufacturerId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `ManufacturerId` | int | YES |  |  |
| 5 | `SequenceNumber` | int | YES |  |  |
| 6 | `AllowAdditionalProductLines` | tinyint | YES |  |  |
| 7 | `UseOptions` | tinyint | YES |  |  |
| 8 | `BidHeaderKey` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
