# Table: `dbo.Facilities`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 496

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `EmployerId` | uniqueidentifier | YES |  |  |
| 3 | `DateCreated` | datetime | YES | `(getdate())` |  |
| 4 | `EIN` | varchar(50) | NO |  |  |
| 5 | `FacilityNumber` | varchar(50) | YES |  |  |
| 6 | `Name` | varchar(255) | YES |  |  |
| 7 | `County` | varchar(50) | YES |  |  |
| 8 | `HazardousChemicalsReported` | varchar(50) | YES |  |  |
| 9 | `SurveyStatus` | varchar(50) | YES |  |  |
| 10 | `FacilityStatus` | varchar(50) | YES |  |  |
| 11 | `SurveyLink` | varchar(255) | YES |  |  |
| 12 | `lastRefreshed` | datetime | YES | `(getdate())` |  |
| 13 | `deletedAt` | datetime | YES |  |  |
| 14 | `Municipality` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
