# Table: `dbo.CSRep`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 45

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CSRepId` | int | NO |  | YES |
| 2 | `Name` | varchar(30) | YES |  |  |
| 3 | `ID` | char(2) | YES |  |  |
| 4 | `UserId` | int | YES |  |  |
| 5 | `Phone` | varchar(20) | YES |  |  |
| 6 | `EMail` | varchar(128) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_User` | no | NONCLUSTERED | `UserId` |  |
