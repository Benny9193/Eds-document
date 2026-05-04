# Table: `dbo.TransactionLogCF`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3557619

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Outbound HTTP request/response log for integration calls (~3.5M rows). Captures `URL`, `Method`, `Headers`, `Content`, request-start/end timestamps, target server, and session. Used to debug cXML / vendor-API integrations. Rolls over into `TransactionLogCF_Arc`.

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
| `SKI_RequestStart_IdSession` | no | NONCLUSTERED | `RequestStart` | `SysId`, `SessionId` |
