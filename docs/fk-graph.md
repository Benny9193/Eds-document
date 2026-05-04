# FK Dependency Graph

_Generated on 2026-05-04T15:26:36.729Z_

> This file covers the **FK constraint graph** (table-to-table relationships within each database). For cross-database module references (procedures, views, triggers) see `docs/dependencies/`.

**22** databases — **876** FK constraints — **392** cross-DB view edges.

Jump to: [Intra-database FK constraints](#intra-database-fk-constraints) · [Most-referenced tables](#most-referenced-tables) · [Cross-database view dependencies](#cross-database-view-dependencies)

## Intra-database FK constraints

### `Catalogs`

_No FK constraints._

### `ContentCentral`

256 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.AdminPermission`](tables/ContentCentral/dbo.AdminPermission.md) | `FK_AdminPermission_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | CASCADE |
| [`dbo.AdminPermission`](tables/ContentCentral/dbo.AdminPermission.md) | `FK_AdminPermission_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_AutoStartArrivalWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `AutoStartArrivalWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_AutoStartCaptureWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `AutoStartCaptureWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_AutoStartWorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `AutoStartWorkflowActionId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_AutoStartWorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `AutoStartWorkflowRuleId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_DeadlineMessageTemplate` | [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `DeadlineMessageTemplateId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_DeadlineWorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `DeadlineWorkflowActionId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_DeadlineWorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `DeadlineWorkflowRuleId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_DeadlineWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `DeadlineWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `FK_ApprovalProcess_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessCompletion`](tables/ContentCentral/dbo.ApprovalProcessCompletion.md) | `FK_ApprovalProcessCompletion_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `FK_ApprovalProcessGroup_AutoStartArrivalWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `AutoStartArrivalWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `FK_ApprovalProcessGroup_AutoStartCaptureWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `AutoStartCaptureWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `FK_ApprovalProcessGroup_AutoStartUpdateWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `AutoStartUpdateWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `FK_ApprovalProcessGroup_AutoStartWorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `AutoStartWorkflowActionId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `FK_ApprovalProcessGroup_AutoStartWorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `AutoStartWorkflowRuleId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `FK_ApprovalProcessGroup_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.ApprovalProcessGroupMember`](tables/ContentCentral/dbo.ApprovalProcessGroupMember.md) | `FK_ApprovalProcessGroupMember_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessGroupMember`](tables/ContentCentral/dbo.ApprovalProcessGroupMember.md) | `FK_ApprovalProcessGroupMember_ApprovalProcessGroup` | [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `ApprovalProcessGroupId → Id` | CASCADE |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | CASCADE |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_ArrivalMessageTemplate` | [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `ArrivalMessageTemplateId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_ArrivalWorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `ArrivalWorkflowActionId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_ArrivalWorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `ArrivalWorkflowRuleId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_ArrivalWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `ArrivalWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_DeadlineMessageTemplate` | [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `DeadlineMessageTemplateId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_DeadlineWorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `DeadlineWorkflowActionId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_DeadlineWorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `DeadlineWorkflowRuleId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_DeadlineWorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `DeadlineWorkflowTriggerId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `FK_ApprovalProcessMember_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessMemberFieldPermission`](tables/ContentCentral/dbo.ApprovalProcessMemberFieldPermission.md) | `FK_ApprovalProcessMemberFieldPermission_ApprovalProcessMember` | [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `ApprovalProcessMemberId → Id` | CASCADE |
| [`dbo.ApprovalProcessMemberFieldPermission`](tables/ContentCentral/dbo.ApprovalProcessMemberFieldPermission.md) | `FK_ApprovalProcessMemberFieldPermission_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.ApprovalProcessStatus`](tables/ContentCentral/dbo.ApprovalProcessStatus.md) | `FK_ApprovalProcessStatus_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | CASCADE |
| [`dbo.ApprovalProcessStatus`](tables/ContentCentral/dbo.ApprovalProcessStatus.md) | `FK_ApprovalProcessStatus_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.ApprovalProcessStep`](tables/ContentCentral/dbo.ApprovalProcessStep.md) | `FK_ApprovalProcessStep_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | CASCADE |
| [`dbo.ApprovalProcessStep`](tables/ContentCentral/dbo.ApprovalProcessStep.md) | `FK_ApprovalProcessStep_ApprovalProcessMember` | [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `ApprovalProcessMemberId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessStep`](tables/ContentCentral/dbo.ApprovalProcessStep.md) | `FK_ApprovalProcessStep_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.ApprovalProcessStep`](tables/ContentCentral/dbo.ApprovalProcessStep.md) | `FK_ApprovalProcessStep_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | CASCADE |
| [`dbo.ApprovalProcessStep`](tables/ContentCentral/dbo.ApprovalProcessStep.md) | `FK_ApprovalProcessStep_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessStepCompletion`](tables/ContentCentral/dbo.ApprovalProcessStepCompletion.md) | `FK_ApprovalProcessStepCompletion_ApprovalProcessStep` | [`dbo.ApprovalProcessStep`](tables/ContentCentral/dbo.ApprovalProcessStep.md) | `ApprovalProcessStepId → Id` | CASCADE |
| [`dbo.ApprovalProcessStepCompletion`](tables/ContentCentral/dbo.ApprovalProcessStepCompletion.md) | `FK_ApprovalProcessStepCompletion_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | NO_ACTION |
| [`dbo.ApprovalProcessStepHistory`](tables/ContentCentral/dbo.ApprovalProcessStepHistory.md) | `FK_ApprovalProcessStepHistory_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | CASCADE |
| [`dbo.ApprovalProcessStepHistory`](tables/ContentCentral/dbo.ApprovalProcessStepHistory.md) | `FK_ApprovalProcessStepHistory_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.CaptureFormSession`](tables/ContentCentral/dbo.CaptureFormSession.md) | `FK_CaptureFormSession_DocTypeCaptureForm` | [`dbo.DocTypeCaptureForm`](tables/ContentCentral/dbo.DocTypeCaptureForm.md) | `DocTypeCaptureFormId → Id` | NO_ACTION |
| [`dbo.CaptureFormSession`](tables/ContentCentral/dbo.CaptureFormSession.md) | `FK_CaptureFormSession_QCard` | [`dbo.QCard`](tables/ContentCentral/dbo.QCard.md) | `QCardId → Id` | CASCADE |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailFromDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField1` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailFromAddressDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField10` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailDateTimeDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField11` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailBodyDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField2` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailFromNameDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField3` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailToDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField4` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailToAddressDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField5` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailToNameDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField6` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailCcDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField7` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailCcAddressDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField8` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailCcNameDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `FK_CaptureJob_DocTypeField9` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `EmailSubjectDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.CaptureJobInputItem`](tables/ContentCentral/dbo.CaptureJobInputItem.md) | `FK_CaptureJobInputItem_CaptureJob` | [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `CaptureJobId → Id` | CASCADE |
| [`dbo.CaptureJobInputItemData`](tables/ContentCentral/dbo.CaptureJobInputItemData.md) | `FK_CaptureJobInputItemData_CaptureJobInputItem` | [`dbo.CaptureJobInputItem`](tables/ContentCentral/dbo.CaptureJobInputItem.md) | `CaptureJobInputItemId → Id` | CASCADE |
| [`dbo.CaptureJobSinglePageImageItem`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItem.md) | `FK_CaptureJobSinglePageImageItem_CaptureJob` | [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `CaptureJobId → Id` | NO_ACTION |
| [`dbo.CaptureJobSinglePageImageItem`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItem.md) | `FK_CaptureJobSinglePageImageItem_CaptureJobInputItem` | [`dbo.CaptureJobInputItem`](tables/ContentCentral/dbo.CaptureJobInputItem.md) | `CaptureJobInputItemId → Id` | CASCADE |
| [`dbo.CaptureJobSinglePageImageItem`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItem.md) | `FK_CaptureJobSinglePageImageItem_QCard` | [`dbo.QCard`](tables/ContentCentral/dbo.QCard.md) | `QCardId → Id` | NO_ACTION |
| [`dbo.CaptureJobSinglePageImageItemData`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItemData.md) | `FK_CaptureJobSinglePageImageItemData_CaptureJobSinglePageImageItem` | [`dbo.CaptureJobSinglePageImageItem`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItem.md) | `CaptureJobSinglePageImageItemId → Id` | CASCADE |
| [`dbo.CaptureJobSinglePageImageItemZonal`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItemZonal.md) | `FK_CaptureJobSinglePageImageItemZonal_CaptureJobSinglePageImageItem` | [`dbo.CaptureJobSinglePageImageItem`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItem.md) | `CaptureJobSinglePageImageItemId → Id` | CASCADE |
| [`dbo.CaptureJobSinglePageImageItemZonal`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItemZonal.md) | `FK_CaptureJobSinglePageImageItemZonal_DocTypeFieldRecognitionZone` | [`dbo.DocTypeFieldRecognitionZone`](tables/ContentCentral/dbo.DocTypeFieldRecognitionZone.md) | `DocTypeFieldRecognitionZoneId → Id` | NO_ACTION |
| [`dbo.CatalogAdminMembership`](tables/ContentCentral/dbo.CatalogAdminMembership.md) | `FK_CatalogAdminMembership_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | CASCADE |
| [`dbo.CatalogAdminMembership`](tables/ContentCentral/dbo.CatalogAdminMembership.md) | `FK_CatalogAdminMembership_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.CatalogFolderToCatalog`](tables/ContentCentral/dbo.CatalogFolderToCatalog.md) | `FK_CatalogFolderToCatalog_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | CASCADE |
| [`dbo.CategoryLog`](tables/ContentCentral/dbo.CategoryLog.md) | `FK_CategoryLog_Category` | [`dbo.Category`](tables/ContentCentral/dbo.Category.md) | `CategoryID → CategoryID` | NO_ACTION |
| [`dbo.CategoryLog`](tables/ContentCentral/dbo.CategoryLog.md) | `FK_CategoryLog_Log` | [`dbo.Log`](tables/ContentCentral/dbo.Log.md) | `LogID → LogID` | NO_ACTION |
| [`dbo.CustomMenuItemSource`](tables/ContentCentral/dbo.CustomMenuItemSource.md) | `FK_CustomMenuItemSource_CustomMenuItem` | [`dbo.CustomMenuItem`](tables/ContentCentral/dbo.CustomMenuItem.md) | `CustomMenuItemId → Id` | CASCADE |
| [`dbo.CustomMenuItemSource`](tables/ContentCentral/dbo.CustomMenuItemSource.md) | `FK_CustomMenuItemSource_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `GlobalDocTypeFieldId → Id` | CASCADE |
| [`dbo.CustomMenuItemSource`](tables/ContentCentral/dbo.CustomMenuItemSource.md) | `FK_CustomMenuItemSource_ExternalApplication` | [`dbo.ExternalApplication`](tables/ContentCentral/dbo.ExternalApplication.md) | `ExternalApplicationId → Id` | CASCADE |
| [`dbo.DirectScan`](tables/ContentCentral/dbo.DirectScan.md) | `FK_DirectScan_QCard` | [`dbo.QCard`](tables/ContentCentral/dbo.QCard.md) | `QCardId → Id` | CASCADE |
| [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `FK_DocType_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | CASCADE |
| [`dbo.DocTypeCaptureForm`](tables/ContentCentral/dbo.DocTypeCaptureForm.md) | `FK_DocTypeCaptureForm_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.DocTypeCaptureFormData`](tables/ContentCentral/dbo.DocTypeCaptureFormData.md) | `FK_DocTypeCaptureFormData_DocTypeCaptureForm` | [`dbo.DocTypeCaptureForm`](tables/ContentCentral/dbo.DocTypeCaptureForm.md) | `DocTypeCaptureFormId → Id` | CASCADE |
| [`dbo.DocTypeDefaultAdminSearchField`](tables/ContentCentral/dbo.DocTypeDefaultAdminSearchField.md) | `FK_DocTypeDefaultAdminSearchField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeDefaultAdminSearchResultField`](tables/ContentCentral/dbo.DocTypeDefaultAdminSearchResultField.md) | `FK_DocTypeDefaultAdminSearchResultField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeDefaultUserSearchField`](tables/ContentCentral/dbo.DocTypeDefaultUserSearchField.md) | `FK_DocTypeDefaultUserSearchField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeDefaultUserSearchField`](tables/ContentCentral/dbo.DocTypeDefaultUserSearchField.md) | `FK_DocTypeDefaultUserSearchField_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.DocTypeDefaultUserSearchResultField`](tables/ContentCentral/dbo.DocTypeDefaultUserSearchResultField.md) | `FK_DocTypeDefaultUserSearchResultField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeDefaultUserSearchResultField`](tables/ContentCentral/dbo.DocTypeDefaultUserSearchResultField.md) | `FK_DocTypeDefaultUserSearchResultField_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `FK_DocTypeField_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `FK_DocTypeField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `RequiredEntryDependsOnDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `FK_DocTypeField_DocTypeField1` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `GlobalDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `FK_DocTypeField_DocTypeField2` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DuplicateValueDependsOnDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.DocTypeFieldCurrentNumericValue`](tables/ContentCentral/dbo.DocTypeFieldCurrentNumericValue.md) | `FK_DocTypeFieldCurrentNumericValue_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeFieldExternalLookup`](tables/ContentCentral/dbo.DocTypeFieldExternalLookup.md) | `FK_DocTypeFieldExternalLookup_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.DocTypeFieldExternalLookup`](tables/ContentCentral/dbo.DocTypeFieldExternalLookup.md) | `FK_DocTypeFieldExternalLookup_ExternalDataSource` | [`dbo.ExternalDataSource`](tables/ContentCentral/dbo.ExternalDataSource.md) | `ExternalDataSourceId → Id` | CASCADE |
| [`dbo.DocTypeFieldExternalLookupItem`](tables/ContentCentral/dbo.DocTypeFieldExternalLookupItem.md) | `FK_DocTypeFieldExternalLookupItem_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | NO_ACTION |
| [`dbo.DocTypeFieldExternalLookupItem`](tables/ContentCentral/dbo.DocTypeFieldExternalLookupItem.md) | `FK_DocTypeFieldExternalLookupItem_DocTypeFieldExternalLookup` | [`dbo.DocTypeFieldExternalLookup`](tables/ContentCentral/dbo.DocTypeFieldExternalLookup.md) | `DocTypeFieldExternalLookupId → Id` | CASCADE |
| [`dbo.DocTypeFieldExternalLookupSelectItem`](tables/ContentCentral/dbo.DocTypeFieldExternalLookupSelectItem.md) | `FK_DocTypeFieldExternalLookupSelectItem_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DestinationDocTypeFieldId → Id` | NO_ACTION |
| [`dbo.DocTypeFieldExternalLookupSelectItem`](tables/ContentCentral/dbo.DocTypeFieldExternalLookupSelectItem.md) | `FK_DocTypeFieldExternalLookupSelectItem_DocTypeFieldExternalLookup` | [`dbo.DocTypeFieldExternalLookup`](tables/ContentCentral/dbo.DocTypeFieldExternalLookup.md) | `DocTypeFieldExternalLookupId → Id` | CASCADE |
| [`dbo.DocTypeFieldFieldChoices`](tables/ContentCentral/dbo.DocTypeFieldFieldChoices.md) | `FK_DocTypeFieldFieldChoices_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeFieldRecognitionZone`](tables/ContentCentral/dbo.DocTypeFieldRecognitionZone.md) | `FK_DocTypeFieldRecognitionZone_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeFieldRecognitionZoneCondition`](tables/ContentCentral/dbo.DocTypeFieldRecognitionZoneCondition.md) | `FK_DocTypeFieldRecognitionZoneCondition_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeFieldRecognitionZoneCondition`](tables/ContentCentral/dbo.DocTypeFieldRecognitionZoneCondition.md) | `FK_DocTypeFieldRecognitionZoneCondition_DocTypeFieldRecognitionZone` | [`dbo.DocTypeFieldRecognitionZone`](tables/ContentCentral/dbo.DocTypeFieldRecognitionZone.md) | `DocTypeFieldRecognitionZoneId → Id` | NO_ACTION |
| [`dbo.DocTypeFieldSpentNumericValue`](tables/ContentCentral/dbo.DocTypeFieldSpentNumericValue.md) | `FK_DocTypeFieldSpentNumericValue_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocTypeFileBuildItem`](tables/ContentCentral/dbo.DocTypeFileBuildItem.md) | `FK_DocTypeFileBuildItem_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.DocTypeFileBuildItem`](tables/ContentCentral/dbo.DocTypeFileBuildItem.md) | `FK_DocTypeFileBuildItem_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | NO_ACTION |
| [`dbo.DocTypeFolderBuildItem`](tables/ContentCentral/dbo.DocTypeFolderBuildItem.md) | `FK_DocTypeFolderBuildItem_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.DocTypeFolderBuildItem`](tables/ContentCentral/dbo.DocTypeFolderBuildItem.md) | `FK_DocTypeFolderBuildItem_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | NO_ACTION |
| [`dbo.DocTypePermission`](tables/ContentCentral/dbo.DocTypePermission.md) | `FK_DocTypePermission_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.DocTypePermission`](tables/ContentCentral/dbo.DocTypePermission.md) | `FK_DocTypePermission_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | CASCADE |
| [`dbo.DocTypePermission`](tables/ContentCentral/dbo.DocTypePermission.md) | `FK_DocTypePermission_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.DocTypeRetentionPolicy`](tables/ContentCentral/dbo.DocTypeRetentionPolicy.md) | `FK_DocTypeRetentionPolicy_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.DocTypeShortLinkSharePermission`](tables/ContentCentral/dbo.DocTypeShortLinkSharePermission.md) | `FK_DocTypeShortLinkSharePermission_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `FK_Document_CreatedByUser` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `CreatedByUserId → Id` | NO_ACTION |
| [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `FK_Document_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.DocumentApprovalProcess`](tables/ContentCentral/dbo.DocumentApprovalProcess.md) | `FK_DocumentApprovalProcess_ApprovalProcessGroup` | [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `ApprovalProcessGroupId → Id` | CASCADE |
| [`dbo.DocumentApprovalProcess`](tables/ContentCentral/dbo.DocumentApprovalProcess.md) | `FK_DocumentApprovalProcess_ApprovalProcessGroupMember` | [`dbo.ApprovalProcessGroupMember`](tables/ContentCentral/dbo.ApprovalProcessGroupMember.md) | `ApprovalProcessGroupMemberId → Id` | NO_ACTION |
| [`dbo.DocumentApprovalProcess`](tables/ContentCentral/dbo.DocumentApprovalProcess.md) | `FK_DocumentApprovalProcess_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.DocumentApprovalProcess`](tables/ContentCentral/dbo.DocumentApprovalProcess.md) | `FK_DocumentApprovalProcess_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `ApprovalProcessGroupMemberUserId → Id` | NO_ACTION |
| [`dbo.DocumentCheckedOut`](tables/ContentCentral/dbo.DocumentCheckedOut.md) | `FK_DocumentCheckedOut_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.DocumentCheckedOut`](tables/ContentCentral/dbo.DocumentCheckedOut.md) | `FK_DocumentCheckedOut_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.DocumentField`](tables/ContentCentral/dbo.DocumentField.md) | `FK_DocumentField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.DocumentField`](tables/ContentCentral/dbo.DocumentField.md) | `FK_DocumentField_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.DocumentFolder`](tables/ContentCentral/dbo.DocumentFolder.md) | `FK_DocumentFolder_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.DocumentRetentionPolicy`](tables/ContentCentral/dbo.DocumentRetentionPolicy.md) | `FK_DocumentRetentionPolicy_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.DocumentShortLink`](tables/ContentCentral/dbo.DocumentShortLink.md) | `FK_DocumentShortLink_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.DocumentVersion`](tables/ContentCentral/dbo.DocumentVersion.md) | `FK_DocumentVersion_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.DocumentVersionAnnotations`](tables/ContentCentral/dbo.DocumentVersionAnnotations.md) | `FK_DocumentVersionAnnotations_DocumentVersion` | [`dbo.DocumentVersion`](tables/ContentCentral/dbo.DocumentVersion.md) | `DocumentVersionId → Id` | CASCADE |
| [`dbo.DocumentVersionFile`](tables/ContentCentral/dbo.DocumentVersionFile.md) | `FK_DocumentVersionFile_DocumentFolder` | [`dbo.DocumentFolder`](tables/ContentCentral/dbo.DocumentFolder.md) | `DocumentFolderId → Id` | CASCADE |
| [`dbo.DocumentVersionFile`](tables/ContentCentral/dbo.DocumentVersionFile.md) | `FK_DocumentVersionFile_DocumentVersion` | [`dbo.DocumentVersion`](tables/ContentCentral/dbo.DocumentVersion.md) | `DocumentVersionId → Id` | CASCADE |
| [`dbo.DocumentVersionForm`](tables/ContentCentral/dbo.DocumentVersionForm.md) | `FK_DocumentVersionForm_DocumentVersion` | [`dbo.DocumentVersion`](tables/ContentCentral/dbo.DocumentVersion.md) | `DocumentVersionId → Id` | CASCADE |
| [`dbo.DocumentVersionFullText`](tables/ContentCentral/dbo.DocumentVersionFullText.md) | `FK_DocumentVersionFullText_DocumentVersionFile` | [`dbo.DocumentVersionFile`](tables/ContentCentral/dbo.DocumentVersionFile.md) | `DocumentVersionId → DocumentVersionId` | CASCADE |
| [`dbo.DocumentVersionThumbnail`](tables/ContentCentral/dbo.DocumentVersionThumbnail.md) | `FK_DocumentVersionThumbnail_DocumentVersionFile` | [`dbo.DocumentVersionFile`](tables/ContentCentral/dbo.DocumentVersionFile.md) | `DocumentVersionId → DocumentVersionId` | CASCADE |
| [`dbo.ExportDataElement`](tables/ContentCentral/dbo.ExportDataElement.md) | `FK_ExportDataElement_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | NO_ACTION |
| [`dbo.ExportDataElement`](tables/ContentCentral/dbo.ExportDataElement.md) | `FK_ExportDataElement_ExportDataTemplate` | [`dbo.ExportDataTemplate`](tables/ContentCentral/dbo.ExportDataTemplate.md) | `ExportDataTemplateId → Id` | NO_ACTION |
| [`dbo.ExportDataTemplate`](tables/ContentCentral/dbo.ExportDataTemplate.md) | `FK_ExportDataTemplate_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | NO_ACTION |
| [`dbo.ExportDataTemplate`](tables/ContentCentral/dbo.ExportDataTemplate.md) | `FK_ExportDataTemplate_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.ExportDataTemplate`](tables/ContentCentral/dbo.ExportDataTemplate.md) | `FK_ExportDataTemplate_ExportDataPath` | [`dbo.ExportDataPath`](tables/ContentCentral/dbo.ExportDataPath.md) | `ExportDataPathId → Id` | NO_ACTION |
| [`dbo.ExternalApplication`](tables/ContentCentral/dbo.ExternalApplication.md) | `FK_ExternalApplication_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | NO_ACTION |
| [`dbo.ExternalApplication`](tables/ContentCentral/dbo.ExternalApplication.md) | `FK_ExternalApplication_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.GridResultsField`](tables/ContentCentral/dbo.GridResultsField.md) | `FK_GridResultsField_DocumentFolder` | [`dbo.DocumentFolder`](tables/ContentCentral/dbo.DocumentFolder.md) | `DocumentFolderId → Id` | CASCADE |
| [`dbo.GridResultsField`](tables/ContentCentral/dbo.GridResultsField.md) | `FK_GridResultsField_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.GroupMembership`](tables/ContentCentral/dbo.GroupMembership.md) | `FK_GroupMembership_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | CASCADE |
| [`dbo.GroupMembership`](tables/ContentCentral/dbo.GroupMembership.md) | `FK_GroupMembership_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.LoginSession`](tables/ContentCentral/dbo.LoginSession.md) | `FK_LoginSession_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.MakeSearchable`](tables/ContentCentral/dbo.MakeSearchable.md) | `FK_MakeSearchable_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.MakeSearchable`](tables/ContentCentral/dbo.MakeSearchable.md) | `FK_MakeSearchable_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `ExistingDocumentId → Id` | CASCADE |
| [`dbo.MakeSearchable`](tables/ContentCentral/dbo.MakeSearchable.md) | `FK_MakeSearchable_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `FK_MessageTemplate_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.MessageTemplateGroup`](tables/ContentCentral/dbo.MessageTemplateGroup.md) | `FK_MessageTemplateGroup_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | CASCADE |
| [`dbo.MessageTemplateGroup`](tables/ContentCentral/dbo.MessageTemplateGroup.md) | `FK_MessageTemplateGroup_MessageTemplate` | [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `MessageTemplateId → Id` | CASCADE |
| [`dbo.MessageTemplateUser`](tables/ContentCentral/dbo.MessageTemplateUser.md) | `FK_MessageTemplateUser_MessageTemplate` | [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `MessageTemplateId → Id` | CASCADE |
| [`dbo.MessageTemplateUser`](tables/ContentCentral/dbo.MessageTemplateUser.md) | `FK_MessageTemplateUser_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.PacketCompletion`](tables/ContentCentral/dbo.PacketCompletion.md) | `FK_PacketCompletion_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | CASCADE |
| [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `FK_PacketTemplate_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `PrimaryDocTypeId → Id` | NO_ACTION |
| [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `FK_PacketTemplate_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `KeyDocTypeFieldId → Id` | CASCADE |
| [`dbo.PacketTemplateDocType`](tables/ContentCentral/dbo.PacketTemplateDocType.md) | `FK_PacketTemplateDocType_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.PacketTemplateDocType`](tables/ContentCentral/dbo.PacketTemplateDocType.md) | `FK_PacketTemplateDocType_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | CASCADE |
| [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `FK_PostScanDocument_CreatedByUser` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `CreatedByUserId → Id` | NO_ACTION |
| [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `FK_PostScanDocument_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `FK_PostScanDocument_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | NO_ACTION |
| [`dbo.PostScanDocumentApprovalProcess`](tables/ContentCentral/dbo.PostScanDocumentApprovalProcess.md) | `FK_PostScanDocumentApprovalProcess_ApprovalProcessGroup` | [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `ApprovalProcessGroupId → Id` | NO_ACTION |
| [`dbo.PostScanDocumentApprovalProcess`](tables/ContentCentral/dbo.PostScanDocumentApprovalProcess.md) | `FK_PostScanDocumentApprovalProcess_ApprovalProcessGroupMember` | [`dbo.ApprovalProcessGroupMember`](tables/ContentCentral/dbo.ApprovalProcessGroupMember.md) | `ApprovalProcessGroupMemberId → Id` | NO_ACTION |
| [`dbo.PostScanDocumentApprovalProcess`](tables/ContentCentral/dbo.PostScanDocumentApprovalProcess.md) | `FK_PostScanDocumentApprovalProcess_PostScanDocument` | [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `PostScanDocumentId → Id` | CASCADE |
| [`dbo.PostScanDocumentApprovalProcess`](tables/ContentCentral/dbo.PostScanDocumentApprovalProcess.md) | `FK_PostScanDocumentApprovalProcess_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `ApprovalProcessGroupMemberUserId → Id` | NO_ACTION |
| [`dbo.PostScanDocumentField`](tables/ContentCentral/dbo.PostScanDocumentField.md) | `FK_PostScanDocumentField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | NO_ACTION |
| [`dbo.PostScanDocumentField`](tables/ContentCentral/dbo.PostScanDocumentField.md) | `FK_PostScanDocumentField_PostScanDocument` | [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `PostScanDocumentId → Id` | CASCADE |
| [`dbo.PostScanDocumentThumbnail`](tables/ContentCentral/dbo.PostScanDocumentThumbnail.md) | `FK_PostScanDocumentThumbnail_PostScanDocument` | [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `PostScanDocumentId → Id` | CASCADE |
| [`dbo.QCard`](tables/ContentCentral/dbo.QCard.md) | `FK_QCard_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.QCard`](tables/ContentCentral/dbo.QCard.md) | `FK_QCard_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.QCard`](tables/ContentCentral/dbo.QCard.md) | `FK_QCard_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.RememberLogin`](tables/ContentCentral/dbo.RememberLogin.md) | `FK_RememberLogin_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.ReportColumn`](tables/ContentCentral/dbo.ReportColumn.md) | `FK_ReportColumn_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.ReportColumn`](tables/ContentCentral/dbo.ReportColumn.md) | `FK_ReportColumn_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterApprovalProcess`](tables/ContentCentral/dbo.ReportFilterApprovalProcess.md) | `FK_ReportFilterApprovalProcess_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | CASCADE |
| [`dbo.ReportFilterApprovalProcess`](tables/ContentCentral/dbo.ReportFilterApprovalProcess.md) | `FK_ReportFilterApprovalProcess_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterApprovalProcessTimeframe`](tables/ContentCentral/dbo.ReportFilterApprovalProcessTimeframe.md) | `FK_ReportFilterApprovalProcessTimeframe_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterApprovalProcessTimeframeMatch`](tables/ContentCentral/dbo.ReportFilterApprovalProcessTimeframeMatch.md) | `FK_ReportFilterApprovalProcessTimeframeMatch_ReportFilterApprovalProcessTimeframe` | [`dbo.ReportFilterApprovalProcessTimeframe`](tables/ContentCentral/dbo.ReportFilterApprovalProcessTimeframe.md) | `ReportFilterApprovalProcessTimeframeId → Id` | CASCADE |
| [`dbo.ReportFilterCatalog`](tables/ContentCentral/dbo.ReportFilterCatalog.md) | `FK_ReportFilterCatalog_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | CASCADE |
| [`dbo.ReportFilterCatalog`](tables/ContentCentral/dbo.ReportFilterCatalog.md) | `FK_ReportFilterCatalog_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterDocType`](tables/ContentCentral/dbo.ReportFilterDocType.md) | `FK_ReportFilterDocType_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.ReportFilterDocType`](tables/ContentCentral/dbo.ReportFilterDocType.md) | `FK_ReportFilterDocType_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterDocTypeField`](tables/ContentCentral/dbo.ReportFilterDocTypeField.md) | `FK_ReportFilterDocTypeField_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.ReportFilterDocTypeField`](tables/ContentCentral/dbo.ReportFilterDocTypeField.md) | `FK_ReportFilterDocTypeField_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterDocTypeFieldMatch`](tables/ContentCentral/dbo.ReportFilterDocTypeFieldMatch.md) | `FK_ReportFilterDocTypeFieldMatch_ReportFilterDocTypeField` | [`dbo.ReportFilterDocTypeField`](tables/ContentCentral/dbo.ReportFilterDocTypeField.md) | `ReportFilterDocTypeFieldId → Id` | CASCADE |
| [`dbo.ReportFilterSystemField`](tables/ContentCentral/dbo.ReportFilterSystemField.md) | `FK_ReportFilterSystemField_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterSystemFieldMatch`](tables/ContentCentral/dbo.ReportFilterSystemFieldMatch.md) | `FK_ReportFilterSystemFieldMatch_ReportFilterSystemField` | [`dbo.ReportFilterSystemField`](tables/ContentCentral/dbo.ReportFilterSystemField.md) | `ReportFilterSystemFieldId → Id` | CASCADE |
| [`dbo.ReportFilterWorkQueueArrival`](tables/ContentCentral/dbo.ReportFilterWorkQueueArrival.md) | `FK_ReportFilterWorkQueueArrival_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.ReportFilterWorkQueueArrivalMatch`](tables/ContentCentral/dbo.ReportFilterWorkQueueArrivalMatch.md) | `FK_ReportFilterWorkQueueArrivalMatch_ReportFilterWorkQueueArrival` | [`dbo.ReportFilterWorkQueueArrival`](tables/ContentCentral/dbo.ReportFilterWorkQueueArrival.md) | `ReportFilterWorkQueueArrivalId → Id` | CASCADE |
| [`dbo.ReportSegment`](tables/ContentCentral/dbo.ReportSegment.md) | `FK_ReportSegment_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | CASCADE |
| [`dbo.ReportSegment`](tables/ContentCentral/dbo.ReportSegment.md) | `FK_ReportSegment_Report` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | CASCADE |
| [`dbo.RetroFolderFileBuildItem`](tables/ContentCentral/dbo.RetroFolderFileBuildItem.md) | `FK_RetroFolderFileBuildItem_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.SavedSearch`](tables/ContentCentral/dbo.SavedSearch.md) | `FK_SavedSearch_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `Owner → Id` | NO_ACTION |
| [`dbo.ServiceCommand`](tables/ContentCentral/dbo.ServiceCommand.md) | `FK_ServiceCommand_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | CASCADE |
| [`dbo.ServiceCommand`](tables/ContentCentral/dbo.ServiceCommand.md) | `FK_ServiceCommand_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.ServiceCommand`](tables/ContentCentral/dbo.ServiceCommand.md) | `FK_ServiceCommand_PostScanDocument` | [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `PostScanDocumentId → Id` | NO_ACTION |
| [`dbo.SystemField`](tables/ContentCentral/dbo.SystemField.md) | `FK_SystemField_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | CASCADE |
| [`dbo.SystemField`](tables/ContentCentral/dbo.SystemField.md) | `FK_SystemField_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | CASCADE |
| [`dbo.UIThemeMember`](tables/ContentCentral/dbo.UIThemeMember.md) | `FK_UIThemeMember_UITheme` | [`dbo.UITheme`](tables/ContentCentral/dbo.UITheme.md) | `UIThemeId → Id` | CASCADE |
| [`dbo.UIThemeMember`](tables/ContentCentral/dbo.UIThemeMember.md) | `FK_UIThemeMember_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.UIThemeStorage`](tables/ContentCentral/dbo.UIThemeStorage.md) | `FK_UIThemeStorage_UITheme` | [`dbo.UITheme`](tables/ContentCentral/dbo.UITheme.md) | `Id → Id` | CASCADE |
| [`dbo.User`](tables/ContentCentral/dbo.User.md) | `FK_User_ActiveDirectoryDomain` | [`dbo.ActiveDirectoryDomain`](tables/ContentCentral/dbo.ActiveDirectoryDomain.md) | `ActiveDirectoryDomainId → Id` | CASCADE |
| [`dbo.UserAddressBookItem`](tables/ContentCentral/dbo.UserAddressBookItem.md) | `FK_UserAddressBookItem_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.UserDefaultDocType`](tables/ContentCentral/dbo.UserDefaultDocType.md) | `FK_UserDefaultDocType_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | CASCADE |
| [`dbo.UserDefaultDocType`](tables/ContentCentral/dbo.UserDefaultDocType.md) | `FK_UserDefaultDocType_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.UserMessage`](tables/ContentCentral/dbo.UserMessage.md) | `FK_UserMessage_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.UserOptions`](tables/ContentCentral/dbo.UserOptions.md) | `FK_UserOptions_DefaultCaptureCatalogId` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `DefaultCaptureCatalogId → Id` | NO_ACTION |
| [`dbo.UserOptions`](tables/ContentCentral/dbo.UserOptions.md) | `FK_UserOptions_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_ApprovalProcessGroup` | [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `ApprovalProcessGroupId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_ApprovalProcessMember` | [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `ApprovalProcessMemberId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_CreatingDocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `CreatingDocTypeId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_DocTypeField2` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId2 → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_DocTypeField3` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId3 → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_DocTypeFieldExternalLookup` | [`dbo.DocTypeFieldExternalLookup`](tables/ContentCentral/dbo.DocTypeFieldExternalLookup.md) | `DocTypeFieldExternalLookupId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_DocumentFolder` | [`dbo.DocumentFolder`](tables/ContentCentral/dbo.DocumentFolder.md) | `DocumentFolderId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_ExportDataTemplate` | [`dbo.ExportDataTemplate`](tables/ContentCentral/dbo.ExportDataTemplate.md) | `ExportDataTemplateId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_ExternalApplication` | [`dbo.ExternalApplication`](tables/ContentCentral/dbo.ExternalApplication.md) | `ExternalApplicationId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_MessageTemplate` | [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `MessageTemplateId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_NewDocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `NewDocTypeId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_ReportTemplate` | [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ReportTemplateId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | NO_ACTION |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `FK_WorkflowAction_WorkflowRule` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `WorkflowRuleId → Id` | NO_ACTION |
| [`dbo.WorkflowActionGroup`](tables/ContentCentral/dbo.WorkflowActionGroup.md) | `FK_WorkflowActionGroup_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | CASCADE |
| [`dbo.WorkflowActionGroup`](tables/ContentCentral/dbo.WorkflowActionGroup.md) | `FK_WorkflowActionGroup_WorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `WorkflowActionId → Id` | CASCADE |
| [`dbo.WorkflowActionUser`](tables/ContentCentral/dbo.WorkflowActionUser.md) | `FK_WorkflowActionUser_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.WorkflowActionUser`](tables/ContentCentral/dbo.WorkflowActionUser.md) | `FK_WorkflowActionUser_WorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `WorkflowActionId → Id` | CASCADE |
| [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `FK_WorkflowRule_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `FK_WorkflowRule_WorkflowRuleTrigger` | [`dbo.WorkflowRuleTrigger`](tables/ContentCentral/dbo.WorkflowRuleTrigger.md) | `PrimaryWorkflowRuleTriggerId → Id` | NO_ACTION |
| [`dbo.WorkflowRuleAction`](tables/ContentCentral/dbo.WorkflowRuleAction.md) | `FK_WorkflowRuleAction_WorkflowAction` | [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `WorkflowActionId → Id` | CASCADE |
| [`dbo.WorkflowRuleAction`](tables/ContentCentral/dbo.WorkflowRuleAction.md) | `FK_WorkflowRuleAction_WorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `WorkflowRuleId → Id` | CASCADE |
| [`dbo.WorkflowRuleCompletion`](tables/ContentCentral/dbo.WorkflowRuleCompletion.md) | `FK_WorkflowRuleCompletion_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.WorkflowRuleCompletion`](tables/ContentCentral/dbo.WorkflowRuleCompletion.md) | `FK_WorkflowRuleCompletion_PostScanDocument` | [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `PostScanDocumentId → Id` | CASCADE |
| [`dbo.WorkflowRuleCompletion`](tables/ContentCentral/dbo.WorkflowRuleCompletion.md) | `FK_WorkflowRuleCompletion_WorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `WorkflowRuleId → Id` | CASCADE |
| [`dbo.WorkflowRulePacketCompletion`](tables/ContentCentral/dbo.WorkflowRulePacketCompletion.md) | `FK_WorkflowRulePacketCompletion_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | CASCADE |
| [`dbo.WorkflowRulePacketCompletion`](tables/ContentCentral/dbo.WorkflowRulePacketCompletion.md) | `FK_WorkflowRulePacketCompletion_WorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `WorkflowRuleId → Id` | CASCADE |
| [`dbo.WorkflowRuleTrigger`](tables/ContentCentral/dbo.WorkflowRuleTrigger.md) | `FK_WorkflowRuleTrigger_WorkflowRule` | [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `WorkflowRuleId → Id` | CASCADE |
| [`dbo.WorkflowRuleTrigger`](tables/ContentCentral/dbo.WorkflowRuleTrigger.md) | `FK_WorkflowRuleTrigger_WorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `WorkflowTriggerId → Id` | CASCADE |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `FK_WorkflowTrigger_ApprovalProcess` | [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ApprovalProcessId → Id` | NO_ACTION |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `FK_WorkflowTrigger_ApprovalProcessGroup` | [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `ApprovalProcessGroupId → Id` | NO_ACTION |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `FK_WorkflowTrigger_ApprovalProcessMember` | [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `ApprovalProcessMemberId → Id` | NO_ACTION |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `FK_WorkflowTrigger_Catalog` | [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `CatalogId → Id` | NO_ACTION |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `FK_WorkflowTrigger_DocType` | [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `DocTypeId → Id` | NO_ACTION |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `FK_WorkflowTrigger_DocTypeField` | [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `DocTypeFieldId → Id` | NO_ACTION |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `FK_WorkflowTrigger_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | NO_ACTION |
| [`dbo.WorkflowTriggerGroup`](tables/ContentCentral/dbo.WorkflowTriggerGroup.md) | `FK_WorkflowTriggerGroup_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | CASCADE |
| [`dbo.WorkflowTriggerGroup`](tables/ContentCentral/dbo.WorkflowTriggerGroup.md) | `FK_WorkflowTriggerGroup_WorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `WorkflowTriggerId → Id` | CASCADE |
| [`dbo.WorkflowTriggerUser`](tables/ContentCentral/dbo.WorkflowTriggerUser.md) | `FK_WorkflowTriggerUser_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.WorkflowTriggerUser`](tables/ContentCentral/dbo.WorkflowTriggerUser.md) | `FK_WorkflowTriggerUser_WorkflowTrigger` | [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `WorkflowTriggerId → Id` | CASCADE |
| [`dbo.WorkQueueDocument`](tables/ContentCentral/dbo.WorkQueueDocument.md) | `FK_WorkQueueDocument_Document` | [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `DocumentId → Id` | CASCADE |
| [`dbo.WorkQueueDocument`](tables/ContentCentral/dbo.WorkQueueDocument.md) | `FK_WorkQueueDocument_Group` | [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `GroupId → Id` | CASCADE |
| [`dbo.WorkQueueDocument`](tables/ContentCentral/dbo.WorkQueueDocument.md) | `FK_WorkQueueDocument_PacketTemplate` | [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `PacketTemplateId → Id` | CASCADE |
| [`dbo.WorkQueueDocument`](tables/ContentCentral/dbo.WorkQueueDocument.md) | `FK_WorkQueueDocument_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | CASCADE |
| [`dbo.WorkQueueDocumentCompletion`](tables/ContentCentral/dbo.WorkQueueDocumentCompletion.md) | `FK_WorkQueueDocumentCompletion_User` | [`dbo.User`](tables/ContentCentral/dbo.User.md) | `UserId → Id` | NO_ACTION |
| [`dbo.WorkQueueDocumentCompletion`](tables/ContentCentral/dbo.WorkQueueDocumentCompletion.md) | `FK_WorkQueueDocumentCompletion_WorkQueueDocument` | [`dbo.WorkQueueDocument`](tables/ContentCentral/dbo.WorkQueueDocument.md) | `WorkQueueDocumentId → Id` | CASCADE |

### `DeletedPOs`

_No FK constraints._

### `Documents`

17 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.DocumentTypeFields`](tables/Documents/dbo.DocumentTypeFields.md) | `FK_DocumentTypeFields_DocumentTypes` | [`dbo.DocumentTypes`](tables/Documents/dbo.DocumentTypes.md) | `DocumentTypeId → Id` | NO_ACTION |
| [`dbo.DocumentTypeFields`](tables/Documents/dbo.DocumentTypeFields.md) | `FK_DocumentTypeFields_Fields` | [`dbo.Fields`](tables/Documents/dbo.Fields.md) | `FieldId → Id` | NO_ACTION |
| [`dbo.DocumentTypeLookupKeys`](tables/Documents/dbo.DocumentTypeLookupKeys.md) | `FK_DocumentTypeLookupKeys_DocumentTypeLookups` | [`dbo.DocumentTypeLookups`](tables/Documents/dbo.DocumentTypeLookups.md) | `DocumentTypeLookupId → Id` | NO_ACTION |
| [`dbo.DocumentTypeLookupResults`](tables/Documents/dbo.DocumentTypeLookupResults.md) | `FK_DocumentTypeLookupResults_DocumentTypeLookups` | [`dbo.DocumentTypeLookups`](tables/Documents/dbo.DocumentTypeLookups.md) | `DocumentTypeLookupId → Id` | NO_ACTION |
| [`dbo.DocumentTypeLookupResults`](tables/Documents/dbo.DocumentTypeLookupResults.md) | `FK_DocumentTypeLookupResults_Fields` | [`dbo.Fields`](tables/Documents/dbo.Fields.md) | `TargetFieldId → Id` | NO_ACTION |
| [`dbo.DocumentTypeLookups`](tables/Documents/dbo.DocumentTypeLookups.md) | `FK_DocumentTypeLookups_DocumentTypes` | [`dbo.DocumentTypes`](tables/Documents/dbo.DocumentTypes.md) | `DocumentTypeId → Id` | NO_ACTION |
| [`dbo.FieldData`](tables/Documents/dbo.FieldData.md) | `FK_FieldData_Documents` | [`dbo.Documents`](tables/Documents/dbo.Documents.md) | `DocumentId → Id` | NO_ACTION |
| [`dbo.FieldData`](tables/Documents/dbo.FieldData.md) | `FK_FieldData_Fields` | [`dbo.Fields`](tables/Documents/dbo.Fields.md) | `FieldId → Id` | NO_ACTION |
| [`dbo.GroupMembers`](tables/Documents/dbo.GroupMembers.md) | `FK_GroupMembers_Groups` | [`dbo.Groups`](tables/Documents/dbo.Groups.md) | `GroupId → Id` | NO_ACTION |
| [`dbo.GroupMembers`](tables/Documents/dbo.GroupMembers.md) | `FK_GroupMembers_Users` | [`dbo.Users`](tables/Documents/dbo.Users.md) | `UserId → Id` | NO_ACTION |
| [`dbo.SecurityToken`](tables/Documents/dbo.SecurityToken.md) | `FK_SecurityToken_AccessTypes` | [`dbo.AccessTypes`](tables/Documents/dbo.AccessTypes.md) | `AccessTypeId → Id` | NO_ACTION |
| [`dbo.ViewFields`](tables/Documents/dbo.ViewFields.md) | `FK_ViewFields_Fields` | [`dbo.Fields`](tables/Documents/dbo.Fields.md) | `FieldId → Id` | NO_ACTION |
| [`dbo.ViewFields`](tables/Documents/dbo.ViewFields.md) | `FK_ViewFields_Views` | [`dbo.Views`](tables/Documents/dbo.Views.md) | `ViewId → Id` | NO_ACTION |
| [`dbo.ViewSelectors`](tables/Documents/dbo.ViewSelectors.md) | `FK_ViewSelectors_Views` | [`dbo.Views`](tables/Documents/dbo.Views.md) | `ViewId → Id` | NO_ACTION |
| [`dbo.WorkflowSteps`](tables/Documents/dbo.WorkflowSteps.md) | `FK_WorkflowSteps_WorkflowActions` | [`dbo.WorkflowActions`](tables/Documents/dbo.WorkflowActions.md) | `WorkflowActionId → Id` | NO_ACTION |
| [`dbo.WorkflowSteps`](tables/Documents/dbo.WorkflowSteps.md) | `FK_WorkflowSteps_Workflows` | [`dbo.Workflows`](tables/Documents/dbo.Workflows.md) | `WorkflowId → Id` | NO_ACTION |
| [`dbo.WorkflowSteps`](tables/Documents/dbo.WorkflowSteps.md) | `FK_WorkflowSteps_WorkflowTriggers` | [`dbo.WorkflowTriggers`](tables/Documents/dbo.WorkflowTriggers.md) | `WorkflowTriggerId → Id` | NO_ACTION |

### `dpa_EDSAdmin`

_No FK constraints._

### `EDS`

31 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.Accounts`](tables/EDS/dbo.Accounts.md) | `FK_Accounts_District` | [`dbo.District`](tables/EDS/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.Accounts`](tables/EDS/dbo.Accounts.md) | `FK_Accounts_School` | [`dbo.School`](tables/EDS/dbo.School.md) | `SchoolId → SchoolId` | NO_ACTION |
| [`dbo.BidAnswersJournal`](tables/EDS/dbo.BidAnswersJournal.md) | `FK_BidAnswersJournal_BidAnswers` | [`dbo.BidAnswers`](tables/EDS/dbo.BidAnswers.md) | `BidAnswerId → BidAnswerId` | CASCADE |
| [`dbo.BidQuestions`](tables/EDS/dbo.BidQuestions.md) | `FK_BidQuestions_BidTrades` | [`dbo.BidTrades`](tables/EDS/dbo.BidTrades.md) | `BidTradeId → BidTradeId` | CASCADE |
| [`dbo.BidRequestManufacturer`](tables/EDS/dbo.BidRequestManufacturer.md) | `FK_BidRequestManufacturer_BidHeaders` | [`dbo.BidHeaders`](tables/EDS/dbo.BidHeaders.md) | `BidHeaderId → BidHeaderId` | CASCADE |
| [`dbo.BudgetAccounts`](tables/EDS/dbo.BudgetAccounts.md) | `FK_BudgetAccounts_Accounts` | [`dbo.Accounts`](tables/EDS/dbo.Accounts.md) | `AccountId → AccountId` | NO_ACTION |
| [`dbo.BudgetAccounts`](tables/EDS/dbo.BudgetAccounts.md) | `FK_BudgetAccounts_Budgets` | [`dbo.Budgets`](tables/EDS/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.Budgets`](tables/EDS/dbo.Budgets.md) | `FK_Budgets_District` | [`dbo.District`](tables/EDS/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.Catalog`](tables/EDS/dbo.Catalog.md) | `FK_Catalog_Category` | [`dbo.Category`](tables/EDS/dbo.Category.md) | `CategoryId → CategoryId` | NO_ACTION |
| [`dbo.Catalog`](tables/EDS/dbo.Catalog.md) | `FK_Catalog_Vendors` | [`dbo.Vendors`](tables/EDS/dbo.Vendors.md) | `VendorId → VendorId` | NO_ACTION |
| [`dbo.CatalogRequestDetail`](tables/EDS/dbo.CatalogRequestDetail.md) | `Catalog Request Header/Detail` | [`dbo.CatalogRequest`](tables/EDS/dbo.CatalogRequest.md) | `CatalogRequestId → CatalogRequestId` | CASCADE |
| [`dbo.CatalogRequestStatus`](tables/EDS/dbo.CatalogRequestStatus.md) | `Catalog Request Header/Status` | [`dbo.CatalogRequest`](tables/EDS/dbo.CatalogRequest.md) | `CatalogRequestId → CatalogRequestId` | CASCADE |
| [`dbo.DistrictPP`](tables/EDS/dbo.DistrictPP.md) | `FK_DistrictPP_PricePlans` | [`dbo.PricePlans`](tables/EDS/dbo.PricePlans.md) | `PricePlanId → PricePlanId` | NO_ACTION |
| [`dbo.DistrictVendor`](tables/EDS/dbo.DistrictVendor.md) | `FK_DistrictVendor_District` | [`dbo.District`](tables/EDS/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.DistrictVendor`](tables/EDS/dbo.DistrictVendor.md) | `FK_DistrictVendor_Vendors` | [`dbo.Vendors`](tables/EDS/dbo.Vendors.md) | `VendorId → VendorId` | NO_ACTION |
| [`dbo.MSDSDetail`](tables/EDS/dbo.MSDSDetail.md) | `FK_MSDSDetail_MSDS` | [`dbo.MSDS`](tables/EDS/dbo.MSDS.md) | `MSDSID → MSDSId` | CASCADE |
| [`dbo.PO`](tables/EDS/dbo.PO.md) | `FK_PO_Requisitions` | [`dbo.Requisitions`](tables/EDS/dbo.Requisitions.md) | `RequisitionId → RequisitionId` | NO_ACTION |
| [`dbo.PO`](tables/EDS/dbo.PO.md) | `FK_PO_Vendors` | [`dbo.Vendors`](tables/EDS/dbo.Vendors.md) | `VendorId → VendorId` | CASCADE |
| [`dbo.PODetailItems`](tables/EDS/dbo.PODetailItems.md) | `FK_PODetailItems_Detail` | [`dbo.Detail`](tables/EDS/dbo.Detail.md) | `DetailId → DetailId` | NO_ACTION |
| [`dbo.PODetailItems`](tables/EDS/dbo.PODetailItems.md) | `FK_PODetailItems_PO` | [`dbo.PO`](tables/EDS/dbo.PO.md) | `POId → POId` | NO_ACTION |
| [`dbo.Prices`](tables/EDS/dbo.Prices.md) | `FK_prices_BidItems` | [`dbo.BidItems_Old`](tables/EDS/dbo.BidItems_Old.md) | `BidItemId → BidItemId` | CASCADE |
| [`dbo.Requisitions`](tables/EDS/dbo.Requisitions.md) | `FK_Requisitions_Budgets` | [`dbo.Budgets`](tables/EDS/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.Requisitions`](tables/EDS/dbo.Requisitions.md) | `FK_Requisitions_Category` | [`dbo.Category`](tables/EDS/dbo.Category.md) | `CategoryId → CategoryId` | NO_ACTION |
| [`dbo.School`](tables/EDS/dbo.School.md) | `FK_School_District` | [`dbo.District`](tables/EDS/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS/dbo.UserAccounts.md) | `FK_UserAccounts_Accounts` | [`dbo.Accounts`](tables/EDS/dbo.Accounts.md) | `AccountId → AccountId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS/dbo.UserAccounts.md) | `FK_UserAccounts_BudgetAccounts` | [`dbo.BudgetAccounts`](tables/EDS/dbo.BudgetAccounts.md) | `BudgetAccountId → BudgetAccountId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS/dbo.UserAccounts.md) | `FK_UserAccounts_Budgets` | [`dbo.Budgets`](tables/EDS/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.VendorQueryMSRPDetail`](tables/EDS/dbo.VendorQueryMSRPDetail.md) | `MSRP Vendor Query Header/Detail` | [`dbo.VendorQueryMSRP`](tables/EDS/dbo.VendorQueryMSRP.md) | `VendorQueryMSRPId → VendorQueryMSRPId` | CASCADE |
| [`dbo.VendorQueryMSRPStatus`](tables/EDS/dbo.VendorQueryMSRPStatus.md) | `MSRP Vendor Query Header/Status` | [`dbo.VendorQueryMSRP`](tables/EDS/dbo.VendorQueryMSRP.md) | `VendorQueryMSRPId → VendorQueryMSRPId` | CASCADE |
| [`dbo.VendorQueryTandMDetail`](tables/EDS/dbo.VendorQueryTandMDetail.md) | `T&M Vendor Query Header/Detail` | [`dbo.VendorQueryTandM`](tables/EDS/dbo.VendorQueryTandM.md) | `VendorQueryTandMId → VendorQueryTandMId` | CASCADE |
| [`dbo.VendorQueryTandMStatus`](tables/EDS/dbo.VendorQueryTandMStatus.md) | `T&M Vendor Query Header/Status` | [`dbo.VendorQueryTandM`](tables/EDS/dbo.VendorQueryTandM.md) | `VendorQueryTandMId → VendorQueryTandMId` | CASCADE |

### `EDS_Test`

33 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.Accounts`](tables/EDS_Test/dbo.Accounts.md) | `FK_Accounts_District` | [`dbo.District`](tables/EDS_Test/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.Accounts`](tables/EDS_Test/dbo.Accounts.md) | `FK_Accounts_School` | [`dbo.School`](tables/EDS_Test/dbo.School.md) | `SchoolId → SchoolId` | NO_ACTION |
| [`dbo.BidAnswersJournal`](tables/EDS_Test/dbo.BidAnswersJournal.md) | `FK_BidAnswersJournal_BidAnswers` | [`dbo.BidAnswers`](tables/EDS_Test/dbo.BidAnswers.md) | `BidAnswerId → BidAnswerId` | CASCADE |
| [`dbo.BidQuestions`](tables/EDS_Test/dbo.BidQuestions.md) | `FK_BidQuestions_BidTrades` | [`dbo.BidTrades`](tables/EDS_Test/dbo.BidTrades.md) | `BidTradeId → BidTradeId` | CASCADE |
| [`dbo.BidRequestManufacturer`](tables/EDS_Test/dbo.BidRequestManufacturer.md) | `FK_BidRequestManufacturer_BidHeaders` | [`dbo.BidHeaders`](tables/EDS_Test/dbo.BidHeaders.md) | `BidHeaderId → BidHeaderId` | CASCADE |
| [`dbo.BudgetAccounts`](tables/EDS_Test/dbo.BudgetAccounts.md) | `FK_BudgetAccounts_Accounts` | [`dbo.Accounts`](tables/EDS_Test/dbo.Accounts.md) | `AccountId → AccountId` | NO_ACTION |
| [`dbo.BudgetAccounts`](tables/EDS_Test/dbo.BudgetAccounts.md) | `FK_BudgetAccounts_Budgets` | [`dbo.Budgets`](tables/EDS_Test/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.Budgets`](tables/EDS_Test/dbo.Budgets.md) | `FK_Budgets_District` | [`dbo.District`](tables/EDS_Test/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.Catalog`](tables/EDS_Test/dbo.Catalog.md) | `FK_Catalog_Category` | [`dbo.Category`](tables/EDS_Test/dbo.Category.md) | `CategoryId → CategoryId` | NO_ACTION |
| [`dbo.Catalog`](tables/EDS_Test/dbo.Catalog.md) | `FK_Catalog_Vendors` | [`dbo.Vendors`](tables/EDS_Test/dbo.Vendors.md) | `VendorId → VendorId` | NO_ACTION |
| [`dbo.CatalogRequestDetail`](tables/EDS_Test/dbo.CatalogRequestDetail.md) | `Catalog Request Header/Detail` | [`dbo.CatalogRequest`](tables/EDS_Test/dbo.CatalogRequest.md) | `CatalogRequestId → CatalogRequestId` | CASCADE |
| [`dbo.CatalogRequestStatus`](tables/EDS_Test/dbo.CatalogRequestStatus.md) | `Catalog Request Header/Status` | [`dbo.CatalogRequest`](tables/EDS_Test/dbo.CatalogRequest.md) | `CatalogRequestId → CatalogRequestId` | CASCADE |
| [`dbo.DistrictPP`](tables/EDS_Test/dbo.DistrictPP.md) | `FK_DistrictPP_PricePlans` | [`dbo.PricePlans`](tables/EDS_Test/dbo.PricePlans.md) | `PricePlanId → PricePlanId` | NO_ACTION |
| [`dbo.DistrictVendor`](tables/EDS_Test/dbo.DistrictVendor.md) | `FK_DistrictVendor_District` | [`dbo.District`](tables/EDS_Test/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.DistrictVendor`](tables/EDS_Test/dbo.DistrictVendor.md) | `FK_DistrictVendor_Vendors` | [`dbo.Vendors`](tables/EDS_Test/dbo.Vendors.md) | `VendorId → VendorId` | NO_ACTION |
| [`dbo.MSDSDetail`](tables/EDS_Test/dbo.MSDSDetail.md) | `FK_MSDSDetail_MSDS` | [`dbo.MSDS`](tables/EDS_Test/dbo.MSDS.md) | `MSDSID → MSDSId` | CASCADE |
| [`dbo.PO`](tables/EDS_Test/dbo.PO.md) | `FK_PO_Requisitions` | [`dbo.Requisitions`](tables/EDS_Test/dbo.Requisitions.md) | `RequisitionId → RequisitionId` | NO_ACTION |
| [`dbo.PO`](tables/EDS_Test/dbo.PO.md) | `FK_PO_Vendors` | [`dbo.Vendors`](tables/EDS_Test/dbo.Vendors.md) | `VendorId → VendorId` | CASCADE |
| [`dbo.PODetailItems`](tables/EDS_Test/dbo.PODetailItems.md) | `FK_PODetailItems_Detail` | [`dbo.Detail`](tables/EDS_Test/dbo.Detail.md) | `DetailId → DetailId` | NO_ACTION |
| [`dbo.PODetailItems`](tables/EDS_Test/dbo.PODetailItems.md) | `FK_PODetailItems_PO` | [`dbo.PO`](tables/EDS_Test/dbo.PO.md) | `POId → POId` | NO_ACTION |
| [`dbo.Prices`](tables/EDS_Test/dbo.Prices.md) | `FK_prices_BidItems` | [`dbo.BidItems_Old`](tables/EDS_Test/dbo.BidItems_Old.md) | `BidItemId → BidItemId` | CASCADE |
| [`dbo.Requisitions`](tables/EDS_Test/dbo.Requisitions.md) | `FK_Requisitions_Budgets` | [`dbo.Budgets`](tables/EDS_Test/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.Requisitions`](tables/EDS_Test/dbo.Requisitions.md) | `FK_Requisitions_Category` | [`dbo.Category`](tables/EDS_Test/dbo.Category.md) | `CategoryId → CategoryId` | NO_ACTION |
| [`dbo.School`](tables/EDS_Test/dbo.School.md) | `FK_School_District` | [`dbo.District`](tables/EDS_Test/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS_Test/dbo.UserAccounts.md) | `FK_UserAccounts_Accounts` | [`dbo.Accounts`](tables/EDS_Test/dbo.Accounts.md) | `AccountId → AccountId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS_Test/dbo.UserAccounts.md) | `FK_UserAccounts_BudgetAccounts` | [`dbo.BudgetAccounts`](tables/EDS_Test/dbo.BudgetAccounts.md) | `BudgetAccountId → BudgetAccountId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS_Test/dbo.UserAccounts.md) | `FK_UserAccounts_Budgets` | [`dbo.Budgets`](tables/EDS_Test/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.VendorQueryMSRPDetail`](tables/EDS_Test/dbo.VendorQueryMSRPDetail.md) | `MSRP Vendor Query Header/Detail` | [`dbo.VendorQueryMSRP`](tables/EDS_Test/dbo.VendorQueryMSRP.md) | `VendorQueryMSRPId → VendorQueryMSRPId` | CASCADE |
| [`dbo.VendorQueryMSRPStatus`](tables/EDS_Test/dbo.VendorQueryMSRPStatus.md) | `MSRP Vendor Query Header/Status` | [`dbo.VendorQueryMSRP`](tables/EDS_Test/dbo.VendorQueryMSRP.md) | `VendorQueryMSRPId → VendorQueryMSRPId` | CASCADE |
| [`dbo.VendorQueryTandMDetail`](tables/EDS_Test/dbo.VendorQueryTandMDetail.md) | `T&M Vendor Query Header/Detail` | [`dbo.VendorQueryTandM`](tables/EDS_Test/dbo.VendorQueryTandM.md) | `VendorQueryTandMId → VendorQueryTandMId` | CASCADE |
| [`dbo.VendorQueryTandMStatus`](tables/EDS_Test/dbo.VendorQueryTandMStatus.md) | `T&M Vendor Query Header/Status` | [`dbo.VendorQueryTandM`](tables/EDS_Test/dbo.VendorQueryTandM.md) | `VendorQueryTandMId → VendorQueryTandMId` | CASCADE |
| [`EDSIQWebUser.cxml_order_ack_items`](tables/EDS_Test/EDSIQWebUser.cxml_order_ack_items.md) | `FK_cxml_order_ack_items_order_ack` | [`EDSIQWebUser.cxml_order_acks`](tables/EDS_Test/EDSIQWebUser.cxml_order_acks.md) | `order_ack_id → id` | CASCADE |
| [`EDSIQWebUser.cxml_ship_notice_items`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notice_items.md) | `FK_cxml_ship_notice_items_ship_notice` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | `ship_notice_id → id` | CASCADE |

### `EDS_TEST_Old`

31 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.Accounts`](tables/EDS_TEST_Old/dbo.Accounts.md) | `FK_Accounts_District` | [`dbo.District`](tables/EDS_TEST_Old/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.Accounts`](tables/EDS_TEST_Old/dbo.Accounts.md) | `FK_Accounts_School` | [`dbo.School`](tables/EDS_TEST_Old/dbo.School.md) | `SchoolId → SchoolId` | NO_ACTION |
| [`dbo.BidAnswersJournal`](tables/EDS_TEST_Old/dbo.BidAnswersJournal.md) | `FK_BidAnswersJournal_BidAnswers` | [`dbo.BidAnswers`](tables/EDS_TEST_Old/dbo.BidAnswers.md) | `BidAnswerId → BidAnswerId` | CASCADE |
| [`dbo.BidQuestions`](tables/EDS_TEST_Old/dbo.BidQuestions.md) | `FK_BidQuestions_BidTrades` | [`dbo.BidTrades`](tables/EDS_TEST_Old/dbo.BidTrades.md) | `BidTradeId → BidTradeId` | CASCADE |
| [`dbo.BidRequestManufacturer`](tables/EDS_TEST_Old/dbo.BidRequestManufacturer.md) | `FK_BidRequestManufacturer_BidHeaders` | [`dbo.BidHeaders`](tables/EDS_TEST_Old/dbo.BidHeaders.md) | `BidHeaderId → BidHeaderId` | CASCADE |
| [`dbo.BudgetAccounts`](tables/EDS_TEST_Old/dbo.BudgetAccounts.md) | `FK_BudgetAccounts_Accounts` | [`dbo.Accounts`](tables/EDS_TEST_Old/dbo.Accounts.md) | `AccountId → AccountId` | NO_ACTION |
| [`dbo.BudgetAccounts`](tables/EDS_TEST_Old/dbo.BudgetAccounts.md) | `FK_BudgetAccounts_Budgets` | [`dbo.Budgets`](tables/EDS_TEST_Old/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.Budgets`](tables/EDS_TEST_Old/dbo.Budgets.md) | `FK_Budgets_District` | [`dbo.District`](tables/EDS_TEST_Old/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.Catalog`](tables/EDS_TEST_Old/dbo.Catalog.md) | `FK_Catalog_Category` | [`dbo.Category`](tables/EDS_TEST_Old/dbo.Category.md) | `CategoryId → CategoryId` | NO_ACTION |
| [`dbo.Catalog`](tables/EDS_TEST_Old/dbo.Catalog.md) | `FK_Catalog_Vendors` | [`dbo.Vendors`](tables/EDS_TEST_Old/dbo.Vendors.md) | `VendorId → VendorId` | NO_ACTION |
| [`dbo.CatalogRequestDetail`](tables/EDS_TEST_Old/dbo.CatalogRequestDetail.md) | `Catalog Request Header/Detail` | [`dbo.CatalogRequest`](tables/EDS_TEST_Old/dbo.CatalogRequest.md) | `CatalogRequestId → CatalogRequestId` | CASCADE |
| [`dbo.CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.CatalogRequestStatus.md) | `Catalog Request Header/Status` | [`dbo.CatalogRequest`](tables/EDS_TEST_Old/dbo.CatalogRequest.md) | `CatalogRequestId → CatalogRequestId` | CASCADE |
| [`dbo.DistrictPP`](tables/EDS_TEST_Old/dbo.DistrictPP.md) | `FK_DistrictPP_PricePlans` | [`dbo.PricePlans`](tables/EDS_TEST_Old/dbo.PricePlans.md) | `PricePlanId → PricePlanId` | NO_ACTION |
| [`dbo.DistrictVendor`](tables/EDS_TEST_Old/dbo.DistrictVendor.md) | `FK_DistrictVendor_District` | [`dbo.District`](tables/EDS_TEST_Old/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.DistrictVendor`](tables/EDS_TEST_Old/dbo.DistrictVendor.md) | `FK_DistrictVendor_Vendors` | [`dbo.Vendors`](tables/EDS_TEST_Old/dbo.Vendors.md) | `VendorId → VendorId` | NO_ACTION |
| [`dbo.MSDSDetail`](tables/EDS_TEST_Old/dbo.MSDSDetail.md) | `FK_MSDSDetail_MSDS` | [`dbo.MSDS`](tables/EDS_TEST_Old/dbo.MSDS.md) | `MSDSID → MSDSId` | CASCADE |
| [`dbo.PO`](tables/EDS_TEST_Old/dbo.PO.md) | `FK_PO_Requisitions` | [`dbo.Requisitions`](tables/EDS_TEST_Old/dbo.Requisitions.md) | `RequisitionId → RequisitionId` | NO_ACTION |
| [`dbo.PO`](tables/EDS_TEST_Old/dbo.PO.md) | `FK_PO_Vendors` | [`dbo.Vendors`](tables/EDS_TEST_Old/dbo.Vendors.md) | `VendorId → VendorId` | CASCADE |
| [`dbo.PODetailItems`](tables/EDS_TEST_Old/dbo.PODetailItems.md) | `FK_PODetailItems_Detail` | [`dbo.Detail`](tables/EDS_TEST_Old/dbo.Detail.md) | `DetailId → DetailId` | NO_ACTION |
| [`dbo.PODetailItems`](tables/EDS_TEST_Old/dbo.PODetailItems.md) | `FK_PODetailItems_PO` | [`dbo.PO`](tables/EDS_TEST_Old/dbo.PO.md) | `POId → POId` | NO_ACTION |
| [`dbo.Prices`](tables/EDS_TEST_Old/dbo.Prices.md) | `FK_prices_BidItems` | [`dbo.BidItems_Old`](tables/EDS_TEST_Old/dbo.BidItems_Old.md) | `BidItemId → BidItemId` | CASCADE |
| [`dbo.Requisitions`](tables/EDS_TEST_Old/dbo.Requisitions.md) | `FK_Requisitions_Budgets` | [`dbo.Budgets`](tables/EDS_TEST_Old/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.Requisitions`](tables/EDS_TEST_Old/dbo.Requisitions.md) | `FK_Requisitions_Category` | [`dbo.Category`](tables/EDS_TEST_Old/dbo.Category.md) | `CategoryId → CategoryId` | NO_ACTION |
| [`dbo.School`](tables/EDS_TEST_Old/dbo.School.md) | `FK_School_District` | [`dbo.District`](tables/EDS_TEST_Old/dbo.District.md) | `DistrictId → DistrictId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS_TEST_Old/dbo.UserAccounts.md) | `FK_UserAccounts_Accounts` | [`dbo.Accounts`](tables/EDS_TEST_Old/dbo.Accounts.md) | `AccountId → AccountId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS_TEST_Old/dbo.UserAccounts.md) | `FK_UserAccounts_BudgetAccounts` | [`dbo.BudgetAccounts`](tables/EDS_TEST_Old/dbo.BudgetAccounts.md) | `BudgetAccountId → BudgetAccountId` | NO_ACTION |
| [`dbo.UserAccounts`](tables/EDS_TEST_Old/dbo.UserAccounts.md) | `FK_UserAccounts_Budgets` | [`dbo.Budgets`](tables/EDS_TEST_Old/dbo.Budgets.md) | `BudgetId → BudgetId` | NO_ACTION |
| [`dbo.VendorQueryMSRPDetail`](tables/EDS_TEST_Old/dbo.VendorQueryMSRPDetail.md) | `MSRP Vendor Query Header/Detail` | [`dbo.VendorQueryMSRP`](tables/EDS_TEST_Old/dbo.VendorQueryMSRP.md) | `VendorQueryMSRPId → VendorQueryMSRPId` | CASCADE |
| [`dbo.VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.VendorQueryMSRPStatus.md) | `MSRP Vendor Query Header/Status` | [`dbo.VendorQueryMSRP`](tables/EDS_TEST_Old/dbo.VendorQueryMSRP.md) | `VendorQueryMSRPId → VendorQueryMSRPId` | CASCADE |
| [`dbo.VendorQueryTandMDetail`](tables/EDS_TEST_Old/dbo.VendorQueryTandMDetail.md) | `T&M Vendor Query Header/Detail` | [`dbo.VendorQueryTandM`](tables/EDS_TEST_Old/dbo.VendorQueryTandM.md) | `VendorQueryTandMId → VendorQueryTandMId` | CASCADE |
| [`dbo.VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.VendorQueryTandMStatus.md) | `T&M Vendor Query Header/Status` | [`dbo.VendorQueryTandM`](tables/EDS_TEST_Old/dbo.VendorQueryTandM.md) | `VendorQueryTandMId → VendorQueryTandMId` | CASCADE |

### `hMailServer`

_No FK constraints._

### `hMailServerNew`

_No FK constraints._

### `IDIQ_Platform`

194 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.AddendumAcknowledgment`](tables/IDIQ_Platform/dbo.AddendumAcknowledgment.md) | `AddendumAcknowledgment_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumClassificationAudit`](tables/IDIQ_Platform/dbo.AddendumClassificationAudit.md) | `AddendumClassificationAudit_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumDistributionLog`](tables/IDIQ_Platform/dbo.AddendumDistributionLog.md) | `AddendumDistributionLog_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumModification`](tables/IDIQ_Platform/dbo.AddendumModification.md) | `AddendumModification_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumQAEntry`](tables/IDIQ_Platform/dbo.AddendumQAEntry.md) | `AddendumQAEntry_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumQAEntry`](tables/IDIQ_Platform/dbo.AddendumQAEntry.md) | `AddendumQAEntry_relatedModificationId_fkey` | [`dbo.AddendumModification`](tables/IDIQ_Platform/dbo.AddendumModification.md) | `relatedModificationId → id` | NO_ACTION |
| [`dbo.AddendumQAEntry`](tables/IDIQ_Platform/dbo.AddendumQAEntry.md) | `AddendumQAEntry_sourceQaThreadId_fkey` | [`dbo.QAThread`](tables/IDIQ_Platform/dbo.QAThread.md) | `sourceQaThreadId → id` | NO_ACTION |
| [`dbo.AIVerificationFeedback`](tables/IDIQ_Platform/dbo.AIVerificationFeedback.md) | `AIVerificationFeedback_verificationId_fkey` | [`dbo.AIVerification`](tables/IDIQ_Platform/dbo.AIVerification.md) | `verificationId → id` | CASCADE |
| [`dbo.ApprenticeshipCompliance`](tables/IDIQ_Platform/dbo.ApprenticeshipCompliance.md) | `ApprenticeshipCompliance_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform/dbo.AwardRecommendation.md) | `AwardRecommendation_createdByCooperativeId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `createdByCooperativeId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform/dbo.AwardRecommendation.md) | `AwardRecommendation_createdByUserId_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `createdByUserId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform/dbo.AwardRecommendation.md) | `AwardRecommendation_decidedByUserId_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `decidedByUserId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform/dbo.AwardRecommendation.md) | `AwardRecommendation_leadAgencyId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `leadAgencyId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform/dbo.AwardRecommendation.md) | `AwardRecommendation_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_awardedContractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `awardedContractId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_evaluatorVerdictById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `evaluatorVerdictById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_passFailConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `passFailConfirmedById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_pricingConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `pricingConfirmedById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_pricingRejectedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `pricingRejectedById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_proxyEnteredByUserId_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `proxyEnteredByUserId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `Bid_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.BidAuditLog`](tables/IDIQ_Platform/dbo.BidAuditLog.md) | `BidAuditLog_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCounty`](tables/IDIQ_Platform/dbo.BidCounty.md) | `BidCounty_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCounty`](tables/IDIQ_Platform/dbo.BidCounty.md) | `BidCounty_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.BidCounty`](tables/IDIQ_Platform/dbo.BidCounty.md) | `BidCounty_pricingConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `pricingConfirmedById → id` | NO_ACTION |
| [`dbo.BidCounty`](tables/IDIQ_Platform/dbo.BidCounty.md) | `BidCounty_pricingRejectedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `pricingRejectedById → id` | NO_ACTION |
| [`dbo.BidCountyAward`](tables/IDIQ_Platform/dbo.BidCountyAward.md) | `BidCountyAward_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCountyAward`](tables/IDIQ_Platform/dbo.BidCountyAward.md) | `BidCountyAward_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.BidCountyLineItem`](tables/IDIQ_Platform/dbo.BidCountyLineItem.md) | `BidCountyLineItem_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCountyLineItem`](tables/IDIQ_Platform/dbo.BidCountyLineItem.md) | `BidCountyLineItem_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.BidCountyLineItem`](tables/IDIQ_Platform/dbo.BidCountyLineItem.md) | `BidCountyLineItem_solicitationLineItemId_fkey` | [`dbo.SolicitationLineItem`](tables/IDIQ_Platform/dbo.SolicitationLineItem.md) | `solicitationLineItemId → id` | CASCADE |
| [`dbo.BidDocument`](tables/IDIQ_Platform/dbo.BidDocument.md) | `BidDocument_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidDocument`](tables/IDIQ_Platform/dbo.BidDocument.md) | `BidDocument_requiredDocumentId_fkey` | [`dbo.SolicitationRequiredDocument`](tables/IDIQ_Platform/dbo.SolicitationRequiredDocument.md) | `requiredDocumentId → id` | SET_NULL |
| [`dbo.BidDocument`](tables/IDIQ_Platform/dbo.BidDocument.md) | `BidDocument_reviewDecisionById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `reviewDecisionById → id` | NO_ACTION |
| [`dbo.BidForm`](tables/IDIQ_Platform/dbo.BidForm.md) | `BidForm_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.BidFormElement`](tables/IDIQ_Platform/dbo.BidFormElement.md) | `BidFormElement_sectionId_fkey` | [`dbo.BidFormSection`](tables/IDIQ_Platform/dbo.BidFormSection.md) | `sectionId → id` | CASCADE |
| [`dbo.BidFormSection`](tables/IDIQ_Platform/dbo.BidFormSection.md) | `BidFormSection_bidFormId_fkey` | [`dbo.BidForm`](tables/IDIQ_Platform/dbo.BidForm.md) | `bidFormId → id` | CASCADE |
| [`dbo.BidLineItem`](tables/IDIQ_Platform/dbo.BidLineItem.md) | `BidLineItem_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidOpeningEvent`](tables/IDIQ_Platform/dbo.BidOpeningEvent.md) | `BidOpeningEvent_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.BidResultsReport`](tables/IDIQ_Platform/dbo.BidResultsReport.md) | `BidResultsReport_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.BidScore`](tables/IDIQ_Platform/dbo.BidScore.md) | `BidScore_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidSubmissionReceipt`](tables/IDIQ_Platform/dbo.BidSubmissionReceipt.md) | `BidSubmissionReceipt_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.CertifiedPayroll`](tables/IDIQ_Platform/dbo.CertifiedPayroll.md) | `CertifiedPayroll_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.CertifiedPayroll`](tables/IDIQ_Platform/dbo.CertifiedPayroll.md) | `CertifiedPayroll_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform/dbo.CertifiedPayrollSubmission.md) | `CertifiedPayrollSubmission_certifiedPayrollId_fkey` | [`dbo.CertifiedPayroll`](tables/IDIQ_Platform/dbo.CertifiedPayroll.md) | `certifiedPayrollId → id` | CASCADE |
| [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform/dbo.CertifiedPayrollSubmission.md) | `CertifiedPayrollSubmission_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform/dbo.CertifiedPayrollSubmission.md) | `CertifiedPayrollSubmission_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CompetitiveBiddingCompliance`](tables/IDIQ_Platform/dbo.CompetitiveBiddingCompliance.md) | `CompetitiveBiddingCompliance_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `Contract_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_resolvedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `resolvedById → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | `ContractTermination_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | `ContractTermination_debarmentRecordId_fkey` | [`dbo.DebarmentRecord`](tables/IDIQ_Platform/dbo.DebarmentRecord.md) | `debarmentRecordId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | `ContractTermination_subcontractorId_fkey` | [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | `subcontractorId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | `ContractTermination_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | `ContractTermination_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | `ContractTermination_terminatedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `terminatedById → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | `ContractTermination_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CooperativeSystemConfigHistory`](tables/IDIQ_Platform/dbo.CooperativeSystemConfigHistory.md) | `CooperativeSystemConfigHistory_configId_fkey` | [`dbo.CooperativeSystemConfig`](tables/IDIQ_Platform/dbo.CooperativeSystemConfig.md) | `configId → id` | CASCADE |
| [`dbo.CooperativeSystemConfigSnapshot`](tables/IDIQ_Platform/dbo.CooperativeSystemConfigSnapshot.md) | `CooperativeSystemConfigSnapshot_configHistoryId_fkey` | [`dbo.CooperativeSystemConfigHistory`](tables/IDIQ_Platform/dbo.CooperativeSystemConfigHistory.md) | `configHistoryId → id` | NO_ACTION |
| [`dbo.CooperativeSystemConfigSnapshot`](tables/IDIQ_Platform/dbo.CooperativeSystemConfigSnapshot.md) | `CooperativeSystemConfigSnapshot_configId_fkey` | [`dbo.CooperativeSystemConfig`](tables/IDIQ_Platform/dbo.CooperativeSystemConfig.md) | `configId → id` | NO_ACTION |
| [`dbo.CooperativeSystemConfigSnapshot`](tables/IDIQ_Platform/dbo.CooperativeSystemConfigSnapshot.md) | `CooperativeSystemConfigSnapshot_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.CooperativeVendorViolation`](tables/IDIQ_Platform/dbo.CooperativeVendorViolation.md) | `CooperativeVendorViolation_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CostEffectivenessDetermination`](tables/IDIQ_Platform/dbo.CostEffectivenessDetermination.md) | `CostEffectivenessDetermination_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.CostEffectivenessDetermination`](tables/IDIQ_Platform/dbo.CostEffectivenessDetermination.md) | `CostEffectivenessDetermination_cooperativeId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `cooperativeId → id` | NO_ACTION |
| [`dbo.CriterionTier`](tables/IDIQ_Platform/dbo.CriterionTier.md) | `CriterionTier_criterionId_fkey` | [`dbo.EvaluationCriterion`](tables/IDIQ_Platform/dbo.EvaluationCriterion.md) | `criterionId → id` | CASCADE |
| [`dbo.EmailLog`](tables/IDIQ_Platform/dbo.EmailLog.md) | `EmailLog_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `userId → id` | SET_NULL |
| [`dbo.EmailVerificationToken`](tables/IDIQ_Platform/dbo.EmailVerificationToken.md) | `EmailVerificationToken_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `userId → id` | CASCADE |
| [`dbo.ESignatureSigner`](tables/IDIQ_Platform/dbo.ESignatureSigner.md) | `ESignatureSigner_envelopeId_fkey` | [`dbo.ESignatureEnvelope`](tables/IDIQ_Platform/dbo.ESignatureEnvelope.md) | `envelopeId → id` | CASCADE |
| [`dbo.EvaluationCriterion`](tables/IDIQ_Platform/dbo.EvaluationCriterion.md) | `EvaluationCriterion_sectionId_fkey` | [`dbo.EvaluationSection`](tables/IDIQ_Platform/dbo.EvaluationSection.md) | `sectionId → id` | CASCADE |
| [`dbo.EvaluationFramework`](tables/IDIQ_Platform/dbo.EvaluationFramework.md) | `EvaluationFramework_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.EvaluationSection`](tables/IDIQ_Platform/dbo.EvaluationSection.md) | `EvaluationSection_frameworkId_fkey` | [`dbo.EvaluationFramework`](tables/IDIQ_Platform/dbo.EvaluationFramework.md) | `frameworkId → id` | CASCADE |
| [`dbo.FinalPaymentCertification`](tables/IDIQ_Platform/dbo.FinalPaymentCertification.md) | `FinalPaymentCertification_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.FinalPaymentCertification`](tables/IDIQ_Platform/dbo.FinalPaymentCertification.md) | `FinalPaymentCertification_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.FormTemplate`](tables/IDIQ_Platform/dbo.FormTemplate.md) | `FormTemplate_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.FormTemplate`](tables/IDIQ_Platform/dbo.FormTemplate.md) | `FormTemplate_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.JobReference`](tables/IDIQ_Platform/dbo.JobReference.md) | `JobReference_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.JobReference`](tables/IDIQ_Platform/dbo.JobReference.md) | `JobReference_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `userId → id` | SET_NULL |
| [`dbo.JobSitePosting`](tables/IDIQ_Platform/dbo.JobSitePosting.md) | `JobSitePosting_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.JobSitePosting`](tables/IDIQ_Platform/dbo.JobSitePosting.md) | `JobSitePosting_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.LowestBidCertification`](tables/IDIQ_Platform/dbo.LowestBidCertification.md) | `LowestBidCertification_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | NO_ACTION |
| [`dbo.LowestBidCertification`](tables/IDIQ_Platform/dbo.LowestBidCertification.md) | `LowestBidCertification_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.ManualCloseEvent`](tables/IDIQ_Platform/dbo.ManualCloseEvent.md) | `ManualCloseEvent_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `MiniBid_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `MiniBid_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `MiniBid_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `MiniBid_selectedVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `selectedVendorId → id` | NO_ACTION |
| [`dbo.MiniBidLineItem`](tables/IDIQ_Platform/dbo.MiniBidLineItem.md) | `MiniBidLineItem_miniBidId_fkey` | [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `miniBidId → id` | CASCADE |
| [`dbo.MiniBidLineItem`](tables/IDIQ_Platform/dbo.MiniBidLineItem.md) | `MiniBidLineItem_solicitationLineItemId_fkey` | [`dbo.SolicitationLineItem`](tables/IDIQ_Platform/dbo.SolicitationLineItem.md) | `solicitationLineItemId → id` | NO_ACTION |
| [`dbo.MiniBidResponse`](tables/IDIQ_Platform/dbo.MiniBidResponse.md) | `MiniBidResponse_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | NO_ACTION |
| [`dbo.MiniBidResponse`](tables/IDIQ_Platform/dbo.MiniBidResponse.md) | `MiniBidResponse_miniBidId_fkey` | [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `miniBidId → id` | CASCADE |
| [`dbo.MiniBidResponse`](tables/IDIQ_Platform/dbo.MiniBidResponse.md) | `MiniBidResponse_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.Newspaper`](tables/IDIQ_Platform/dbo.Newspaper.md) | `Newspaper_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.NJWageHubSubmission`](tables/IDIQ_Platform/dbo.NJWageHubSubmission.md) | `NJWageHubSubmission_certifiedPayrollId_fkey` | [`dbo.CertifiedPayroll`](tables/IDIQ_Platform/dbo.CertifiedPayroll.md) | `certifiedPayrollId → id` | SET_NULL |
| [`dbo.Notification`](tables/IDIQ_Platform/dbo.Notification.md) | `Notification_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | CASCADE |
| [`dbo.Notification`](tables/IDIQ_Platform/dbo.Notification.md) | `Notification_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `userId → id` | CASCADE |
| [`dbo.OrderLineItem`](tables/IDIQ_Platform/dbo.OrderLineItem.md) | `OrderLineItem_bidLineItemId_fkey` | [`dbo.BidLineItem`](tables/IDIQ_Platform/dbo.BidLineItem.md) | `bidLineItemId → id` | NO_ACTION |
| [`dbo.OrderLineItem`](tables/IDIQ_Platform/dbo.OrderLineItem.md) | `OrderLineItem_solicitationLineItemId_fkey` | [`dbo.SolicitationLineItem`](tables/IDIQ_Platform/dbo.SolicitationLineItem.md) | `solicitationLineItemId → id` | NO_ACTION |
| [`dbo.OrderLineItem`](tables/IDIQ_Platform/dbo.OrderLineItem.md) | `OrderLineItem_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.PayrollFailure`](tables/IDIQ_Platform/dbo.PayrollFailure.md) | `PayrollFailure_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.PayrollFailure`](tables/IDIQ_Platform/dbo.PayrollFailure.md) | `PayrollFailure_trackingId_fkey` | [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform/dbo.PayrollFailureTracking.md) | `trackingId → id` | NO_ACTION |
| [`dbo.PayrollFailure`](tables/IDIQ_Platform/dbo.PayrollFailure.md) | `PayrollFailure_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform/dbo.PayrollFailureTracking.md) | `PayrollFailureTracking_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform/dbo.PayrollRecordWithholding.md) | `PayrollRecordWithholding_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform/dbo.PayrollRecordWithholding.md) | `PayrollRecordWithholding_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform/dbo.PayrollRecordWithholding.md) | `PayrollRecordWithholding_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.PrevailingWageRate`](tables/IDIQ_Platform/dbo.PrevailingWageRate.md) | `PrevailingWageRate_sourceDocumentId_fkey` | [`dbo.WageRateImport`](tables/IDIQ_Platform/dbo.WageRateImport.md) | `sourceDocumentId → id` | SET_NULL |
| [`dbo.PricingScenario`](tables/IDIQ_Platform/dbo.PricingScenario.md) | `PricingScenario_sectionId_fkey` | [`dbo.EvaluationSection`](tables/IDIQ_Platform/dbo.EvaluationSection.md) | `sectionId → id` | CASCADE |
| [`dbo.ProposalAutoScore`](tables/IDIQ_Platform/dbo.ProposalAutoScore.md) | `ProposalAutoScore_proposalId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `proposalId → id` | CASCADE |
| [`dbo.ProposalAutoScore`](tables/IDIQ_Platform/dbo.ProposalAutoScore.md) | `ProposalAutoScore_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.ProposalDocumentAcknowledgment`](tables/IDIQ_Platform/dbo.ProposalDocumentAcknowledgment.md) | `ProposalDocumentAcknowledgment_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.PublicWorksContractorRegistration`](tables/IDIQ_Platform/dbo.PublicWorksContractorRegistration.md) | `PublicWorksContractorRegistration_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.QAThread`](tables/IDIQ_Platform/dbo.QAThread.md) | `QAThread_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform/dbo.RecommendedVendor.md) | `RecommendedVendor_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | SET_NULL |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform/dbo.RecommendedVendor.md) | `RecommendedVendor_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform/dbo.RecommendedVendor.md) | `RecommendedVendor_recommendationId_fkey` | [`dbo.AwardRecommendation`](tables/IDIQ_Platform/dbo.AwardRecommendation.md) | `recommendationId → id` | CASCADE |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform/dbo.RecommendedVendor.md) | `RecommendedVendor_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | SET_NULL |
| [`dbo.ReferencePricingIndex`](tables/IDIQ_Platform/dbo.ReferencePricingIndex.md) | `ReferencePricingIndex_sectionId_fkey` | [`dbo.EvaluationSection`](tables/IDIQ_Platform/dbo.EvaluationSection.md) | `sectionId → id` | CASCADE |
| [`dbo.RetaliationComplaint`](tables/IDIQ_Platform/dbo.RetaliationComplaint.md) | `RetaliationComplaint_originalComplaintId_fkey` | [`dbo.WorkerWageProtest`](tables/IDIQ_Platform/dbo.WorkerWageProtest.md) | `originalComplaintId → id` | NO_ACTION |
| [`dbo.RetaliationComplaint`](tables/IDIQ_Platform/dbo.RetaliationComplaint.md) | `RetaliationComplaint_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `Solicitation_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `Solicitation_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `Solicitation_createdByTenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `createdByTenantId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `Solicitation_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `Solicitation_withdrawnById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `withdrawnById → id` | NO_ACTION |
| [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `SolicitationAddendum_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | `SolicitationAdvertisement_publishedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `publishedById → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | `SolicitationAdvertisement_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | `SolicitationAdvertisement_uploadedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `uploadedById → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisementAddendum`](tables/IDIQ_Platform/dbo.SolicitationAdvertisementAddendum.md) | `SolicitationAdvertisementAddendum_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `addendumId → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisementAddendum`](tables/IDIQ_Platform/dbo.SolicitationAdvertisementAddendum.md) | `SolicitationAdvertisementAddendum_advertisementId_fkey` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | `advertisementId → id` | CASCADE |
| [`dbo.SolicitationAdvertisementNewspaper`](tables/IDIQ_Platform/dbo.SolicitationAdvertisementNewspaper.md) | `SolicitationAdvertisementNewspaper_advertisementId_fkey` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | `advertisementId → id` | CASCADE |
| [`dbo.SolicitationAdvertisementNewspaper`](tables/IDIQ_Platform/dbo.SolicitationAdvertisementNewspaper.md) | `SolicitationAdvertisementNewspaper_newspaperId_fkey` | [`dbo.Newspaper`](tables/IDIQ_Platform/dbo.Newspaper.md) | `newspaperId → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisementSolicitation`](tables/IDIQ_Platform/dbo.SolicitationAdvertisementSolicitation.md) | `SolicitationAdvertisementSolicitation_advertisementId_fkey` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | `advertisementId → id` | CASCADE |
| [`dbo.SolicitationAdvertisementSolicitation`](tables/IDIQ_Platform/dbo.SolicitationAdvertisementSolicitation.md) | `SolicitationAdvertisementSolicitation_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.SolicitationCounty`](tables/IDIQ_Platform/dbo.SolicitationCounty.md) | `SolicitationCounty_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.SolicitationCounty`](tables/IDIQ_Platform/dbo.SolicitationCounty.md) | `SolicitationCounty_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationLineItem`](tables/IDIQ_Platform/dbo.SolicitationLineItem.md) | `SolicitationLineItem_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationRequiredDocument`](tables/IDIQ_Platform/dbo.SolicitationRequiredDocument.md) | `SolicitationRequiredDocument_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationSealKey`](tables/IDIQ_Platform/dbo.SolicitationSealKey.md) | `SolicitationSealKey_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.StopWorkOrder`](tables/IDIQ_Platform/dbo.StopWorkOrder.md) | `StopWorkOrder_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.StopWorkOrder`](tables/IDIQ_Platform/dbo.StopWorkOrder.md) | `StopWorkOrder_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.StopWorkOrder`](tables/IDIQ_Platform/dbo.StopWorkOrder.md) | `StopWorkOrder_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | `Subcontractor_debarmentRecordId_fkey` | [`dbo.DebarmentRecord`](tables/IDIQ_Platform/dbo.DebarmentRecord.md) | `debarmentRecordId → id` | SET_NULL |
| [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | `Subcontractor_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | `Subcontractor_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | `Subcontractor_terminatedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `terminatedById → id` | SET_NULL |
| [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | `Subcontractor_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_approvedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `approvedById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_miniBidId_fkey` | [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `miniBidId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_pricingConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `pricingConfirmedById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_professionalDocReviewedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `professionalDocReviewedById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `TaskOrder_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.TaskOrderAmendment`](tables/IDIQ_Platform/dbo.TaskOrderAmendment.md) | `TaskOrderAmendment_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.TaskOrderCostSavings`](tables/IDIQ_Platform/dbo.TaskOrderCostSavings.md) | `TaskOrderCostSavings_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `Tenant_cooperativeId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `cooperativeId → id` | NO_ACTION |
| [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `Tenant_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.TieBreakEvent`](tables/IDIQ_Platform/dbo.TieBreakEvent.md) | `TieBreakEvent_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.TieBreakParticipant`](tables/IDIQ_Platform/dbo.TieBreakParticipant.md) | `TieBreakParticipant_eventId_fkey` | [`dbo.TieBreakEvent`](tables/IDIQ_Platform/dbo.TieBreakEvent.md) | `eventId → id` | CASCADE |
| [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform/dbo.UnsuccessfulBidderClaim.md) | `UnsuccessfulBidderClaim_claimantVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `claimantVendorId → id` | NO_ACTION |
| [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform/dbo.UnsuccessfulBidderClaim.md) | `UnsuccessfulBidderClaim_defendantVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `defendantVendorId → id` | NO_ACTION |
| [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform/dbo.UnsuccessfulBidderClaim.md) | `UnsuccessfulBidderClaim_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `User_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.UserInvitation`](tables/IDIQ_Platform/dbo.UserInvitation.md) | `UserInvitation_invitedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `invitedById → id` | NO_ACTION |
| [`dbo.UserInvitation`](tables/IDIQ_Platform/dbo.UserInvitation.md) | `UserInvitation_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.VendorCertification`](tables/IDIQ_Platform/dbo.VendorCertification.md) | `VendorCertification_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform/dbo.VendorCriterionResponse.md) | `VendorCriterionResponse_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform/dbo.VendorCriterionResponse.md) | `VendorCriterionResponse_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform/dbo.VendorCriterionResponse.md) | `VendorCriterionResponse_criterionId_fkey` | [`dbo.EvaluationCriterion`](tables/IDIQ_Platform/dbo.EvaluationCriterion.md) | `criterionId → id` | NO_ACTION |
| [`dbo.VendorPricingIndex`](tables/IDIQ_Platform/dbo.VendorPricingIndex.md) | `VendorPricingIndex_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.VendorPricingIndex`](tables/IDIQ_Platform/dbo.VendorPricingIndex.md) | `VendorPricingIndex_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.VendorPricingIndex`](tables/IDIQ_Platform/dbo.VendorPricingIndex.md) | `VendorPricingIndex_indexId_fkey` | [`dbo.ReferencePricingIndex`](tables/IDIQ_Platform/dbo.ReferencePricingIndex.md) | `indexId → id` | NO_ACTION |
| [`dbo.VendorRelationship`](tables/IDIQ_Platform/dbo.VendorRelationship.md) | `VendorRelationship_relatedVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `relatedVendorId → id` | NO_ACTION |
| [`dbo.VendorRelationship`](tables/IDIQ_Platform/dbo.VendorRelationship.md) | `VendorRelationship_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.VendorScenarioPrice`](tables/IDIQ_Platform/dbo.VendorScenarioPrice.md) | `VendorScenarioPrice_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.VendorScenarioPrice`](tables/IDIQ_Platform/dbo.VendorScenarioPrice.md) | `VendorScenarioPrice_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.VendorScenarioPrice`](tables/IDIQ_Platform/dbo.VendorScenarioPrice.md) | `VendorScenarioPrice_scenarioId_fkey` | [`dbo.PricingScenario`](tables/IDIQ_Platform/dbo.PricingScenario.md) | `scenarioId → id` | NO_ACTION |
| [`dbo.VendorTierSelection`](tables/IDIQ_Platform/dbo.VendorTierSelection.md) | `VendorTierSelection_responseId_fkey` | [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform/dbo.VendorCriterionResponse.md) | `responseId → id` | CASCADE |
| [`dbo.VendorTierSelection`](tables/IDIQ_Platform/dbo.VendorTierSelection.md) | `VendorTierSelection_tierId_fkey` | [`dbo.CriterionTier`](tables/IDIQ_Platform/dbo.CriterionTier.md) | `tierId → id` | NO_ACTION |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform/dbo.WageRateDetermination.md) | `WageRateDetermination_confirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `confirmedById → id` | NO_ACTION |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform/dbo.WageRateDetermination.md) | `WageRateDetermination_requestedById_fkey` | [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `requestedById → id` | NO_ACTION |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform/dbo.WageRateDetermination.md) | `WageRateDetermination_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `solicitationId → id` | SET_NULL |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform/dbo.WageRateDetermination.md) | `WageRateDetermination_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | SET_NULL |
| [`dbo.WebhookDelivery`](tables/IDIQ_Platform/dbo.WebhookDelivery.md) | `WebhookDelivery_endpointId_fkey` | [`dbo.WebhookEndpoint`](tables/IDIQ_Platform/dbo.WebhookEndpoint.md) | `endpointId → id` | CASCADE |
| [`dbo.WorkerWageProtest`](tables/IDIQ_Platform/dbo.WorkerWageProtest.md) | `WorkerWageProtest_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.WorkerWageProtest`](tables/IDIQ_Platform/dbo.WorkerWageProtest.md) | `WorkerWageProtest_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.WorkerWageProtest`](tables/IDIQ_Platform/dbo.WorkerWageProtest.md) | `WorkerWageProtest_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |

