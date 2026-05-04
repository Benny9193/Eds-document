# Table: `dbo.RTK_Surveys`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTKSurveyId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `FacilityId` | int | YES |  |  |
| 5 | `FacilityNumber` | varchar(20) | YES |  |  |
| 6 | `FacilityName` | varchar(50) | YES |  |  |
| 7 | `ReportYear` | int | NO |  |  |
| 8 | `DocumentId` | uniqueidentifier | NO |  |  |
| 9 | `Description` | varchar(1024) | NO |  |  |
| 10 | `ValidFrom` | datetime | YES |  |  |
| 11 | `ValidUntil` | datetime | YES |  |  |
| 12 | `Created` | datetime | NO | `(getdate())` |  |
| 13 | `Updated` | datetime | YES |  |  |
| 14 | `Deleted` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
