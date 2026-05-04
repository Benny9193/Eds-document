# Table: `dbo.WorkflowSteps`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowId` | uniqueidentifier | NO |  |  |
| 3 | `WorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 4 | `WorkflowActionId` | uniqueidentifier | YES |  |  |
| 5 | `Sequence` | int | YES |  |  |
| 6 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowSteps_WorkflowActions` | `WorkflowActionId` | [`dbo.WorkflowActions.Id`](dbo.WorkflowActions.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowSteps_Workflows` | `WorkflowId` | [`dbo.Workflows.Id`](dbo.Workflows.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowSteps_WorkflowTriggers` | `WorkflowTriggerId` | [`dbo.WorkflowTriggers.Id`](dbo.WorkflowTriggers.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