### `IDIQ_Platform_UAT`

194 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.AddendumAcknowledgment`](tables/IDIQ_Platform_UAT/dbo.AddendumAcknowledgment.md) | `AddendumAcknowledgment_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumClassificationAudit`](tables/IDIQ_Platform_UAT/dbo.AddendumClassificationAudit.md) | `AddendumClassificationAudit_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumDistributionLog`](tables/IDIQ_Platform_UAT/dbo.AddendumDistributionLog.md) | `AddendumDistributionLog_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumModification`](tables/IDIQ_Platform_UAT/dbo.AddendumModification.md) | `AddendumModification_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumQAEntry`](tables/IDIQ_Platform_UAT/dbo.AddendumQAEntry.md) | `AddendumQAEntry_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `addendumId → id` | CASCADE |
| [`dbo.AddendumQAEntry`](tables/IDIQ_Platform_UAT/dbo.AddendumQAEntry.md) | `AddendumQAEntry_relatedModificationId_fkey` | [`dbo.AddendumModification`](tables/IDIQ_Platform_UAT/dbo.AddendumModification.md) | `relatedModificationId → id` | NO_ACTION |
| [`dbo.AddendumQAEntry`](tables/IDIQ_Platform_UAT/dbo.AddendumQAEntry.md) | `AddendumQAEntry_sourceQaThreadId_fkey` | [`dbo.QAThread`](tables/IDIQ_Platform_UAT/dbo.QAThread.md) | `sourceQaThreadId → id` | NO_ACTION |
| [`dbo.AIVerificationFeedback`](tables/IDIQ_Platform_UAT/dbo.AIVerificationFeedback.md) | `AIVerificationFeedback_verificationId_fkey` | [`dbo.AIVerification`](tables/IDIQ_Platform_UAT/dbo.AIVerification.md) | `verificationId → id` | CASCADE |
| [`dbo.ApprenticeshipCompliance`](tables/IDIQ_Platform_UAT/dbo.ApprenticeshipCompliance.md) | `ApprenticeshipCompliance_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform_UAT/dbo.AwardRecommendation.md) | `AwardRecommendation_createdByCooperativeId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `createdByCooperativeId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform_UAT/dbo.AwardRecommendation.md) | `AwardRecommendation_createdByUserId_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `createdByUserId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform_UAT/dbo.AwardRecommendation.md) | `AwardRecommendation_decidedByUserId_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `decidedByUserId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform_UAT/dbo.AwardRecommendation.md) | `AwardRecommendation_leadAgencyId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `leadAgencyId → id` | NO_ACTION |
| [`dbo.AwardRecommendation`](tables/IDIQ_Platform_UAT/dbo.AwardRecommendation.md) | `AwardRecommendation_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_awardedContractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `awardedContractId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_evaluatorVerdictById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `evaluatorVerdictById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_passFailConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `passFailConfirmedById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_pricingConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `pricingConfirmedById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_pricingRejectedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `pricingRejectedById → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_proxyEnteredByUserId_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `proxyEnteredByUserId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `Bid_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.BidAuditLog`](tables/IDIQ_Platform_UAT/dbo.BidAuditLog.md) | `BidAuditLog_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCounty`](tables/IDIQ_Platform_UAT/dbo.BidCounty.md) | `BidCounty_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCounty`](tables/IDIQ_Platform_UAT/dbo.BidCounty.md) | `BidCounty_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.BidCounty`](tables/IDIQ_Platform_UAT/dbo.BidCounty.md) | `BidCounty_pricingConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `pricingConfirmedById → id` | NO_ACTION |
| [`dbo.BidCounty`](tables/IDIQ_Platform_UAT/dbo.BidCounty.md) | `BidCounty_pricingRejectedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `pricingRejectedById → id` | NO_ACTION |
| [`dbo.BidCountyAward`](tables/IDIQ_Platform_UAT/dbo.BidCountyAward.md) | `BidCountyAward_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCountyAward`](tables/IDIQ_Platform_UAT/dbo.BidCountyAward.md) | `BidCountyAward_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.BidCountyLineItem`](tables/IDIQ_Platform_UAT/dbo.BidCountyLineItem.md) | `BidCountyLineItem_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidCountyLineItem`](tables/IDIQ_Platform_UAT/dbo.BidCountyLineItem.md) | `BidCountyLineItem_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.BidCountyLineItem`](tables/IDIQ_Platform_UAT/dbo.BidCountyLineItem.md) | `BidCountyLineItem_solicitationLineItemId_fkey` | [`dbo.SolicitationLineItem`](tables/IDIQ_Platform_UAT/dbo.SolicitationLineItem.md) | `solicitationLineItemId → id` | CASCADE |
| [`dbo.BidDocument`](tables/IDIQ_Platform_UAT/dbo.BidDocument.md) | `BidDocument_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidDocument`](tables/IDIQ_Platform_UAT/dbo.BidDocument.md) | `BidDocument_requiredDocumentId_fkey` | [`dbo.SolicitationRequiredDocument`](tables/IDIQ_Platform_UAT/dbo.SolicitationRequiredDocument.md) | `requiredDocumentId → id` | SET_NULL |
| [`dbo.BidDocument`](tables/IDIQ_Platform_UAT/dbo.BidDocument.md) | `BidDocument_reviewDecisionById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `reviewDecisionById → id` | NO_ACTION |
| [`dbo.BidForm`](tables/IDIQ_Platform_UAT/dbo.BidForm.md) | `BidForm_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.BidFormElement`](tables/IDIQ_Platform_UAT/dbo.BidFormElement.md) | `BidFormElement_sectionId_fkey` | [`dbo.BidFormSection`](tables/IDIQ_Platform_UAT/dbo.BidFormSection.md) | `sectionId → id` | CASCADE |
| [`dbo.BidFormSection`](tables/IDIQ_Platform_UAT/dbo.BidFormSection.md) | `BidFormSection_bidFormId_fkey` | [`dbo.BidForm`](tables/IDIQ_Platform_UAT/dbo.BidForm.md) | `bidFormId → id` | CASCADE |
| [`dbo.BidLineItem`](tables/IDIQ_Platform_UAT/dbo.BidLineItem.md) | `BidLineItem_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidOpeningEvent`](tables/IDIQ_Platform_UAT/dbo.BidOpeningEvent.md) | `BidOpeningEvent_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.BidResultsReport`](tables/IDIQ_Platform_UAT/dbo.BidResultsReport.md) | `BidResultsReport_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.BidScore`](tables/IDIQ_Platform_UAT/dbo.BidScore.md) | `BidScore_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.BidSubmissionReceipt`](tables/IDIQ_Platform_UAT/dbo.BidSubmissionReceipt.md) | `BidSubmissionReceipt_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.CertifiedPayroll`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayroll.md) | `CertifiedPayroll_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.CertifiedPayroll`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayroll.md) | `CertifiedPayroll_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayrollSubmission.md) | `CertifiedPayrollSubmission_certifiedPayrollId_fkey` | [`dbo.CertifiedPayroll`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayroll.md) | `certifiedPayrollId → id` | CASCADE |
| [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayrollSubmission.md) | `CertifiedPayrollSubmission_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayrollSubmission.md) | `CertifiedPayrollSubmission_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CompetitiveBiddingCompliance`](tables/IDIQ_Platform_UAT/dbo.CompetitiveBiddingCompliance.md) | `CompetitiveBiddingCompliance_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `Contract_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform_UAT/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform_UAT/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_resolvedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `resolvedById → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform_UAT/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform_UAT/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform_UAT/dbo.ContractorPayrollViolation.md) | `ContractorPayrollViolation_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | `ContractTermination_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | `ContractTermination_debarmentRecordId_fkey` | [`dbo.DebarmentRecord`](tables/IDIQ_Platform_UAT/dbo.DebarmentRecord.md) | `debarmentRecordId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | `ContractTermination_subcontractorId_fkey` | [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | `subcontractorId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | `ContractTermination_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | `ContractTermination_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | `ContractTermination_terminatedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `terminatedById → id` | NO_ACTION |
| [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | `ContractTermination_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CooperativeSystemConfigHistory`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfigHistory.md) | `CooperativeSystemConfigHistory_configId_fkey` | [`dbo.CooperativeSystemConfig`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfig.md) | `configId → id` | CASCADE |
| [`dbo.CooperativeSystemConfigSnapshot`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfigSnapshot.md) | `CooperativeSystemConfigSnapshot_configHistoryId_fkey` | [`dbo.CooperativeSystemConfigHistory`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfigHistory.md) | `configHistoryId → id` | NO_ACTION |
| [`dbo.CooperativeSystemConfigSnapshot`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfigSnapshot.md) | `CooperativeSystemConfigSnapshot_configId_fkey` | [`dbo.CooperativeSystemConfig`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfig.md) | `configId → id` | NO_ACTION |
| [`dbo.CooperativeSystemConfigSnapshot`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfigSnapshot.md) | `CooperativeSystemConfigSnapshot_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.CooperativeVendorViolation`](tables/IDIQ_Platform_UAT/dbo.CooperativeVendorViolation.md) | `CooperativeVendorViolation_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.CostEffectivenessDetermination`](tables/IDIQ_Platform_UAT/dbo.CostEffectivenessDetermination.md) | `CostEffectivenessDetermination_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.CostEffectivenessDetermination`](tables/IDIQ_Platform_UAT/dbo.CostEffectivenessDetermination.md) | `CostEffectivenessDetermination_cooperativeId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `cooperativeId → id` | NO_ACTION |
| [`dbo.CriterionTier`](tables/IDIQ_Platform_UAT/dbo.CriterionTier.md) | `CriterionTier_criterionId_fkey` | [`dbo.EvaluationCriterion`](tables/IDIQ_Platform_UAT/dbo.EvaluationCriterion.md) | `criterionId → id` | CASCADE |
| [`dbo.EmailLog`](tables/IDIQ_Platform_UAT/dbo.EmailLog.md) | `EmailLog_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `userId → id` | SET_NULL |
| [`dbo.EmailVerificationToken`](tables/IDIQ_Platform_UAT/dbo.EmailVerificationToken.md) | `EmailVerificationToken_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `userId → id` | CASCADE |
| [`dbo.ESignatureSigner`](tables/IDIQ_Platform_UAT/dbo.ESignatureSigner.md) | `ESignatureSigner_envelopeId_fkey` | [`dbo.ESignatureEnvelope`](tables/IDIQ_Platform_UAT/dbo.ESignatureEnvelope.md) | `envelopeId → id` | CASCADE |
| [`dbo.EvaluationCriterion`](tables/IDIQ_Platform_UAT/dbo.EvaluationCriterion.md) | `EvaluationCriterion_sectionId_fkey` | [`dbo.EvaluationSection`](tables/IDIQ_Platform_UAT/dbo.EvaluationSection.md) | `sectionId → id` | CASCADE |
| [`dbo.EvaluationFramework`](tables/IDIQ_Platform_UAT/dbo.EvaluationFramework.md) | `EvaluationFramework_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.EvaluationSection`](tables/IDIQ_Platform_UAT/dbo.EvaluationSection.md) | `EvaluationSection_frameworkId_fkey` | [`dbo.EvaluationFramework`](tables/IDIQ_Platform_UAT/dbo.EvaluationFramework.md) | `frameworkId → id` | CASCADE |
| [`dbo.FinalPaymentCertification`](tables/IDIQ_Platform_UAT/dbo.FinalPaymentCertification.md) | `FinalPaymentCertification_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.FinalPaymentCertification`](tables/IDIQ_Platform_UAT/dbo.FinalPaymentCertification.md) | `FinalPaymentCertification_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.FormTemplate`](tables/IDIQ_Platform_UAT/dbo.FormTemplate.md) | `FormTemplate_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.FormTemplate`](tables/IDIQ_Platform_UAT/dbo.FormTemplate.md) | `FormTemplate_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.JobReference`](tables/IDIQ_Platform_UAT/dbo.JobReference.md) | `JobReference_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.JobReference`](tables/IDIQ_Platform_UAT/dbo.JobReference.md) | `JobReference_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `userId → id` | SET_NULL |
| [`dbo.JobSitePosting`](tables/IDIQ_Platform_UAT/dbo.JobSitePosting.md) | `JobSitePosting_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.JobSitePosting`](tables/IDIQ_Platform_UAT/dbo.JobSitePosting.md) | `JobSitePosting_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.LowestBidCertification`](tables/IDIQ_Platform_UAT/dbo.LowestBidCertification.md) | `LowestBidCertification_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | NO_ACTION |
| [`dbo.LowestBidCertification`](tables/IDIQ_Platform_UAT/dbo.LowestBidCertification.md) | `LowestBidCertification_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.ManualCloseEvent`](tables/IDIQ_Platform_UAT/dbo.ManualCloseEvent.md) | `ManualCloseEvent_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `MiniBid_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `MiniBid_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `MiniBid_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `MiniBid_selectedVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `selectedVendorId → id` | NO_ACTION |
| [`dbo.MiniBidLineItem`](tables/IDIQ_Platform_UAT/dbo.MiniBidLineItem.md) | `MiniBidLineItem_miniBidId_fkey` | [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `miniBidId → id` | CASCADE |
| [`dbo.MiniBidLineItem`](tables/IDIQ_Platform_UAT/dbo.MiniBidLineItem.md) | `MiniBidLineItem_solicitationLineItemId_fkey` | [`dbo.SolicitationLineItem`](tables/IDIQ_Platform_UAT/dbo.SolicitationLineItem.md) | `solicitationLineItemId → id` | NO_ACTION |
| [`dbo.MiniBidResponse`](tables/IDIQ_Platform_UAT/dbo.MiniBidResponse.md) | `MiniBidResponse_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | NO_ACTION |
| [`dbo.MiniBidResponse`](tables/IDIQ_Platform_UAT/dbo.MiniBidResponse.md) | `MiniBidResponse_miniBidId_fkey` | [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `miniBidId → id` | CASCADE |
| [`dbo.MiniBidResponse`](tables/IDIQ_Platform_UAT/dbo.MiniBidResponse.md) | `MiniBidResponse_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.Newspaper`](tables/IDIQ_Platform_UAT/dbo.Newspaper.md) | `Newspaper_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.NJWageHubSubmission`](tables/IDIQ_Platform_UAT/dbo.NJWageHubSubmission.md) | `NJWageHubSubmission_certifiedPayrollId_fkey` | [`dbo.CertifiedPayroll`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayroll.md) | `certifiedPayrollId → id` | SET_NULL |
| [`dbo.Notification`](tables/IDIQ_Platform_UAT/dbo.Notification.md) | `Notification_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | CASCADE |
| [`dbo.Notification`](tables/IDIQ_Platform_UAT/dbo.Notification.md) | `Notification_userId_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `userId → id` | CASCADE |
| [`dbo.OrderLineItem`](tables/IDIQ_Platform_UAT/dbo.OrderLineItem.md) | `OrderLineItem_bidLineItemId_fkey` | [`dbo.BidLineItem`](tables/IDIQ_Platform_UAT/dbo.BidLineItem.md) | `bidLineItemId → id` | NO_ACTION |
| [`dbo.OrderLineItem`](tables/IDIQ_Platform_UAT/dbo.OrderLineItem.md) | `OrderLineItem_solicitationLineItemId_fkey` | [`dbo.SolicitationLineItem`](tables/IDIQ_Platform_UAT/dbo.SolicitationLineItem.md) | `solicitationLineItemId → id` | NO_ACTION |
| [`dbo.OrderLineItem`](tables/IDIQ_Platform_UAT/dbo.OrderLineItem.md) | `OrderLineItem_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.PayrollFailure`](tables/IDIQ_Platform_UAT/dbo.PayrollFailure.md) | `PayrollFailure_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.PayrollFailure`](tables/IDIQ_Platform_UAT/dbo.PayrollFailure.md) | `PayrollFailure_trackingId_fkey` | [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform_UAT/dbo.PayrollFailureTracking.md) | `trackingId → id` | NO_ACTION |
| [`dbo.PayrollFailure`](tables/IDIQ_Platform_UAT/dbo.PayrollFailure.md) | `PayrollFailure_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform_UAT/dbo.PayrollFailureTracking.md) | `PayrollFailureTracking_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform_UAT/dbo.PayrollRecordWithholding.md) | `PayrollRecordWithholding_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform_UAT/dbo.PayrollRecordWithholding.md) | `PayrollRecordWithholding_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform_UAT/dbo.PayrollRecordWithholding.md) | `PayrollRecordWithholding_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.PrevailingWageRate`](tables/IDIQ_Platform_UAT/dbo.PrevailingWageRate.md) | `PrevailingWageRate_sourceDocumentId_fkey` | [`dbo.WageRateImport`](tables/IDIQ_Platform_UAT/dbo.WageRateImport.md) | `sourceDocumentId → id` | SET_NULL |
| [`dbo.PricingScenario`](tables/IDIQ_Platform_UAT/dbo.PricingScenario.md) | `PricingScenario_sectionId_fkey` | [`dbo.EvaluationSection`](tables/IDIQ_Platform_UAT/dbo.EvaluationSection.md) | `sectionId → id` | CASCADE |
| [`dbo.ProposalAutoScore`](tables/IDIQ_Platform_UAT/dbo.ProposalAutoScore.md) | `ProposalAutoScore_proposalId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `proposalId → id` | CASCADE |
| [`dbo.ProposalAutoScore`](tables/IDIQ_Platform_UAT/dbo.ProposalAutoScore.md) | `ProposalAutoScore_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.ProposalDocumentAcknowledgment`](tables/IDIQ_Platform_UAT/dbo.ProposalDocumentAcknowledgment.md) | `ProposalDocumentAcknowledgment_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.PublicWorksContractorRegistration`](tables/IDIQ_Platform_UAT/dbo.PublicWorksContractorRegistration.md) | `PublicWorksContractorRegistration_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.QAThread`](tables/IDIQ_Platform_UAT/dbo.QAThread.md) | `QAThread_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform_UAT/dbo.RecommendedVendor.md) | `RecommendedVendor_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | SET_NULL |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform_UAT/dbo.RecommendedVendor.md) | `RecommendedVendor_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform_UAT/dbo.RecommendedVendor.md) | `RecommendedVendor_recommendationId_fkey` | [`dbo.AwardRecommendation`](tables/IDIQ_Platform_UAT/dbo.AwardRecommendation.md) | `recommendationId → id` | CASCADE |
| [`dbo.RecommendedVendor`](tables/IDIQ_Platform_UAT/dbo.RecommendedVendor.md) | `RecommendedVendor_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | SET_NULL |
| [`dbo.ReferencePricingIndex`](tables/IDIQ_Platform_UAT/dbo.ReferencePricingIndex.md) | `ReferencePricingIndex_sectionId_fkey` | [`dbo.EvaluationSection`](tables/IDIQ_Platform_UAT/dbo.EvaluationSection.md) | `sectionId → id` | CASCADE |
| [`dbo.RetaliationComplaint`](tables/IDIQ_Platform_UAT/dbo.RetaliationComplaint.md) | `RetaliationComplaint_originalComplaintId_fkey` | [`dbo.WorkerWageProtest`](tables/IDIQ_Platform_UAT/dbo.WorkerWageProtest.md) | `originalComplaintId → id` | NO_ACTION |
| [`dbo.RetaliationComplaint`](tables/IDIQ_Platform_UAT/dbo.RetaliationComplaint.md) | `RetaliationComplaint_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `Solicitation_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `Solicitation_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `Solicitation_createdByTenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `createdByTenantId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `Solicitation_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `Solicitation_withdrawnById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `withdrawnById → id` | NO_ACTION |
| [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `SolicitationAddendum_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | `SolicitationAdvertisement_publishedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `publishedById → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | `SolicitationAdvertisement_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | `SolicitationAdvertisement_uploadedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `uploadedById → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisementAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisementAddendum.md) | `SolicitationAdvertisementAddendum_addendumId_fkey` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `addendumId → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisementAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisementAddendum.md) | `SolicitationAdvertisementAddendum_advertisementId_fkey` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | `advertisementId → id` | CASCADE |
| [`dbo.SolicitationAdvertisementNewspaper`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisementNewspaper.md) | `SolicitationAdvertisementNewspaper_advertisementId_fkey` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | `advertisementId → id` | CASCADE |
| [`dbo.SolicitationAdvertisementNewspaper`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisementNewspaper.md) | `SolicitationAdvertisementNewspaper_newspaperId_fkey` | [`dbo.Newspaper`](tables/IDIQ_Platform_UAT/dbo.Newspaper.md) | `newspaperId → id` | NO_ACTION |
| [`dbo.SolicitationAdvertisementSolicitation`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisementSolicitation.md) | `SolicitationAdvertisementSolicitation_advertisementId_fkey` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | `advertisementId → id` | CASCADE |
| [`dbo.SolicitationAdvertisementSolicitation`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisementSolicitation.md) | `SolicitationAdvertisementSolicitation_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.SolicitationCounty`](tables/IDIQ_Platform_UAT/dbo.SolicitationCounty.md) | `SolicitationCounty_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.SolicitationCounty`](tables/IDIQ_Platform_UAT/dbo.SolicitationCounty.md) | `SolicitationCounty_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationLineItem`](tables/IDIQ_Platform_UAT/dbo.SolicitationLineItem.md) | `SolicitationLineItem_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationRequiredDocument`](tables/IDIQ_Platform_UAT/dbo.SolicitationRequiredDocument.md) | `SolicitationRequiredDocument_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.SolicitationSealKey`](tables/IDIQ_Platform_UAT/dbo.SolicitationSealKey.md) | `SolicitationSealKey_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.StopWorkOrder`](tables/IDIQ_Platform_UAT/dbo.StopWorkOrder.md) | `StopWorkOrder_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.StopWorkOrder`](tables/IDIQ_Platform_UAT/dbo.StopWorkOrder.md) | `StopWorkOrder_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.StopWorkOrder`](tables/IDIQ_Platform_UAT/dbo.StopWorkOrder.md) | `StopWorkOrder_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | `Subcontractor_debarmentRecordId_fkey` | [`dbo.DebarmentRecord`](tables/IDIQ_Platform_UAT/dbo.DebarmentRecord.md) | `debarmentRecordId → id` | SET_NULL |
| [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | `Subcontractor_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | `Subcontractor_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | `Subcontractor_terminatedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `terminatedById → id` | SET_NULL |
| [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | `Subcontractor_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_approvedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `approvedById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_createdById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `createdById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_miniBidId_fkey` | [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `miniBidId → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_pricingConfirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `pricingConfirmedById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_professionalDocReviewedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `professionalDocReviewedById → id` | NO_ACTION |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `TaskOrder_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.TaskOrderAmendment`](tables/IDIQ_Platform_UAT/dbo.TaskOrderAmendment.md) | `TaskOrderAmendment_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.TaskOrderCostSavings`](tables/IDIQ_Platform_UAT/dbo.TaskOrderCostSavings.md) | `TaskOrderCostSavings_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | CASCADE |
| [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `Tenant_cooperativeId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `cooperativeId → id` | NO_ACTION |
| [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `Tenant_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.TieBreakEvent`](tables/IDIQ_Platform_UAT/dbo.TieBreakEvent.md) | `TieBreakEvent_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | CASCADE |
| [`dbo.TieBreakParticipant`](tables/IDIQ_Platform_UAT/dbo.TieBreakParticipant.md) | `TieBreakParticipant_eventId_fkey` | [`dbo.TieBreakEvent`](tables/IDIQ_Platform_UAT/dbo.TieBreakEvent.md) | `eventId → id` | CASCADE |
| [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform_UAT/dbo.UnsuccessfulBidderClaim.md) | `UnsuccessfulBidderClaim_claimantVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `claimantVendorId → id` | NO_ACTION |
| [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform_UAT/dbo.UnsuccessfulBidderClaim.md) | `UnsuccessfulBidderClaim_defendantVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `defendantVendorId → id` | NO_ACTION |
| [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform_UAT/dbo.UnsuccessfulBidderClaim.md) | `UnsuccessfulBidderClaim_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | NO_ACTION |
| [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `User_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.UserInvitation`](tables/IDIQ_Platform_UAT/dbo.UserInvitation.md) | `UserInvitation_invitedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `invitedById → id` | NO_ACTION |
| [`dbo.UserInvitation`](tables/IDIQ_Platform_UAT/dbo.UserInvitation.md) | `UserInvitation_tenantId_fkey` | [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `tenantId → id` | NO_ACTION |
| [`dbo.VendorCertification`](tables/IDIQ_Platform_UAT/dbo.VendorCertification.md) | `VendorCertification_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | CASCADE |
| [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform_UAT/dbo.VendorCriterionResponse.md) | `VendorCriterionResponse_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform_UAT/dbo.VendorCriterionResponse.md) | `VendorCriterionResponse_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform_UAT/dbo.VendorCriterionResponse.md) | `VendorCriterionResponse_criterionId_fkey` | [`dbo.EvaluationCriterion`](tables/IDIQ_Platform_UAT/dbo.EvaluationCriterion.md) | `criterionId → id` | NO_ACTION |
| [`dbo.VendorPricingIndex`](tables/IDIQ_Platform_UAT/dbo.VendorPricingIndex.md) | `VendorPricingIndex_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.VendorPricingIndex`](tables/IDIQ_Platform_UAT/dbo.VendorPricingIndex.md) | `VendorPricingIndex_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.VendorPricingIndex`](tables/IDIQ_Platform_UAT/dbo.VendorPricingIndex.md) | `VendorPricingIndex_indexId_fkey` | [`dbo.ReferencePricingIndex`](tables/IDIQ_Platform_UAT/dbo.ReferencePricingIndex.md) | `indexId → id` | NO_ACTION |
| [`dbo.VendorRelationship`](tables/IDIQ_Platform_UAT/dbo.VendorRelationship.md) | `VendorRelationship_relatedVendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `relatedVendorId → id` | NO_ACTION |
| [`dbo.VendorRelationship`](tables/IDIQ_Platform_UAT/dbo.VendorRelationship.md) | `VendorRelationship_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |
| [`dbo.VendorScenarioPrice`](tables/IDIQ_Platform_UAT/dbo.VendorScenarioPrice.md) | `VendorScenarioPrice_bidId_fkey` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `bidId → id` | CASCADE |
| [`dbo.VendorScenarioPrice`](tables/IDIQ_Platform_UAT/dbo.VendorScenarioPrice.md) | `VendorScenarioPrice_countyId_fkey` | [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `countyId → id` | NO_ACTION |
| [`dbo.VendorScenarioPrice`](tables/IDIQ_Platform_UAT/dbo.VendorScenarioPrice.md) | `VendorScenarioPrice_scenarioId_fkey` | [`dbo.PricingScenario`](tables/IDIQ_Platform_UAT/dbo.PricingScenario.md) | `scenarioId → id` | NO_ACTION |
| [`dbo.VendorTierSelection`](tables/IDIQ_Platform_UAT/dbo.VendorTierSelection.md) | `VendorTierSelection_responseId_fkey` | [`dbo.VendorCriterionResponse`](tables/IDIQ_Platform_UAT/dbo.VendorCriterionResponse.md) | `responseId → id` | CASCADE |
| [`dbo.VendorTierSelection`](tables/IDIQ_Platform_UAT/dbo.VendorTierSelection.md) | `VendorTierSelection_tierId_fkey` | [`dbo.CriterionTier`](tables/IDIQ_Platform_UAT/dbo.CriterionTier.md) | `tierId → id` | NO_ACTION |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform_UAT/dbo.WageRateDetermination.md) | `WageRateDetermination_confirmedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `confirmedById → id` | NO_ACTION |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform_UAT/dbo.WageRateDetermination.md) | `WageRateDetermination_requestedById_fkey` | [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `requestedById → id` | NO_ACTION |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform_UAT/dbo.WageRateDetermination.md) | `WageRateDetermination_solicitationId_fkey` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `solicitationId → id` | SET_NULL |
| [`dbo.WageRateDetermination`](tables/IDIQ_Platform_UAT/dbo.WageRateDetermination.md) | `WageRateDetermination_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | SET_NULL |
| [`dbo.WebhookDelivery`](tables/IDIQ_Platform_UAT/dbo.WebhookDelivery.md) | `WebhookDelivery_endpointId_fkey` | [`dbo.WebhookEndpoint`](tables/IDIQ_Platform_UAT/dbo.WebhookEndpoint.md) | `endpointId → id` | CASCADE |
| [`dbo.WorkerWageProtest`](tables/IDIQ_Platform_UAT/dbo.WorkerWageProtest.md) | `WorkerWageProtest_contractId_fkey` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `contractId → id` | NO_ACTION |
| [`dbo.WorkerWageProtest`](tables/IDIQ_Platform_UAT/dbo.WorkerWageProtest.md) | `WorkerWageProtest_taskOrderId_fkey` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `taskOrderId → id` | NO_ACTION |
| [`dbo.WorkerWageProtest`](tables/IDIQ_Platform_UAT/dbo.WorkerWageProtest.md) | `WorkerWageProtest_vendorId_fkey` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `vendorId → id` | NO_ACTION |

