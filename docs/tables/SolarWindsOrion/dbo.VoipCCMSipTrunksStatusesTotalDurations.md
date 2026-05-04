# View: `dbo.VoipCCMSipTrunksStatusesTotalDurations`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CallManagerName` | varchar(100) | YES |  |  |
| 2 | `TrunkName` | varchar(100) | YES |  |  |
| 3 | `SipTrunkId` | int | YES |  |  |
| 4 | `StatusAny_Percents` | decimal(5,2) | YES |  |  |
| 5 | `StatusRegistered_Percents` | decimal(5,2) | YES |  |  |
| 6 | `StatusUnRegistered_Percents` | decimal(5,2) | YES |  |  |
| 7 | `StatusRejected_Percents` | decimal(5,2) | YES |  |  |
| 8 | `StatusPartiallyRegistered_Percents` | decimal(5,2) | YES |  |  |
| 9 | `StatusUnknown_Percents` | decimal(5,2) | YES |  |  |
| 10 | `RecordTimeUtc` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.voip_GetCCMSipTrunksStatusesTotalDurations` | SQL_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipCCMSipTrunksStatusesTotalDurations]
AS 
	SELECT 
		[CallManagerName], 
		[TrunkName], 
		[SipTrunkId], 
		[StatusAny_Percents], 
		[StatusRegistered_Percents], 
		[StatusUnRegistered_Percents], 
		[StatusRejected_Percents], 
		[StatusPartiallyRegistered_Percents], 
		[StatusUnknown_Percents], 
		[RecordTimeUtc] 
	FROM [dbo].[voip_GetCCMSipTrunksStatusesTotalDurations]()
```
