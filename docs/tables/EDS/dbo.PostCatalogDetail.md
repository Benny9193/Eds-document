# Table: `dbo.PostCatalogDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 42638

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PostCatalogDetailId` | int | NO |  | YES |
| 2 | `PostCatalogHeaderId` | int | YES |  |  |
| 3 | `PostInfoType` | int | YES |  |  |
| 4 | `PostInfoDesc` | varchar(100) | YES |  |  |
| 5 | `PostInfoValue` | int | YES |  |  |
| 6 | `PostDateTime` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
