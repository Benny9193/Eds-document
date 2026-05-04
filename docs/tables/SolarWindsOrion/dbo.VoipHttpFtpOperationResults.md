# View: `dbo.VoipHttpFtpOperationResults`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `VoipOperationTypeID` | smallint | NO |  |  |
| 3 | `SourceNodeID` | int | NO |  |  |
| 4 | `TargetNodeID` | int | YES |  |  |
| 5 | `Frequency` | int | NO |  |  |
| 6 | `LifeTimeUtc` | datetime | YES |  |  |
| 7 | `IpSlaOperationNumber` | int | YES |  |  |
| 8 | `OperationName` | nvarchar(max) | YES |  |  |
| 9 | `DateChangedUtc` | datetime | NO |  |  |
| 10 | `VoipOperationResultID` | bigint | YES |  |  |
| 11 | `RecordTimeUtc` | datetime | NO |  |  |
| 12 | `MinRoundTripTime` | int | YES |  |  |
| 13 | `MaxRoundTripTime` | int | YES |  |  |
| 14 | `AvgRoundTripTime` | int | YES |  |  |
| 15 | `MinHttpRtt` | int | YES |  |  |
| 16 | `AvgHttpRtt` | int | YES |  |  |
| 17 | `MaxHttpRtt` | int | YES |  |  |
| 18 | `MinDnsRtt` | int | YES |  |  |
| 19 | `AvgDnsRtt` | int | YES |  |  |
| 20 | `MaxDnsRtt` | int | YES |  |  |
| 21 | `MinTcpConnectRtt` | int | YES |  |  |
| 22 | `AvgTcpConnectRtt` | int | YES |  |  |
| 23 | `MaxTcpConnectRtt` | int | YES |  |  |
| 24 | `MinTransactionRtt` | int | YES |  |  |
| 25 | `AvgTransactionRtt` | int | YES |  |  |
| 26 | `MaxTransactionRtt` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipHttpFtpOperationResults_Daily` | USER_TABLE |
| `VoipHttpFtpOperationResults_Detail` | USER_TABLE |
| `VoipHttpFtpOperationResults_Hourly` | USER_TABLE |
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationResults_Daily` | USER_TABLE |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipOperationResults_Hourly` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipHttpFtpOperationResults AS
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Detail.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Detail.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Detail.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Detail.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Detail.RecordTimeUtc,
        RoundTripTime as MinRoundTripTime,
        RoundTripTime as MaxRoundTripTime,
        RoundTripTime as AvgRoundTripTime,
        HttpRtt as MinHttpRtt,
        HttpRtt as AvgHttpRtt,
        HttpRtt as MaxHttpRtt,
        DnsRtt as MinDnsRtt,
        DnsRtt as AvgDnsRtt,
        DnsRtt as MaxDnsRtt,
        TcpConnectRtt as MinTcpConnectRtt,
        TcpConnectRtt as AvgTcpConnectRtt,
        TcpConnectRtt as MaxTcpConnectRtt,
        TransactionRtt as MinTransactionRtt,
        TransactionRtt as AvgTransactionRtt,
        TransactionRtt as MaxTransactionRtt
    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Detail ON VoipOperationResults_Detail.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipHttpFtpOperationResults_Detail ON VoipHttpFtpOperationResults_Detail.VoipOperationInstanceID = VoipOperationResults_Detail.VoipOperationInstanceID AND 
		VoipHttpFtpOperationResults_Detail.RecordTimeUtc = VoipOperationResults_Detail.RecordTimeUtc
    WHERE VoipOperationResults_Detail.VoipOperationResultTypeID < 1000 AND
          VoipOperationInstances.VoipOperationStateID<>6 AND
          VoipOperationInstances.Deleted=0 AND
          VoipOperationResults_Detail.Collapsed = 0
    UNION ALL
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Hourly.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Hourly.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Hourly.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Hourly.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Hourly.RecordTimeUtc,
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        MinHttpRtt,
        AvgHttpRtt,
        MaxHttpRtt,
        MinDnsRtt,
        AvgDnsRtt,
        MaxDnsRtt,
        MinTcpConnectRtt,
        AvgTcpConnectRtt,
        MaxTcpConnectRtt,
        MinTransactionRtt,
        AvgTransactionRtt,
        MaxTransactionRtt
    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Hourly ON VoipOperationResults_Hourly.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipHttpFtpOperationResults_Hourly ON VoipHttpFtpOperationResults_Hourly.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND 
		VoipHttpFtpOperationResults_Hourly.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0
    UNION ALL
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Daily.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Daily.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Daily.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Daily.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Daily.RecordTimeUtc,
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        MinHttpRtt,
        AvgHttpRtt,
        MaxHttpRtt,
        MinDnsRtt,
        AvgDnsRtt,
        MaxDnsRtt,
        MinTcpConnectRtt,
        AvgTcpConnectRtt,
        MaxTcpConnectRtt,
        MinTransactionRtt,
        AvgTransactionRtt,
        MaxTransactionRtt
    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Daily ON VoipOperationResults_Daily.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipHttpFtpOperationResults_Daily ON VoipHttpFtpOperationResults_Daily.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND 
		VoipHttpFtpOperationResults_Daily.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0
```
