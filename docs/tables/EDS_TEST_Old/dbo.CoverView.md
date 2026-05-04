# Table: `dbo.CoverView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `DistrictCode` | varchar(2) | YES |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `DistrictAddress1` | varchar(30) | YES |  |  |
| 5 | `DistrictAddress2` | varchar(30) | YES |  |  |
| 6 | `DistrictAddress3` | varchar(30) | YES |  |  |
| 7 | `DistrictCity` | varchar(25) | YES |  |  |
| 8 | `DistrictState` | varchar(2) | YES |  |  |
| 9 | `DistrictZipcode` | varchar(10) | YES |  |  |
| 10 | `SchoolId` | int | YES |  |  |
| 11 | `SchoolName` | varchar(50) | YES |  |  |
| 12 | `SchoolAddress1` | varchar(30) | YES |  |  |
| 13 | `SchoolAddress2` | varchar(30) | YES |  |  |
| 14 | `SchoolAddress3` | varchar(30) | YES |  |  |
| 15 | `SchoolCity` | varchar(25) | YES |  |  |
| 16 | `SchoolState` | varchar(2) | YES |  |  |
| 17 | `SchoolZipcode` | varchar(10) | YES |  |  |
| 18 | `UserId` | int | YES |  |  |
| 19 | `UserName` | varchar(50) | YES |  |  |
| 20 | `CometId` | int | YES |  |  |
| 21 | `AccountCode` | varchar(50) | YES |  |  |
| 22 | `AccountCount` | int | YES |  |  |
| 23 | `BudgetStartDate` | datetime | YES |  |  |
| 24 | `BudgetEndDate` | datetime | YES |  |  |
| 25 | `ItemCount` | int | YES |  |  |
| 26 | `CategoryId` | int | YES |  |  |
| 27 | `OrderBookId` | int | YES |  |  |
| 28 | `CategoryDescription` | varchar(255) | YES |  |  |
| 29 | `PricePlanDescription` | varchar(255) | YES |  |  |
| 30 | `UsesBooklet` | int | YES |  |  |
| 31 | `UsesOnline` | int | YES |  |  |
| 32 | `RepMsg` | varchar(512) | YES |  |  |
| 33 | `IBTypeId` | int | YES |  |  |
| 34 | `BookType` | varchar(50) | YES |  |  |
| 35 | `ScheduleGroup` | varchar(50) | YES |  |  |
| 36 | `StateName` | varchar(50) | YES |  |  |
| 37 | `CoverViewId` | uniqueidentifier | NO | `(newsequentialid())` | YES |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
