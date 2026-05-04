# Table: `dbo.WorkflowAction`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `Description` | nvarchar(128) | NO | `('')` |  |
| 4 | `Type` | nvarchar(50) | NO | `('')` |  |
| 5 | `Global` | bit | NO | `((0))` |  |
| 6 | `GlobalForCatalogDocTypes` | bit | NO | `((0))` |  |
| 7 | `CreatingDocTypeId` | uniqueidentifier | YES |  |  |
| 8 | `DisableUIEdit` | bit | NO | `((0))` |  |
| 9 | `Xml` | nvarchar(max) | YES |  |  |
| 10 | `CatalogId` | uniqueidentifier | YES |  |  |
| 11 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 12 | `DocumentFolderId` | uniqueidentifier | YES |  |  |
| 13 | `ApprovalProcessId` | uniqueidentifier | YES |  |  |
| 14 | `DocTypeFieldId` | uniqueidentifier | YES |  |  |
| 15 | `UserId` | uniqueidentifier | YES |  |  |
| 16 | `WorkflowRuleId` | uniqueidentifier | YES |  |  |
| 17 | `MessageTemplateId` | uniqueidentifier | YES |  |  |
| 18 | `NewDocTypeId` | uniqueidentifier | YES |  |  |
| 19 | `ExternalApplicationId` | uniqueidentifier | YES |  |  |
| 20 | `HideFromDocTypeScope` | bit | NO | `((0))` |  |
| 21 | `ApprovalProcessMemberId` | uniqueidentifier | YES |  |  |
| 22 | `ApprovalProcessGroupId` | uniqueidentifier | YES |  |  |
| 23 | `PacketTemplateId` | uniqueidentifier | YES |  |  |
| 24 | `DocTypeFieldExternalLookupId` | uniqueidentifier | YES |  |  |
| 25 | `ExportDataTemplateId` | uniqueidentifier | YES |  |  |
| 26 | `ReportTemplateId` | uniqueidentifier | YES |  |  |
| 27 | `DocTypeFieldId2` | uniqueidentifier | YES |  |  |
| 28 | `DocTypeFieldId3` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowAction_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_ApprovalProcessGroup` | `ApprovalProcessGroupId` | [`dbo.ApprovalProcessGroup.Id`](dbo.ApprovalProcessGroup.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_ApprovalProcessMember` | `ApprovalProcessMemberId` | [`dbo.ApprovalProcessMember.Id`](dbo.ApprovalProcessMember.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_CreatingDocType` | `CreatingDocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_DocTypeField2` | `DocTypeFieldId2` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_DocTypeField3` | `DocTypeFieldId3` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_DocTypeFieldExternalLookup` | `DocTypeFieldExternalLookupId` | [`dbo.DocTypeFieldExternalLookup.Id`](dbo.DocTypeFieldExternalLookup.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_DocumentFolder` | `DocumentFolderId` | [`dbo.DocumentFolder.Id`](dbo.DocumentFolder.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_ExportDataTemplate` | `ExportDataTemplateId` | [`dbo.ExportDataTemplate.Id`](dbo.ExportDataTemplate.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_ExternalApplication` | `ExternalApplicationId` | [`dbo.ExternalApplication.Id`](dbo.ExternalApplication.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_MessageTemplate` | `MessageTemplateId` | [`dbo.MessageTemplate.Id`](dbo.MessageTemplate.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_NewDocType` | `NewDocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_ReportTemplate` | `ReportTemplateId` | [`dbo.ReportTemplate.Id`](dbo.ReportTemplate.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `FK_WorkflowAction_WorkflowRule` | `WorkflowRuleId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `AutoStartWorkflowActionId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `DeadlineWorkflowActionId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](dbo.ApprovalProcessGroup.md) | `AutoStartWorkflowActionId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `ArrivalWorkflowActionId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `DeadlineWorkflowActionId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowActionGroup`](dbo.WorkflowActionGroup.md) | `WorkflowActionId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowActionUser`](dbo.WorkflowActionUser.md) | `WorkflowActionId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowRuleAction`](dbo.WorkflowRuleAction.md) | `WorkflowActionId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowAction_ApprovalProcessGroupId` | no | NONCLUSTERED | `ApprovalProcessGroupId` |  |
| `IX_WorkflowAction_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
| `IX_WorkflowAction_ApprovalProcessMemberId` | no | NONCLUSTERED | `ApprovalProcessMemberId` |  |
| `IX_WorkflowAction_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `IX_WorkflowAction_CreatingDocTypeId` | no | NONCLUSTERED | `CreatingDocTypeId` |  |
| `IX_WorkflowAction_DocTypeFieldExternalLookupId` | no | NONCLUSTERED | `DocTypeFieldExternalLookupId` |  |
| `IX_WorkflowAction_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_WorkflowAction_DocTypeFieldId2` | no | NONCLUSTERED | `DocTypeFieldId2` |  |
| `IX_WorkflowAction_DocTypeFieldId3` | no | NONCLUSTERED | `DocTypeFieldId3` |  |
| `IX_WorkflowAction_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_WorkflowAction_DocumentFolderId` | no | NONCLUSTERED | `DocumentFolderId` |  |
| `IX_WorkflowAction_ExportDataTemplateId` | no | NONCLUSTERED | `ExportDataTemplateId` |  |
| `IX_WorkflowAction_ExternalApplicationId` | no | NONCLUSTERED | `ExternalApplicationId` |  |
| `IX_WorkflowAction_MessageTemplateId` | no | NONCLUSTERED | `MessageTemplateId` |  |
| `IX_WorkflowAction_NewDocTypeId` | no | NONCLUSTERED | `NewDocTypeId` |  |
| `IX_WorkflowAction_PacketTemplateId` | no | NONCLUSTERED | `PacketTemplateId` |  |
| `IX_WorkflowAction_ReportTemplateId` | no | NONCLUSTERED | `ReportTemplateId` |  |
| `IX_WorkflowAction_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_WorkflowAction_WorkflowRuleId` | no | NONCLUSTERED | `WorkflowRuleId` |  |
