# Table: `dbo.CaptureJobSinglePageImageItemData`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 61382

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CaptureJobSinglePageImageItemId` | uniqueidentifier | NO |  | YES |
| 2 | `ItemData` | varbinary(max) | NO |  |  |
| 3 | `ItemDataCcittGroup4` | varbinary(max) | NO |  |  |
| 4 | `ItemOcrXml` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CaptureJobSinglePageImageItemData_CaptureJobSinglePageImageItem` | `CaptureJobSinglePageImageItemId` | [`dbo.CaptureJobSinglePageImageItem.Id`](dbo.CaptureJobSinglePageImageItem.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
