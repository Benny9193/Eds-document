# Table: `dbo.StatusTable`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 53

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `StatusId` | int | NO |  | YES |
| 2 | `StatusCode` | char(1) | YES |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |
| 4 | `RequiredLevel` | tinyint | YES |  |  |
| 5 | `OptionValue` | int | YES |  |  |
| 6 | `UserVisibilityLevel` | int | YES |  |  |
| 7 | `IsPrint` | bit | YES |  |  |
| 8 | `ScriptURL` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Name` | no | NONCLUSTERED | `Name` |  |
| `SK_OptionValue` | YES | NONCLUSTERED | `OptionValue` |  |
| `SK_RequiredLevel` | no | NONCLUSTERED | `RequiredLevel` |  |
| `SK_StatusCode` | no | NONCLUSTERED | `StatusCode` |  |
