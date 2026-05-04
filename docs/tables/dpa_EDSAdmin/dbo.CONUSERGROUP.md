# Table: `dbo.CONUSERGROUP`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `GROUP_KEY` | varchar(250) | NO |  |  |
| 3 | `NAME` | varchar(250) | NO |  |  |
| 4 | `ROLE` | char(1) | NO | `('R')` |  |
| 5 | `EXISTS_ON_SERVER` | char(1) | NO | `('Y')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CONUSERGROUP` | YES | NONCLUSTERED | `GROUP_KEY` |  |
