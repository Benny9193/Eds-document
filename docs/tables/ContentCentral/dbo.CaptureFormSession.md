# Table: `dbo.CaptureFormSession`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeCaptureFormId` | uniqueidentifier | YES |  |  |
| 3 | `QCardId` | int | NO | `((0))` |  |
| 4 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 5 | `ExpirationUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CaptureFormSession_DocTypeCaptureForm` | `DocTypeCaptureFormId` | [`dbo.DocTypeCaptureForm.Id`](dbo.DocTypeCaptureForm.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureFormSession_QCard` | `QCardId` | [`dbo.QCard.Id`](dbo.QCard.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CaptureFormSession_CreatedUtc` | no | NONCLUSTERED | `CreatedUtc` |  |
| `IX_CaptureFormSession_DocTypeCaptureFormId` | no | NONCLUSTERED | `DocTypeCaptureFormId` |  |
| `IX_CaptureFormSession_QCardId` | no | NONCLUSTERED | `QCardId` |  |
