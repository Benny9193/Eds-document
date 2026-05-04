# Table: `dbo.VendorOrders`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4206

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorOrderId` | int | NO |  | YES |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `POId` | int | NO |  |  |
| 4 | `LastUpdated` | datetime | YES |  |  |
| 5 | `VendorData` | nvarchar(max) | YES |  |  |
| 6 | `VendorStatus` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
