# Table: `dbo.WorkflowTriggers`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | varchar(50) | NO |  |  |
| 3 | `Description` | varchar(max) | YES |  |  |
| 4 | `Code` | varchar(max) | YES |  |  |
| 5 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.WorkflowSteps`](dbo.WorkflowSteps.md) | `WorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
