# View: `dbo.VoipGatewayEndpointCurrentStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayEndpointID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `MinUtilization` | float | NO |  |  |
| 4 | `MaxUtilization` | float | NO |  |  |
| 5 | `AvgUtilization` | float | NO |  |  |
| 6 | `MinVoiceIncomingUtilization` | float | NO |  |  |
| 7 | `MaxVoiceIncomingUtilization` | float | NO |  |  |
| 8 | `AvgVoiceIncomingUtilization` | float | NO |  |  |
| 9 | `MinVoiceOutgoingUtilization` | float | NO |  |  |
| 10 | `MaxVoiceOutgoingUtilization` | float | NO |  |  |
| 11 | `AvgVoiceOutgoingUtilization` | float | NO |  |  |
| 12 | `MinDataIncomingUtilization` | float | NO |  |  |
| 13 | `MaxDataIncomingUtilization` | float | NO |  |  |
| 14 | `AvgDataIncomingUtilization` | float | NO |  |  |
| 15 | `MinDataOutgoingUtilization` | float | NO |  |  |
| 16 | `MaxDataOutgoingUtilization` | float | NO |  |  |
| 17 | `AvgDataOutgoingUtilization` | float | NO |  |  |
| 18 | `MinChannelCount` | float | NO |  |  |
| 19 | `MaxChannelCount` | float | NO |  |  |
| 20 | `AvgChannelCount` | float | NO |  |  |
| 21 | `RN` | bigint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayEndpointStats` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayEndpointCurrentStats]
AS
WITH CTE AS
(
  SELECT
	*,
	ROW_NUMBER() OVER (PARTITION BY [VoipGatewayEndpointID] ORDER BY [RecordTimeUtc] DESC) AS RN
  FROM [VoipGatewayEndpointStats]
)
SELECT *
FROM CTE	
WHERE RN = 1
```
