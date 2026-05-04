# Table: `dbo.DetailChangeLog`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2924942

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailChangeId` | int | NO |  | YES |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `RequisitionId` | int | NO |  |  |
| 4 | `ItemId` | int | NO |  |  |
| 5 | `OrigQty` | int | YES |  |  |
| 6 | `NewQty` | int | YES |  |  |
| 7 | `OrigBidPrice` | money | YES |  |  |
| 8 | `NewBidPrice` | money | YES |  |  |
| 9 | `OrigBidItemId` | int | YES |  |  |
| 10 | `NewBidItemId` | int | YES |  |  |
| 11 | `UserId` | int | YES |  |  |
| 12 | `SessionId` | int | YES |  |  |
| 13 | `ChangeDate` | datetime | YES |  |  |
| 14 | `OrigVendorId` | int | YES |  |  |
| 15 | `NewVendorId` | int | YES |  |  |
| 16 | `BRChangeLogId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Detail` | no | NONCLUSTERED | `DetailId` |  |
| `SK_DetailOldNewQty` | no | NONCLUSTERED | `DetailId`, `OrigQty`, `NewQty` |  |
| `SK_Item` | no | NONCLUSTERED | `ItemId` |  |
| `SK_Requisition` | no | NONCLUSTERED | `RequisitionId` |  |
| `SK_User` | no | NONCLUSTERED | `UserId` |  |
