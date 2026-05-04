# Table: `dbo.POTempDetails`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4014

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

PO-creation working table (~4K rows). Holds in-flight PO line context (PO number parts, `RequisitionID`, `VendorID`, `BidHeaderID`) under a `POTempID` while a PO is being assembled — populated and consumed during PO conversion.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POTempDetailID` | int | NO |  |  |
| 2 | `POTempID` | int | YES |  |  |
| 3 | `RequisitionID` | int | NO |  |  |
| 4 | `VendorID` | int | NO |  |  |
| 5 | `BidHeaderID` | int | NO |  |  |
| 6 | `PONumber` | varchar(50) | YES |  |  |
| 7 | `POPrefix` | varchar(50) | YES |  |  |
| 8 | `POSuffix` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
