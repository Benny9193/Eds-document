# Table: `dbo.WorkflowTrigger`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Type` | nvarchar(50) | NO | `('')` |  |
| 3 | `SubType` | nvarchar(50) | NO | `('')` |  |
| 4 | `IsScheduled` | bit | NO | `((0))` |  |
| 5 | `DisableUIEdit` | bit | NO | `((0))` |  |
| 6 | `ProcessInterval` | nvarchar(50) | YES |  |  |
| 7 | `ProcessStartDay` | int | YES |  |  |
| 8 | `ProcessStartHour` | int | YES |  |  |
| 9 | `ProcessStartMinute` | int | YES |  |  |
| 10 | `Xml` | nvarchar(max) | YES |  |  |
| 11 | `CatalogId` | uniqueidentifier | YES |  |  |
| 12 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 13 | `ApprovalProcessId` | uniqueidentifier | YES |  |  |
| 14 | `ApprovalProcessMemberId` | uniqueidentifier | YES |  |  |
| 15 | `DocTypeFieldId` | uniqueidentifier | YES |  |  |
| 16 | `Name` | nvarchar(50) | NO | `('')` |  |
| 17 | `Description` | nvarchar(128) | NO | `('')` |  |
| 18 | `ApprovalProcessGroupId` | uniqueidentifier | YES |  |  |
| 19 | `PacketTemplateId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowTrigger_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowTrigger_ApprovalProcessGroup` | `ApprovalProcessGroupId` | [`dbo.ApprovalProcessGroup.Id`](dbo.ApprovalProcessGroup.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowTrigger_ApprovalProcessMember` | `ApprovalProcessMemberId` | [`dbo.ApprovalProcessMember.Id`](dbo.ApprovalProcessMember.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowTrigger_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowTrigger_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowTrigger_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowTrigger_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `AutoStartArrivalWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `AutoStartCaptureWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `DeadlineWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](dbo.ApprovalProcessGroup.md) | `AutoStartArrivalWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](dbo.ApprovalProcessGroup.md) | `AutoStartCaptureWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](dbo.ApprovalProcessGroup.md) | `AutoStartUpdateWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `ArrivalWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `DeadlineWorkflowTriggerId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowRuleTrigger`](dbo.WorkflowRuleTrigger.md) | `WorkflowTriggerId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowTriggerGroup`](dbo.WorkflowTriggerGroup.md) | `WorkflowTriggerId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowTriggerUser`](dbo.WorkflowTriggerUser.md) | `WorkflowTriggerId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowTrigger_ApprovalProcessGroupId` | no | NONCLUSTERED | `ApprovalProcessGroupId` |  |
| `IX_WorkflowTrigger_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
| `IX_WorkflowTrigger_ApprovalProcessMemberId` | no | NONCLUSTERED | `ApprovalProcessMemberId` |  |
| `IX_WorkflowTrigger_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `IX_WorkflowTrigger_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_WorkflowTrigger_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_WorkflowTrigger_PacketTemplateId` | no | NONCLUSTERED | `PacketTemplateId` |  |
