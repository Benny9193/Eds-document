# Table: `dbo.TransactionLogCF_Arc`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32358341

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `RequestStart` | datetime2 | YES | `(sysdatetime())` |  |
| 3 | `RequestEnd` | datetime2 | YES |  |  |
| 4 | `SessionId` | varchar(64) | YES |  |  |
| 5 | `TargetServer` | varchar(64) | YES |  |  |
| 6 | `URL` | varchar(2014) | YES |  |  |
| 7 | `Headers` | varchar(max) | YES |  |  |
| 8 | `Content` | varchar(max) | YES |  |  |
| 9 | `Method` | varchar(50) | YES |  |  |
| 10 | `Protocol` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_RequestStart_SessionHeadersSysId` | no | NONCLUSTERED | `RequestStart` | `SysId`, `SessionId`, `Headers` |
| `SKI_SessionRequestStart_HeadersSysId` | no | NONCLUSTERED | `SessionId`, `RequestStart` | `SysId`, `Headers` |
