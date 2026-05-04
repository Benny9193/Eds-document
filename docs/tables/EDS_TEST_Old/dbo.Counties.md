# Table: `dbo.Counties`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 78

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CountyId` | int | NO |  | YES |
| 2 | `State` | char(2) | NO |  |  |
| 3 | `Name` | varchar(50) | NO |  |  |
| 4 | `StateId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_StateIDName` | no | NONCLUSTERED | `Name`, `StateId` |  |
| `SK_StateName` | no | NONCLUSTERED | `State`, `Name` |  |
