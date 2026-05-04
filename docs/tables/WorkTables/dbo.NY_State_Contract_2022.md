# Table: `dbo.NY State Contract 2022`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 70859

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorItemCode` | varchar(200) | YES |  |  |
| 4 | `ItemDescription` | varchar(512) | YES |  |  |
| 5 | `ListPrice` | money | YES |  |  |
| 6 | `Discount` | decimal(9,5) | YES |  |  |
| 7 | `NetPrice` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
