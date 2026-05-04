# Table: `dbo.CSV File for EDS POs`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5141

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WTId` | int | NO |  | YES |
| 2 | `PO` | int | NO |  |  |
| 3 | `Vendor` | int | NO |  |  |
| 4 | `Vendor_Name` | nvarchar(50) | NO |  |  |
| 5 | `PO_Date` | date | NO |  |  |
| 6 | `Requisition` | int | NO |  |  |
| 7 | `Requested_By` | nvarchar(50) | NO |  |  |
| 8 | `Line` | int | YES |  |  |
| 9 | `Qty_Ordered` | int | YES |  |  |
| 10 | `Unit_Price` | float | YES |  |  |
| 11 | `Disc_Freight` | nvarchar(1) | YES |  |  |
| 12 | `Final_Cost` | float | YES |  |  |
| 13 | `Qty_Received` | nvarchar(1) | YES |  |  |
| 14 | `Qty_Canceled` | nvarchar(1) | YES |  |  |
| 15 | `Order_Description` | nvarchar(1024) | YES |  |  |
| 16 | `Account` | nvarchar(50) | YES |  |  |
| 17 | `Account_Description` | nvarchar(50) | YES |  |  |
| 18 | `Encumbrance` | float | YES |  |  |
| 19 | `Paid` | tinyint | YES |  |  |
| 20 | `Liquidated` | tinyint | YES |  |  |
| 21 | `Remaining` | float | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
