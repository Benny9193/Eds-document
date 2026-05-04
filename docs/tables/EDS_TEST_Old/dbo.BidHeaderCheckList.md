# Table: `dbo.BidHeaderCheckList`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 108817

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderCheckListId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidderCheckListId` | int | YES |  |  |
| 4 | `DisplaySequence` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidHeaderBidderCheckListIdDisplaySeq_Id` | no | NONCLUSTERED | `BidHeaderId`, `BidderCheckListId`, `DisplaySequence` | `BidHeaderCheckListId` |
