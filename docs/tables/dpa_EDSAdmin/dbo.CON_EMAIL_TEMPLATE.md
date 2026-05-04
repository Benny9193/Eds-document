# Table: `dbo.CON_EMAIL_TEMPLATE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `NAME` | varchar(100) | NO |  |  |
| 3 | `DESCRIPTION` | varchar(1000) | YES |  |  |
| 4 | `IMPORTANCE` | char(1) | NO | `('N')` |  |
| 5 | `FORMAT` | char(1) | NO | `('T')` |  |
| 6 | `SUBJECT` | varchar(500) | NO |  |  |
| 7 | `BODY` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CON_EMAIL_TEMPLATE_NAME` | YES | NONCLUSTERED | `NAME` |  |
