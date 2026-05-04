# Table: `dbo.VendorUploads`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1533191

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UploadId` | int | NO |  | YES |
| 2 | `FileName` | varchar(255) | YES |  |  |
| 3 | `DateCreated` | datetime | YES |  |  |
| 4 | `DateUploaded` | datetime | YES |  |  |
| 5 | `Status` | varchar(255) | YES |  |  |
| 6 | `cxmlsessionid` | int | YES |  |  |
| 7 | `poid` | int | YES |  |  |
| 8 | `PayloadID` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_PO` | no | NONCLUSTERED | `poid` |  |
