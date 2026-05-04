# Table: `dbo.MSDSDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 138516

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Chemical-composition lines on a legacy MSDS sheet (~138K rows). Junction of `MSDS` to `RTK_CASFile` with `MixturePercent`. FK CASCADE on parent `MSDS`. Superseded for current ingestion by the SDS pipeline (`SafetyDataSheets` / `SDSDocs`) but still queried for historical sheets.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MSDSDetailID` | int | NO |  | YES |
| 2 | `MSDSID` | int | YES |  |  |
| 3 | `SeqNum` | int | YES |  |  |
| 4 | `RTK_CASFileId` | int | YES |  |  |
| 5 | `MixturePercent` | decimal(9,5) | YES |  |  |
| 6 | `LegacyCASRegNo` | varchar(12) | YES |  |  |
| 7 | `MixturePercentCode` | char(2) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_MSDSDetail_MSDS` | `MSDSID` | [`dbo.MSDS.MSDSId`](dbo.MSDS.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_MSDSCAS_Id` | no | NONCLUSTERED | `MSDSID`, `RTK_CASFileId` | `MSDSDetailID` |
