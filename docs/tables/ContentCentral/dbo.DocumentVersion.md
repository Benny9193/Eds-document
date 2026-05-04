# Table: `dbo.DocumentVersion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 175008

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `VersionMajor` | int | NO | `((1))` |  |
| 4 | `VersionMinor` | int | NO | `((0))` |  |
| 5 | `DomainUserName` | nvarchar(50) | NO | `('')` |  |
| 6 | `ActionType` | nvarchar(50) | NO | `('')` |  |
| 7 | `XmlKeyValuePairs` | nvarchar(max) | YES |  |  |
| 8 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 9 | `IsCaptureForm` | bit | NO | `((0))` |  |
| 10 | `PagesCaptured` | int | NO | `((1))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentVersion_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocumentVersionAnnotations`](dbo.DocumentVersionAnnotations.md) | `DocumentVersionId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentVersionFile`](dbo.DocumentVersionFile.md) | `DocumentVersionId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocumentVersionForm`](dbo.DocumentVersionForm.md) | `DocumentVersionId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocumentVersion_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_DocumentVersion_DocumentId_VersionMajor_VersionMinor` | YES | NONCLUSTERED | `DocumentId`, `VersionMajor`, `VersionMinor` |  |
| `IX_DocumentVersion_DocumentMinor_DocumentMajor` | no | NONCLUSTERED | `VersionMinor` | `Id`, `DocumentId`, `VersionMajor` |
