# Table: `dbo.DocTypeCaptureFormData`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocTypeCaptureFormId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ItemData` | varbinary(max) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeCaptureFormData_DocTypeCaptureForm` | `DocTypeCaptureFormId` | [`dbo.DocTypeCaptureForm.Id`](dbo.DocTypeCaptureForm.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
