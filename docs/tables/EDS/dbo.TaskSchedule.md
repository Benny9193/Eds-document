# Table: `dbo.TaskSchedule`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1554438

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid-cycle / pricing-cycle work schedule (~1.5M rows). Tracks original, projected, and actual start/end dates for each task in a project, scoped by district, category, and price plan.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TaskScheduleId` | int | NO |  | YES |
| 2 | `ProjectTasksId` | int | NO |  |  |
| 3 | `TaskSeqNum` | int | NO |  |  |
| 4 | `StartDateOrig` | datetime | YES |  |  |
| 5 | `EndDateOrig` | datetime | YES |  |  |
| 6 | `StartDateProjected` | datetime | YES |  |  |
| 7 | `EndDateProjected` | datetime | YES |  |  |
| 8 | `StartDateActual` | datetime | YES |  |  |
| 9 | `EndDateActual` | datetime | YES |  |  |
| 10 | `BidCycleDate` | datetime | YES |  |  |
| 11 | `DistrictId` | int | YES |  |  |
| 12 | `CategoryId` | int | YES |  |  |
| 13 | `UserId` | int | YES |  |  |
| 14 | `PricePlanId` | int | YES |  |  |
| 15 | `SessionId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_ProjectTasks` | no | NONCLUSTERED | `ProjectTasksId` |  |
| `SKI_CategoryDistrictCycle_PricePlan` | no | NONCLUSTERED | `ProjectTasksId`, `CategoryId`, `DistrictId`, `BidCycleDate` | `TaskScheduleId`, `PricePlanId`, `StartDateActual` |
