# Table: `dbo.BidMappedItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1458517

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMappedItemId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `OrigItemId` | int | NO |  |  |
| 4 | `NewItemId` | int | NO |  |  |
| 5 | `ReasonCode` | varchar(20) | YES |  |  |
| 6 | `MapDate` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidHeader_OrigNew` | no | NONCLUSTERED | `BidHeaderId` | `OrigItemId`, `NewItemId` |
| `SKI_BidHeaderReason_BidMappedItem` | no | NONCLUSTERED | `BidHeaderId`, `ReasonCode` | `BidMappedItemId` |
