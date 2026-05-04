# Table: `dbo.IISLogs`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 491178

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LogFilename` | varchar(255) | YES |  |  |
| 2 | `LogRow` | int | YES |  |  |
| 3 | `date` | datetime | YES |  |  |
| 4 | `time` | datetime | YES |  |  |
| 5 | `cIp` | varchar(255) | YES |  |  |
| 6 | `csUsername` | varchar(255) | YES |  |  |
| 7 | `sSitename` | varchar(255) | YES |  |  |
| 8 | `sComputername` | varchar(255) | YES |  |  |
| 9 | `sIp` | varchar(255) | YES |  |  |
| 10 | `sPort` | int | YES |  |  |
| 11 | `csMethod` | varchar(255) | YES |  |  |
| 12 | `csUriStem` | varchar(255) | YES |  |  |
| 13 | `csUriQuery` | varchar(255) | YES |  |  |
| 14 | `scStatus` | int | YES |  |  |
| 15 | `scSubstatus` | int | YES |  |  |
| 16 | `scWin32Status` | int | YES |  |  |
| 17 | `scBytes` | int | YES |  |  |
| 18 | `csBytes` | int | YES |  |  |
| 19 | `timeTaken` | int | YES |  |  |
| 20 | `csVersion` | varchar(255) | YES |  |  |
| 21 | `csHost` | varchar(255) | YES |  |  |
| 22 | `csUserAgent` | varchar(255) | YES |  |  |
| 23 | `csCookie` | varchar(255) | YES |  |  |
| 24 | `csReferer` | varchar(255) | YES |  |  |
| 25 | `sEvent` | varchar(255) | YES |  |  |
| 26 | `sProcessType` | varchar(255) | YES |  |  |
| 27 | `sUserTime` | real | YES |  |  |
| 28 | `sKernelTime` | real | YES |  |  |
| 29 | `sPageFaults` | int | YES |  |  |
| 30 | `sTotalProcs` | int | YES |  |  |
| 31 | `sActiveProcs` | int | YES |  |  |
| 32 | `sStoppedProcs` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
