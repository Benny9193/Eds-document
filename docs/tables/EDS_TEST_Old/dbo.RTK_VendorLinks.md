# Table: `dbo.RTK_VendorLinks`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTKVendorLinkId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorName` | varchar(50) | NO |  |  |
| 4 | `Description` | varchar(4096) | YES |  |  |
| 5 | `Link` | varchar(1024) | YES |  |  |
| 6 | `Created` | datetime | NO | `(getdate())` |  |
| 7 | `Updated` | datetime | YES |  |  |
| 8 | `Deleted` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
