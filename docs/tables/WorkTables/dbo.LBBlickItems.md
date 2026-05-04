# Table: `dbo.LBBlickItems`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(50) | YES |  |  |
| 2 | `CometId` | int | YES |  |  |
| 3 | `Attention` | varchar(50) | YES |  |  |
| 4 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 5 | `ItemCode` | varchar(50) | YES |  |  |
| 6 | `VendorItemCode` | varchar(50) | YES |  |  |
| 7 | `Quantity` | int | YES |  |  |
| 8 | `BidPrice` | money | YES |  |  |
| 9 | `Description` | varchar(1024) | YES |  |  |
| 10 | `RequisitionId` | int | NO |  |  |
| 11 | `DetailId` | int | NO |  |  |
| 12 | `ItemId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
