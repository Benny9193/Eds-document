# Table: `dbo.SaxDups`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 31171

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid-import dedup helper (~31K rows). Per (`BidHeaderId`, `PackedCode`) tracks which packed item codes have been seen so the SAX-style streaming bid parser can skip duplicates.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | NO |  |  |
| 2 | `PackedCode` | varchar(255) | YES |  |  |
| 3 | `ItemId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
