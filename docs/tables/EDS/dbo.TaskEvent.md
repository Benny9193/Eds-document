# Table: `dbo.TaskEvent`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 122148

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid-cycle task event log (~122K rows). One row per event against a `ProjectTaskId` with date, scoping district / category / user, and a free-text `ValueField`. Pairs with `TaskSchedule` — `TaskSchedule` holds the planned dates, `TaskEvent` records what actually happened.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TaskEventId` | int | NO |  | YES |
| 2 | `ProjectTaskId` | int | YES |  |  |
| 3 | `EventDate` | datetime | YES |  |  |
| 4 | `BidDate` | datetime | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `CategoryId` | int | YES |  |  |
| 7 | `UserId` | int | YES |  |  |
| 8 | `ValueField` | varchar(20) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
