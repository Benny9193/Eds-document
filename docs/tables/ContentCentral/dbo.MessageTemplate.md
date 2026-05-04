# Table: `dbo.MessageTemplate`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Enabled` | bit | NO | `((0))` |  |
| 3 | `Type` | nvarchar(50) | NO | `('')` |  |
| 4 | `DisableUIEdit` | bit | NO | `((0))` |  |
| 5 | `Visibility` | nvarchar(50) | NO | `('')` |  |
| 6 | `Scope` | nvarchar(50) | NO | `('')` |  |
| 7 | `Name` | nvarchar(50) | NO | `('')` |  |
| 8 | `Description` | nvarchar(128) | NO | `('')` |  |
| 9 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 10 | `RecipientList` | nvarchar(max) | NO | `('')` |  |
| 11 | `CopyRecipientList` | nvarchar(max) | NO | `('')` |  |
| 12 | `FaxTo` | nvarchar(256) | NO | `('')` |  |
| 13 | `FaxCompany` | nvarchar(256) | NO | `('')` |  |
| 14 | `Subject` | nvarchar(256) | NO | `('')` |  |
| 15 | `Body` | nvarchar(max) | NO | `('')` |  |
| 16 | `AllowCustomization` | bit | NO | `((0))` |  |
| 17 | `SendToDocTypeAdmins` | bit | NO | `((0))` |  |
| 18 | `SendToAllAdmins` | bit | NO | `((0))` |  |
| 19 | `SendToApprovalProcessAdmins` | bit | NO | `((0))` |  |
| 20 | `SendToSystemAdmins` | bit | NO | `((0))` |  |
| 21 | `SendToDocumentCreatedByUser` | bit | NO | `((0))` |  |
| 22 | `Sender` | nvarchar(256) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_MessageTemplate_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `DeadlineMessageTemplateId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `ArrivalMessageTemplateId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessMember`](dbo.ApprovalProcessMember.md) | `DeadlineMessageTemplateId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.MessageTemplateGroup`](dbo.MessageTemplateGroup.md) | `MessageTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.MessageTemplateUser`](dbo.MessageTemplateUser.md) | `MessageTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `MessageTemplateId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_MessageTemplate_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
