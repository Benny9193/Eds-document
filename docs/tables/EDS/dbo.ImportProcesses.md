# Table: `dbo.ImportProcesses`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 754

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Import-job process run history (~754 rows). Per (`ImportId`, `ProcessDate`) — one row each time the process step ran for a given `Imports` job. `ImportMessages.ProcessId` references this row.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProcessId` | int | NO |  | YES |
| 2 | `ImportId` | int | NO |  |  |
| 3 | `ProcessDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
