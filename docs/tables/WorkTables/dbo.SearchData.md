# Table: `dbo.SearchData`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1130355

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | uniqueidentifier | YES |  |  |
| 2 | `SessionId` | varchar(64) | YES |  |  |
| 3 | `RequestStart` | datetime | YES |  |  |
| 4 | `DistrictCode` | nvarchar(max) | YES |  |  |
| 5 | `CometId` | nvarchar(max) | YES |  |  |
| 6 | `OrigURL` | varchar(512) | YES |  |  |
| 7 | `ReqId` | nvarchar(max) | YES |  |  |
| 8 | `VendorId` | nvarchar(max) | YES |  |  |
| 9 | `HeadingId` | nvarchar(max) | YES |  |  |
| 10 | `FilterData` | nvarchar(max) | YES |  |  |
| 11 | `DistrictId` | nvarchar(max) | YES |  |  |
| 12 | `NextURL` | varchar(512) | YES |  |  |
| 13 | `NextSearch` | varchar(512) | YES |  |  |
| 14 | `NextOrderEZ` | varchar(512) | YES |  |  |
| 15 | `IIM` | nvarchar(max) | YES |  |  |
| 16 | `IIM_Count` | int | YES |  |  |
| 17 | `OI` | nvarchar(max) | YES |  |  |
| 18 | `Orders` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
