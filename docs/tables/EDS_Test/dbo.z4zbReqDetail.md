# Table: `dbo.z4zbReqDetail`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `BidPrice` | money | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `BidItemId` | int | YES |  |  |
| 6 | `z4ItemId` | int | YES |  |  |
| 7 | `zbItemId` | int | YES |  |  |
| 8 | `Filtered` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_DetailFiltered_BidPrice` | no | NONCLUSTERED | `DetailId`, `Filtered` | `BidPrice` |
| `SKI_Filtered_DetailPrice` | no | NONCLUSTERED | `Filtered` | `DetailId`, `BidPrice` |
