# Table: `dbo.CatalogAdminMembership`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `CatalogId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CatalogAdminMembership_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | CASCADE | CASCADE |
| `FK_CatalogAdminMembership_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CatalogAdminMembership_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `IX_CatalogAdminMembership_CatalogId_UserId` | YES | NONCLUSTERED | `CatalogId`, `UserId` |  |
| `IX_CatalogAdminMembership_UserId` | no | NONCLUSTERED | `UserId` |  |
