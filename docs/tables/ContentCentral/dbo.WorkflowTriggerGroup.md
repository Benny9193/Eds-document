# Table: `dbo.WorkflowTriggerGroup`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowTriggerId` | uniqueidentifier | NO |  |  |
| 3 | `GroupId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowTriggerGroup_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | CASCADE | CASCADE |
| `FK_WorkflowTriggerGroup_WorkflowTrigger` | `WorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowTriggerGroup_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_WorkflowTriggerGroup_WorkflowTriggerId` | no | NONCLUSTERED | `WorkflowTriggerId` |  |
| `IX_WorkflowTriggerGroup_WorkflowTriggerId_GroupId` | YES | NONCLUSTERED | `WorkflowTriggerId`, `GroupId` |  |
