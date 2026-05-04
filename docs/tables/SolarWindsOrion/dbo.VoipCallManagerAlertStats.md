# View: `dbo.VoipCallManagerAlertStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `Caption` | nvarchar(255) | YES |  |  |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `RegisteredPhones` | int | YES |  |  |
| 5 | `UnRegisteredPhones` | int | YES |  |  |
| 6 | `RejectedPhones` | int | YES |  |  |
| 7 | `TotalPhones` | int | YES |  |  |
| 8 | `RegisteredGateways` | int | YES |  |  |
| 9 | `UnRegisteredGateways` | int | YES |  |  |
| 10 | `RejectedGateways` | int | YES |  |  |
| 11 | `TotalGateways` | int | YES |  |  |
| 12 | `RegisteredPhonesPercentage` | float | YES |  |  |
| 13 | `ActivePhonesPercentage` | float | YES |  |  |
| 14 | `UnRegisteredPhonesPercentage` | float | YES |  |  |
| 15 | `InactivePhonesPercentage` | float | YES |  |  |
| 16 | `RejectedPhonesPercentage` | float | YES |  |  |
| 17 | `RegisteredGatewaysPercentage` | float | YES |  |  |
| 18 | `ActiveGatewaysPercentage` | float | YES |  |  |
| 19 | `UnRegisteredGatewaysPercentage` | float | YES |  |  |
| 20 | `InactiveGatewaysPercentage` | float | YES |  |  |
| 21 | `RejectedGatewaysPercentage` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipCallManagerStats` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipCallManagerAlertStats]
AS

SELECT	s.* FROM
	(
		SELECT NodeID as InnerNodeID, Max(DateTime) AS InnerDateTime FROM VoipCallManagerStats 
		GROUP BY NodeID
	) AS InnerKey
INNER JOIN VoipCallManagerStats AS s 
	ON s.NodeID = InnerKey.InnerNodeID AND s.DateTime = InnerKey.InnerDateTime
```
