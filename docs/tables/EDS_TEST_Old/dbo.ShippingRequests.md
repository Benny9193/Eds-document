# Table: `dbo.ShippingRequests`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 613

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ShippingRequestId` | int | NO |  | YES |
| 2 | `ShippingRequestUniqueId` | uniqueidentifier | NO | `(newid())` |  |
| 3 | `RequisitionId` | int | NO |  |  |
| 4 | `VendorId` | int | NO |  |  |
| 5 | `EmailAddresses` | varchar(4096) | NO |  |  |
| 6 | `Comments` | varchar(4096) | YES |  |  |
| 7 | `RequestSent` | datetime | NO | `(getdate())` |  |
| 8 | `RequestCompleted` | datetime | YES |  |  |
| 9 | `CompletedBy` | varchar(50) | YES |  |  |
| 10 | `RequestStatus` | varchar(50) | YES |  |  |
| 11 | `loadingDock` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
