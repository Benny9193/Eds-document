# Table: `dbo.ItemUpdates`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 198886

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-item update log (~199K rows). Records `UpdateField` / `Action` taken on an `ItemId` with a `Reason` code. Used to audit catalog-side item edits driven by import jobs.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemUpdateId` | int | NO |  | YES |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `Reason` | varchar(50) | YES |  |  |
| 4 | `UpdateField` | varchar(50) | YES |  |  |
| 5 | `Action` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
