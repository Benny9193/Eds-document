# Table: `dbo.No Bids with Catalog Entry`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 745

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Category` | nvarchar(255) | YES |  |  |
| 2 | `Code` | nvarchar(255) | YES |  |  |
| 3 | `BidHeaderId` | float | YES |  |  |
| 4 | `ItemCode` | nvarchar(255) | YES |  |  |
| 5 | `Description` | nvarchar(255) | YES |  |  |
| 6 | `VendorName` | nvarchar(255) | YES |  |  |
| 7 | `CatalogName` | nvarchar(255) | YES |  |  |
| 8 | `Catalog Year` | float | YES |  |  |
| 9 | `ShortDescription` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `pk_NoBids` | no | NONCLUSTERED | `BidHeaderId`, `ItemCode`, `CatalogName`, `Description` |  |
