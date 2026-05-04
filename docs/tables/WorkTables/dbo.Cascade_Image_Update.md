# Table: `dbo.Cascade Image Update`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9661

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Status` | nvarchar(255) | YES |  |  |
| 2 | `Page Number` | float | YES |  |  |
| 3 | `Catalog Item Number` | float | YES |  |  |
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
| 21 | `F21` | nvarchar(255) | YES |  |  |
| 22 | `F22` | nvarchar(255) | YES |  |  |
| 23 | `F23` | nvarchar(255) | YES |  |  |
| 24 | `F24` | nvarchar(255) | YES |  |  |
| 25 | `F25` | nvarchar(255) | YES |  |  |
| 26 | `F26` | nvarchar(255) | YES |  |  |
| 27 | `F27` | nvarchar(255) | YES |  |  |
| 28 | `F28` | nvarchar(255) | YES |  |  |
| 29 | `F29` | nvarchar(255) | YES |  |  |
| 30 | `F30` | nvarchar(255) | YES |  |  |
| 31 | `F31` | nvarchar(255) | YES |  |  |
| 32 | `F32` | nvarchar(255) | YES |  |  |
| 33 | `F33` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ski_VIC_URL` | no | NONCLUSTERED | `Catalog Item Number` | `Image URL` |
