# Table: `dbo.MessageTemplateUser`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `MessageTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_MessageTemplateUser_MessageTemplate` | `MessageTemplateId` | [`dbo.MessageTemplate.Id`](dbo.MessageTemplate.md) | CASCADE | CASCADE |
| `FK_MessageTemplateUser_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_MessageTemplateUser_MessageTemplateId` | no | NONCLUSTERED | `MessageTemplateId` |  |
| `IX_MessageTemplateUser_MessageTemplateId_UserId` | YES | NONCLUSTERED | `MessageTemplateId`, `UserId` |  |
| `IX_MessageTemplateUser_UserId` | no | NONCLUSTERED | `UserId` |  |
