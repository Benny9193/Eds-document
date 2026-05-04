# Table: `archive.VendorDocRequestDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorDocRequestDetailId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidImportId` | int | YES |  |  |
| 4 | `BidHeaderCheckListId` | int | YES |  |  |
| 5 | `VendorDocRequestId` | int | YES |  |  |
| 6 | `AddDate` | datetime | YES |  |  |
| 7 | `SendDate` | datetime | YES |  |  |
| 8 | `CommentsRejectReason` | varchar(1024) | YES |  |  |
| 9 | `VendorId` | int | YES |  |  |
| 10 | `DistrictName` | varchar(50) | YES |  |  |
| 11 | `ResolvedFlag` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
