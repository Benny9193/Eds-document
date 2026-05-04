# Table: `dbo.TMSurvey`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 796

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyId` | int | NO |  | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `Submitter` | varchar(255) | YES |  |  |
| 4 | `Title` | varchar(255) | YES |  |  |
| 5 | `Email` | varchar(255) | YES |  |  |
| 6 | `Started` | datetime | YES |  |  |
| 7 | `Finished` | datetime | YES |  |  |
| 8 | `CountyId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
