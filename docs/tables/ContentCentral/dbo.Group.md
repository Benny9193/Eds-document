# Table: `dbo.Group`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `Description` | nvarchar(128) | NO | `('')` |  |
| 4 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AdminPermission`](dbo.AdminPermission.md) | `GroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `GroupId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypePermission`](dbo.DocTypePermission.md) | `GroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.GroupMembership`](dbo.GroupMembership.md) | `GroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.MessageTemplateGroup`](dbo.MessageTemplateGroup.md) | `GroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowActionGroup`](dbo.WorkflowActionGroup.md) | `GroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowTriggerGroup`](dbo.WorkflowTriggerGroup.md) | `GroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkQueueDocument`](dbo.WorkQueueDocument.md) | `GroupId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Group_Name` | YES | NONCLUSTERED | `Name` |  |
