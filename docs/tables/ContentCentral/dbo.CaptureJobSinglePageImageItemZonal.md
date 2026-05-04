# Table: `dbo.CaptureJobSinglePageImageItemZonal`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `CaptureJobSinglePageImageItemId` | uniqueidentifier | NO |  |  |
| 3 | `DocTypeFieldRecognitionZoneId` | uniqueidentifier | NO |  |  |
| 4 | `ZonalValue` | nvarchar(max) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CaptureJobSinglePageImageItemZonal_CaptureJobSinglePageImageItem` | `CaptureJobSinglePageImageItemId` | [`dbo.CaptureJobSinglePageImageItem.Id`](dbo.CaptureJobSinglePageImageItem.md) | CASCADE | CASCADE |
| `FK_CaptureJobSinglePageImageItemZonal_DocTypeFieldRecognitionZone` | `DocTypeFieldRecognitionZoneId` | [`dbo.DocTypeFieldRecognitionZone.Id`](dbo.DocTypeFieldRecognitionZone.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CaptureJobSinglePageImageItemZonal_CaptureJobSinglePageImageItemId` | no | NONCLUSTERED | `CaptureJobSinglePageImageItemId` |  |
| `IX_CaptureJobSinglePageImageItemZonal_DocTypeFieldRecognitionZoneId` | no | NONCLUSTERED | `DocTypeFieldRecognitionZoneId` |  |
