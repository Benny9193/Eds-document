# Table: `dbo.ApprovalProcessGroup`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 3 | `Name` | nvarchar(50) | YES |  |  |
| 4 | `Description` | nvarchar(128) | NO |  |  |
| 5 | `AssignToDocument` | bit | NO | `((0))` |  |
| 6 | `RequireAssignment` | bit | NO | `((0))` |  |
| 7 | `EnableAutoStartOnCapture` | bit | NO | `((0))` |  |
| 8 | `EnableAutoStartOnUpdate` | bit | NO | `((0))` |  |
| 9 | `AutoStartCaptureWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 10 | `AutoStartArrivalWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 11 | `AutoStartUpdateWorkflowTriggerId` | uniqueidentifier | YES |  |  |
| 12 | `AutoStartWorkflowActionId` | uniqueidentifier | YES |  |  |
| 13 | `AutoStartWorkflowRuleId` | uniqueidentifier | YES |  |  |
| 14 | `HideAfterRelatedAssignment` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessGroup_AutoStartArrivalWorkflowTrigger` | `AutoStartArrivalWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessGroup_AutoStartCaptureWorkflowTrigger` | `AutoStartCaptureWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessGroup_AutoStartUpdateWorkflowTrigger` | `AutoStartUpdateWorkflowTriggerId` | [`dbo.WorkflowTrigger.Id`](dbo.WorkflowTrigger.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessGroup_AutoStartWorkflowAction` | `AutoStartWorkflowActionId` | [`dbo.WorkflowAction.Id`](dbo.WorkflowAction.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessGroup_AutoStartWorkflowRule` | `AutoStartWorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessGroup_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcessGroupMember`](dbo.ApprovalProcessGroupMember.md) | `ApprovalProcessGroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentApprovalProcess`](dbo.DocumentApprovalProcess.md) | `ApprovalProcessGroupId` | `Id` | CASCADE | CASCADE |
| [`dbo.PostScanDocumentApprovalProcess`](dbo.PostScanDocumentApprovalProcess.md) | `ApprovalProcessGroupId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `ApprovalProcessGroupId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowTrigger`](dbo.WorkflowTrigger.md) | `ApprovalProcessGroupId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessGroup_AutoStartArrivalWorkflowTriggerId` | no | NONCLUSTERED | `AutoStartArrivalWorkflowTriggerId` |  |
| `IX_ApprovalProcessGroup_AutoStartCaptureWorkflowTriggerId` | no | NONCLUSTERED | `AutoStartCaptureWorkflowTriggerId` |  |
| `IX_ApprovalProcessGroup_AutoStartUpdateWorkflowTriggerId` | no | NONCLUSTERED | `AutoStartUpdateWorkflowTriggerId` |  |
| `IX_ApprovalProcessGroup_AutoStartWorkflowActionId` | no | NONCLUSTERED | `AutoStartWorkflowActionId` |  |
| `IX_ApprovalProcessGroup_AutoStartWorkflowRuleId` | no | NONCLUSTERED | `AutoStartWorkflowRuleId` |  |
| `IX_ApprovalProcessGroup_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
