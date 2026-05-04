# Table: `dbo.ApprovalProcess`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 3 | `Enabled` | bit | NO | `((0))` |  |
| 4 | `Name` | nvarchar(50) | NO | `('')` |  |
| 5 | `Priority` | int | NO | `((5))` |  |
| 6 | `ApprovalRequirement` | nvarchar(50) | YES |  |  |
| 7 | `EnableDeadlines` | bit | NO | `((0))` |  |
| 8 | `DeadlineType` | nvarchar(50) | NO | `('')` |  |
| 9 | `MembersHaveEqualDeadlines` | bit | NO | `((0))` |  |
| 10 | `DeadlineMessageType` | nvarchar(50) | NO | `('')` |  |
| 11 | `DeadlineMultiplier` | int | NO | `((0))` |  |
| 12 | `DeadlineInterval` | nvarchar(50) | NO | `('')` |  |
| 13 | `DeadlineIntervalInMinutes` | int | NO | `((0))` |  |
| 14 | `ScheduleResetMultiplier` | int | NO | `((0))` |  |
| 15 | `ScheduleResetInterval` | nvarchar(50) | NO | `('')` |  |
| 16 | `DeadlineWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 17 | `DeadlineWorkflowActionId` | uniqueidentifier | YES |  |  |
| 18 | `DeadlineWorkflowRuleId` | uniqueidentifier | YES |  |  |
| 19 | `DeadlineMessageTemplateId` | uniqueidentifier | YES |  |  |
| 20 | `AutoStartCaptureWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 21 | `AutoStartWorkflowActionId` | uniqueidentifier | YES |  |  |
| 22 | `AutoStartWorkflowRuleId` | uniqueidentifier | YES |  |  |
| 23 | `AllowFirstRejection` | bit | NO | `((0))` |  |
| 24 | `DeadlineMessageMessageType` | nvarchar(50) | NO | `('')` |  |
| 25 | `EnableArrivalMessaging` | bit | NO | `((0))` |  |
| 26 | `EnableAutoStart` | bit | NO | `((0))` |  |
| 27 | `RemoveOnOtherAssignment` | bit | NO | `((0))` |  |
| 28 | `AutoStartArrivalWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 29 | `AllowCustomRejectToPositions` | bit | NO | `((0))` |  |
| 30 | `StartPosition` | int | NO | `((1))` |  |
| 31 | `AllowMemberNameOverride` | bit | NO | `((0))` |  |
| 32 | `RequireNote` | bit | NO | `((0))` |  |
| 33 | `AllowFieldEditLimiter` | bit | NO | `((0))` |  |
| 34 | `LimitAllFieldEditing` | bit | NO | `((0))` |  |
| 35 | `CombinePreviousAndCurrentNote` | bit | NO | `((0))` |  |
| 36 | `RejectionRequirement` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcess_AutoStartArrivalWorkflowTrigger` | `AutoStartArrivalWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_AutoStartCaptureWorkflowTrigger` | `AutoStartCaptureWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_AutoStartWorkflowAction` | `AutoStartWorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_AutoStartWorkflowRule` | `AutoStartWorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_DeadlineMessageTemplate` | `DeadlineMessageTemplateId` | [`dbo.MessageTemplate.Id`](dbo.MessageTemplate.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_DeadlineWorkflowAction` | `DeadlineWorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_DeadlineWorkflowRule` | `DeadlineWorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_DeadlineWorkflowTrigger` | `DeadlineWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcess_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcessGroupMember`](dbo.ApprovalProcessGroupMember.md) | `ApprovalProcessId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `ApprovalProcessId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessStatus`](dbo.ApprovalProcessStatus.md) | `ApprovalProcessId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessStep`](dbo.ApprovalProcessStep.md) | `ApprovalProcessId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessStepHistory`](dbo.ApprovalProcessStepHistory.md) | `ApprovalProcessId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterApprovalProcess`](dbo.ReportFilterApprovalProcess.md) | `ApprovalProcessId` | `Id` | CASCADE | CASCADE |
| [`dbo.SystemField`](dbo.SystemField.md) | `ApprovalProcessId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `ApprovalProcessId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowTrigger`](dbo.WorkflowTrigger.md) | `ApprovalProcessId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcess_AutoStartArrivalWorkflowTriggerId` | no | NONCLUSTERED | `AutoStartArrivalWorkflowTriggerId` |  |
| `IX_ApprovalProcess_AutoStartCaptureWorkflowTriggerId` | no | NONCLUSTERED | `AutoStartCaptureWorkflowTriggerId` |  |
| `IX_ApprovalProcess_AutoStartWorkflowActionId` | no | NONCLUSTERED | `AutoStartWorkflowActionId` |  |
| `IX_ApprovalProcess_AutoStartWorkflowRuleId` | no | NONCLUSTERED | `AutoStartWorkflowRuleId` |  |
| `IX_ApprovalProcess_DeadlineMessageTemplateId` | no | NONCLUSTERED | `DeadlineMessageTemplateId` |  |
| `IX_ApprovalProcess_DeadlineWorkflowActionId` | no | NONCLUSTERED | `DeadlineWorkflowActionId` |  |
| `IX_ApprovalProcess_DeadlineWorkflowRuleId` | no | NONCLUSTERED | `DeadlineWorkflowRuleId` |  |
| `IX_ApprovalProcess_DeadlineWorkflowTriggerId` | no | NONCLUSTERED | `DeadlineWorkflowTriggerId` |  |
| `IX_ApprovalProcess_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
