# Table: `dbo.ImageLog`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1788706

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `imageLogId` | bigint | NO |  | YES |
| 2 | `imageId` | bigint | YES |  |  |
| 3 | `imageURL` | varchar(2048) | YES |  |  |
| 4 | `imageActualURL` | varchar(2048) | YES |  |  |
| 5 | `statusCode` | int | YES |  |  |
| 6 | `statusText` | varchar(512) | YES |  |  |
| 7 | `contentType` | varchar(50) | YES |  |  |
| 8 | `headers` | varchar(max) | YES |  |  |
| 9 | `testDate` | datetime | YES | `(getdate())` |  |
| 10 | `writeStatus` | int | YES |  |  |
| 11 | `writeDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NonClusteredIndex-20250321-091731` | no | NONCLUSTERED | `imageURL`, `writeStatus`, `writeDate` | `imageLogId`, `imageId` |
