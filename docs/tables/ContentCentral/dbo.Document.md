# Table: `dbo.Document`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 128478

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ImportDocFieldData` | bit | NO | `((0))` |  |
| 3 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 4 | `ModifiedUtc` | datetime | NO | `(getutcdate())` |  |
| 5 | `RequiresIndexing` | bit | NO | `((0))` |  |
| 6 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 7 | `CreatedByUserId` | uniqueidentifier | YES |  |  |
| 8 | `CreatedByDomainUserName` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Document_CreatedByUser` | `CreatedByUserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `FK_Document_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcessCompletion`](dbo.ApprovalProcessCompletion.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessStatus`](dbo.ApprovalProcessStatus.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessStep`](dbo.ApprovalProcessStep.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.ApprovalProcessStepHistory`](dbo.ApprovalProcessStepHistory.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentApprovalProcess`](dbo.DocumentApprovalProcess.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentCheckedOut`](dbo.DocumentCheckedOut.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentField`](dbo.DocumentField.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentRetentionPolicy`](dbo.DocumentRetentionPolicy.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentShortLink`](dbo.DocumentShortLink.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentVersion`](dbo.DocumentVersion.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.MakeSearchable`](dbo.MakeSearchable.md) | `ExistingDocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.QCard`](dbo.QCard.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.RetroFolderFileBuildItem`](dbo.RetroFolderFileBuildItem.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.ServiceCommand`](dbo.ServiceCommand.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowRuleCompletion`](dbo.WorkflowRuleCompletion.md) | `DocumentId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkQueueDocument`](dbo.WorkQueueDocument.md) | `DocumentId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Document_CreatedByUserId` | no | NONCLUSTERED | `CreatedByUserId` |  |
| `IX_Document_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
