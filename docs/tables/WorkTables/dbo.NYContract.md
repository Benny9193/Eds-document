# Table: `dbo.NYContract`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14580

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  |  |
| 2 | `ItemCode` | int | YES |  |  |
| 3 | `Manufacturer` | varchar(50) | YES |  |  |
| 4 | `Description` | varchar(512) | YES |  |  |
| 5 | `UOM` | varchar(20) | YES |  |  |
| 6 | `Page` | int | YES |  |  |
| 7 | `ListPrice` | money | YES |  |  |
| 8 | `Discount` | decimal(11,5) | YES |  |  |
| 9 | `NetPrice` | money | YES |  |  |
| 10 | `SubCategory` | varchar(50) | YES |  |  |
| 11 | `Source` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
