# Table: `dbo.TrapRulesDetail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TrapRuleID` | uniqueidentifier | NO |  | YES |
| 2 | `VarBindRuleID` | uniqueidentifier | NO | `(newid())` | YES |
| 3 | `CriteriaGroup` | tinyint | NO | `((0))` |  |
| 4 | `NegateGroup` | bit | NO | `((0))` |  |
| 5 | `SortOrder` | tinyint | NO | `((0))` |  |
| 6 | `Pattern` | nvarchar(100) | NO | `('')` |  |
| 7 | `StatusVariableOrOID` | bit | NO | `((0))` |  |
| 8 | `Description` | nvarchar(max) | NO | `('')` |  |
| 9 | `Operator` | varchar(4) | NO | `('=')` |  |
| 10 | `TestValue` | nvarchar(200) | NO | `('')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
