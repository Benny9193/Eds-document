# View: `dbo.VoipOperationAvailability`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `VoipOperationStatusID` | smallint | NO |  |  |
| 4 | `ItemCount` | int | YES |  |  |
| 5 | `DataSource` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationResultHealthStats_Daily` | USER_TABLE |
| `VoipOperationResultHealthStats_Hourly` | USER_TABLE |
| `VoipOperationResults_Daily` | USER_TABLE |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipOperationResults_Hourly` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipOperationAvailability AS
(
    SELECT
        voi.VoipOperationInstanceID
		,vord.RecordTimeUtc
		,vord.VoipOperationStatusID
		,1 AS ItemCount
		,1 AS DataSource -- 1 for Detail
    FROM VoipOperationInstances voi
		JOIN VoipOperationResults_Detail vord ON voi.VoipOperationInstanceID = vord.VoipOperationInstanceID
	WHERE
		voi.Deleted = 0
		AND voi.VoipOperationStateID <> 6
		AND vord.Collapsed = 0
)
    UNION ALL
(
	SELECT
        voi.VoipOperationInstanceID
		,vorh.RecordTimeUtc
		,ts.VoipOperationStatusID
		,Sum(ts.HealthCount) AS ItemCount
		,2 AS DataSource -- 2 for Hourly
    FROM VoipOperationInstances voi
		JOIN VoipOperationResults_Hourly vorh ON voi.VoipOperationInstanceID = vorh.VoipOperationInstanceID
		JOIN VoipOperationResultHealthStats_Hourly ts ON vorh.VoipOperationInstanceID = ts.VoipOperationInstanceID AND vorh.RecordTimeUtc = ts.RecordTimeUtc
	WHERE
		voi.Deleted = 0
		AND voi.VoipOperationStateID <> 6
	GROUP BY
		voi.VoipOperationInstanceID
		,vorh.RecordTimeUtc
		,ts.VoipOperationStatusID
)
	UNION ALL
(
	SELECT
        voi.VoipOperationInstanceID
		,vord.RecordTimeUtc
		,ts.VoipOperationStatusID
		,Sum(ts.HealthCount) AS ItemCount
		,3 AS DataSource -- 3 for Daily
    FROM VoipOperationInstances voi
		JOIN VoipOperationResults_Daily vord ON voi.VoipOperationInstanceID = vord.VoipOperationInstanceID
		JOIN VoipOperationResultHealthStats_Daily ts ON vord.VoipOperationInstanceID = ts.VoipOperationInstanceID AND vord.RecordTimeUtc = ts.RecordTimeUtc
	WHERE
		voi.Deleted = 0
		AND voi.VoipOperationStateID <> 6
	GROUP BY
		voi.VoipOperationInstanceID
		,vord.RecordTimeUtc
		,ts.VoipOperationStatusID
)
```
