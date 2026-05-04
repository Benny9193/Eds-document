# Table: `dbo.ExternalApplication`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `CatalogId` | uniqueidentifier | YES |  |  |
| 4 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 5 | `Path` | nvarchar(260) | NO | `('')` |  |
| 6 | `Arguments` | nvarchar(max) | NO | `('')` |  |
| 7 | `DoubleQuoteEscapeCharacter` | nvarchar(50) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ExternalApplication_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | NO_ACTION | NO_ACTION |
| `FK_ExternalApplication_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CustomMenuItemSource`](dbo.CustomMenuItemSource.md) | `ExternalApplicationId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `ExternalApplicationId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ExternalApplication_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `IX_ExternalApplication_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_ExternalApplication_Name` | YES | NONCLUSTERED | `Name` |  |
