# Table: `dbo.additems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ITEMID` | int | NO |  | YES |
| 2 | `ITEMCODE` | varchar(15) | YES |  |  |
| 3 | `DESCRIPTION` | varchar(255) | YES |  |  |
| 4 | `UNITID` | int | YES |  |  |
| 5 | `PRICEID` | int | YES |  |  |
| 6 | `CATALOGPRICE` | decimal(9,2) | YES |  |  |
| 7 | `PAGE` | int | YES |  |  |
| 8 | `BIDPRICE` | decimal(9,2) | YES |  |  |
| 9 | `CATALOGID` | int | YES |  |  |
| 10 | `CATEGORYID` | int | YES |  |  |
| 11 | `VENDORID` | int | YES |  |  |
| 12 | `DISTRICTID` | int | YES |  |  |
| 13 | `CONTRACTID` | int | YES |  |  |
| 14 | `CONTRACTNUMBER` | varchar(20) | YES |  |  |
| 15 | `VENDORITEMCODE` | varchar(20) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