### `NJ_RTK`

_No FK constraints._

### `ProcurementAnalytics`

16 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.Contracts`](tables/ProcurementAnalytics/dbo.Contracts.md) | `FK__Contracts__Vendo__4222D4EF` | [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | `VendorID → VendorID` | NO_ACTION |
| [`dbo.EntityBudgets`](tables/ProcurementAnalytics/dbo.EntityBudgets.md) | `FK__EntityBud__Entit__0C85DE4D` | [`dbo.Entities`](tables/ProcurementAnalytics/dbo.Entities.md) | `EntityID → EntityID` | NO_ACTION |
| [`dbo.EntityPurchaseOrders`](tables/ProcurementAnalytics/dbo.EntityPurchaseOrders.md) | `FK__EntityPur__Entit__17036CC0` | [`dbo.Entities`](tables/ProcurementAnalytics/dbo.Entities.md) | `EntityID → EntityID` | NO_ACTION |
| [`dbo.EntityPurchaseOrders`](tables/ProcurementAnalytics/dbo.EntityPurchaseOrders.md) | `FK__EntityPurc__POID__17F790F9` | [`dbo.PurchaseOrders`](tables/ProcurementAnalytics/dbo.PurchaseOrders.md) | `POID → POID` | NO_ACTION |
| [`dbo.EntitySpend`](tables/ProcurementAnalytics/dbo.EntitySpend.md) | `FK__EntitySpe__Entit__123EB7A3` | [`dbo.Entities`](tables/ProcurementAnalytics/dbo.Entities.md) | `EntityID → EntityID` | NO_ACTION |
| [`dbo.EntitySpend`](tables/ProcurementAnalytics/dbo.EntitySpend.md) | `FK__EntitySpe__Trans__1332DBDC` | [`dbo.SpendTransactions`](tables/ProcurementAnalytics/dbo.SpendTransactions.md) | `TransactionID → TransactionID` | NO_ACTION |
| [`dbo.EntityVendors`](tables/ProcurementAnalytics/dbo.EntityVendors.md) | `FK__EntityVen__Entit__03F0984C` | [`dbo.Entities`](tables/ProcurementAnalytics/dbo.Entities.md) | `EntityID → EntityID` | NO_ACTION |
| [`dbo.EntityVendors`](tables/ProcurementAnalytics/dbo.EntityVendors.md) | `FK__EntityVen__Vendo__04E4BC85` | [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | `VendorID → VendorID` | NO_ACTION |
| [`dbo.PricingHistory`](tables/ProcurementAnalytics/dbo.PricingHistory.md) | `FK__PricingHi__Vendo__66603565` | [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | `VendorID → VendorID` | NO_ACTION |
| [`dbo.PurchaseOrderLines`](tables/ProcurementAnalytics/dbo.PurchaseOrderLines.md) | `FK__PurchaseOr__POID__52593CB8` | [`dbo.PurchaseOrders`](tables/ProcurementAnalytics/dbo.PurchaseOrders.md) | `POID → POID` | NO_ACTION |
| [`dbo.PurchaseOrders`](tables/ProcurementAnalytics/dbo.PurchaseOrders.md) | `FK__PurchaseO__Contr__4BAC3F29` | [`dbo.Contracts`](tables/ProcurementAnalytics/dbo.Contracts.md) | `ContractID → ContractID` | NO_ACTION |
| [`dbo.PurchaseOrders`](tables/ProcurementAnalytics/dbo.PurchaseOrders.md) | `FK__PurchaseO__Vendo__4AB81AF0` | [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | `VendorID → VendorID` | NO_ACTION |
| [`dbo.SpendTransactions`](tables/ProcurementAnalytics/dbo.SpendTransactions.md) | `FK__SpendTran__Contr__5CD6CB2B` | [`dbo.Contracts`](tables/ProcurementAnalytics/dbo.Contracts.md) | `ContractID → ContractID` | NO_ACTION |
| [`dbo.SpendTransactions`](tables/ProcurementAnalytics/dbo.SpendTransactions.md) | `FK__SpendTran__Vendo__5BE2A6F2` | [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | `VendorID → VendorID` | NO_ACTION |
| [`dbo.SpendTransactions`](tables/ProcurementAnalytics/dbo.SpendTransactions.md) | `FK__SpendTrans__POID__5AEE82B9` | [`dbo.PurchaseOrders`](tables/ProcurementAnalytics/dbo.PurchaseOrders.md) | `POID → POID` | NO_ACTION |
| [`dbo.VendorPerformance`](tables/ProcurementAnalytics/dbo.VendorPerformance.md) | `FK__VendorPer__Vendo__628FA481` | [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | `VendorID → VendorID` | NO_ACTION |

### `SearchData`

_No FK constraints._

### `SearchData_Test`

_No FK constraints._

### `SolarWindsOrion`

82 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.ActionAssignmentProperties`](tables/SolarWindsOrion/dbo.ActionAssignmentProperties.md) | `FK_ActionAssignmentProperties_ActionsAssignments` | [`dbo.ActionsAssignments`](tables/SolarWindsOrion/dbo.ActionsAssignments.md) | `ActionAssignmentID → ActionAssignmentID` | CASCADE |
| [`dbo.AlertActive`](tables/SolarWindsOrion/dbo.AlertActive.md) | `FK_AlertActive_AlertObjects` | [`dbo.AlertObjects`](tables/SolarWindsOrion/dbo.AlertObjects.md) | `AlertObjectID → AlertObjectID` | NO_ACTION |
| [`dbo.ContainerMemberDefinitions`](tables/SolarWindsOrion/dbo.ContainerMemberDefinitions.md) | `FK_ContainerMemberDefinitions_Containers` | [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | `ContainerID → ContainerID` | NO_ACTION |
| [`dbo.ContainerMemberSnapshots`](tables/SolarWindsOrion/dbo.ContainerMemberSnapshots.md) | `FK_ContainerMemberSnapshots_Containers` | [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | `ContainerID → ContainerID` | NO_ACTION |
| [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | `FK_Containers_StatusCalculators` | [`dbo.StatusCalculators`](tables/SolarWindsOrion/dbo.StatusCalculators.md) | `StatusCalculatorID → StatusCalculatorID` | NO_ACTION |
| [`dbo.ContainerStatus_Daily`](tables/SolarWindsOrion/dbo.ContainerStatus_Daily.md) | `FK_ContainerStatus_Daily_Containers` | [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | `ContainerID → ContainerID` | NO_ACTION |
| [`dbo.ContainerStatus_DailyData`](tables/SolarWindsOrion/dbo.ContainerStatus_DailyData.md) | `FK_ContainerStatus_DailyData_ContainerStatus_Daily` | [`dbo.ContainerStatus_Daily`](tables/SolarWindsOrion/dbo.ContainerStatus_Daily.md) | `ContainerStatusID → ContainerStatusID` | NO_ACTION |
| [`dbo.ContainerStatus_Detail`](tables/SolarWindsOrion/dbo.ContainerStatus_Detail.md) | `FK_ContainerStatus_Detail_Containers` | [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | `ContainerID → ContainerID` | NO_ACTION |
| [`dbo.ContainerStatus_Hourly`](tables/SolarWindsOrion/dbo.ContainerStatus_Hourly.md) | `FK_ContainerStatus_Hourly_Containers` | [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | `ContainerID → ContainerID` | NO_ACTION |
| [`dbo.ContainerStatus_HourlyData`](tables/SolarWindsOrion/dbo.ContainerStatus_HourlyData.md) | `FK_ContainerStatus_HourlyData_ContainerStatus_Hourly` | [`dbo.ContainerStatus_Hourly`](tables/SolarWindsOrion/dbo.ContainerStatus_Hourly.md) | `ContainerStatusID → ContainerStatusID` | NO_ACTION |
| [`dbo.DiscoveryIgnoredInterfaces`](tables/SolarWindsOrion/dbo.DiscoveryIgnoredInterfaces.md) | `FK_DiscoveryIgnoredInterfaces_DiscoveryIgnoredNodes` | [`dbo.DiscoveryIgnoredNodes`](tables/SolarWindsOrion/dbo.DiscoveryIgnoredNodes.md) | `IgnoredNodeID → ID` | NO_ACTION |
| [`dbo.DiscoveryIgnoredVolumes`](tables/SolarWindsOrion/dbo.DiscoveryIgnoredVolumes.md) | `FK_DiscoveryIgnoredVolumes_DiscoveryIgnoredNodes` | [`dbo.DiscoveryIgnoredNodes`](tables/SolarWindsOrion/dbo.DiscoveryIgnoredNodes.md) | `IgnoredNodeID → ID` | NO_ACTION |
| [`dbo.FavoriteResource`](tables/SolarWindsOrion/dbo.FavoriteResource.md) | `FK_FavoriteResource_Accounts` | [`dbo.Accounts`](tables/SolarWindsOrion/dbo.Accounts.md) | `AccountID → AccountID` | CASCADE |
| [`dbo.ForecastCapacitySettings`](tables/SolarWindsOrion/dbo.ForecastCapacitySettings.md) | `FK_ForecastCapacity_ForecastMetrics` | [`dbo.ForecastMetrics`](tables/SolarWindsOrion/dbo.ForecastMetrics.md) | `MetricId → Id` | NO_ACTION |
| [`dbo.LimitationTypesMetadata`](tables/SolarWindsOrion/dbo.LimitationTypesMetadata.md) | `FK_LimitationTypesMetadata_LimitationTypeID` | [`dbo.LimitationTypes`](tables/SolarWindsOrion/dbo.LimitationTypes.md) | `LimitationTypeID → LimitationTypeID` | CASCADE |
| [`dbo.NotificationBlogs`](tables/SolarWindsOrion/dbo.NotificationBlogs.md) | `FK_NotificationBlogs_BlogID` | [`dbo.NotificationItems`](tables/SolarWindsOrion/dbo.NotificationItems.md) | `BlogID → NotificationID` | NO_ACTION |
| [`dbo.NotificationItems`](tables/SolarWindsOrion/dbo.NotificationItems.md) | `FK_NotificationItems_Type` | [`dbo.NotificationItemTypes`](tables/SolarWindsOrion/dbo.NotificationItemTypes.md) | `NotificationTypeID → TypeID` | NO_ACTION |
| [`dbo.NotificationMaintenanceRenewals`](tables/SolarWindsOrion/dbo.NotificationMaintenanceRenewals.md) | `FK_NotificationMaintenanceRenewals_RenewalID` | [`dbo.NotificationItems`](tables/SolarWindsOrion/dbo.NotificationItems.md) | `RenewalID → NotificationID` | NO_ACTION |
| [`dbo.NotificationTypePermissions`](tables/SolarWindsOrion/dbo.NotificationTypePermissions.md) | `FK_NotificationTypePermissions_NotificationTypeID` | [`dbo.NotificationItemTypes`](tables/SolarWindsOrion/dbo.NotificationItemTypes.md) | `NotificationTypeID → TypeID` | NO_ACTION |
| [`dbo.PendingNotifications`](tables/SolarWindsOrion/dbo.PendingNotifications.md) | `FK_SubscriptionPendingNotification` | [`dbo.Subscriptions`](tables/SolarWindsOrion/dbo.Subscriptions.md) | `Subscription_Id → Id` | NO_ACTION |
| [`dbo.ResourceUserSetting`](tables/SolarWindsOrion/dbo.ResourceUserSetting.md) | `FK_ResourceUserSetting_Accounts` | [`dbo.Accounts`](tables/SolarWindsOrion/dbo.Accounts.md) | `AccountID → AccountID` | CASCADE |
| [`dbo.ResourceUserSetting`](tables/SolarWindsOrion/dbo.ResourceUserSetting.md) | `FK_ResourceUserSetting_Resource` | [`dbo.Resources`](tables/SolarWindsOrion/dbo.Resources.md) | `ResourceID → ResourceID` | CASCADE |
| [`dbo.SubscriptionTags`](tables/SolarWindsOrion/dbo.SubscriptionTags.md) | `FK_Subscription_SubscriptionTags` | [`dbo.Subscriptions`](tables/SolarWindsOrion/dbo.Subscriptions.md) | `Subscription_Id → Id` | NO_ACTION |
| [`dbo.Thresholds`](tables/SolarWindsOrion/dbo.Thresholds.md) | `FK_Thresholds_ThresholdsNames` | [`dbo.ThresholdsNames`](tables/SolarWindsOrion/dbo.ThresholdsNames.md) | `ThresholdNameId → Id` | NO_ACTION |
| [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | `FK_VoipCCMMonitoring` | [`dbo.VoipCCMMonitoringType`](tables/SolarWindsOrion/dbo.VoipCCMMonitoringType.md) | `VoipCCMMonitoringTypeID → ID` | NO_ACTION |
| [`dbo.VoipCCMMonitoringData`](tables/SolarWindsOrion/dbo.VoipCCMMonitoringData.md) | `FK_VoipCCMMonitoringData1` | [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | `VoipCCMMonitoringID → ID` | NO_ACTION |
| [`dbo.VoipCCMMonitoringData`](tables/SolarWindsOrion/dbo.VoipCCMMonitoringData.md) | `FK_VoipCCMMonitoringData2` | [`dbo.VoipCCMStatsType`](tables/SolarWindsOrion/dbo.VoipCCMStatsType.md) | `VoipCCMStatsTypeID → ID` | NO_ACTION |
| [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | `FK_VoipCCMPhones` | [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | `VoipCCMMonitoringID → ID` | NO_ACTION |
| [`dbo.VoipCCMPhonesAvayaData`](tables/SolarWindsOrion/dbo.VoipCCMPhonesAvayaData.md) | `FK_VoipCCMPhonesAvayaData` | [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | `VoipCCMPhonesID → ID` | NO_ACTION |
| [`dbo.VoipCCMPhonesCiscoData`](tables/SolarWindsOrion/dbo.VoipCCMPhonesCiscoData.md) | `FK_VoipCCMPhonesCiscoData` | [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | `VoipCCMPhonesID → ID` | NO_ACTION |
| [`dbo.VoipCCMPhoneStats_Daily`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Daily.md) | `FK_VoipCCMPhoneStats_Daily` | [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | `VoipCCMPhonesID → ID` | NO_ACTION |
| [`dbo.VoipCCMPhoneStats_Detail`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Detail.md) | `FK_VoipCCMPhoneStats_Detail` | [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | `VoipCCMPhonesID → ID` | NO_ACTION |
| [`dbo.VoipCCMPhoneStats_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Hourly.md) | `FK_VoipCCMPhoneStats_Hourly` | [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | `VoipCCMPhonesID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_Daily`](tables/SolarWindsOrion/dbo.VoipCCMStats_Daily.md) | `FK_VoipCCMStats_Daily` | [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | `VoipCCMMonitoringID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_DailyData`](tables/SolarWindsOrion/dbo.VoipCCMStats_DailyData.md) | `FK_VoipCCMStats_DailyData1` | [`dbo.VoipCCMStats_Daily`](tables/SolarWindsOrion/dbo.VoipCCMStats_Daily.md) | `VoipCCMStats_DailyID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_DailyData`](tables/SolarWindsOrion/dbo.VoipCCMStats_DailyData.md) | `FK_VoipCCMStats_DailyData2` | [`dbo.VoipCCMStatsType`](tables/SolarWindsOrion/dbo.VoipCCMStatsType.md) | `VoipCCMStatsTypeID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_Detail`](tables/SolarWindsOrion/dbo.VoipCCMStats_Detail.md) | `FK_VoipCCMStats_Detail` | [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | `VoipCCMMonitoringID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_DetailData`](tables/SolarWindsOrion/dbo.VoipCCMStats_DetailData.md) | `FK_VoipCCMStats_DetailData1` | [`dbo.VoipCCMStats_Detail`](tables/SolarWindsOrion/dbo.VoipCCMStats_Detail.md) | `VoipCCMStats_DetailID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_DetailData`](tables/SolarWindsOrion/dbo.VoipCCMStats_DetailData.md) | `FK_VoipCCMStats_DetailData2` | [`dbo.VoipCCMStatsType`](tables/SolarWindsOrion/dbo.VoipCCMStatsType.md) | `VoipCCMStatsTypeID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMStats_Hourly.md) | `FK_VoipCCMStats_Hourly` | [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | `VoipCCMMonitoringID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_HourlyData`](tables/SolarWindsOrion/dbo.VoipCCMStats_HourlyData.md) | `FK_VoipCCMStats_HourlyData1` | [`dbo.VoipCCMStats_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMStats_Hourly.md) | `VoipCCMStats_HourlyID → ID` | NO_ACTION |
| [`dbo.VoipCCMStats_HourlyData`](tables/SolarWindsOrion/dbo.VoipCCMStats_HourlyData.md) | `FK_VoipCCMStats_HourlyData2` | [`dbo.VoipCCMStatsType`](tables/SolarWindsOrion/dbo.VoipCCMStatsType.md) | `VoipCCMStatsTypeID → ID` | NO_ACTION |
| [`dbo.VoipCliConnectionInfo`](tables/SolarWindsOrion/dbo.VoipCliConnectionInfo.md) | `FK_VoipCliConnectionInfo_VoipCliConnectionProtocols` | [`dbo.VoipCliConnectionProtocols`](tables/SolarWindsOrion/dbo.VoipCliConnectionProtocols.md) | `VoipCliConnectionProtocolID → VoipCliConnectionProtocolID` | NO_ACTION |
| [`dbo.VoipEngines`](tables/SolarWindsOrion/dbo.VoipEngines.md) | `FK_VoipEngines_EngineID` | [`dbo.Engines`](tables/SolarWindsOrion/dbo.Engines.md) | `EngineID → EngineID` | CASCADE |
| [`dbo.VoipJobInfo`](tables/SolarWindsOrion/dbo.VoipJobInfo.md) | `FK_VoipJobInfo_VoipJobTypeID` | [`dbo.VoipJobType`](tables/SolarWindsOrion/dbo.VoipJobType.md) | `VoipJobTypeID → VoipJobTypeID` | NO_ACTION |
| [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `FK_VoipOperationInstances_VoipOperationStateID` | [`dbo.VoipOperationStates`](tables/SolarWindsOrion/dbo.VoipOperationStates.md) | `VoipOperationStateID → VoipOperationStateID` | NO_ACTION |
| [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `FK_VoipOperationInstances_VoipOperationStatusID` | [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | `VoipOperationStatusID → VoipOperationStatusID` | NO_ACTION |
| [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `FK_VoipOperationInstances_VoipOperationTypeID` | [`dbo.VoipOperationTypes`](tables/SolarWindsOrion/dbo.VoipOperationTypes.md) | `VoipOperationTypeID → VoipOperationTypeID` | NO_ACTION |
| [`dbo.VoipOperationParameters`](tables/SolarWindsOrion/dbo.VoipOperationParameters.md) | `FK_VoipOperationParameters_VoipOperationInstanceID` | [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `VoipOperationInstanceID → VoipOperationInstanceID` | NO_ACTION |
| [`dbo.VoipOperationParameters`](tables/SolarWindsOrion/dbo.VoipOperationParameters.md) | `FK_VoipOperationParameters_VoipOperationParameterTypeID` | [`dbo.VoipOperationParameterTypes`](tables/SolarWindsOrion/dbo.VoipOperationParameterTypes.md) | `VoipOperationParameterTypeID → VoipOperationParameterTypeID` | NO_ACTION |
| [`dbo.VoipOperationParameterTypes`](tables/SolarWindsOrion/dbo.VoipOperationParameterTypes.md) | `FK_VoipOperationParameterTypes_VoipDataTypeID` | [`dbo.VoipDataTypes`](tables/SolarWindsOrion/dbo.VoipDataTypes.md) | `VoipDataTypeID → VoipDataTypeID` | NO_ACTION |
| [`dbo.VoipOperationResultHealthStats_Daily`](tables/SolarWindsOrion/dbo.VoipOperationResultHealthStats_Daily.md) | `FK_VoipOperationResultHealthStats_Daily_VoipOperationStatusID` | [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | `VoipOperationStatusID → VoipOperationStatusID` | NO_ACTION |
| [`dbo.VoipOperationResultHealthStats_Hourly`](tables/SolarWindsOrion/dbo.VoipOperationResultHealthStats_Hourly.md) | `FK_VoipOperationResultHealthStats_Hourly_VoipOperationStatusID` | [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | `VoipOperationStatusID → VoipOperationStatusID` | NO_ACTION |
| [`dbo.VoipOperationResults_Daily`](tables/SolarWindsOrion/dbo.VoipOperationResults_Daily.md) | `FK_VoipOperationResults_Daily_VoipOperationInstanceID` | [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `VoipOperationInstanceID → VoipOperationInstanceID` | NO_ACTION |
| [`dbo.VoipOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipOperationResults_Detail.md) | `FK_VoipOperationResults_Detail_VoipOperationInstanceID` | [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `VoipOperationInstanceID → VoipOperationInstanceID` | NO_ACTION |
| [`dbo.VoipOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipOperationResults_Detail.md) | `FK_VoipOperationResults_Detail_VoipOperationResultTypeID` | [`dbo.VoipOperationResultTypes`](tables/SolarWindsOrion/dbo.VoipOperationResultTypes.md) | `VoipOperationResultTypeID → VoipOperationResultTypeID` | NO_ACTION |
| [`dbo.VoipOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipOperationResults_Detail.md) | `FK_VoipOperationResults_Detail_VoipOperationStatusID` | [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | `VoipOperationStatusID → VoipOperationStatusID` | NO_ACTION |
| [`dbo.VoipOperationResults_Hourly`](tables/SolarWindsOrion/dbo.VoipOperationResults_Hourly.md) | `FK_VoipOperationResults_Hourly_VoipOperationInstanceID` | [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `VoipOperationInstanceID → VoipOperationInstanceID` | NO_ACTION |
| [`dbo.VoipOperationThresholds`](tables/SolarWindsOrion/dbo.VoipOperationThresholds.md) | `FK_VoipOperationThresholds_VoipOperationInstanceID` | [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `VoipOperationInstanceID → VoipOperationInstanceID` | NO_ACTION |
| [`dbo.VoipOperationThresholds`](tables/SolarWindsOrion/dbo.VoipOperationThresholds.md) | `FK_VoipOperationThresholds_VoipThresholdTypeID` | [`dbo.VoipThresholdTypes`](tables/SolarWindsOrion/dbo.VoipThresholdTypes.md) | `VoipThresholdTypeID → VoipThresholdTypeID` | NO_ACTION |
| [`dbo.VoipOperationTypesThresholds`](tables/SolarWindsOrion/dbo.VoipOperationTypesThresholds.md) | `FK_VoipOperationTypesThresholds_VoipOperationTypeID` | [`dbo.VoipOperationTypes`](tables/SolarWindsOrion/dbo.VoipOperationTypes.md) | `VoipOperationTypeID → VoipOperationTypeID` | NO_ACTION |
| [`dbo.VoipOperationTypesThresholds`](tables/SolarWindsOrion/dbo.VoipOperationTypesThresholds.md) | `FK_VoipOperationTypesThresholds_VoipThresholdTypeID` | [`dbo.VoipThresholdTypes`](tables/SolarWindsOrion/dbo.VoipThresholdTypes.md) | `VoipThresholdTypeID → VoipThresholdTypeID` | NO_ACTION |
| [`dbo.VoipPathHopOperationHistoryResults`](tables/SolarWindsOrion/dbo.VoipPathHopOperationHistoryResults.md) | `FK_VoipPathHopOperationHistoryResults_VoipMetricTypeID` | [`dbo.VoipMetricTypes`](tables/SolarWindsOrion/dbo.VoipMetricTypes.md) | `VoipMetricTypeID → VoipMetricTypeID` | NO_ACTION |
| [`dbo.VoipPathHopOperationHistoryResults`](tables/SolarWindsOrion/dbo.VoipPathHopOperationHistoryResults.md) | `FK_VoipPathHopOperationHistoryResults_VoipOperationStatuses` | [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | `VoipOperationStatusID → VoipOperationStatusID` | NO_ACTION |
| [`dbo.VoipPathHopOperationResults_Daily`](tables/SolarWindsOrion/dbo.VoipPathHopOperationResults_Daily.md) | `FK_VoipPathHopOperationResults_Daily_VoipMetricTypeID` | [`dbo.VoipMetricTypes`](tables/SolarWindsOrion/dbo.VoipMetricTypes.md) | `VoipMetricTypeID → VoipMetricTypeID` | NO_ACTION |
| [`dbo.VoipPathHopOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipPathHopOperationResults_Detail.md) | `FK_VoipPathHopOperationResults_Detail_VoipMetricTypeID` | [`dbo.VoipMetricTypes`](tables/SolarWindsOrion/dbo.VoipMetricTypes.md) | `VoipMetricTypeID → VoipMetricTypeID` | NO_ACTION |
| [`dbo.VoipPathHopOperationResults_Hourly`](tables/SolarWindsOrion/dbo.VoipPathHopOperationResults_Hourly.md) | `FK_VoipPathHopOperationResults_Hourly_VoipMetricTypeID` | [`dbo.VoipMetricTypes`](tables/SolarWindsOrion/dbo.VoipMetricTypes.md) | `VoipMetricTypeID → VoipMetricTypeID` | NO_ACTION |
| [`dbo.VoipPathHops`](tables/SolarWindsOrion/dbo.VoipPathHops.md) | `FK_VoipPathHops_VoipPathID` | [`dbo.VoipPaths`](tables/SolarWindsOrion/dbo.VoipPaths.md) | `VoipPathID → VoipPathID` | NO_ACTION |
| [`dbo.VoipPathOperationResults_Daily`](tables/SolarWindsOrion/dbo.VoipPathOperationResults_Daily.md) | `FK_VoipPathOperationResults_Daily_VoipPathID` | [`dbo.VoipPaths`](tables/SolarWindsOrion/dbo.VoipPaths.md) | `VoipPathID → VoipPathID` | NO_ACTION |
| [`dbo.VoipPathOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipPathOperationResults_Detail.md) | `FK_VoipPathOperationResults_Detail_VoipPathID` | [`dbo.VoipPaths`](tables/SolarWindsOrion/dbo.VoipPaths.md) | `VoipPathID → VoipPathID` | NO_ACTION |
| [`dbo.VoipPathOperationResults_Hourly`](tables/SolarWindsOrion/dbo.VoipPathOperationResults_Hourly.md) | `FK_VoipPathOperationResults_Hourly_VoipPathID` | [`dbo.VoipPaths`](tables/SolarWindsOrion/dbo.VoipPaths.md) | `VoipPathID → VoipPathID` | NO_ACTION |
| [`dbo.VoipSiteCapabilities`](tables/SolarWindsOrion/dbo.VoipSiteCapabilities.md) | `FK_VoipSiteCapabilities_VoipOperationTypeID` | [`dbo.VoipOperationTypes`](tables/SolarWindsOrion/dbo.VoipOperationTypes.md) | `VoipOperationTypeID → VoipOperationTypeID` | NO_ACTION |
| [`dbo.VoipSiteCapabilities`](tables/SolarWindsOrion/dbo.VoipSiteCapabilities.md) | `FK_VoipSiteCapabilities_VoipSiteID` | [`dbo.VoipSites`](tables/SolarWindsOrion/dbo.VoipSites.md) | `VoipSiteID → VoipSiteID` | NO_ACTION |
| [`dbo.WebResource`](tables/SolarWindsOrion/dbo.WebResource.md) | `FK_WebResource_WebResource` | [`dbo.WebResource`](tables/SolarWindsOrion/dbo.WebResource.md) | `WebResourceID → WebResourceID` | NO_ACTION |
| [`dbo.WebResourceSetting`](tables/SolarWindsOrion/dbo.WebResourceSetting.md) | `FK_WebResourceSetting_WebResource` | [`dbo.WebResource`](tables/SolarWindsOrion/dbo.WebResource.md) | `WebResourceID → WebResourceID` | CASCADE |
| [`dbo.WebResourceUserSetting`](tables/SolarWindsOrion/dbo.WebResourceUserSetting.md) | `FK_WebResourceUserSetting_Accounts` | [`dbo.Accounts`](tables/SolarWindsOrion/dbo.Accounts.md) | `AccountID → AccountID` | CASCADE |
| [`dbo.WebResourceUserSetting`](tables/SolarWindsOrion/dbo.WebResourceUserSetting.md) | `FK_WebResourceUserSetting_WebResource` | [`dbo.WebResource`](tables/SolarWindsOrion/dbo.WebResource.md) | `WebResourceID → WebResourceID` | CASCADE |
| [`dbo.WebView`](tables/SolarWindsOrion/dbo.WebView.md) | `FK_WebView_WebView1` | [`dbo.WebView`](tables/SolarWindsOrion/dbo.WebView.md) | `WebViewParentID → WebViewID` | NO_ACTION |
| [`dbo.WebViewGroupWebView`](tables/SolarWindsOrion/dbo.WebViewGroupWebView.md) | `FK_WebViewGroupWebView_WebView` | [`dbo.WebView`](tables/SolarWindsOrion/dbo.WebView.md) | `WebViewID → WebViewID` | CASCADE |
| [`dbo.WebViewGroupWebView`](tables/SolarWindsOrion/dbo.WebViewGroupWebView.md) | `FK_WebViewGroupWebView_WebViewGroup` | [`dbo.WebViewGroup`](tables/SolarWindsOrion/dbo.WebViewGroup.md) | `WebViewGroupID → WebViewGroupID` | CASCADE |
| [`dbo.WebViewResource`](tables/SolarWindsOrion/dbo.WebViewResource.md) | `FK_WebViewResource_WebResource` | [`dbo.WebResource`](tables/SolarWindsOrion/dbo.WebResource.md) | `WebResourceID → WebResourceID` | CASCADE |
| [`dbo.WebViewResource`](tables/SolarWindsOrion/dbo.WebViewResource.md) | `FK_WebViewResource_WebView` | [`dbo.WebView`](tables/SolarWindsOrion/dbo.WebView.md) | `WebViewID → WebViewID` | CASCADE |

### `test`

_No FK constraints._

### `VendorBids`

11 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.ledger`](tables/VendorBids/dbo.ledger.md) | `FK_BidLedger_BidCalendar` | [`dbo.bidcalendar`](tables/VendorBids/dbo.bidcalendar.md) | `calendarid → calendarid` | NO_ACTION |
| [`dbo.ledger`](tables/VendorBids/dbo.ledger.md) | `FK_BidLedger_Registrations` | [`dbo.registrations`](tables/VendorBids/dbo.registrations.md) | `registrationid → registrationid` | CASCADE |
| [`dbo.ledger`](tables/VendorBids/dbo.ledger.md) | `FK_BidLedger_TranTypes` | [`dbo.trantypes`](tables/VendorBids/dbo.trantypes.md) | `trantypeid → trantypeid` | CASCADE |
| [`dbo.vendorbiditems_Orig`](tables/VendorBids/dbo.vendorbiditems_Orig.md) | `FK_VendorBidItems_VendorBids` | [`dbo.vendorbids`](tables/VendorBids/dbo.vendorbids.md) | `vendorbidid → vendorbidid` | CASCADE |
| [`dbo.vendorbiditemsjournal`](tables/VendorBids/dbo.vendorbiditemsjournal.md) | `FK_VendorBidItemsJournal_VendorBidItems` | [`dbo.vendorbiditems_Orig`](tables/VendorBids/dbo.vendorbiditems_Orig.md) | `vendorbiditemid → vendorbiditemid` | NO_ACTION |
| [`dbo.vendorbiditemsjournal`](tables/VendorBids/dbo.vendorbiditemsjournal.md) | `FK_VendorBidItemsJournal_VendorSessions` | [`dbo.vendorsessions`](tables/VendorBids/dbo.vendorsessions.md) | `sessionid → sessionid` | NO_ACTION |
| [`dbo.vendorbids`](tables/VendorBids/dbo.vendorbids.md) | `FK_VendorBids_BidCalendar` | [`dbo.bidcalendar`](tables/VendorBids/dbo.bidcalendar.md) | `calendarid → calendarid` | CASCADE |
| [`dbo.vendorbids`](tables/VendorBids/dbo.vendorbids.md) | `FK_VendorBids_Registrations` | [`dbo.registrations`](tables/VendorBids/dbo.registrations.md) | `registrationid → registrationid` | CASCADE |
| [`dbo.vendorbidsjournal`](tables/VendorBids/dbo.vendorbidsjournal.md) | `FK_VendorBidsJournal_VendorBids` | [`dbo.vendorbids`](tables/VendorBids/dbo.vendorbids.md) | `vendorbidid → vendorbidid` | NO_ACTION |
| [`dbo.vendorbidsjournal`](tables/VendorBids/dbo.vendorbidsjournal.md) | `FK_VendorBidsJournal_VendorSessions` | [`dbo.vendorsessions`](tables/VendorBids/dbo.vendorsessions.md) | `sessionid → sessionid` | NO_ACTION |
| [`dbo.vendorsessions`](tables/VendorBids/dbo.vendorsessions.md) | `FK_VendorSessions_Registrations` | [`dbo.registrations`](tables/VendorBids/dbo.registrations.md) | `registrationid → registrationid` | CASCADE |

### `VendorBids_TEST`

11 constraints.

| Child table | FK name | Parent table | Columns | On delete |
|-------------|---------|--------------|---------|-----------|
| [`dbo.ledger`](tables/VendorBids_TEST/dbo.ledger.md) | `FK_BidLedger_BidCalendar` | [`dbo.bidcalendar`](tables/VendorBids_TEST/dbo.bidcalendar.md) | `calendarid → calendarid` | NO_ACTION |
| [`dbo.ledger`](tables/VendorBids_TEST/dbo.ledger.md) | `FK_BidLedger_Registrations` | [`dbo.registrations`](tables/VendorBids_TEST/dbo.registrations.md) | `registrationid → registrationid` | CASCADE |
| [`dbo.ledger`](tables/VendorBids_TEST/dbo.ledger.md) | `FK_BidLedger_TranTypes` | [`dbo.trantypes`](tables/VendorBids_TEST/dbo.trantypes.md) | `trantypeid → trantypeid` | CASCADE |
| [`dbo.vendorbiditems_Orig`](tables/VendorBids_TEST/dbo.vendorbiditems_Orig.md) | `FK_VendorBidItems_VendorBids` | [`dbo.vendorbids`](tables/VendorBids_TEST/dbo.vendorbids.md) | `vendorbidid → vendorbidid` | CASCADE |
| [`dbo.vendorbiditemsjournal`](tables/VendorBids_TEST/dbo.vendorbiditemsjournal.md) | `FK_VendorBidItemsJournal_VendorBidItems` | [`dbo.vendorbiditems_Orig`](tables/VendorBids_TEST/dbo.vendorbiditems_Orig.md) | `vendorbiditemid → vendorbiditemid` | NO_ACTION |
| [`dbo.vendorbiditemsjournal`](tables/VendorBids_TEST/dbo.vendorbiditemsjournal.md) | `FK_VendorBidItemsJournal_VendorSessions` | [`dbo.vendorsessions`](tables/VendorBids_TEST/dbo.vendorsessions.md) | `sessionid → sessionid` | NO_ACTION |
| [`dbo.vendorbids`](tables/VendorBids_TEST/dbo.vendorbids.md) | `FK_VendorBids_BidCalendar` | [`dbo.bidcalendar`](tables/VendorBids_TEST/dbo.bidcalendar.md) | `calendarid → calendarid` | CASCADE |
| [`dbo.vendorbids`](tables/VendorBids_TEST/dbo.vendorbids.md) | `FK_VendorBids_Registrations` | [`dbo.registrations`](tables/VendorBids_TEST/dbo.registrations.md) | `registrationid → registrationid` | CASCADE |
| [`dbo.vendorbidsjournal`](tables/VendorBids_TEST/dbo.vendorbidsjournal.md) | `FK_VendorBidsJournal_VendorBids` | [`dbo.vendorbids`](tables/VendorBids_TEST/dbo.vendorbids.md) | `vendorbidid → vendorbidid` | NO_ACTION |
| [`dbo.vendorbidsjournal`](tables/VendorBids_TEST/dbo.vendorbidsjournal.md) | `FK_VendorBidsJournal_VendorSessions` | [`dbo.vendorsessions`](tables/VendorBids_TEST/dbo.vendorsessions.md) | `sessionid → sessionid` | NO_ACTION |
| [`dbo.vendorsessions`](tables/VendorBids_TEST/dbo.vendorsessions.md) | `FK_VendorSessions_Registrations` | [`dbo.registrations`](tables/VendorBids_TEST/dbo.registrations.md) | `registrationid → registrationid` | CASCADE |

### `work`

_No FK constraints._

### `WorkTables`

_No FK constraints._

## Most-referenced tables

Tables ordered by number of distinct FK constraints pointing **to** them. High fan-in tables are likely core domain entities.

| Table | Database | Inbound FK count |
|-------|----------|------------------|
| [`dbo.DocTypeField`](tables/ContentCentral/dbo.DocTypeField.md) | `ContentCentral` | 41 |
| [`dbo.User`](tables/ContentCentral/dbo.User.md) | `ContentCentral` | 33 |
| [`dbo.User`](tables/IDIQ_Platform/dbo.User.md) | `IDIQ_Platform` | 31 |
| [`dbo.User`](tables/IDIQ_Platform_UAT/dbo.User.md) | `IDIQ_Platform_UAT` | 31 |
| [`dbo.DocType`](tables/ContentCentral/dbo.DocType.md) | `ContentCentral` | 28 |
| [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | `IDIQ_Platform` | 26 |
| [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | `IDIQ_Platform_UAT` | 26 |
| [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | `IDIQ_Platform` | 21 |
| [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | `IDIQ_Platform_UAT` | 21 |
| [`dbo.Tenant`](tables/IDIQ_Platform/dbo.Tenant.md) | `IDIQ_Platform` | 18 |
| [`dbo.Tenant`](tables/IDIQ_Platform_UAT/dbo.Tenant.md) | `IDIQ_Platform_UAT` | 18 |
| [`dbo.Document`](tables/ContentCentral/dbo.Document.md) | `ContentCentral` | 16 |
| [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | `IDIQ_Platform` | 16 |
| [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | `IDIQ_Platform_UAT` | 16 |
| [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | `IDIQ_Platform` | 14 |
| [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | `IDIQ_Platform_UAT` | 14 |
| [`dbo.WorkflowTrigger`](tables/ContentCentral/dbo.WorkflowTrigger.md) | `ContentCentral` | 11 |
| [`dbo.County`](tables/IDIQ_Platform/dbo.County.md) | `IDIQ_Platform` | 11 |
| [`dbo.County`](tables/IDIQ_Platform_UAT/dbo.County.md) | `IDIQ_Platform_UAT` | 11 |
| [`dbo.Catalog`](tables/ContentCentral/dbo.Catalog.md) | `ContentCentral` | 10 |
| [`dbo.ReportTemplate`](tables/ContentCentral/dbo.ReportTemplate.md) | `ContentCentral` | 10 |
| [`dbo.ApprovalProcess`](tables/ContentCentral/dbo.ApprovalProcess.md) | `ContentCentral` | 9 |
| [`dbo.WorkflowRule`](tables/ContentCentral/dbo.WorkflowRule.md) | `ContentCentral` | 9 |
| [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | `IDIQ_Platform` | 9 |
| [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | `IDIQ_Platform_UAT` | 9 |
| [`dbo.Group`](tables/ContentCentral/dbo.Group.md) | `ContentCentral` | 8 |
| [`dbo.PacketTemplate`](tables/ContentCentral/dbo.PacketTemplate.md) | `ContentCentral` | 8 |
| [`dbo.WorkflowAction`](tables/ContentCentral/dbo.WorkflowAction.md) | `ContentCentral` | 8 |
| [`dbo.MessageTemplate`](tables/ContentCentral/dbo.MessageTemplate.md) | `ContentCentral` | 6 |
| [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | `IDIQ_Platform` | 6 |
| [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | `IDIQ_Platform_UAT` | 6 |
| [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | `ProcurementAnalytics` | 6 |
| [`dbo.ApprovalProcessGroup`](tables/ContentCentral/dbo.ApprovalProcessGroup.md) | `ContentCentral` | 5 |
| [`dbo.PostScanDocument`](tables/ContentCentral/dbo.PostScanDocument.md) | `ContentCentral` | 5 |
| [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | `SolarWindsOrion` | 5 |
| [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | `SolarWindsOrion` | 5 |
| [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | `SolarWindsOrion` | 5 |
| [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | `SolarWindsOrion` | 5 |
| [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | `SolarWindsOrion` | 5 |
| [`dbo.ApprovalProcessMember`](tables/ContentCentral/dbo.ApprovalProcessMember.md) | `ContentCentral` | 4 |
| [`dbo.Fields`](tables/Documents/dbo.Fields.md) | `Documents` | 4 |
| [`dbo.District`](tables/EDS/dbo.District.md) | `EDS` | 4 |
| [`dbo.District`](tables/EDS_Test/dbo.District.md) | `EDS_Test` | 4 |
| [`dbo.District`](tables/EDS_TEST_Old/dbo.District.md) | `EDS_TEST_Old` | 4 |
| [`dbo.Entities`](tables/ProcurementAnalytics/dbo.Entities.md) | `ProcurementAnalytics` | 4 |
| [`dbo.VoipCCMStatsType`](tables/SolarWindsOrion/dbo.VoipCCMStatsType.md) | `SolarWindsOrion` | 4 |
| [`dbo.VoipMetricTypes`](tables/SolarWindsOrion/dbo.VoipMetricTypes.md) | `SolarWindsOrion` | 4 |
| [`dbo.VoipPaths`](tables/SolarWindsOrion/dbo.VoipPaths.md) | `SolarWindsOrion` | 4 |
| [`dbo.WebResource`](tables/SolarWindsOrion/dbo.WebResource.md) | `SolarWindsOrion` | 4 |
| [`dbo.DocTypeFieldExternalLookup`](tables/ContentCentral/dbo.DocTypeFieldExternalLookup.md) | `ContentCentral` | 3 |
| [`dbo.DocumentFolder`](tables/ContentCentral/dbo.DocumentFolder.md) | `ContentCentral` | 3 |
| [`dbo.DocumentVersion`](tables/ContentCentral/dbo.DocumentVersion.md) | `ContentCentral` | 3 |
| [`dbo.QCard`](tables/ContentCentral/dbo.QCard.md) | `ContentCentral` | 3 |
| [`dbo.Budgets`](tables/EDS/dbo.Budgets.md) | `EDS` | 3 |
| [`dbo.Vendors`](tables/EDS/dbo.Vendors.md) | `EDS` | 3 |
| [`dbo.Budgets`](tables/EDS_Test/dbo.Budgets.md) | `EDS_Test` | 3 |
| [`dbo.Vendors`](tables/EDS_Test/dbo.Vendors.md) | `EDS_Test` | 3 |
| [`dbo.Budgets`](tables/EDS_TEST_Old/dbo.Budgets.md) | `EDS_TEST_Old` | 3 |
| [`dbo.Vendors`](tables/EDS_TEST_Old/dbo.Vendors.md) | `EDS_TEST_Old` | 3 |
| [`dbo.EvaluationSection`](tables/IDIQ_Platform/dbo.EvaluationSection.md) | `IDIQ_Platform` | 3 |
| [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | `IDIQ_Platform` | 3 |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | `IDIQ_Platform` | 3 |
| [`dbo.SolicitationLineItem`](tables/IDIQ_Platform/dbo.SolicitationLineItem.md) | `IDIQ_Platform` | 3 |
| [`dbo.EvaluationSection`](tables/IDIQ_Platform_UAT/dbo.EvaluationSection.md) | `IDIQ_Platform_UAT` | 3 |
| [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | `IDIQ_Platform_UAT` | 3 |
| [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | `IDIQ_Platform_UAT` | 3 |
| [`dbo.SolicitationLineItem`](tables/IDIQ_Platform_UAT/dbo.SolicitationLineItem.md) | `IDIQ_Platform_UAT` | 3 |
| [`dbo.PurchaseOrders`](tables/ProcurementAnalytics/dbo.PurchaseOrders.md) | `ProcurementAnalytics` | 3 |
| [`dbo.Accounts`](tables/SolarWindsOrion/dbo.Accounts.md) | `SolarWindsOrion` | 3 |
| [`dbo.VoipOperationTypes`](tables/SolarWindsOrion/dbo.VoipOperationTypes.md) | `SolarWindsOrion` | 3 |
| [`dbo.WebView`](tables/SolarWindsOrion/dbo.WebView.md) | `SolarWindsOrion` | 3 |
| [`dbo.registrations`](tables/VendorBids/dbo.registrations.md) | `VendorBids` | 3 |
| [`dbo.registrations`](tables/VendorBids_TEST/dbo.registrations.md) | `VendorBids_TEST` | 3 |
| [`dbo.ApprovalProcessGroupMember`](tables/ContentCentral/dbo.ApprovalProcessGroupMember.md) | `ContentCentral` | 2 |
| [`dbo.CaptureJob`](tables/ContentCentral/dbo.CaptureJob.md) | `ContentCentral` | 2 |
| [`dbo.CaptureJobInputItem`](tables/ContentCentral/dbo.CaptureJobInputItem.md) | `ContentCentral` | 2 |
| [`dbo.CaptureJobSinglePageImageItem`](tables/ContentCentral/dbo.CaptureJobSinglePageImageItem.md) | `ContentCentral` | 2 |
| [`dbo.DocTypeCaptureForm`](tables/ContentCentral/dbo.DocTypeCaptureForm.md) | `ContentCentral` | 2 |
| [`dbo.DocTypeFieldRecognitionZone`](tables/ContentCentral/dbo.DocTypeFieldRecognitionZone.md) | `ContentCentral` | 2 |
| [`dbo.DocumentVersionFile`](tables/ContentCentral/dbo.DocumentVersionFile.md) | `ContentCentral` | 2 |
| [`dbo.ExportDataTemplate`](tables/ContentCentral/dbo.ExportDataTemplate.md) | `ContentCentral` | 2 |
| [`dbo.ExternalApplication`](tables/ContentCentral/dbo.ExternalApplication.md) | `ContentCentral` | 2 |
| [`dbo.UITheme`](tables/ContentCentral/dbo.UITheme.md) | `ContentCentral` | 2 |
| [`dbo.DocumentTypeLookups`](tables/Documents/dbo.DocumentTypeLookups.md) | `Documents` | 2 |
| [`dbo.DocumentTypes`](tables/Documents/dbo.DocumentTypes.md) | `Documents` | 2 |
| [`dbo.Views`](tables/Documents/dbo.Views.md) | `Documents` | 2 |
| [`dbo.Accounts`](tables/EDS/dbo.Accounts.md) | `EDS` | 2 |
| [`dbo.CatalogRequest`](tables/EDS/dbo.CatalogRequest.md) | `EDS` | 2 |
| [`dbo.Category`](tables/EDS/dbo.Category.md) | `EDS` | 2 |
| [`dbo.VendorQueryMSRP`](tables/EDS/dbo.VendorQueryMSRP.md) | `EDS` | 2 |
| [`dbo.VendorQueryTandM`](tables/EDS/dbo.VendorQueryTandM.md) | `EDS` | 2 |
| [`dbo.Accounts`](tables/EDS_Test/dbo.Accounts.md) | `EDS_Test` | 2 |
| [`dbo.CatalogRequest`](tables/EDS_Test/dbo.CatalogRequest.md) | `EDS_Test` | 2 |
| [`dbo.Category`](tables/EDS_Test/dbo.Category.md) | `EDS_Test` | 2 |
| [`dbo.VendorQueryMSRP`](tables/EDS_Test/dbo.VendorQueryMSRP.md) | `EDS_Test` | 2 |
| [`dbo.VendorQueryTandM`](tables/EDS_Test/dbo.VendorQueryTandM.md) | `EDS_Test` | 2 |
| [`dbo.Accounts`](tables/EDS_TEST_Old/dbo.Accounts.md) | `EDS_TEST_Old` | 2 |
| [`dbo.CatalogRequest`](tables/EDS_TEST_Old/dbo.CatalogRequest.md) | `EDS_TEST_Old` | 2 |
| [`dbo.Category`](tables/EDS_TEST_Old/dbo.Category.md) | `EDS_TEST_Old` | 2 |
| [`dbo.VendorQueryMSRP`](tables/EDS_TEST_Old/dbo.VendorQueryMSRP.md) | `EDS_TEST_Old` | 2 |
| [`dbo.VendorQueryTandM`](tables/EDS_TEST_Old/dbo.VendorQueryTandM.md) | `EDS_TEST_Old` | 2 |
| [`dbo.CertifiedPayroll`](tables/IDIQ_Platform/dbo.CertifiedPayroll.md) | `IDIQ_Platform` | 2 |
| [`dbo.CooperativeSystemConfig`](tables/IDIQ_Platform/dbo.CooperativeSystemConfig.md) | `IDIQ_Platform` | 2 |
| [`dbo.DebarmentRecord`](tables/IDIQ_Platform/dbo.DebarmentRecord.md) | `IDIQ_Platform` | 2 |
| [`dbo.EvaluationCriterion`](tables/IDIQ_Platform/dbo.EvaluationCriterion.md) | `IDIQ_Platform` | 2 |
| [`dbo.CertifiedPayroll`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayroll.md) | `IDIQ_Platform_UAT` | 2 |
| [`dbo.CooperativeSystemConfig`](tables/IDIQ_Platform_UAT/dbo.CooperativeSystemConfig.md) | `IDIQ_Platform_UAT` | 2 |
| [`dbo.DebarmentRecord`](tables/IDIQ_Platform_UAT/dbo.DebarmentRecord.md) | `IDIQ_Platform_UAT` | 2 |
| [`dbo.EvaluationCriterion`](tables/IDIQ_Platform_UAT/dbo.EvaluationCriterion.md) | `IDIQ_Platform_UAT` | 2 |
| [`dbo.Contracts`](tables/ProcurementAnalytics/dbo.Contracts.md) | `ProcurementAnalytics` | 2 |
| [`dbo.DiscoveryIgnoredNodes`](tables/SolarWindsOrion/dbo.DiscoveryIgnoredNodes.md) | `SolarWindsOrion` | 2 |
| [`dbo.NotificationItems`](tables/SolarWindsOrion/dbo.NotificationItems.md) | `SolarWindsOrion` | 2 |
| [`dbo.NotificationItemTypes`](tables/SolarWindsOrion/dbo.NotificationItemTypes.md) | `SolarWindsOrion` | 2 |
| [`dbo.Subscriptions`](tables/SolarWindsOrion/dbo.Subscriptions.md) | `SolarWindsOrion` | 2 |
| [`dbo.VoipThresholdTypes`](tables/SolarWindsOrion/dbo.VoipThresholdTypes.md) | `SolarWindsOrion` | 2 |
| [`dbo.bidcalendar`](tables/VendorBids/dbo.bidcalendar.md) | `VendorBids` | 2 |
| [`dbo.vendorbids`](tables/VendorBids/dbo.vendorbids.md) | `VendorBids` | 2 |
| [`dbo.vendorsessions`](tables/VendorBids/dbo.vendorsessions.md) | `VendorBids` | 2 |
| [`dbo.bidcalendar`](tables/VendorBids_TEST/dbo.bidcalendar.md) | `VendorBids_TEST` | 2 |
| [`dbo.vendorbids`](tables/VendorBids_TEST/dbo.vendorbids.md) | `VendorBids_TEST` | 2 |
| [`dbo.vendorsessions`](tables/VendorBids_TEST/dbo.vendorsessions.md) | `VendorBids_TEST` | 2 |

## Cross-database view dependencies

Views that use 3-part names to reach into another database. Complements `docs/dependencies/` (which covers modules).

**392** edges.

### `EDS` → `ContentCentral`

| View | References |
|------|------------|
| [`dbo.vw_ScanDocLookupFields`](tables/EDS/dbo.vw_ScanDocLookupFields.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookup`, `dbo.DocTypeFieldExternalLookupItem` |
| [`dbo.vw_ScanDocLookupTargets`](tables/EDS/dbo.vw_ScanDocLookupTargets.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookup`, `dbo.DocTypeFieldExternalLookupSelectItem` |
| [`dbo.vw_ScanDocLookups`](tables/EDS/dbo.vw_ScanDocLookups.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeFieldExternalLookup` |
| [`dbo.vw_ScannedDocumentDataMSDS`](tables/EDS/dbo.vw_ScannedDocumentDataMSDS.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.Document`, `dbo.DocumentField`, `dbo.DocumentFolder`, `dbo.DocumentVersion`, `dbo.DocumentVersionFile` |
| [`dbo.vw_ZonalItems`](tables/EDS/dbo.vw_ZonalItems.md) | `dbo.CaptureJob`, `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldRecognitionZone` |

### `EDS` → `Documents`

| View | References |
|------|------------|
| [`dbo.vw_DMSAllDocuments`](tables/EDS/dbo.vw_DMSAllDocuments.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes` |
| [`dbo.vw_DMSBidDocuments_View`](tables/EDS/dbo.vw_DMSBidDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSRTKDocuments`](tables/EDS/dbo.vw_DMSRTKDocuments.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSRTKSurveys`](tables/EDS/dbo.vw_DMSRTKSurveys.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSSDSDocuments_View`](tables/EDS/dbo.vw_DMSSDSDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocumentsTest`](tables/EDS/dbo.vw_DMSVendorBidDocumentsTest.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_04232018`](tables/EDS/dbo.vw_DMSVendorBidDocuments_04232018.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_View`](tables/EDS/dbo.vw_DMSVendorBidDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_ViewTest`](tables/EDS/dbo.vw_DMSVendorBidDocuments_ViewTest.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorDocuments_View`](tables/EDS/dbo.vw_DMSVendorDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_RTKContentCentralMSDS`](tables/EDS/dbo.vw_RTKContentCentralMSDS.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |

### `EDS` → `VendorBids`

| View | References |
|------|------------|
| [`dbo.VendorBidLookup`](tables/EDS/dbo.VendorBidLookup.md) | `dbo.bidcalendar`, `dbo.registrations`, `dbo.vendorBids` |
| [`dbo.vw_BidMgrBidderDocs`](tables/EDS/dbo.vw_BidMgrBidderDocs.md) | `dbo.vw_DocumentUploads` |
| [`dbo.vw_RptExpireDateBidDocs`](tables/EDS/dbo.vw_RptExpireDateBidDocs.md) | `dbo.vw_DocumentUploads` |
| [`dbo.vw_VendorBlast`](tables/EDS/dbo.vw_VendorBlast.md) | `dbo.BidSchedule`, `dbo.BidScheduleCats`, `dbo.DownloadLog`, `dbo.RegCalendar`, `dbo.Registrations`, `dbo.regusers`, `dbo.vendorbids` |
| [`dbo.vw_VendorBlast_DownloadedBySchedule`](tables/EDS/dbo.vw_VendorBlast_DownloadedBySchedule.md) | `dbo.bidcalendar`, `dbo.BidScheduleCats`, `dbo.DownloadLog`, `dbo.registrations`, `dbo.regusers` |
| [`dbo.vw_VendorBlast_RegisteredBySchedule`](tables/EDS/dbo.vw_VendorBlast_RegisteredBySchedule.md) | `dbo.BidMgrVendorEmailListView` |
| [`dbo.vw_VendorBlast_SubmittedByBid`](tables/EDS/dbo.vw_VendorBlast_SubmittedByBid.md) | `dbo.registrations`, `dbo.vendorbids` |

### `EDS` → `catalogs`

| View | References |
|------|------------|
| [`dbo.vw_CatalogCompare`](tables/EDS/dbo.vw_CatalogCompare.md) | `dbo.Master Catalog` |

### `EDS` → `master`

| View | References |
|------|------------|
| [`dbo.PODetailJavaExport`](tables/EDS/dbo.PODetailJavaExport.md) | `dbo.ufn_RegExReplace` |
| [`dbo.vw_BidTabReadyNotifications`](tables/EDS/dbo.vw_BidTabReadyNotifications.md) | `dbo.RegExpMatch` |
| [`dbo.vw_DetailDescription`](tables/EDS/dbo.vw_DetailDescription.md) | `dbo.ufn_RegExReplace` |
| [`dbo.vw_Financials`](tables/EDS/dbo.vw_Financials.md) | `dbo.ufn_RegExSplit` |
| [`dbo.vw_SDSImportView`](tables/EDS/dbo.vw_SDSImportView.md) | `dbo.ufn_RegExIsMatch` |
| [`dbo.vw_SearchDescription`](tables/EDS/dbo.vw_SearchDescription.md) | `dbo.ufn_RegExReplace` |

### `EDS_TEST_Old` → `ContentCentral`

| View | References |
|------|------------|
| [`dbo.vw_ScanDocLookupFields`](tables/EDS_TEST_Old/dbo.vw_ScanDocLookupFields.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookup`, `dbo.DocTypeFieldExternalLookupItem` |
| [`dbo.vw_ScanDocLookupTargets`](tables/EDS_TEST_Old/dbo.vw_ScanDocLookupTargets.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookup`, `dbo.DocTypeFieldExternalLookupSelectItem` |
| [`dbo.vw_ScanDocLookups`](tables/EDS_TEST_Old/dbo.vw_ScanDocLookups.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeFieldExternalLookup` |
| [`dbo.vw_ScannedDocumentDataMSDS`](tables/EDS_TEST_Old/dbo.vw_ScannedDocumentDataMSDS.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.Document`, `dbo.DocumentField`, `dbo.DocumentFolder`, `dbo.DocumentVersion`, `dbo.DocumentVersionFile` |
| [`dbo.vw_ZonalItems`](tables/EDS_TEST_Old/dbo.vw_ZonalItems.md) | `dbo.CaptureJob`, `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldRecognitionZone` |

### `EDS_TEST_Old` → `Documents`

| View | References |
|------|------------|
| [`dbo.vw_DMSAllDocuments`](tables/EDS_TEST_Old/dbo.vw_DMSAllDocuments.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes` |
| [`dbo.vw_DMSBidDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSBidDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSRTKDocuments`](tables/EDS_TEST_Old/dbo.vw_DMSRTKDocuments.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSRTKSurveys`](tables/EDS_TEST_Old/dbo.vw_DMSRTKSurveys.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSSDSDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSSDSDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocumentsTest`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocumentsTest.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_04232018`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocuments_04232018.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_ViewTest`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocuments_ViewTest.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSVendorDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_RTKContentCentralMSDS`](tables/EDS_TEST_Old/dbo.vw_RTKContentCentralMSDS.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |

### `EDS_TEST_Old` → `EDS`

| View | References |
|------|------------|
| [`dbo.BidMgrBidTradeCountiesView`](tables/EDS_TEST_Old/dbo.BidMgrBidTradeCountiesView.md) | `dbo.BidTradeCounties`, `dbo.Counties` |
| [`dbo.vw_BidImportMostRecentContactInfo`](tables/EDS_TEST_Old/dbo.vw_BidImportMostRecentContactInfo.md) | `dbo.BidImports` |
| [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocs.md) | `dbo.vw_AwardedVendorsAllCurrentAndFutureBids` |
| [`dbo.vw_ScannedDocumentDataMSDSCategories`](tables/EDS_TEST_Old/dbo.vw_ScannedDocumentDataMSDSCategories.md) | `dbo.vw_ScannedDocumentDataMSDS` |
| [`dbo.vw_ScannedDocumentDataMSDSManufacturers`](tables/EDS_TEST_Old/dbo.vw_ScannedDocumentDataMSDSManufacturers.md) | `dbo.vw_ScannedDocumentDataMSDS` |
| [`dbo.vw_VendorsTable`](tables/EDS_TEST_Old/dbo.vw_VendorsTable.md) | `dbo.Vendors` |

### `EDS_TEST_Old` → `VendorBids`

| View | References |
|------|------------|
| [`dbo.VendorBidLookup`](tables/EDS_TEST_Old/dbo.VendorBidLookup.md) | `dbo.bidcalendar`, `dbo.registrations`, `dbo.vendorBids` |
| [`dbo.vw_BidMgrBidderDocs`](tables/EDS_TEST_Old/dbo.vw_BidMgrBidderDocs.md) | `dbo.vw_DocumentUploads` |
| [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocs.md) | `dbo.vw_DocumentUploads` |
| [`dbo.vw_VendorBlast`](tables/EDS_TEST_Old/dbo.vw_VendorBlast.md) | `dbo.BidSchedule`, `dbo.BidScheduleCats`, `dbo.DownloadLog`, `dbo.RegCalendar`, `dbo.Registrations`, `dbo.regusers`, `dbo.vendorbids` |
| [`dbo.vw_VendorBlast_DownloadedBySchedule`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_DownloadedBySchedule.md) | `dbo.bidcalendar`, `dbo.BidScheduleCats`, `dbo.DownloadLog`, `dbo.registrations`, `dbo.regusers` |
| [`dbo.vw_VendorBlast_RegisteredBySchedule`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_RegisteredBySchedule.md) | `dbo.BidMgrVendorEmailListView` |
| [`dbo.vw_VendorBlast_SubmittedByBid`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_SubmittedByBid.md) | `dbo.registrations`, `dbo.vendorbids` |

### `EDS_TEST_Old` → `catalogs`

| View | References |
|------|------------|
| [`dbo.vw_CatalogCompare`](tables/EDS_TEST_Old/dbo.vw_CatalogCompare.md) | `dbo.Master Catalog` |

### `EDS_TEST_Old` → `master`

| View | References |
|------|------------|
| [`dbo.PODetailJavaExport`](tables/EDS_TEST_Old/dbo.PODetailJavaExport.md) | `dbo.ufn_RegExReplace` |
| [`dbo.vw_BidTabReadyNotifications`](tables/EDS_TEST_Old/dbo.vw_BidTabReadyNotifications.md) | `dbo.RegExpMatch` |
| [`dbo.vw_DetailDescription`](tables/EDS_TEST_Old/dbo.vw_DetailDescription.md) | `dbo.ufn_RegExReplace` |
| [`dbo.vw_Financials`](tables/EDS_TEST_Old/dbo.vw_Financials.md) | `dbo.ufn_RegExSplit` |
| [`dbo.vw_SDSImportView`](tables/EDS_TEST_Old/dbo.vw_SDSImportView.md) | `dbo.ufn_RegExIsMatch` |
| [`dbo.vw_SearchDescription`](tables/EDS_TEST_Old/dbo.vw_SearchDescription.md) | `dbo.ufn_RegExReplace` |
| [`dbo.vw_SearchDescriptionBid`](tables/EDS_TEST_Old/dbo.vw_SearchDescriptionBid.md) | `dbo.ufn_RegExReplace` |

### `EDS_Test` → `ContentCentral`

| View | References |
|------|------------|
| [`dbo.vw_ScanDocLookupFields`](tables/EDS_Test/dbo.vw_ScanDocLookupFields.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookup`, `dbo.DocTypeFieldExternalLookupItem` |
| [`dbo.vw_ScanDocLookupTargets`](tables/EDS_Test/dbo.vw_ScanDocLookupTargets.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookup`, `dbo.DocTypeFieldExternalLookupSelectItem` |
| [`dbo.vw_ScanDocLookups`](tables/EDS_Test/dbo.vw_ScanDocLookups.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeFieldExternalLookup` |
| [`dbo.vw_ScannedDocumentDataMSDS`](tables/EDS_Test/dbo.vw_ScannedDocumentDataMSDS.md) | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.Document`, `dbo.DocumentField`, `dbo.DocumentFolder`, `dbo.DocumentVersion`, `dbo.DocumentVersionFile` |
| [`dbo.vw_ZonalItems`](tables/EDS_Test/dbo.vw_ZonalItems.md) | `dbo.CaptureJob`, `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.DocTypeFieldRecognitionZone` |

### `EDS_Test` → `Documents`

| View | References |
|------|------------|
| [`dbo.vw_DMSAllDocuments`](tables/EDS_Test/dbo.vw_DMSAllDocuments.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes` |
| [`dbo.vw_DMSBidDocuments_View`](tables/EDS_Test/dbo.vw_DMSBidDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSRTKDocuments`](tables/EDS_Test/dbo.vw_DMSRTKDocuments.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSRTKSurveys`](tables/EDS_Test/dbo.vw_DMSRTKSurveys.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSSDSDocuments_View`](tables/EDS_Test/dbo.vw_DMSSDSDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocumentsTest`](tables/EDS_Test/dbo.vw_DMSVendorBidDocumentsTest.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_04232018`](tables/EDS_Test/dbo.vw_DMSVendorBidDocuments_04232018.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_View`](tables/EDS_Test/dbo.vw_DMSVendorBidDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorBidDocuments_ViewTest`](tables/EDS_Test/dbo.vw_DMSVendorBidDocuments_ViewTest.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_DMSVendorDocuments_View`](tables/EDS_Test/dbo.vw_DMSVendorDocuments_View.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |
| [`dbo.vw_RTKContentCentralMSDS`](tables/EDS_Test/dbo.vw_RTKContentCentralMSDS.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |

### `EDS_Test` → `EDS`

| View | References |
|------|------------|
| [`dbo.BidMgrBidTradeCountiesView`](tables/EDS_Test/dbo.BidMgrBidTradeCountiesView.md) | `dbo.BidTradeCounties`, `dbo.Counties` |
| [`dbo.vw_BidImportMostRecentContactInfo`](tables/EDS_Test/dbo.vw_BidImportMostRecentContactInfo.md) | `dbo.BidImports` |
| [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocs.md) | `dbo.vw_AwardedVendorsAllCurrentAndFutureBids` |
| [`dbo.vw_ScannedDocumentDataMSDSCategories`](tables/EDS_Test/dbo.vw_ScannedDocumentDataMSDSCategories.md) | `dbo.vw_ScannedDocumentDataMSDS` |
| [`dbo.vw_ScannedDocumentDataMSDSManufacturers`](tables/EDS_Test/dbo.vw_ScannedDocumentDataMSDSManufacturers.md) | `dbo.vw_ScannedDocumentDataMSDS` |
| [`dbo.vw_VendorsTable`](tables/EDS_Test/dbo.vw_VendorsTable.md) | `dbo.Vendors` |

### `EDS_Test` → `VendorBids`

| View | References |
|------|------------|
| [`dbo.VendorBidLookup`](tables/EDS_Test/dbo.VendorBidLookup.md) | `dbo.bidcalendar`, `dbo.registrations`, `dbo.vendorBids` |
| [`dbo.vw_BidMgrBidderDocs`](tables/EDS_Test/dbo.vw_BidMgrBidderDocs.md) | `dbo.vw_DocumentUploads` |
| [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocs.md) | `dbo.vw_DocumentUploads` |
| [`dbo.vw_VendorBlast`](tables/EDS_Test/dbo.vw_VendorBlast.md) | `dbo.BidSchedule`, `dbo.BidScheduleCats`, `dbo.DownloadLog`, `dbo.RegCalendar`, `dbo.Registrations`, `dbo.regusers`, `dbo.vendorbids` |
| [`dbo.vw_VendorBlast_DownloadedBySchedule`](tables/EDS_Test/dbo.vw_VendorBlast_DownloadedBySchedule.md) | `dbo.bidcalendar`, `dbo.BidScheduleCats`, `dbo.DownloadLog`, `dbo.registrations`, `dbo.regusers` |
| [`dbo.vw_VendorBlast_RegisteredBySchedule`](tables/EDS_Test/dbo.vw_VendorBlast_RegisteredBySchedule.md) | `dbo.BidMgrVendorEmailListView` |
| [`dbo.vw_VendorBlast_SubmittedByBid`](tables/EDS_Test/dbo.vw_VendorBlast_SubmittedByBid.md) | `dbo.registrations`, `dbo.vendorbids` |

### `EDS_Test` → `catalogs`

| View | References |
|------|------------|
| [`dbo.vw_CatalogCompare`](tables/EDS_Test/dbo.vw_CatalogCompare.md) | `dbo.Master Catalog` |

### `EDS_Test` → `master`

| View | References |
|------|------------|
| [`dbo.PODetailJavaExport`](tables/EDS_Test/dbo.PODetailJavaExport.md) | `dbo.ufn_RegExReplace` |
| [`dbo.vw_BidTabReadyNotifications`](tables/EDS_Test/dbo.vw_BidTabReadyNotifications.md) | `dbo.RegExpMatch` |
| [`dbo.vw_DetailDescription`](tables/EDS_Test/dbo.vw_DetailDescription.md) | `dbo.ufn_RegExReplace` |
| [`dbo.vw_Financials`](tables/EDS_Test/dbo.vw_Financials.md) | `dbo.ufn_RegExSplit` |
| [`dbo.vw_SDSImportView`](tables/EDS_Test/dbo.vw_SDSImportView.md) | `dbo.ufn_RegExIsMatch` |
| [`dbo.vw_SearchDescription`](tables/EDS_Test/dbo.vw_SearchDescription.md) | `dbo.ufn_RegExReplace` |

### `NJ_RTK` → `Documents`

| View | References |
|------|------------|
| [`dbo.vw_DMSCheck`](tables/NJ_RTK/dbo.vw_DMSCheck.md) | `dbo.DocumentFiles`, `dbo.Documents`, `dbo.DocumentTypeFields`, `dbo.DocumentTypes`, `dbo.FieldData`, `dbo.Fields` |

### `NJ_RTK` → `EDS`

| View | References |
|------|------------|
| [`dbo.vw_RTKChanges`](tables/NJ_RTK/dbo.vw_RTKChanges.md) | `dbo.Category`, `dbo.vw_RTKInfo` |
| [`dbo.vw_RTKChangesOrig`](tables/NJ_RTK/dbo.vw_RTKChangesOrig.md) | `dbo.vw_RTKInfo` |
| [`dbo.vw_RTKData`](tables/NJ_RTK/dbo.vw_RTKData.md) | `dbo.Category`, `dbo.vw_RTKInfoAnnual` |
| [`dbo.vw_reportedData`](tables/NJ_RTK/dbo.vw_reportedData.md) | `dbo.RTK_ContainerCodes`, `dbo.RTK_InventoryRangeCodes`, `dbo.RTK_MixtureCodes`, `dbo.RTK_UOMCodes` |

### `NJ_RTK` → `eds`

| View | References |
|------|------------|
| [`dbo.vw_InventoryRange`](tables/NJ_RTK/dbo.vw_InventoryRange.md) | `dbo.RTK_Inventories`, `dbo.RTK_ReportItems`, `dbo.RTK_Sites` |
| [`dbo.vw_RTKChanges`](tables/NJ_RTK/dbo.vw_RTKChanges.md) | `dbo.DistrictCategories` |
| [`dbo.vw_RTKData`](tables/NJ_RTK/dbo.vw_RTKData.md) | `dbo.DistrictCategories` |

### `VendorBids` → `EDS`

| View | References |
|------|------------|
| [`dbo.vendordocumentsviewByUser`](tables/VendorBids/dbo.vendordocumentsviewByUser.md) | `dbo.BidDocumentTypes`, `dbo.BidHeaderCheckList`, `dbo.vw_DMSVendorDocuments` |
| [`dbo.vw_UploadedDocuments`](tables/VendorBids/dbo.vw_UploadedDocuments.md) | `dbo.vw_DMSVendorBidDocuments`, `dbo.vw_DMSVendorDocuments` |

### `VendorBids` → `eds`

| View | References |
|------|------------|
| [`dbo.BidMgrVendorbidsForImport`](tables/VendorBids/dbo.BidMgrVendorbidsForImport.md) | `dbo.bidimports` |
| [`dbo.vw_UploadedDocuments`](tables/VendorBids/dbo.vw_UploadedDocuments.md) | `dbo.BidderCheckList` |

### `VendorBids_TEST` → `EDS`

| View | References |
|------|------------|
| [`dbo.vendordocumentsviewByUser`](tables/VendorBids_TEST/dbo.vendordocumentsviewByUser.md) | `dbo.BidDocumentTypes`, `dbo.BidHeaderCheckList`, `dbo.vw_DMSVendorDocuments` |
| [`dbo.vw_UploadedDocuments`](tables/VendorBids_TEST/dbo.vw_UploadedDocuments.md) | `dbo.vw_DMSVendorBidDocuments`, `dbo.vw_DMSVendorDocuments` |

### `VendorBids_TEST` → `VendorBids`

| View | References |
|------|------------|
| [`dbo.vw_DocumentUploads`](tables/VendorBids_TEST/dbo.vw_DocumentUploads.md) | `dbo.DocumentUploads` |

### `VendorBids_TEST` → `eds`

| View | References |
|------|------------|
| [`dbo.BidMgrVendorbidsForImport`](tables/VendorBids_TEST/dbo.BidMgrVendorbidsForImport.md) | `dbo.bidimports` |
| [`dbo.vw_UploadedDocuments`](tables/VendorBids_TEST/dbo.vw_UploadedDocuments.md) | `dbo.BidderCheckList` |
