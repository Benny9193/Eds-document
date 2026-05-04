# Table: `dbo.BidReawards`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 615

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Re-award events (~615 rows). One row per (`BidHeaderId`, `ReawardDate`) with `EffectiveFrom` / `EffectiveUntil` and `Comments` — captures when a bid's awards were partially or fully redone (e.g. winning vendor dropped out) and the validity window of the new state.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidReawardId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `ReawardDate` | datetime | NO |  |  |
| 4 | `EffectiveFrom` | datetime | NO |  |  |
| 5 | `EffectiveUntil` | datetime | NO |  |  |
| 6 | `Comments` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
