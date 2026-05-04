# Table: `dbo.VendorQueryTandM`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1930

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

T&M (Trades / Time-and-Materials) variant of `VendorQuery` (~1.9K rows). Same shape as `VendorQuery` but scoped to the trades-bid track. Header for clarification messages sent to trades vendors about their bid response.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryTandMId` | int | NO |  | YES |
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
| 13 | `VendorQueryTandMNotes` | varchar(1000) | YES |  |  |
| 14 | `ContactName` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VendorQueryTandMDetail`](dbo.VendorQueryTandMDetail.md) | `VendorQueryTandMId` | `VendorQueryTandMId` | CASCADE | NO_ACTION |
| [`dbo.VendorQueryTandMStatus`](dbo.VendorQueryTandMStatus.md) | `VendorQueryTandMId` | `VendorQueryTandMId` | CASCADE | NO_ACTION |

## Indexes

_No non-PK indexes._
