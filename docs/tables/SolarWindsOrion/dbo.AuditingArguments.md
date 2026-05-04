# Table: `dbo.AuditingArguments`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 458

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AuditEventID` | int | NO |  |  |
| 2 | `ArgsKey` | varchar(20) | NO |  |  |
| 3 | `ArgsValue` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AuditingArguments_AuditEventID` | no | CLUSTERED | `AuditEventID` |  |
