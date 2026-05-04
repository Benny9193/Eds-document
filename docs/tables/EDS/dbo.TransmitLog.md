# Table: `dbo.TransmitLog`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 155926

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Generic outbound HTTP transmit log (~156K rows). Captures `RequestURL`, `RequestParams`, and `RequestData` per request. Lighter-weight than `TransactionLogCF` (no response capture); used for fire-and-forget integration calls.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TransmitId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DateStamp` | datetime2 | YES | `(getdate())` |  |
| 3 | `RequestURL` | varchar(1024) | YES |  |  |
| 4 | `RequestParams` | varchar(2048) | YES |  |  |
| 5 | `RequestData` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
