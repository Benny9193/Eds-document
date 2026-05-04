# Table: `dbo.ExportDataTemplate`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO |  |  |
| 3 | `Description` | nvarchar(128) | YES |  |  |
| 4 | `ExportDataPathId` | uniqueidentifier | NO |  |  |
| 5 | `FileType` | nvarchar(10) | NO |  |  |
| 6 | `CatalogId` | uniqueidentifier | YES |  |  |
| 7 | `DocTypeId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ExportDataTemplate_Catalog` | `CatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | NO_ACTION | NO_ACTION |
| `FK_ExportDataTemplate_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_ExportDataTemplate_ExportDataPath` | `ExportDataPathId` | [`dbo.ExportDataPath.Id`](dbo.ExportDataPath.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ExportDataElement`](dbo.ExportDataElement.md) | `ExportDataTemplateId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `ExportDataTemplateId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
