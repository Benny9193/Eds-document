# Table: `dbo.SS Missing URLs`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 575

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Vendor Item Code` | nvarchar(255) | YES |  |  |
| 2 | `Image URL` | nvarchar(255) | YES |  |  |
| 3 | `SDS URL` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ClusteredIndex-20250214-135923` | no | CLUSTERED | `Vendor Item Code` |  |
| `NonClusteredIndex-20250214-140012` | no | NONCLUSTERED | `Vendor Item Code` | `Image URL`, `SDS URL` |
