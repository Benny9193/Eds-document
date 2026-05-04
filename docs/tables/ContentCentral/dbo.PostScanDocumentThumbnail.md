# Table: `dbo.PostScanDocumentThumbnail`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 92

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PostScanDocumentId` | uniqueidentifier | NO |  | YES |
| 2 | `ThumbnailPath` | nvarchar(260) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PostScanDocumentThumbnail_PostScanDocument` | `PostScanDocumentId` | [`dbo.PostScanDocument.Id`](dbo.PostScanDocument.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
