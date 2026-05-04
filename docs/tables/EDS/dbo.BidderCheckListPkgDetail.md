# Table: `dbo.BidderCheckListPkgDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1195

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Junction `BidderCheckListPkgHeader` × `BidderCheckList` (~1.2K rows) with `DisplaySequence`. Defines which checklist items live in which package; packages are the reusable building block bound onto a `BidHeader`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidderCheckListPkgDetailId` | int | NO |  | YES |
| 2 | `BidderCheckListPkgHeaderId` | int | YES |  |  |
| 3 | `BidderCheckListId` | int | YES |  |  |
| 4 | `DisplaySequence` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
