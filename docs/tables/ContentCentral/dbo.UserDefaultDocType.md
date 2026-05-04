# Table: `dbo.UserDefaultDocType`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 63

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `UserId` | uniqueidentifier | NO |  |  |
| 3 | `CatalogId` | uniqueidentifier | NO |  |  |
| 4 | `DocTypeId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_UserDefaultDocType_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_UserDefaultDocType_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_UserDefaultDocType_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_UserDefaultDocType_UserId` | no | NONCLUSTERED | `UserId` |  |
| `IX_UserDefaultDocType_UserId_CatalogId` | YES | NONCLUSTERED | `UserId`, `CatalogId` |  |
