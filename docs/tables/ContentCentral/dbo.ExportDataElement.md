# Table: `dbo.ExportDataElement`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ExportDataTemplateId` | uniqueidentifier | NO |  |  |
| 3 | `Sequence` | int | NO |  |  |
| 4 | `DocTypeFieldId` | uniqueidentifier | YES |  |  |
| 5 | `Text` | nvarchar(128) | YES |  |  |
| 6 | `Format` | nvarchar(128) | YES |  |  |
| 7 | `Description` | nvarchar(128) | YES |  |  |
| 8 | `SystemFieldKey` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ExportDataElement_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_ExportDataElement_ExportDataTemplate` | `ExportDataTemplateId` | [`dbo.ExportDataTemplate.Id`](dbo.ExportDataTemplate.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
