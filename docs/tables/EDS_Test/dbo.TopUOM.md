# Table: `dbo.TopUOM`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4579

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TopUOMId` | int | NO |  | YES |
| 2 | `CategoryId` | int | YES |  |  |
| 3 | `UnitId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_CatUnit` | no | NONCLUSTERED | `CategoryId`, `UnitId` |  |
