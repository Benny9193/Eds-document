# Table: `dbo.DocType`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `CatalogId` | uniqueidentifier | NO |  |  |
| 3 | `Name` | nvarchar(50) | NO | `('')` |  |
| 4 | `Description` | nvarchar(128) | NO | `('')` |  |
| 5 | `FolderBuildingEnabled` | bit | NO | `((0))` |  |
| 6 | `FileBuildingEnabled` | bit | NO | `((0))` |  |
| 7 | `FolderEmptyFieldText` | nvarchar(50) | NO | `('')` |  |
| 8 | `FolderFileBuilderInvalidChar` | nvarchar(1) | NO | `('')` |  |
| 9 | `NonQCardUser` | uniqueidentifier | YES | `(NULL)` |  |
| 10 | `AllowUserToBypassFolderFileBuilding` | bit | NO | `((0))` |  |
| 11 | `EnableThumbnails` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocType_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcess`](dbo.ApprovalProcess.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ApprovalProcessGroup`](dbo.ApprovalProcessGroup.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeCaptureForm`](dbo.DocTypeCaptureForm.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeField`](dbo.DocTypeField.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFieldExternalLookup`](dbo.DocTypeFieldExternalLookup.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFileBuildItem`](dbo.DocTypeFileBuildItem.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFolderBuildItem`](dbo.DocTypeFolderBuildItem.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypePermission`](dbo.DocTypePermission.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeRetentionPolicy`](dbo.DocTypeRetentionPolicy.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeShortLinkSharePermission`](dbo.DocTypeShortLinkSharePermission.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.Document`](dbo.Document.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocumentFolder`](dbo.DocumentFolder.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ExportDataTemplate`](dbo.ExportDataTemplate.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ExternalApplication`](dbo.ExternalApplication.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.MakeSearchable`](dbo.MakeSearchable.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.MessageTemplate`](dbo.MessageTemplate.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.PacketTemplate`](dbo.PacketTemplate.md) | `PrimaryDocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.PacketTemplateDocType`](dbo.PacketTemplateDocType.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.PostScanDocument`](dbo.PostScanDocument.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.QCard`](dbo.QCard.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterDocType`](dbo.ReportFilterDocType.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.UserDefaultDocType`](dbo.UserDefaultDocType.md) | `DocTypeId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `CreatingDocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `NewDocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowRule`](dbo.WorkflowRule.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowTrigger`](dbo.WorkflowTrigger.md) | `DocTypeId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocType_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `IX_DocType_CatalogId_Name` | YES | NONCLUSTERED | `CatalogId`, `Name` |  |
