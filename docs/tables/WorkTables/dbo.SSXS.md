# Table: `dbo.SSXS`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 99

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Status` | nvarchar(255) | YES |  |  |
| 2 | `Page Number` | float | YES |  |  |
| 3 | `Catalog Item Number` | nvarchar(255) | YES |  |  |
| 4 | `Short Item Description` | nvarchar(255) | YES |  |  |
| 5 | `Complete Item Description` | nvarchar(max) | YES |  |  |
| 6 | `UOM` | nvarchar(255) | YES |  |  |
| 7 | `Catalog Price` | float | YES |  |  |
| 8 | `Net Delivered Price` | float | YES |  |  |
| 9 | `Eligible for Discount` | nvarchar(255) | YES |  |  |
| 10 | `Additional Shipping` | nvarchar(255) | YES |  |  |
| 11 | `Unique Item Number` | nvarchar(255) | YES |  |  |
| 12 | `Manufacturer` | nvarchar(255) | YES |  |  |
| 13 | `Manufacturer Part#` | nvarchar(255) | YES |  |  |
| 14 | `Right-to-Know` | nvarchar(255) | YES |  |  |
| 15 | `Heading` | nvarchar(255) | YES |  |  |
| 16 | `Keyword` | nvarchar(255) | YES |  |  |
| 17 | `SDS URL` | nvarchar(255) | YES |  |  |
| 18 | `Image URL` | nvarchar(255) | YES |  |  |
| 19 | `UPC/ISBN` | float | YES |  |  |
| 20 | `UNSPSC` | float | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `sk_UIN` | no | NONCLUSTERED | `Unique Item Number` |  |
