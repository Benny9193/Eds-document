# Table: `dbo.DocTypeDefaultUserSearchResultField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 826

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | NO |  |  |
| 3 | `FieldOrder` | int | NO | `((0))` |  |
| 4 | `SortIndex` | int | NO | `((0))` |  |
| 5 | `SortOrder` | nvarchar(50) | NO | `('')` |  |
| 6 | `FromAdmin` | bit | NO | `((1))` |  |
| 7 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeDefaultUserSearchResultField_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |
| `FK_DocTypeDefaultUserSearchResultField_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeDefaultUserSearchResultField_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_DocTypeDefaultUserSearchResultField_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_DocTypeDefaultUserSearchResultField_UserId_DocTypeFieldId` | YES | NONCLUSTERED | `UserId`, `DocTypeFieldId` |  |
