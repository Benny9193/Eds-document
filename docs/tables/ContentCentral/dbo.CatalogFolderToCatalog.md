# Table: `dbo.CatalogFolderToCatalog`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Folder` | nvarchar(260) | NO | `('')` |  |
| 3 | `CatalogId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CatalogFolderToCatalog_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CatalogFolderToCatalog_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
