# Table: `dbo.DocumentFolder`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12836

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocFolder` | nvarchar(260) | NO | `('')` |  |
| 3 | `Inherit` | bit | NO | `((0))` |  |
| 4 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 5 | `HideIfNoViewPermission` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentFolder_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocumentVersionFile`](dbo.DocumentVersionFile.md) | `DocumentFolderId` | `Id` | CASCADE | CASCADE |
| [`dbo.GridResultsField`](dbo.GridResultsField.md) | `DocumentFolderId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `DocumentFolderId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocumentFolder_DocFolder` | YES | NONCLUSTERED | `DocFolder` |  |
| `IX_DocumentFolder_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
