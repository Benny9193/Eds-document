# Table: `dbo.DetailChanges`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26502061

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailChangeId` | int | NO |  | YES |
| 2 | `DetailId` | int | YES |  |  |
| 3 | `ChangeDate` | datetime | YES |  |  |
| 4 | `OrigQty` | int | YES |  |  |
| 5 | `NewQty` | int | YES |  |  |
| 6 | `RequisitionId` | int | YES |  |  |
| 7 | `ItemId` | int | YES |  |  |
| 8 | `BidPrice` | money | YES |  |  |
| 9 | `BidItemId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Detail` | no | NONCLUSTERED | `DetailId` |  |
| `SK_DetailOldNewQtyDate` | no | NONCLUSTERED | `DetailId`, `OrigQty`, `NewQty`, `ChangeDate` |  |
| `SK_Requisition` | no | NONCLUSTERED | `RequisitionId` |  |
