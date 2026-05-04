# Table: `dbo.Trades`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 107

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TradeId` | int | NO |  | YES |
| 2 | `ParentId` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `Description` | varchar(255) | YES |  |  |
| 5 | `Comments` | text(2147483647) | YES |  |  |
| 6 | `PackageNumber` | int | YES |  |  |
| 7 | `pwRequired` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
