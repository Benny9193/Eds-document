# Table: `dbo.CON_CONTACT`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `DESCR` | varchar(500) | YES |  |  |
| 3 | `CONTACTNAME` | varchar(100) | NO |  |  |
| 4 | `STATUS` | char(1) | NO | `('A')` |  |
| 5 | `TYPE` | char(1) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CONCONTACT` | YES | NONCLUSTERED | `CONTACTNAME` |  |
