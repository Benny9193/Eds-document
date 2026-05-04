# View: `dbo.DocumentPacketCompletion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO` &nbsp;|&nbsp; Schema-bound

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentId` | uniqueidentifier | NO |  |  |
| 2 | `PacketTemplateId` | uniqueidentifier | YES |  |  |
| 3 | `CompletionType` | nvarchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.DocTypeField`](dbo.DocTypeField.md) | USER_TABLE |
| [`dbo.Document`](dbo.Document.md) | USER_TABLE |
| [`dbo.DocumentField`](dbo.DocumentField.md) | USER_TABLE |
| [`dbo.PacketCompletion`](dbo.PacketCompletion.md) | USER_TABLE |
| [`dbo.PacketTemplate`](dbo.PacketTemplate.md) | USER_TABLE |
| [`dbo.PacketTemplateDocType`](dbo.PacketTemplateDocType.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[DocumentPacketCompletion]
WITH SCHEMABINDING 
AS
SELECT		dbo.[Document].Id AS DocumentId, dbo.[PacketCompletion].PacketTemplateId AS PacketTemplateId,
			dbo.[PacketCompletion].CompletionType AS CompletionType
FROM		dbo.[Document]
			INNER JOIN dbo.[PacketTemplateDocType] ON dbo.[Document].[DocTypeId] = dbo.[PacketTemplateDocType].[DocTypeId]
			INNER JOIN dbo.[PacketTemplate] ON dbo.[PacketTemplateDocType].[PacketTemplateId] = dbo.[PacketTemplate].[Id]
			INNER JOIN dbo.[DocTypeField] AS [GlobalKeyDocTypeField] ON [PacketTemplate].[KeyDocTypeFieldId] = [GlobalKeyDocTypeField].[Id]
			INNER JOIN dbo.[DocTypeField] AS [KeyDocTypeField] ON [GlobalKeyDocTypeField].[Id] = [KeyDocTypeField].[GlobalDocTypeFieldId]
			INNER JOIN dbo.[DocumentField] AS [KeyDocumentField] ON [KeyDocTypeField].[Id] = [KeyDocumentField].[DocTypeFieldId] AND dbo.[Document].[Id] = [KeyDocumentField].[DocumentId]
			LEFT OUTER JOIN dbo.[PacketCompletion] ON dbo.[PacketTemplate].[Id] = dbo.[PacketCompletion].[PacketTemplateId]
			AND ([KeyDocumentField].[IndexFieldText] = dbo.[PacketCompletion].[PacketTemplateKeyFieldValue]
			 OR [KeyDocumentField].[MemoFieldText] = dbo.[PacketCompletion].[PacketTemplateKeyFieldValue])
```
