# Table: `dbo.VendorQueryMSRP`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 140

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryMSRPId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `BidImportId` | int | YES |  |  |
| 5 | `EmailAddress` | varchar(4000) | YES |  |  |
| 6 | `Fax` | varchar(20) | YES |  |  |
| 7 | `AddDate` | datetime | YES |  |  |
| 8 | `SendDate` | datetime | YES |  |  |
| 9 | `EmailAddress2` | varchar(255) | YES |  |  |
| 10 | `EmailCCAddress` | varchar(255) | YES |  |  |
| 11 | `MessageContent` | varchar(max) | YES |  |  |
| 12 | `MessageReceiptConfirmed` | datetime | YES |  |  |
| 13 | `VendorQueryMSRPNotes` | varchar(1000) | YES |  |  |
| 14 | `ContactName` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VendorQueryMSRPDetail`](dbo.VendorQueryMSRPDetail.md) | `VendorQueryMSRPId` | `VendorQueryMSRPId` | CASCADE | NO_ACTION |
| [`dbo.VendorQueryMSRPStatus`](dbo.VendorQueryMSRPStatus.md) | `VendorQueryMSRPId` | `VendorQueryMSRPId` | CASCADE | NO_ACTION |

## Indexes

_No non-PK indexes._
