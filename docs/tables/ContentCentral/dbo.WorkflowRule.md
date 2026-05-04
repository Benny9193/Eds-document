# Table: `dbo.WorkflowRule`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 3 | `Enabled` | bit | NO | `((0))` |  |
| 4 | `DisableUIEdit` | bit | NO | `((0))` |  |
| 5 | `Name` | nvarchar(50) | NO | `('')` |  |
| 6 | `Description` | nvarchar(128) | NO | `('')` |  |
| 7 | `TriggerBoolean` | nvarchar(3) | YES |  |  |
| 8 | `PrimaryWorkflowRuleTriggerId` | uniqueidentifier | YES |  |  |
| 9 | `HideFromDocTypeScope` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowRule_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowRule_WorkflowRuleTrigger` | `PrimaryWorkflowRuleTriggerId` | [`dbo.WorkflowRuleTrigger.Id`](dbo.WorkflowRuleTrigger.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `AutoStartWorkflowRuleId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `DeadlineWorkflowRuleId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](dbo.ApprovalProcessGroup.md) | `AutoStartWorkflowRuleId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `ArrivalWorkflowRuleId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `DeadlineWorkflowRuleId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowRuleAction`](dbo.WorkflowRuleAction.md) | `WorkflowRuleId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowRuleCompletion`](dbo.WorkflowRuleCompletion.md) | `WorkflowRuleId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowRulePacketCompletion`](dbo.WorkflowRulePacketCompletion.md) | `WorkflowRuleId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowRuleTrigger`](dbo.WorkflowRuleTrigger.md) | `WorkflowRuleId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowRule_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_WorkflowRule_PrimaryWorkflowRuleTriggerId` | no | NONCLUSTERED | `PrimaryWorkflowRuleTriggerId` |  |
