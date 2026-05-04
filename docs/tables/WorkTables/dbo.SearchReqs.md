# Table: `dbo.SearchReqs`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 664343

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
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

_No non-PK indexes._
