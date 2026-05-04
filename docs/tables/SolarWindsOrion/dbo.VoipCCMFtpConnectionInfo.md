# Table: `dbo.VoipCCMFtpConnectionInfo`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `FTPServer` | varchar(255) | NO |  |  |
| 3 | `Directory` | varchar(255) | YES |  |  |
| 4 | `CredentialID` | int | NO |  |  |
| 5 | `DeleteDownloadedFiles` | bit | NO |  |  |
| 6 | `Frequency` | int | NO |  |  |
| 7 | `CDRSeqenceNumberToDeleteFrom` | int | YES | `(NULL)` |  |
| 8 | `CDRSeqenceNumberToDownloadFrom` | int | YES | `(NULL)` |  |
| 9 | `CMRSeqenceNumberToDeleteFrom` | int | YES | `(NULL)` |  |
| 10 | `CMRSeqenceNumberToDownloadFrom` | int | YES | `(NULL)` |  |
| 11 | `CurrentJobID` | uniqueidentifier | YES | `(NULL)` |  |
| 12 | `CurrentJobStartTimeUtc` | datetime | YES | `(NULL)` |  |
| 13 | `PassiveMode` | bit | YES | `((1))` |  |
| 14 | `SecureConnection` | bit | YES | `((0))` |  |
| 15 | `Port` | int | YES | `((21))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
