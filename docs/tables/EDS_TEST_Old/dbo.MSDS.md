# Table: `dbo.MSDS`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 58726

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MSDSId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CurrentVersionMSDSId` | int | YES |  |  |
| 4 | `AlternateDescription` | varchar(60) | YES |  |  |
| 5 | `ContentCentralMSDSDocId` | varchar(36) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.MSDSDetail`](dbo.MSDSDetail.md) | `MSDSID` | `MSDSId` | CASCADE | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_CurrentVersion_DocId` | no | NONCLUSTERED | `CurrentVersionMSDSId` | `MSDSId`, `ContentCentralMSDSDocId` |
