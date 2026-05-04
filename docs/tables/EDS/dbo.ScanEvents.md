# Table: `dbo.ScanEvents`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 395703

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Document-scan event log (~396K rows). One row per file processed by a `ScanJobId` with `SourceFile`, `IndexData` payload, and `EventStatus`. Operational pipeline telemetry.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ScanEventId` | int | NO |  | YES |
| 2 | `ScanJobId` | int | NO |  |  |
| 3 | `EventStamp` | datetime | NO | `(getdate())` |  |
| 4 | `SourceFile` | varchar(512) | NO |  |  |
| 5 | `IndexData` | varchar(max) | YES |  |  |
| 6 | `EventStatus` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
