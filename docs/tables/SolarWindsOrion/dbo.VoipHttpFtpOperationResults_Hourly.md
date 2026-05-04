# Table: `dbo.VoipHttpFtpOperationResults_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `MinHttpRtt` | int | NO |  |  |
| 4 | `AvgHttpRtt` | int | NO |  |  |
| 5 | `MaxHttpRtt` | int | NO |  |  |
| 6 | `MinDnsRtt` | int | YES |  |  |
| 7 | `AvgDnsRtt` | int | YES |  |  |
| 8 | `MaxDnsRtt` | int | YES |  |  |
| 9 | `MinTcpConnectRtt` | int | YES |  |  |
| 10 | `AvgTcpConnectRtt` | int | YES |  |  |
| 11 | `MaxTcpConnectRtt` | int | YES |  |  |
| 12 | `MinTransactionRtt` | int | YES |  |  |
| 13 | `AvgTransactionRtt` | int | YES |  |  |
| 14 | `MaxTransactionRtt` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
