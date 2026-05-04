# Table: `dbo.CONTOKEN`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `ISSUER` | varchar(200) | NO |  |  |
| 3 | `SUBJECT` | varchar(100) | NO |  |  |
| 4 | `LDAPDN` | varchar(200) | NO | `('NA')` |  |
| 5 | `EXPIRATION` | smalldatetime | YES |  |  |
| 6 | `TOKEN` | varchar(70) | NO |  |  |
| 7 | `CORRUPTED` | char(1) | NO | `('N')` |  |
| 8 | `TYPE` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CONTOKEN` | YES | NONCLUSTERED | `ISSUER`, `SUBJECT`, `LDAPDN` |  |
