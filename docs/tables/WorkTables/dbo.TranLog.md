# Table: `dbo.TranLog`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 45613234

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | bigint | NO |  | YES |
| 2 | `SysId` | uniqueidentifier | YES |  |  |
| 3 | `RequestStart` | datetime | YES |  |  |
| 4 | `RequestEnd` | datetime | YES |  |  |
| 5 | `SessionId` | varchar(64) | YES |  |  |
| 6 | `OrigURL` | varchar(512) | YES |  |  |
| 7 | `Content` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_SessionIdStart_OrigURLContent` | no | NONCLUSTERED | `SessionId`, `RequestStart` | `OrigURL`, `Content` |
