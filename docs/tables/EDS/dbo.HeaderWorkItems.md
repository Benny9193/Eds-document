# Table: `dbo.HeaderWorkItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 491824

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Working set of items being aggregated into an OrderBook header (~492K rows). Transient — populated during OrderBook generation and emptied when the run completes.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OBDWorkId` | int | NO |  |  |
| 2 | `ItemId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
