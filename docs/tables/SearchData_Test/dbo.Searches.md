# Table: `dbo.Searches`

**Database:** `SearchData_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1598434

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequestStart` | datetime2 | NO |  |  |
| 2 | `SessionId` | varchar(64) | YES |  |  |
| 3 | `URL` | nvarchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ski_SessionStart_URL` | no | NONCLUSTERED | `SessionId`, `RequestStart` | `URL` |
