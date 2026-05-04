# Table: `dbo.MappedItems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MappedItemId` | int | NO |  | YES |
| 2 | `OrigItemId` | int | NO |  |  |
| 3 | `NewItemId` | int | NO |  |  |
| 4 | `MapDate` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Map` | YES | NONCLUSTERED | `OrigItemId` | `NewItemId` |
