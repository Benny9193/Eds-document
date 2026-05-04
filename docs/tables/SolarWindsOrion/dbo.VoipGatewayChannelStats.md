# View: `dbo.VoipGatewayChannelStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayChannelID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `CallOrigin` | int | NO |  |  |
| 4 | `VoipGatewayChannelMediaTypeID` | int | NO |  |  |
| 5 | `CallCount` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayChannelStats_Daily` | USER_TABLE |
| `VoipGatewayChannelStats_Detail` | USER_TABLE |
| `VoipGatewayChannelStats_Hourly` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayChannelStats] AS
	
	SELECT 
		VoipGatewayChannelID,
		RecordTimeUtc,
		CallOrigin,
		VoipGatewayChannelMediaTypeID,
		1 AS CallCount
	FROM
		VoipGatewayChannelStats_Detail
		
	UNION
		
	SELECT 
		VoipGatewayChannelID,
		RecordTimeUtc,
		CallOrigin,
		VoipGatewayChannelMediaTypeID,
		[Count] AS CallCount
	FROM
		VoipGatewayChannelStats_Hourly
		
	UNION
	
	SELECT 
		VoipGatewayChannelID,
		RecordTimeUtc,
		CallOrigin,
		VoipGatewayChannelMediaTypeID,
		[Count] AS CallCount
	FROM
		VoipGatewayChannelStats_Daily
```
