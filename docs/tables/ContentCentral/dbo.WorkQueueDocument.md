# Table: `dbo.WorkQueueDocument`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `Type` | nvarchar(50) | NO | `('')` |  |
| 4 | `UserId` | uniqueidentifier | YES |  |  |
| 5 | `GroupId` | uniqueidentifier | YES |  |  |
| 6 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 7 | `Shared` | bit | NO | `((0))` |  |
| 8 | `ExpirationMultiplier` | int | NO | `((0))` |  |
| 9 | `ExpirationInterval` | nvarchar(50) | NO | `('')` |  |
| 10 | `ExpirationIntervalInMinutes` | int | NO | `((0))` |  |
| 11 | `PacketTemplateId` | uniqueidentifier | YES |  |  |
| 12 | `PacketTemplateKeyFieldValue` | nvarchar(256) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkQueueDocument_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_WorkQueueDocument_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | CASCADE | CASCADE |
| `FK_WorkQueueDocument_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | CASCADE | CASCADE |
| `FK_WorkQueueDocument_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.WorkQueueDocumentCompletion`](dbo.WorkQueueDocumentCompletion.md) | `WorkQueueDocumentId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkQueueDocument_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_WorkQueueDocument_DocumentId_UserId_GroupId` | YES | NONCLUSTERED | `DocumentId`, `UserId`, `GroupId` |  |
| `IX_WorkQueueDocument_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_WorkQueueDocument_PacketTemplateId` | no | NONCLUSTERED | `PacketTemplateId` |  |
| `IX_WorkQueueDocument_UserId` | no | NONCLUSTERED | `UserId` |  |
