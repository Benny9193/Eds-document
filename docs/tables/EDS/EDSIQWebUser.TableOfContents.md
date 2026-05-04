# Table: `EDSIQWebUser.TableOfContents`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 6664

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-OrderBook table-of-contents entries (~6.7K rows). One row per heading on a printed OrderBook with `Title`, `PageNbr`, and `OrderBookId`. Used by the IQ web reporting layer to render TOC pages.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TCId` | int | NO |  | YES |
| 2 | `Title` | varchar(255) | YES |  |  |
| 3 | `PageNbr` | int | YES |  |  |
| 4 | `OrderBookId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
