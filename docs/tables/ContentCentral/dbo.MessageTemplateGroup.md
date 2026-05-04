# Table: `dbo.MessageTemplateGroup`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `MessageTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `GroupId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_MessageTemplateGroup_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | CASCADE | CASCADE |
| `FK_MessageTemplateGroup_MessageTemplate` | `MessageTemplateId` | [`dbo.MessageTemplate.Id`](dbo.MessageTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_MessageTemplateGroup_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_MessageTemplateGroup_MessageTemplateId` | no | NONCLUSTERED | `MessageTemplateId` |  |
| `IX_MessageTemplateGroup_MessageTemplateId_GroupId` | YES | NONCLUSTERED | `MessageTemplateId`, `GroupId` |  |
