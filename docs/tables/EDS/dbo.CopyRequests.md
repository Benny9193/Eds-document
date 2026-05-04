# Table: `dbo.CopyRequests`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 24667

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Requisition / PO copy-job tracker (~25K rows). One row per copy operation initiated from a session — `RSId` source, `SessionId`, requested / start / end timestamps. Used to drive the async copy worker.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CopyRequestId` | int | NO |  | YES |
| 2 | `RSId` | int | NO |  |  |
| 3 | `SessionId` | int | NO |  |  |
| 4 | `StartTime` | datetime | YES |  |  |
| 5 | `EndTime` | datetime | YES |  |  |
| 6 | `Requested` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
