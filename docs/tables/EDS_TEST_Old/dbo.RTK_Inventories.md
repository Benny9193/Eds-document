# Table: `dbo.RTK_Inventories`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 658

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_InventoryId` | int | NO |  | YES |
| 2 | `RTK_SiteId` | int | NO |  |  |
| 3 | `RTK_InventoryDate` | date | YES |  |  |
| 4 | `RTK_InventoryYear` | int | YES |  |  |
| 5 | `RTK_InventoryBy` | varchar(255) | YES |  |  |
| 6 | `RTK_InventoryNotes` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
