# Table: `dbo.DocTypeDefaultUserSearchField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 441

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | NO |  |  |
| 3 | `FieldOrder` | int | NO | `((0))` |  |
| 4 | `FromAdmin` | bit | NO | `((1))` |  |
| 5 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeDefaultUserSearchField_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |
| `FK_DocTypeDefaultUserSearchField_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeDefaultUserSearchField_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_DocTypeDefaultUserSearchField_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_DocTypeDefaultUserSearchField_UserId_DocTypeFieldId` | YES | NONCLUSTERED | `UserId`, `DocTypeFieldId` |  |
