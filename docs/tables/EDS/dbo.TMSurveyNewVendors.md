# Table: `dbo.TMSurveyNewVendors`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 202

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyNewVendorId` | int | NO |  | YES |
| 2 | `TMSurveyId` | int | NO |  |  |
| 3 | `TradeName` | varchar(50) | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `Address1` | varchar(50) | YES |  |  |
| 6 | `Address2` | varchar(50) | YES |  |  |
| 7 | `City` | varchar(50) | YES |  |  |
| 8 | `State` | char(2) | YES |  |  |
| 9 | `Zipcode` | varchar(10) | YES |  |  |
| 10 | `ContactName` | varchar(50) | YES |  |  |
| 11 | `EMail` | varchar(255) | YES |  |  |
| 12 | `Phone` | varchar(20) | YES |  |  |
| 13 | `Fax` | varchar(20) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
