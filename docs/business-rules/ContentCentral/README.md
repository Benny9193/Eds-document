# Business rules: `ContentCentral`

_Generated on 2026-05-04T15:27:07.610Z_

**Database:** `ContentCentral`

[← back to business-rules index](../README.md)

Auto-extracted enforcement layer: triggers, check constraints, computed columns, non-trivial defaults, filtered indexes, alternate-key uniqueness, and indexed/schema-bound views. Hand-curated narrative lives in [`docs/business-logic/`](../../business-logic/).

## Summary

| Category | Count |
|----------|-------|
| Triggers | 0 |
| Check constraints | 3 |
| Computed columns | 0 |
| Default constraints | 668 (112 non-trivial) |
| Filtered indexes | 0 |
| Unique constraints (non-PK) | 43 |
| Indexed views | 1 |
| Schema-bound views (non-indexed) | 1 |

## Triggers

_None._

## Check constraints

**3** constraint(s).

| Table | Column | Constraint | Definition | Flags |
|-------|--------|------------|------------|-------|
| `dbo.DocTypeField` | _(table-level)_ | `CK_DocTypeField` | `([UseEntryList]=(0) AND [AllowNewEntry]=(0) AND [AddNewEntry]=(0) OR [UseEntryList]=(1) AND [AllowNewEntry]=(0) AND [AddNewEntry]=(0) OR [UseEntryList]=(1) AND [AllowNewEntry]=(1) AND [AddNewEntry]=(0) OR [UseEntryList]=(1) AND [AllowNewEntry]=(1) AND [AddNewEntry]=(1))` |  |
| `dbo.DocTypePermission` | _(table-level)_ | `CK_DocTypePermission` | `([UserId] IS NOT NULL AND [GroupId] IS NULL OR [UserId] IS NULL AND [GroupId] IS NOT NULL OR [UserId] IS NULL AND [GroupId] IS NULL)` |  |
| `dbo.DocTypePermission` | _(table-level)_ | `CK_DocTypePermission_1` | `(NOT ([AllowDocView]=(0) AND [AllowDocEdit]=(1)))` |  |

## Computed columns

_None._

## Default constraints

**668** total. **112** non-trivial (UDF / NEWID / etc.) shown below; 556 literal/timestamp defaults omitted.

