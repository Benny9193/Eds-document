# Table: `dbo.Staples-NJ`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2500

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Item Code` | nvarchar(255) | YES |  |  |
| 2 | `Item Code (Staples sku #)` | nvarchar(255) | YES |  |  |
| 3 | `Staples Product Description` | nvarchar(255) | YES |  |  |
| 4 | `UOM` | nvarchar(255) | YES |  |  |
| 5 | `# of items in this pack` | nvarchar(255) | YES |  |  |
| 6 | `Manufacturer #` | nvarchar(255) | YES |  |  |
| 7 | `Remove or Replace Sku?` | nvarchar(255) | YES |  |  |
| 8 | `Reasoning` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `sk_SKU` | no | NONCLUSTERED | `Item Code (Staples sku #)` |  |
