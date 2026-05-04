# Table: `dbo.Catalog`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `Description` | nvarchar(128) | NO | `('')` |  |
| 4 | `IndexPath` | nvarchar(256) | NO | `('')` |  |
| 5 | `CaptureBaseDestinationPath` | nvarchar(260) | NO | `('')` |  |
| 6 | `ScheduleIntervalInMinutes` | int | NO | `((24)*(60))` |  |
| 7 | `ScheduleHour` | int | NO | `((0))` |  |
| 8 | `ScheduleMinute` | int | NO | `((0))` |  |
| 9 | `ScheduleEnable` | bit | NO | `((1))` |  |
| 10 | `IncludeFilters` | nvarchar(max) | NO | `('')` |  |
| 11 | `ExcludeFilters` | nvarchar(max) | NO | `('')` |  |
| 12 | `DefaultDocTypeId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CatalogAdminMembership`](dbo.CatalogAdminMembership.md) | `CatalogId` | `Id` | CASCADE | CASCADE |
| [`dbo.CatalogFolderToCatalog`](dbo.CatalogFolderToCatalog.md) | `CatalogId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocType`](dbo.DocType.md) | `CatalogId` | `Id` | CASCADE | CASCADE |
| [`dbo.ExportDataTemplate`](dbo.ExportDataTemplate.md) | `CatalogId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ExternalApplication`](dbo.ExternalApplication.md) | `CatalogId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ReportFilterCatalog`](dbo.ReportFilterCatalog.md) | `CatalogId` | `Id` | CASCADE | CASCADE |
| [`dbo.ServiceCommand`](dbo.ServiceCommand.md) | `CatalogId` | `Id` | CASCADE | CASCADE |
| [`dbo.UserOptions`](dbo.UserOptions.md) | `DefaultCaptureCatalogId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `CatalogId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowTrigger`](dbo.WorkflowTrigger.md) | `CatalogId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Catalog_Name` | YES | NONCLUSTERED | `Name` |  |
