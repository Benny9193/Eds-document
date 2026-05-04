# Table: `dbo.VendorOrders`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5775

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-(vendor, PO) integration state record (~5.8K rows). Holds vendor-side response payloads (`VendorData` JSON, `VendorStatus`) and `LastUpdated` for any vendor that returns acknowledgement / shipment data via integration.

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
