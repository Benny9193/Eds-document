# Table: `dbo.vendorbiditemimports`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vendorbiditemimportid` | int | NO |  | YES |
| 2 | `vendorbidimportid` | int | NO |  |  |
| 3 | `bidrequestitemid` | int | NO |  |  |
| 4 | `itemcode` | varchar(50) | YES |  |  |
| 5 | `itembidtype` | varbinary(255) | YES |  |  |
| 6 | `unitprice` | varbinary(255) | YES |  |  |
| 7 | `vendoritemcode` | varbinary(255) | YES |  |  |
| 8 | `alternate` | varbinary(2048) | YES |  |  |
| 9 | `itemsperunit` | varbinary(255) | YES |  |  |
| 10 | `pageno` | varbinary(255) | YES |  |  |
| 11 | `ImportStatus` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
