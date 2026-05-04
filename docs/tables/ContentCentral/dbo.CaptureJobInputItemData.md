# Table: `dbo.CaptureJobInputItemData`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11041

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CaptureJobInputItemId` | uniqueidentifier | NO |  | YES |
| 2 | `ItemData` | varbinary(max) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CaptureJobInputItemData_CaptureJobInputItem` | `CaptureJobInputItemId` | [`dbo.CaptureJobInputItem.Id`](dbo.CaptureJobInputItem.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
