# Table: `dbo.Products`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `SurveyId` | uniqueidentifier | NO |  |  |
| 3 | `Name` | varchar(255) | YES |  |  |
| 4 | `Purpose` | varchar(100) | YES |  |  |
| 5 | `Manufacturer` | varchar(100) | YES |  |  |
| 6 | `Quantity` | varchar(50) | YES |  |  |
| 7 | `Container` | varchar(50) | YES |  |  |
| 8 | `Location` | varchar(255) | YES |  |  |
| 9 | `EmployeesExposed` | varchar(50) | YES |  |  |
| 10 | `ProductNumber` | varchar(50) | YES |  |  |
| 11 | `Unit` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
