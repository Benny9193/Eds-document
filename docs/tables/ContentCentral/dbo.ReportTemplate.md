# Table: `dbo.ReportTemplate`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `Description` | nvarchar(128) | NO | `('')` |  |
| 4 | `Enabled` | bit | NO | `((0))` |  |
| 5 | `Type` | nvarchar(50) | NO | `('')` |  |
| 6 | `OutputFilename` | nvarchar(260) | NO | `('')` |  |
| 7 | `OutputFileType` | nvarchar(260) | NO | `('')` |  |
| 8 | `FileOutputMode` | nvarchar(50) | NO | `('')` |  |
| 9 | `CreateSegmentHeaders` | bit | NO | `((0))` |  |
| 10 | `LastFileName` | nvarchar(260) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ReportColumn`](dbo.ReportColumn.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterApprovalProcess`](dbo.ReportFilterApprovalProcess.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterApprovalProcessTimeframe`](dbo.ReportFilterApprovalProcessTimeframe.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterCatalog`](dbo.ReportFilterCatalog.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterDocType`](dbo.ReportFilterDocType.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterDocTypeField`](dbo.ReportFilterDocTypeField.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterSystemField`](dbo.ReportFilterSystemField.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterWorkQueueArrival`](dbo.ReportFilterWorkQueueArrival.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportSegment`](dbo.ReportSegment.md) | `ReportTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `ReportTemplateId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