| Table | Column | Constraint | Default |
|-------|--------|------------|---------|
| `dbo.ActiveDirectoryDomain` | `Id` | `DF_ActiveDirectoryDomain_Id` | `(newid())` |
| `dbo.AdminPermission` | `Id` | `DF_AdminPermission_Id` | `(newid())` |
| `dbo.ApprovalProcess` | `Id` | `DF_ApprovalProcess_Id` | `(newid())` |
| `dbo.ApprovalProcessCompletion` | `Id` | `DF_ApprovalProcessCompletion_Id` | `(newid())` |
| `dbo.ApprovalProcessGroup` | `Id` | `DF_ApprovalProcessGroup_Id` | `(newid())` |
| `dbo.ApprovalProcessGroupMember` | `Id` | `DF_ApprovalProcessGroupMember_Id` | `(newid())` |
| `dbo.ApprovalProcessMember` | `Id` | `DF_ApprovalProcessMember_Id` | `(newid())` |
| `dbo.ApprovalProcessMemberFieldPermission` | `Id` | `DF_ApprovalProcessMemberFieldPermission_Id` | `(newid())` |
| `dbo.ApprovalProcessStatus` | `Id` | `DF_ApprovalProcessStatus_Id` | `(newid())` |
| `dbo.ApprovalProcessStep` | `Id` | `DF_ApprovalProcessStep_Id` | `(newid())` |
| `dbo.ApprovalProcessStepCompletion` | `Id` | `DF_ApprovalProcessStepCompletion_Id` | `(newid())` |
| `dbo.ApprovalProcessStepHistory` | `Id` | `DF_ApprovalProcessStepHistory_Id` | `(newid())` |
| `dbo.CaptureFormSession` | `Id` | `DF_CaptureFormSession_Id` | `(newid())` |
| `dbo.CaptureJob` | `Id` | `DF_CaptureJob_Id` | `(newid())` |
| `dbo.CaptureJobInputItem` | `Id` | `DF_CaptureJobInputItem_Id` | `(newid())` |
| `dbo.CaptureJobInputItem` | `ItemGroup` | `DF_CaptureJobInputItem_UnitId` | `(newid())` |
| `dbo.CaptureJobSinglePageImageItem` | `Id` | `DF_CaptureJobSinglePageImageItem_Id` | `(newid())` |
| `dbo.CaptureJobSinglePageImageItemZonal` | `Id` | `DF_CaptureJobSinglePageImageItemZonal_Id` | `(newid())` |
| `dbo.Catalog` | `Id` | `DF_Catalog_Id` | `(newid())` |
| `dbo.Catalog` | `ScheduleIntervalInMinutes` | `DF_Catalog_ScheduleIntervalInMinutes` | `((24)*(60))` |
| `dbo.CatalogAdminMembership` | `Id` | `DF_CatalogAdminMembership_Id` | `(newid())` |
| `dbo.CatalogAdminPermission` | `Id` | `DF_CatalogAdminPermission_Id` | `(newid())` |
| `dbo.CatalogFolderToCatalog` | `Id` | `DF_CatalogFolderToCatalog_Id` | `(newid())` |
| `dbo.ContentDirectorAuthenticationNonce` | `Id` | `DF_ContentDirectorAuthenticationNonce_Id` | `(newid())` |
| `dbo.ContentDirectorAuthenticationNonce` | `Nonce` | `DF_ContentDirectorAuthenticationNonce_Nonce` | `(CONVERT([varchar](36),newid(),(0)))` |
| `dbo.CustomMenuItem` | `Id` | `DF_CustomMenuItem_Id` | `(newid())` |
| `dbo.CustomMenuItemSource` | `Id` | `DF_CustomMenuItemSource_Id` | `(newid())` |
| `dbo.DirectScan` | `Id` | `DF_DirectScan_Id` | `(newid())` |
| `dbo.DocType` | `Id` | `DF_DocType_Id` | `(newid())` |
| `dbo.DocTypeCaptureForm` | `Id` | `DF_DocTypeCaptureForm_Id` | `(newid())` |
| `dbo.DocTypeCaptureFormData` | `DocTypeCaptureFormId` | `DF_DocTypeCaptureFormData_DocTypeCaptureFormId` | `(newid())` |
| `dbo.DocTypeDefaultAdminSearchField` | `Id` | `DF_DocTypeDefaultAdminSearchField_Id` | `(newid())` |
| `dbo.DocTypeDefaultAdminSearchResultField` | `Id` | `DF_DocTypeDefaultAdminSearchResultField_Id` | `(newid())` |
| `dbo.DocTypeDefaultUserSearchField` | `Id` | `DF_DocTypeDefaultUserSearchField_Id` | `(newid())` |
| `dbo.DocTypeDefaultUserSearchResultField` | `Id` | `DF_DocTypeDefaultUserSearchResultField_Id` | `(newid())` |
| `dbo.DocTypeField` | `Id` | `DF_DocTypeField_Id` | `(newid())` |
| `dbo.DocTypeFieldExternalLookup` | `Id` | `DF_DocTypeFieldExternalLookup_Id` | `(newid())` |
| `dbo.DocTypeFieldExternalLookupItem` | `Id` | `DF_DocTypeFieldExternalLookupItem_Id` | `(newid())` |
| `dbo.DocTypeFieldExternalLookupSelectItem` | `Id` | `DF_DocTypeFieldExternalLookupSelectItem_Id` | `(newid())` |
| `dbo.DocTypeFieldRecognitionZone` | `Id` | `DF_DocTypeFieldRecognitionZone_Id` | `(newid())` |
| `dbo.DocTypeFieldRecognitionZoneCondition` | `DocTypeFieldRecognitionZoneId` | `DF_DocTypeFieldRecognitionZoneCondition_DocTypeFieldRecognitionZoneId` | `(newid())` |
| `dbo.DocTypeFieldSpentNumericValue` | `Id` | `DF_DocTypeFieldSpentNumericValue_Id` | `(newid())` |
| `dbo.DocTypeFileBuildItem` | `Id` | `DF_DocTypeFileBuildItem_Id` | `(newid())` |
| `dbo.DocTypeFolderBuildItem` | `Id` | `DF_DocTypeFolderBuildItem_Id` | `(newid())` |
| `dbo.DocTypePermission` | `Id` | `DF_DocTypePermission_Id` | `(newid())` |
| `dbo.Document` | `Id` | `DF_Document_Id` | `(newid())` |
| `dbo.DocumentApprovalProcess` | `Id` | `DF_DocumentApprovalProcess_Id` | `(newid())` |
| `dbo.DocumentCheckedOut` | `Id` | `DF_DocumentCheckedOut_Id` | `(newid())` |
| `dbo.DocumentField` | `Id` | `DF_DocumentField_Id` | `(newid())` |
| `dbo.DocumentFolder` | `Id` | `DF_DocumentFolder_Id` | `(newid())` |
| `dbo.DocumentVersion` | `Id` | `DF_DocumentVersion_Id` | `(newid())` |
| `dbo.DocumentVersionFullText` | `DocumentVersionId` | `DF_DocumentVersionFullText_DocumentVersionId` | `(newid())` |
| `dbo.DragDrop` | `Id` | `DF_DragDrop_Id` | `(newid())` |
| `dbo.ExportDataElement` | `Id` | `DF_ExportDataElement_Id` | `(newid())` |
| `dbo.ExportDataPath` | `Id` | `DF_ExportDataPath_Id` | `(newid())` |
| `dbo.ExportDataTemplate` | `Id` | `DF_ExportDataTemplate_Id` | `(newid())` |
| `dbo.ExternalApplication` | `Id` | `DF_ExternalApplication_Id` | `(newid())` |
| `dbo.ExternalDataSource` | `Id` | `DF_ExternalDataSource_Id` | `(newid())` |
| `dbo.FolderPropertiesSession` | `Id` | `DF_FolderPropertiesSession_Id` | `(newid())` |
| `dbo.GridResultsField` | `Id` | `DF_GridResultsField_Id` | `(newid())` |
| `dbo.Group` | `Id` | `DF_Group_GroupId` | `(newid())` |
| `dbo.GroupMembership` | `Id` | `DF_GroupMembership_Id` | `(newid())` |
| `dbo.LogEntry` | `Id` | `DF_LogEntry_Id` | `(newid())` |
| `dbo.LoginSession` | `Id` | `DF_LoginSession_Id` | `(newid())` |
| `dbo.MakeSearchable` | `Id` | `DF_MakeSearchable_Id` | `(newid())` |
| `dbo.MessageTemplate` | `Id` | `DF_MessageTemplate_Id` | `(newid())` |
| `dbo.MessageTemplateGroup` | `Id` | `DF_MessageTemplateGroup_Id` | `(newid())` |
| `dbo.MessageTemplateUser` | `Id` | `DF_MessageTemplateUser_Id` | `(newid())` |
| `dbo.PacketCompletion` | `Id` | `DF_PacketCompletion_Id` | `(newid())` |
| `dbo.PacketTemplate` | `Id` | `DF_PacketTemplate_Id` | `(newid())` |
| `dbo.PacketTemplateDocType` | `Id` | `DF_PacketTemplateDocType_Id` | `(newid())` |
| `dbo.PostScanDocument` | `Id` | `DF_PostScanDocument_Id` | `(newid())` |
| `dbo.PostScanDocumentApprovalProcess` | `Id` | `DF_PostScanDocumentApprovalProcess_Id` | `(newid())` |
| `dbo.PostScanDocumentField` | `Id` | `DF_PostScanDocumentField_Id` | `(newid())` |
| `dbo.RememberLogin` | `Id` | `DF_RememberLogin_Id` | `(newid())` |
| `dbo.RememberLogin` | `Series` | `DF_RememberLogin_Series` | `(newid())` |
| `dbo.RememberLogin` | `Token` | `DF_RememberLogin_Token` | `(newid())` |
| `dbo.ReportColumn` | `Id` | `DF_ReportColumn_Id` | `(newid())` |
| `dbo.ReportFilterApprovalProcess` | `Id` | `DF_ReportFilterApprovalProcess_Id` | `(newid())` |
| `dbo.ReportFilterApprovalProcessTimeframe` | `Id` | `DF_ReportFilterApprovalProcessTimeframe_Id` | `(newid())` |
| `dbo.ReportFilterApprovalProcessTimeframeMatch` | `Id` | `DF_ReportFilterApprovalProcessTimeframeMatch_Id` | `(newid())` |
| `dbo.ReportFilterCatalog` | `Id` | `DF_ReportFilterCatalog_Id` | `(newid())` |
| `dbo.ReportFilterDocType` | `Id` | `DF_ReportFilterDocType_Id` | `(newid())` |
| `dbo.ReportFilterDocTypeField` | `Id` | `DF_ReportFilterDocTypeField_Id` | `(newid())` |
| `dbo.ReportFilterDocTypeFieldMatch` | `Id` | `DF_ReportFilterDocTypeFieldMatch_Id` | `(newid())` |
| `dbo.ReportFilterSystemField` | `Id` | `DF_ReportFilterSystemField_Id` | `(newid())` |
| `dbo.ReportFilterSystemFieldMatch` | `Id` | `DF_ReportFilterSystemFieldMatch_Id` | `(newid())` |
| `dbo.ReportFilterWorkQueueArrival` | `Id` | `DF_ReportFilterWorkQueueArrival_Id` | `(newid())` |
| `dbo.ReportFilterWorkQueueArrivalMatch` | `Id` | `DF_ReportFilterWorkQueueArrivalMatch_Id` | `(newid())` |
| `dbo.ReportSegment` | `Id` | `DF_ReportSegment_Id` | `(newid())` |
| `dbo.ReportTemplate` | `Id` | `DF_ReportTemplate_Id` | `(newid())` |
| `dbo.SavedSearch` | `SearchId` | `DF_SavedSearch_SearchId` | `(newid())` |
| `dbo.ServiceCommand` | `Id` | `DF_ServiceCommand_Id` | `(newid())` |
| `dbo.SystemField` | `Id` | `DF_SystemField_Id` | `(newid())` |
| `dbo.UITheme` | `Id` | `DF_UITheme_Id` | `(newid())` |
| `dbo.User` | `Id` | `DF_User_UserId` | `(newid())` |
| `dbo.UserAddressBookItem` | `Id` | `DF_UserAddressBookItem_Id` | `(newid())` |
| `dbo.UserDefaultDocType` | `Id` | `DF_UserDefaultDocType_Id` | `(newid())` |
| `dbo.UserMessage` | `Id` | `DF_UserMessage_Id` | `(newid())` |
| `dbo.WorkflowAction` | `Id` | `DF_WorkflowAction_Id` | `(newid())` |
| `dbo.WorkflowActionGroup` | `Id` | `DF_WorkflowActionGroup_Id` | `(newid())` |
| `dbo.WorkflowActionUser` | `Id` | `DF_WorkflowActionUser_Id` | `(newid())` |
| `dbo.WorkflowRule` | `Id` | `DF_WorkflowRule_Id` | `(newid())` |
| `dbo.WorkflowRuleAction` | `Id` | `DF_WorkflowRuleAction_Id` | `(newid())` |
| `dbo.WorkflowRuleCompletion` | `Id` | `DF_WorkflowRuleCompletion_Id` | `(newid())` |
| `dbo.WorkflowRulePacketCompletion` | `Id` | `DF_WorkflowRulePacketCompletion_Id` | `(newid())` |
| `dbo.WorkflowRuleTrigger` | `Id` | `DF_WorkflowRuleTrigger_Id` | `(newid())` |
| `dbo.WorkflowTrigger` | `Id` | `DF_WorkflowTrigger_Id` | `(newid())` |
| `dbo.WorkflowTriggerGroup` | `Id` | `DF_WorkflowTriggerGroup_Id` | `(newid())` |
| `dbo.WorkflowTriggerUser` | `Id` | `DF_WorkflowTriggerUser_Id` | `(newid())` |
| `dbo.WorkQueueDocument` | `Id` | `DF_WorkQueueDocument_Id` | `(newid())` |
| `dbo.WorkQueueDocumentCompletion` | `Id` | `DF_WorkQueueDocumentCompletion_Id` | `(newid())` |

