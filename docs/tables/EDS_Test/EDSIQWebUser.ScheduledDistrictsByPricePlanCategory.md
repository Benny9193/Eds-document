# View: `EDSIQWebUser.ScheduledDistrictsByPricePlanCategory`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricePlanDescription` | varchar(278) | NO |  |  |
| 2 | `CategoryName` | varchar(50) | YES |  |  |
| 3 | `DistrictCode` | varchar(4) | YES |  |  |
| 4 | `DistrictName` | varchar(50) | YES |  |  |
| 5 | `PercentIn` | float | YES |  |  |
| 6 | `PercentOut` | float | YES |  |  |
| 7 | `DistrictsIn` | int | YES |  |  |
| 8 | `TotalDistricts` | int | YES |  |  |
| 9 | `RepName` | varchar(30) | YES |  |  |

## Depends on

_None resolved._

## Used by

_No other objects reference this view._

## Definition

_Definition not available (view may be encrypted, or insufficient permissions)._
