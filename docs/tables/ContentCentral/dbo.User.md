# Table: `dbo.User`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserName` | nvarchar(50) | NO | `('')` |  |
| 3 | `UserPass` | nvarchar(256) | NO | `('')` |  |
| 4 | `FirstName` | nvarchar(50) | NO | `('')` |  |
| 5 | `LastName` | nvarchar(50) | NO | `('')` |  |
| 6 | `Email` | nvarchar(50) | NO | `('')` |  |
| 7 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 8 | `Disabled` | bit | NO | `((0))` |  |
| 9 | `AllowUpdateProfile` | bit | NO | `((0))` |  |
| 10 | `AllowChangePassword` | bit | NO | `((0))` |  |
| 11 | `ActiveDirectoryId` | uniqueidentifier | YES |  |  |
| 12 | `ActiveDirectoryDomainId` | uniqueidentifier | YES |  |  |
| 13 | `DomainUserName` | nvarchar(180) | NO | `('')` |  |
| 14 | `DisableAPSelect` | bit | NO | `((0))` |  |
| 15 | `DisableAPSelectSortColumn` | nvarchar(50) | NO | `('')` |  |
| 16 | `Guest` | bit | NO | `((0))` |  |
| 17 | `PIN` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_User_ActiveDirectoryDomain` | `ActiveDirectoryDomainId` | [`dbo.ActiveDirectoryDomain.Id`](dbo.ActiveDirectoryDomain.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AdminPermission`](dbo.AdminPermission.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `UserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessStep`](dbo.ApprovalProcessStep.md) | `UserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessStepCompletion`](dbo.ApprovalProcessStepCompletion.md) | `UserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CatalogAdminMembership`](dbo.CatalogAdminMembership.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeDefaultUserSearchField`](dbo.DocTypeDefaultUserSearchField.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeDefaultUserSearchResultField`](dbo.DocTypeDefaultUserSearchResultField.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypePermission`](dbo.DocTypePermission.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.Document`](dbo.Document.md) | `CreatedByUserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocumentApprovalProcess`](dbo.DocumentApprovalProcess.md) | `ApprovalProcessGroupMemberUserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocumentCheckedOut`](dbo.DocumentCheckedOut.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.GridResultsField`](dbo.GridResultsField.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.GroupMembership`](dbo.GroupMembership.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.LoginSession`](dbo.LoginSession.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.MakeSearchable`](dbo.MakeSearchable.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.MessageTemplateUser`](dbo.MessageTemplateUser.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.PostScanDocument`](dbo.PostScanDocument.md) | `CreatedByUserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.PostScanDocument`](dbo.PostScanDocument.md) | `UserId` | `Id` | NO_ACTION | CASCADE |
| [`dbo.PostScanDocumentApprovalProcess`](dbo.PostScanDocumentApprovalProcess.md) | `ApprovalProcessGroupMemberUserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.QCard`](dbo.QCard.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.RememberLogin`](dbo.RememberLogin.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.SavedSearch`](dbo.SavedSearch.md) | `Owner` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.UIThemeMember`](dbo.UIThemeMember.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.UserAddressBookItem`](dbo.UserAddressBookItem.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.UserDefaultDocType`](dbo.UserDefaultDocType.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.UserMessage`](dbo.UserMessage.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.UserOptions`](dbo.UserOptions.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `UserId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `WorkflowRuleId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowActionUser`](dbo.WorkflowActionUser.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowTriggerUser`](dbo.WorkflowTriggerUser.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkQueueDocument`](dbo.WorkQueueDocument.md) | `UserId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkQueueDocumentCompletion`](dbo.WorkQueueDocumentCompletion.md) | `UserId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_User_ActiveDirectoryDomainId` | no | NONCLUSTERED | `ActiveDirectoryDomainId` |  |