## Filtered indexes

_None._

## Unique constraints (non-PK)

**43** alternate-key uniqueness rule(s).

| Table | Index | Source | Key columns |
|-------|-------|--------|-------------|
| `dbo.ActiveDirectoryDomain` | `IX_ActiveDirectoryDomain_Fqdn` | UNIQUE constraint | [Fqdn] |
| `dbo.AdminPermission` | `IX_AdminPermission_GroupId_UserId` | UNIQUE constraint | [GroupId], [UserId] |
| `dbo.CaptureJobInputItem` | `IX_CaptureJobInputItem_ItemOrder` | UNIQUE constraint | [ItemOrder] |
| `dbo.CaptureJobSinglePageImageItem` | `IX_CaptureJobSinglePageImageItem_ItemOrder` | UNIQUE constraint | [ItemOrder] |
| `dbo.Catalog` | `IX_Catalog_Name` | UNIQUE constraint | [Name] |
| `dbo.CatalogAdminMembership` | `IX_CatalogAdminMembership_CatalogId_UserId` | UNIQUE constraint | [CatalogId], [UserId] |
| `dbo.ContentDirectorAuthenticationNonce` | `IX_ContentDirectorAuthenticationNonce_Nonce` | UNIQUE constraint | [Nonce] |
| `dbo.DocType` | `IX_DocType_CatalogId_Name` | UNIQUE constraint | [CatalogId], [Name] |
| `dbo.DocTypeCaptureForm` | `IX_DocTypeCaptureForm_DocTypeId_Name` | UNIQUE constraint | [DocTypeId], [Name] |
| `dbo.DocTypeDefaultUserSearchField` | `IX_DocTypeDefaultUserSearchField_UserId_DocTypeFieldId` | UNIQUE constraint | [UserId], [DocTypeFieldId] |
| `dbo.DocTypeDefaultUserSearchResultField` | `IX_DocTypeDefaultUserSearchResultField_UserId_DocTypeFieldId` | UNIQUE constraint | [UserId], [DocTypeFieldId] |
| `dbo.DocTypeField` | `IX_DocTypeField_DocTypeId_Name` | UNIQUE constraint | [DocTypeId], [Name] |
| `dbo.DocTypeFieldSpentNumericValue` | `IX_DocTypeFieldSpentNumericValue_DocTypeFieldId_SpentValue` | UNIQUE constraint | [DocTypeFieldId], [SpentValue] |
| `dbo.DocTypePermission` | `IX_DocTypePermission_DocTypeId_GroupId_UserId` | UNIQUE constraint | [DocTypeId], [GroupId], [UserId] |
| `dbo.DocumentApprovalProcess` | `IX_DocumentApprovalProcess_DocumentId_ApprovalProcessGroupId` | UNIQUE constraint | [DocumentId], [ApprovalProcessGroupId] |
| `dbo.DocumentFolder` | `IX_DocumentFolder_DocFolder` | UNIQUE constraint | [DocFolder] |
| `dbo.DocumentShortLink` | `IX_DocumentShortLink_Document` | UNIQUE constraint | [DocumentId] |
| `dbo.DocumentVersion` | `IX_DocumentVersion_DocumentId_VersionMajor_VersionMinor` | UNIQUE constraint | [DocumentId], [VersionMajor], [VersionMinor] |
| `dbo.ExternalApplication` | `IX_ExternalApplication_Name` | UNIQUE constraint | [Name] |
| `dbo.ExternalDataSource` | `IX_ExternalDataSource_Name` | UNIQUE constraint | [Name] |
| `dbo.Group` | `IX_Group_Name` | UNIQUE constraint | [Name] |
| `dbo.GroupMembership` | `IX_GroupMembership_GroupId_UserId` | UNIQUE constraint | [GroupId], [UserId] |
| `dbo.LoginSession` | `IX_LoginSession_AspNetSessionId` | UNIQUE constraint | [AspNetSessionId] |
| `dbo.MessageTemplateGroup` | `IX_MessageTemplateGroup_MessageTemplateId_GroupId` | UNIQUE constraint | [MessageTemplateId], [GroupId] |
| `dbo.MessageTemplateUser` | `IX_MessageTemplateUser_MessageTemplateId_UserId` | UNIQUE constraint | [MessageTemplateId], [UserId] |
| `dbo.PostScanDocument` | `IX_PostScanDocument_DocumentPath` | UNIQUE constraint | [DocumentPath] |
| `dbo.PostScanDocumentApprovalProcess` | `IX_PostScanDocumentApprovalProcess_PostScanDocumentId_ApprovalProcessGroupId` | UNIQUE constraint | [PostScanDocumentId], [ApprovalProcessGroupId] |
| `dbo.QCard` | `IX_QCard_Barcode` | UNIQUE constraint | [Barcode] |
| `dbo.ReportFilterApprovalProcess` | `IX_ReportFilterApprovalProcess_Report_ApprovalProcess` | UNIQUE constraint | [ReportTemplateId], [ApprovalProcessId] |
| `dbo.ReportFilterCatalog` | `IX_ReportFilterCatalog_Report_Catalog` | UNIQUE constraint | [ReportTemplateId], [CatalogId] |
| `dbo.ReportFilterDocType` | `IX_ReportFilterDocType_Report_DocType` | UNIQUE constraint | [ReportTemplateId], [DocTypeId] |
| `dbo.ReportFilterDocTypeField` | `IX_ReportFilterDocTypeField_Report_DocTypeField` | UNIQUE constraint | [ReportTemplateId], [DocTypeFieldId] |
| `dbo.UITheme` | `IX_UITheme_Name` | UNIQUE constraint | [Name] |
| `dbo.UserAddressBookItem` | `IX_UserAddressBookItem_UserId_ContactName` | UNIQUE constraint | [UserId], [ContactName] |
| `dbo.UserDefaultDocType` | `IX_UserDefaultDocType_UserId_CatalogId` | UNIQUE constraint | [UserId], [CatalogId] |
| `dbo.WorkflowActionGroup` | `IX_WorkflowActionGroup_WorkflowActionId_GroupId` | UNIQUE constraint | [WorkflowActionId], [GroupId] |
| `dbo.WorkflowActionUser` | `IX_WorkflowActionUser_WorkflowActionId_UserId` | UNIQUE constraint | [WorkflowActionId], [UserId] |
| `dbo.WorkflowRuleCompletion` | `IX_WorkflowRuleCompletion_WorkflowRuleId_DocumentId_PostScanDocumentId` | UNIQUE constraint | [WorkflowRuleId], [DocumentId], [PostScanDocumentId] |
| `dbo.WorkflowRulePacketCompletion` | `IX_WorkflowRulePacketCompletion_WorkflowRuleId_PacketTemplateId_PacketTemplateKeyFieldValue` | UNIQUE constraint | [WorkflowRuleId], [PacketTemplateId], [PacketTemplateKeyFieldValue] |
| `dbo.WorkflowTriggerGroup` | `IX_WorkflowTriggerGroup_WorkflowTriggerId_GroupId` | UNIQUE constraint | [WorkflowTriggerId], [GroupId] |
| `dbo.WorkflowTriggerUser` | `IX_WorkflowTriggerUser_WorkflowTriggerId_UserId` | UNIQUE constraint | [WorkflowTriggerId], [UserId] |
| `dbo.WorkQueueDocument` | `IX_WorkQueueDocument_DocumentId_UserId_GroupId` | UNIQUE constraint | [DocumentId], [UserId], [GroupId] |
| `dbo.WorkQueueDocumentCompletion` | `IX_WorkQueueDocumentCompletion_WorkQueueDocumentId_UserId` | UNIQUE constraint | [WorkQueueDocumentId], [UserId] |

