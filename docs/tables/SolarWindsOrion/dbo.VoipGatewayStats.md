# View: `dbo.VoipGatewayStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `Status` | int | NO |  |  |
| 4 | `OrphanActiveCallsCount` | int | NO |  |  |
| 5 | `StatusCount` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayStats_Daily` | USER_TABLE |
| `VoipGatewayStats_Detail` | USER_TABLE |
| `VoipGatewayStats_Hourly` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayStats] AS
	
	SELECT 
		VoipGatewayID,
		RecordTimeUtc,
		[Status],
		OrphanActiveCallsCount,
		1 AS StatusCount
	FROM
		VoipGatewayStats_Detail
		
	UNION
		
	SELECT 
		VoipGatewayID,
		RecordTimeUtc,
		[Status],
		OrphanActiveCallsCount,
		StatusCount
	FROM
		VoipGatewayStats_Hourly
		
	UNION
	
	SELECT 
		VoipGatewayID,
		RecordTimeUtc,
		[Status],
		OrphanActiveCallsCount,
		StatusCount
	FROM
		VoipGatewayStats_Daily
```
