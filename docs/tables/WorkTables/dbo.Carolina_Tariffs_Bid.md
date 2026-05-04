# Table: `dbo.Carolina Tariffs Bid`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 195

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Item_Number` | nvarchar(50) | NO |  |  |
| 2 | `Item_Description` | nvarchar(1024) | NO |  |  |
| 3 | `List_Price_WEB` | money | YES |  |  |
| 4 | `Price` | money | YES |  |  |
| 5 | `BidHeaderId` | int | YES |  |  |
| 6 | `ItemCode` | varchar(50) | YES |  |  |
| 7 | `Itemid` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
