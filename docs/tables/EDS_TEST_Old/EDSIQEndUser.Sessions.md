# View: `EDSIQEndUser.Sessions`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `EDSIQEndUser`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `UserId` | int | NO |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `SchoolId` | int | YES |  |  |
| 5 | `Attention` | varchar(50) | YES |  |  |
| 6 | `AllowIncidentals` | tinyint | YES |  |  |
| 7 | `CurrentBudgetId` | int | YES |  |  |
| 8 | `NextBudgetId` | int | YES |  |  |
| 9 | `jSession` | varchar(255) | NO |  |  |
| 10 | `IPAddress` | varchar(50) | YES |  |  |

## Depends on

_None resolved._

## Used by

_No other objects reference this view._

## Definition

_Definition not available (view may be encrypted, or insufficient permissions)._
