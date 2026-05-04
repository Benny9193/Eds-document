# Table: `dbo.DocumentVersionFile`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 130037

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentVersionId` | uniqueidentifier | NO |  | YES |
| 2 | `DocumentFolderId` | uniqueidentifier | NO |  |  |
| 3 | `BaseName` | nvarchar(260) | NO | `('')` |  |
| 4 | `DocName` | nvarchar(260) | NO | `('')` |  |
| 5 | `FullTextForIndex` | bit | NO | `((0))` |  |
| 6 | `DtsDocTypeId` | int | NO | `((0))` |  |
| 7 | `FileSize` | bigint | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentVersionFile_DocumentFolder` | `DocumentFolderId` | [`dbo.DocumentFolder.Id`](dbo.DocumentFolder.md) | CASCADE | CASCADE |
| `FK_DocumentVersionFile_DocumentVersion` | `DocumentVersionId` | [`dbo.DocumentVersion.Id`](dbo.DocumentVersion.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocumentVersionFullText`](dbo.DocumentVersionFullText.md) | `DocumentVersionId` | `DocumentVersionId` | CASCADE | CASCADE |
| [`dbo.DocumentVersionThumbnail`](dbo.DocumentVersionThumbnail.md) | `DocumentVersionId` | `DocumentVersionId` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocumentVersionFile_DocumentFolderId` | no | NONCLUSTERED | `DocumentFolderId` |  |
