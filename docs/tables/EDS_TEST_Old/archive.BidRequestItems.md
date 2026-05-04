# Table: `archive.BidRequestItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 5704577

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidRequestItemId_OLD` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `BidRequest` | int | YES |  |  |
| 6 | `Active` | tinyint | YES |  |  |
| 7 | `RequisitionCount` | int | YES |  |  |
| 8 | `Status` | varchar(50) | YES |  |  |
| 9 | `Comments` | varchar(1024) | YES |  |  |
| 10 | `BidRequestAmount` | money | YES |  |  |
| 11 | `Checksum` | int | YES |  |  |
| 12 | `MasterItemCodePtr` | int | YES |  |  |
| 13 | `BidHeaderKey` | int | YES |  |  |
| 14 | `ImageURL` | varchar(300) | YES |  |  |
| 15 | `SDS_URL` | varchar(300) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
