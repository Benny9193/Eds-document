# Table: `dbo.bid9339bri`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 369

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `BidRequest` | int | YES |  |  |
| 5 | `Active` | tinyint | YES |  |  |
| 6 | `RequisitionCount` | int | YES |  |  |
| 7 | `Status` | varchar(50) | YES |  |  |
| 8 | `Comments` | varchar(1024) | YES |  |  |
| 9 | `BidRequestAmount` | money | YES |  |  |
| 10 | `Checksum` | int | YES |  |  |
| 11 | `MasterItemCodePtr` | int | YES |  |  |
| 12 | `BidHeaderKey` | int | YES |  |  |
| 13 | `rowguid` | uniqueidentifier | NO |  |  |
| 14 | `NewItemId` | int | YES |  |  |
| 15 | `UniqueItemNumber` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