## Indexed views (materialised)

**1** indexed view(s). These store pre-computed results.

### `dbo.DocumentPath`

Created 2012-12-07 13:29:00 &middot; modified 2018-08-21 04:22:20 &middot; schema-bound: yes.

```sql
CREATE VIEW [dbo].[DocumentPath]
WITH SCHEMABINDING 
AS
SELECT     dbo.[Document].Id AS DocumentId, dbo.DocumentVersion.Id AS DocumentVersionId, dbo.[Document].DocTypeId, dbo.DocumentVersionFile.DocumentFolderId, 
                      dbo.Catalog.Name AS CatalogName, dbo.DocType.Name AS DocTypeName, dbo.DocumentFolder.DocFolder, dbo.DocumentVersionFile.BaseName, 
                      dbo.DocumentVersionFile.DocName, dbo.DocumentVersion.VersionMajor, dbo.DocumentVersion.VersionMinor, 
                      dbo.DocumentFolder.DocFolder + dbo.DocumentVersionFile.DocName AS DocPath, dbo.[Document].ModifiedUtc
FROM         dbo.[Document] INNER JOIN
                      dbo.DocumentVersion ON dbo.[Document].Id = dbo.DocumentVersion.DocumentId INNER JOIN
                      dbo.DocumentVersionFile ON dbo.DocumentVersion.Id = dbo.DocumentVersionFile.DocumentVersionId INNER JOIN
                      dbo.DocumentFolder ON dbo.DocumentVersionFile.DocumentFolderId = dbo.DocumentFolder.Id INNER JOIN
                      dbo.DocType ON dbo.[Document].DocTypeId = dbo.DocType.Id INNER JOIN
                      dbo.Catalog ON dbo.DocType.CatalogId = dbo.Catalog.Id
```

## Schema-bound views (non-indexed)

**1** view(s) with WITH SCHEMABINDING but no clustered index — definition is locked against drift.

| View | Created | Modified |
|------|---------|----------|
| `dbo.DocumentPacketCompletion` | 2012-12-07 13:29:00 | 2012-12-07 13:29:00 |

## Source queries

Rendered from these catalog views:

- `sys.triggers` + `sys.trigger_events` + `sys.sql_modules` — DML triggers and their bodies
- `sys.check_constraints` — column- and table-level CHECK rules (with `is_not_trusted` / `is_disabled`)
- `sys.computed_columns` — derived columns (persisted vs. inline)
- `sys.default_constraints` — column defaults (filtered to non-trivial)
- `sys.indexes WHERE has_filter = 1` — filtered indexes
- `sys.indexes WHERE is_unique = 1 AND is_primary_key = 0` — alternate-key uniqueness
- `sys.views` joined to `sys.indexes` — indexed and schema-bound views
