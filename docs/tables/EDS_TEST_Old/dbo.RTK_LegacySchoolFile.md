# Table: `dbo.RTK_LegacySchoolFile`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6766

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LegacySchoolFileId` | int | NO |  | YES |
| 2 | `LegacyDistrictCode` | char(2) | YES |  |  |
| 3 | `LegacySchoolCode` | char(5) | YES |  |  |
| 4 | `SchoolName` | varchar(30) | YES |  |  |
| 5 | `SchoolAddr` | varchar(30) | YES |  |  |
| 6 | `CityStZip` | varchar(30) | YES |  |  |
| 7 | `NJEIN` | varchar(20) | YES |  |  |
| 8 | `ExposedEmployees` | int | YES |  |  |
| 9 | `DistrictId` | int | YES |  |  |
| 10 | `RTK_SitesId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
