# Table: `dbo.PacketTemplateDocType`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `PacketTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 4 | `RequiredForCompletion` | bit | NO | `((0))` |  |
| 5 | `LookupFieldValues` | bit | NO | `((1))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PacketTemplateDocType_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_PacketTemplateDocType_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PacketTemplateDocType_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_PacketTemplateDocType_PacketTemplateId` | no | NONCLUSTERED | `PacketTemplateId` |  |
