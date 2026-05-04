# Table: `dbo.SearchReqs`

**Database:** `SearchData_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1863819

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  |  |
| 2 | `SysId` | uniqueidentifier | YES |  |  |
| 3 | `SessionId` | varchar(64) | YES |  |  |
| 4 | `RequestStart` | datetime | YES |  |  |
| 5 | `RequisitionId` | int | NO |  |  |
| 6 | `HeadingId` | bigint | YES |  |  |
| 7 | `VendorId` | int | YES |  |  |
| 8 | `FilterData` | varchar(4096) | YES |  |  |
| 9 | `DistrictId` | int | YES |  |  |
| 10 | `ItemId` | int | YES |  |  |
| 11 | `OldScore` | int | YES |  |  |
| 12 | `NewScore` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PK_Id` | YES | CLUSTERED | `Id` |  |
| `SK_SysId` | no | NONCLUSTERED | `SysId` | `Id` |
| `SKI_ItemIdTime_FilterData` | no | NONCLUSTERED | `ItemId`, `RequestStart` | `FilterData` |
