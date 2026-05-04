# Table: `dbo.SDSDocs`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 161387

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Stored SDS document blobs (~161K rows). One PDF per row keyed to `ItemId` (and optionally `CrossRefId` / legacy `MSDSId`), with `OrigURL`, `Checksum` for dedup, and a varbinary(max) `Document`. The current SDS storage path; legacy MSDS data lives in `MSDS` / `MSDSDetail`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `CrossRefId` | int | YES |  |  |
| 4 | `MSDSId` | int | YES |  |  |
| 5 | `OrigURL` | varchar(1024) | YES |  |  |
| 6 | `DateLoaded` | datetime | YES | `(getdate())` |  |
| 7 | `DateChecked` | datetime | YES | `(getdate())` |  |
| 8 | `Checksum` | bigint | YES |  |  |
| 9 | `DocType` | varchar(50) | YES |  |  |
| 10 | `Document` | varbinary(max) | YES |  |  |
| 11 | `Description` | varchar(255) | YES |  |  |
| 12 | `Manufacturer` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_Item_Id` | no | NONCLUSTERED | `ItemId` | `Id` |
| `SKI_MSDS_ItemId` | no | NONCLUSTERED | `MSDSId` | `Id`, `ItemId` |
| `ti_CrossRef_Id` | no | NONCLUSTERED | `CrossRefId` | `Id` |
