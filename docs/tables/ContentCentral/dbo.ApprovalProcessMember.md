# Table: `dbo.ApprovalProcessMember`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ApprovalProcessId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | YES |  |  |
| 4 | `GroupId` | uniqueidentifier | YES |  |  |
| 5 | `MemberName` | nvarchar(50) | NO | `('')` |  |
| 6 | `Position` | int | NO | `((1))` |  |
| 7 | `DeadlineMultiplier` | int | NO | `((0))` |  |
| 8 | `DeadlineInterval` | nvarchar(50) | NO | `('')` |  |
| 9 | `DeadlineIntervalInMinutes` | int | NO | `((0))` |  |
| 10 | `DeadlineWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 11 | `DeadlineWorkflowActionId` | uniqueidentifier | YES |  |  |
| 12 | `DeadlineWorkflowRuleId` | uniqueidentifier | YES |  |  |
| 13 | `DeadlineMessageTemplateId` | uniqueidentifier | YES |  |  |
| 14 | `ArrivalWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 15 | `ArrivalWorkflowActionId` | uniqueidentifier | YES |  |  |
| 16 | `ArrivalWorkflowRuleId` | uniqueidentifier | YES |  |  |
| 17 | `ArrivalMessageTemplateId` | uniqueidentifier | YES |  |  |
| 18 | `RejectToPosition` | int | YES |  |  |
| 19 | `ApprovalRequirementNumber` | int | YES |  |  |
| 20 | `Type` | nvarchar(50) | NO | `('')` |  |
| 21 | `MemberNameOverride` | nvarchar(50) | YES |  |  |
| 22 | `GroupMemberRoutingType` | nvarchar(50) | YES |  |  |
| 23 | `RejectionRequirementNumber` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessMember_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessMember_ArrivalMessageTemplate` | `ArrivalMessageTemplateId` | [`dbo.MessageTemplate.Id`](dbo.MessageTemplate.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_ArrivalWorkflowAction` | `ArrivalWorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_ArrivalWorkflowRule` | `ArrivalWorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_ArrivalWorkflowTrigger` | `ArrivalWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_DeadlineMessageTemplate` | `DeadlineMessageTemplateId` | [`dbo.MessageTemplate.Id`](dbo.MessageTemplate.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_DeadlineWorkflowAction` | `DeadlineWorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_DeadlineWorkflowRule` | `DeadlineWorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_DeadlineWorkflowTrigger` | `DeadlineWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessMember_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcessMemberFieldPermission`](dbo.ApprovalProcessMemberFieldPermission.md) | `ApprovalProcessMemberId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessStep`](dbo.ApprovalProcessStep.md) | `ApprovalProcessMemberId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `ApprovalProcessMemberId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowTrigger`](dbo.WorkflowTrigger.md) | `ApprovalProcessMemberId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessMember_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
| `IX_ApprovalProcessMember_ArrivalMessageTemplateId` | no | NONCLUSTERED | `ArrivalMessageTemplateId` |  |
| `IX_ApprovalProcessMember_ArrivalWorkflowActionId` | no | NONCLUSTERED | `ArrivalWorkflowActionId` |  |
| `IX_ApprovalProcessMember_ArrivalWorkflowRuleId` | no | NONCLUSTERED | `ArrivalWorkflowRuleId` |  |
| `IX_ApprovalProcessMember_ArrivalWorkflowTriggerId` | no | NONCLUSTERED | `ArrivalWorkflowTriggerId` |  |
| `IX_ApprovalProcessMember_DeadlineMessageTemplateId` | no | NONCLUSTERED | `DeadlineMessageTemplateId` |  |
| `IX_ApprovalProcessMember_DeadlineWorkflowActionId` | no | NONCLUSTERED | `DeadlineWorkflowActionId` |  |
| `IX_ApprovalProcessMember_DeadlineWorkflowRuleId` | no | NONCLUSTERED | `DeadlineWorkflowRuleId` |  |
| `IX_ApprovalProcessMember_DeadlineWorkflowTriggerId` | no | NONCLUSTERED | `DeadlineWorkflowTriggerId` |  |
| `IX_ApprovalProcessMember_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_ApprovalProcessMember_UserId` | no | NONCLUSTERED | `UserId` |  |
