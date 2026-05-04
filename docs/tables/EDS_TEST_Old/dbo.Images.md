# Table: `dbo.Images`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1736177

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `imageId` | bigint | NO |  | YES |
| 2 | `imageURL` | varchar(768) | YES |  |  |
| 3 | `imageActualURL` | varchar(768) | YES |  |  |
| 4 | `imagePath` | varchar(512) | YES |  |  |
| 5 | `imageResized` | varchar(512) | YES |  |  |
| 6 | `imageThumbnail` | varchar(512) | YES |  |  |
| 7 | `pHash` | char(64) | YES |  |  |
| 8 | `bipHash` | bigint | YES |  |  |
| 9 | `imageSize` | int | YES |  |  |
| 10 | `imageFormat` | varchar(20) | YES |  |  |
| 11 | `width` | int | YES |  |  |
| 12 | `height` | int | YES |  |  |
| 13 | `imageSpace` | varchar(20) | YES |  |  |
| 14 | `channels` | int | YES |  |  |
| 15 | `depth` | varchar(20) | YES |  |  |
| 16 | `density` | int | YES |  |  |
| 17 | `dateLoaded` | datetime | YES | `(getdate())` |  |
| 18 | `dateChecked` | datetime | YES | `(getdate())` |  |
| 19 | `dateDeleted` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `DPA_RECIDX_416` | no | NONCLUSTERED | `pHash`, `imageSize`, `imageFormat` |  |
| `SK_URLLoaded` | no | NONCLUSTERED | `imageURL`, `dateLoaded` |  |
