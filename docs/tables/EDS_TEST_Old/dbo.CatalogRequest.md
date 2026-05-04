# Table: `dbo.CatalogRequest`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogRequestId` | int | NO |  | YES |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `EmailAddress` | varchar(255) | YES |  |  |
| 4 | `Fax` | varchar(20) | YES |  |  |
| 5 | `AddDate` | datetime | YES |  |  |
| 6 | `SendDate` | datetime | YES |  |  |
| 7 | `EmailAddress2` | varchar(255) | YES |  |  |
| 8 | `EmailCCAddress` | varchar(255) | YES |  |  |
| 9 | `MessageContent` | varchar(max) | YES |  |  |
| 10 | `MessageReceiptConfirmed` | datetime | YES |  |  |
| 11 | `CatalogRequestNotes` | varchar(1000) | YES |  |  |
| 12 | `ContactName` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CatalogRequestDetail`](dbo.CatalogRequestDetail.md) | `CatalogRequestId` | `CatalogRequestId` | CASCADE | NO_ACTION |
| [`dbo.CatalogRequestStatus`](dbo.CatalogRequestStatus.md) | `CatalogRequestId` | `CatalogRequestId` | CASCADE | NO_ACTION |

## Indexes

_No non-PK indexes._
