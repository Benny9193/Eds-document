# Table: `dbo.hm_greylisting_triplets`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `glid` | bigint | NO |  | YES |
| 2 | `glcreatetime` | datetime | NO |  |  |
| 3 | `glblockendtime` | datetime | NO |  |  |
| 4 | `gldeletetime` | datetime | NO |  |  |
| 5 | `glipaddress1` | bigint | NO |  |  |
| 6 | `glipaddress2` | bigint | YES |  |  |
| 7 | `glsenderaddress` | nvarchar(200) | NO |  |  |
| 8 | `glrecipientaddress` | nvarchar(200) | NO |  |  |
| 9 | `glblockedcount` | int | NO |  |  |
| 10 | `glpassedcount` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `u_gltriplet` | YES | NONCLUSTERED | `glipaddress1`, `glipaddress2`, `glsenderaddress`, `glrecipientaddress` |  |
