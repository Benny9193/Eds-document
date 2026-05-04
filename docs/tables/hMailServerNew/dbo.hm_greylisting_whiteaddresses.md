# Table: `dbo.hm_greylisting_whiteaddresses`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `whiteid` | bigint | NO |  | YES |
| 2 | `whiteipaddress` | nvarchar(255) | NO |  |  |
| 3 | `whiteipdescription` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `u_glwhite` | YES | NONCLUSTERED | `whiteipaddress` |  |
