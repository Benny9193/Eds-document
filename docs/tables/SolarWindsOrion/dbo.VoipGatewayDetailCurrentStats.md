# View: `dbo.VoipGatewayDetailCurrentStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayID` | int | NO |  |  |
| 2 | `TrunkCount` | int | YES |  |  |
| 3 | `RecordTimeUtc` | datetime | NO |  |  |
| 4 | `MinUtilization` | float | NO |  |  |
| 5 | `MaxUtilization` | float | NO |  |  |
| 6 | `AvgUtilization` | float | NO |  |  |
| 7 | `MinVoiceIncomingUtilization` | float | NO |  |  |
| 8 | `MaxVoiceIncomingUtilization` | float | NO |  |  |
| 9 | `AvgVoiceIncomingUtilization` | float | NO |  |  |
| 10 | `MinVoiceOutgoingUtilization` | float | NO |  |  |
| 11 | `MaxVoiceOutgoingUtilization` | float | NO |  |  |
| 12 | `AvgVoiceOutgoingUtilization` | float | NO |  |  |
| 13 | `MinDataIncomingUtilization` | float | NO |  |  |
| 14 | `MaxDataIncomingUtilization` | float | NO |  |  |
| 15 | `AvgDataIncomingUtilization` | float | NO |  |  |
| 16 | `MinDataOutgoingUtilization` | float | NO |  |  |
| 17 | `MaxDataOutgoingUtilization` | float | NO |  |  |
| 18 | `AvgDataOutgoingUtilization` | float | NO |  |  |
| 19 | `MinChannelCount` | float | YES |  |  |
| 20 | `MaxChannelCount` | float | YES |  |  |
| 21 | `AvgChannelCount` | float | YES |  |  |
| 22 | `RN` | bigint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayDetailStats` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayDetailCurrentStats]
AS
WITH CTE AS
(
  SELECT
	*,
	ROW_NUMBER() OVER (PARTITION BY [VoipGatewayID] ORDER BY [RecordTimeUtc] DESC) AS RN
  FROM VoipGatewayDetailStats
)
SELECT *
FROM CTE	
WHERE RN = 1
```
