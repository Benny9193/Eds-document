# Table: `dbo.hm_whitelist`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `whiteid` | bigint | NO |  | YES |
| 2 | `whiteloweripaddress1` | bigint | NO |  |  |
| 3 | `whiteloweripaddress2` | bigint | YES |  |  |
| 4 | `whiteupperipaddress1` | bigint | NO |  |  |
| 5 | `whiteupperipaddress2` | bigint | YES |  |  |
| 6 | `whiteemailaddress` | nvarchar(255) | NO |  |  |
| 7 | `whitedescription` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
