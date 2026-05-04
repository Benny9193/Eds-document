# Table: `dbo.PacketCompletion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `PacketTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `PacketTemplateKeyFieldValue` | nvarchar(256) | NO | `('')` |  |
| 4 | `CompletionType` | nvarchar(50) | NO | `('')` |  |
| 5 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PacketCompletion_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PacketCompletion_PacketTemplateId` | no | NONCLUSTERED | `PacketTemplateId` |  |
