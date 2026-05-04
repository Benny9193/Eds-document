# Table: `dbo.CaptureJobSinglePageImageItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 61382

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `CaptureJobId` | uniqueidentifier | NO |  |  |
| 3 | `CaptureJobInputItemId` | uniqueidentifier | NO |  |  |
| 4 | `QCardId` | int | YES |  |  |
| 5 | `ItemOrder` | int | NO |  |  |
| 6 | `QCardCheckComplete` | bit | NO | `((0))` |  |
| 7 | `Extension` | nvarchar(50) | NO | `('')` |  |
| 8 | `ZonalCheckComplete` | bit | NO | `((0))` |  |
| 9 | `DirectScanLastPage` | bit | NO | `((0))` |  |
| 10 | `OcrComplete` | bit | NO | `((0))` |  |
| 11 | `Priority` | int | YES |  |  |
| 12 | `BuildOrder` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CaptureJobSinglePageImageItem_CaptureJob` | `CaptureJobId` | [`dbo.CaptureJob.Id`](dbo.CaptureJob.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJobSinglePageImageItem_CaptureJobInputItem` | `CaptureJobInputItemId` | [`dbo.CaptureJobInputItem.Id`](dbo.CaptureJobInputItem.md) | CASCADE | CASCADE |
| `FK_CaptureJobSinglePageImageItem_QCard` | `QCardId` | [`dbo.QCard.Id`](dbo.QCard.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CaptureJobSinglePageImageItemData`](dbo.CaptureJobSinglePageImageItemData.md) | `CaptureJobSinglePageImageItemId` | `Id` | CASCADE | CASCADE |
| [`dbo.CaptureJobSinglePageImageItemZonal`](dbo.CaptureJobSinglePageImageItemZonal.md) | `CaptureJobSinglePageImageItemId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CaptureJobSinglePageImageItem_CaptureJobId` | no | NONCLUSTERED | `CaptureJobId` |  |
| `IX_CaptureJobSinglePageImageItem_CaptureJobInputItemId` | no | NONCLUSTERED | `CaptureJobInputItemId` |  |
| `IX_CaptureJobSinglePageImageItem_ItemOrder` | YES | NONCLUSTERED | `ItemOrder` |  |
| `IX_CaptureJobSinglePageImageItem_QCardId` | no | NONCLUSTERED | `QCardId` |  |
