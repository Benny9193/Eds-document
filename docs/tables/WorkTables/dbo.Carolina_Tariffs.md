# Table: `dbo.Carolina Tariffs`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1079

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Item_Number` | nvarchar(50) | NO |  |  |
| 2 | `Item_Description` | nvarchar(1024) | NO |  |  |
| 3 | `List_Price_WEB` | money | YES |  |  |
| 4 | `Mississippi_Contract` | money | YES |  |  |
| 5 | `Submitted_on_pricelist` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ClusteredIndex-20250702-183753` | no | CLUSTERED | `Item_Number` |  |
