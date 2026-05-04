# Table: `dbo.TransactionLog_HISTORY`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 124442937

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Long-tail historical event log (~124M rows). Cold storage — query with date filters and expect slow reads. Rarely needed for operational work; kept for compliance.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | uniqueidentifier | NO |  | YES |
| 2 | `RequestStart` | datetime2 | NO |  |  |
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
| `ski_RequestStart_Session` | no | NONCLUSTERED | `RequestStart` | `SessionId`, `SysId` |
| `SKI_SessionRequestStart` | no | NONCLUSTERED | `SessionId`, `RequestStart` | `SysId` |
