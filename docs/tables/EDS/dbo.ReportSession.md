# Table: `dbo.ReportSession`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5445816

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

User-facing report executions (~5.4M rows) — what reports were run, by whom, with which parameters.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | NO |  | YES |
| 2 | `RSData` | varchar(4096) | YES |  |  |
| 3 | `ReportStarted` | datetime | YES |  |  |
| 4 | `ReportEnded` | datetime | YES |  |  |
| 5 | `ReportProcessorId` | int | YES |  |  |
| 6 | `ReportOption` | int | YES |  |  |
| 7 | `ReportRequestedBy` | varchar(50) | YES |  |  |
| 8 | `ReportFile` | varchar(255) | YES |  |  |
| 9 | `LastPrinted` | datetime | YES |  |  |
| 10 | `PrintPages` | int | YES |  |  |
| 11 | `PrintCopies` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
