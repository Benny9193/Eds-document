# Table: `dbo.HA_Audit`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 39

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `HaAuditId` | int | NO |  | YES |
| 2 | `DT` | datetime | YES |  |  |
| 3 | `Msg` | nvarchar(400) | YES |  |  |
| 4 | `Details` | nvarchar(max) | YES |  |  |
| 5 | `Tags` | nvarchar(400) | YES |  |  |
| 6 | `Workstation` | nvarchar(128) | NO | `(host_name())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_HA_Audit_DT` | no | NONCLUSTERED | `DT` |  |
