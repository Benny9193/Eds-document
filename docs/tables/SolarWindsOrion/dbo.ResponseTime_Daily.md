# View: `dbo.ResponseTime_Daily`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | NO |  |  |
| 3 | `AvgResponseTime` | smallint | YES |  |  |
| 4 | `MinResponseTime` | smallint | YES |  |  |
| 5 | `MaxResponseTime` | smallint | YES |  |  |
| 6 | `PercentLoss` | smallint | YES |  |  |
| 7 | `Availability` | real | YES |  |  |
| 8 | `Archive` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `ResponseTime_Daily_20190301` | unresolved |
| `ResponseTime_Daily_20190308` | unresolved |
| `ResponseTime_Daily_20190315` | unresolved |
| `ResponseTime_Daily_20190322` | unresolved |
| `ResponseTime_Daily_20190329` | unresolved |
| `ResponseTime_Daily_20190405` | unresolved |
| `ResponseTime_Daily_20190412` | unresolved |
| `ResponseTime_Daily_20190419` | unresolved |
| `ResponseTime_Daily_20190426` | unresolved |
| `ResponseTime_Daily_20190503` | unresolved |
| `ResponseTime_Daily_20190510` | unresolved |
| `ResponseTime_Daily_20190517` | unresolved |
| `ResponseTime_Daily_20190524` | unresolved |
| `ResponseTime_Daily_20190531` | unresolved |
| `ResponseTime_Daily_20190607` | unresolved |
| `ResponseTime_Daily_20190614` | unresolved |
| `ResponseTime_Daily_20190621` | unresolved |
| `ResponseTime_Daily_20190628` | unresolved |
| `ResponseTime_Daily_20190705` | unresolved |
| `ResponseTime_Daily_20190712` | unresolved |
| `ResponseTime_Daily_20190719` | unresolved |
| `ResponseTime_Daily_20190726` | unresolved |
| `ResponseTime_Daily_20190802` | unresolved |
| `ResponseTime_Daily_20190809` | unresolved |
| `ResponseTime_Daily_20190816` | unresolved |
| `ResponseTime_Daily_20190823` | unresolved |
| `ResponseTime_Daily_20190830` | unresolved |
| `ResponseTime_Daily_20190906` | unresolved |
| `ResponseTime_Daily_20190913` | unresolved |
| `ResponseTime_Daily_20190920` | unresolved |
| `ResponseTime_Daily_20190927` | unresolved |
| `ResponseTime_Daily_20191004` | unresolved |
| `ResponseTime_Daily_20191011` | unresolved |
| `ResponseTime_Daily_20191018` | unresolved |
| `ResponseTime_Daily_20191025` | unresolved |
| `ResponseTime_Daily_20191101` | unresolved |
| `ResponseTime_Daily_20191108` | unresolved |
| `ResponseTime_Daily_20191115` | unresolved |
| `ResponseTime_Daily_20191122` | unresolved |
| `ResponseTime_Daily_20191129` | unresolved |
| `ResponseTime_Daily_20191206` | unresolved |
| `ResponseTime_Daily_20191213` | unresolved |
| `ResponseTime_Daily_20191220` | unresolved |
| `ResponseTime_Daily_20191227` | unresolved |
| `ResponseTime_Daily_20200103` | unresolved |
| `ResponseTime_Daily_20200110` | unresolved |
| `ResponseTime_Daily_20200117` | unresolved |
| `ResponseTime_Daily_20200124` | unresolved |
| `ResponseTime_Daily_20200131` | unresolved |
| `ResponseTime_Daily_20200207` | unresolved |
| `ResponseTime_Daily_20200214` | unresolved |
| `ResponseTime_Daily_20200221` | unresolved |
| `ResponseTime_Daily_20200228` | unresolved |
| `ResponseTime_Daily_20200306` | unresolved |
| `ResponseTime_Daily_20200313` | unresolved |
| `ResponseTime_Daily_20200320` | unresolved |
| `ResponseTime_Daily_20200327` | unresolved |
| `ResponseTime_Daily_20200403` | unresolved |
| `ResponseTime_Daily_20200410` | unresolved |
| `ResponseTime_Daily_20200417` | unresolved |
| `ResponseTime_Daily_20200424` | unresolved |
| `ResponseTime_Daily_20200501` | unresolved |
| `ResponseTime_Daily_20200508` | unresolved |
| `ResponseTime_Daily_20200515` | unresolved |
| `ResponseTime_Daily_20200522` | unresolved |
| `ResponseTime_Daily_20200529` | unresolved |
| `ResponseTime_Daily_20200605` | unresolved |
| `ResponseTime_Daily_20200612` | unresolved |
| `ResponseTime_Daily_20200619` | unresolved |
| `ResponseTime_Daily_20200626` | unresolved |
| `ResponseTime_Daily_20200703` | unresolved |
| `ResponseTime_Daily_20200710` | unresolved |
| `ResponseTime_Daily_20200717` | unresolved |
| `ResponseTime_Daily_20200724` | unresolved |
| `ResponseTime_Daily_20200731` | unresolved |
| `ResponseTime_Daily_20200807` | unresolved |
| `ResponseTime_Daily_20200814` | unresolved |
| `ResponseTime_Daily_20200821` | unresolved |
| `ResponseTime_Daily_20200828` | unresolved |
| `ResponseTime_Daily_20200904` | unresolved |
| `ResponseTime_Daily_20200911` | unresolved |
| `ResponseTime_Daily_20200918` | unresolved |
| `ResponseTime_Daily_20200925` | unresolved |
| `ResponseTime_Daily_20201002` | unresolved |
| `ResponseTime_Daily_20201009` | unresolved |
| `ResponseTime_Daily_20201016` | unresolved |
| `ResponseTime_Daily_20201023` | unresolved |
| `ResponseTime_Daily_20201030` | unresolved |

## Used by

| Object | Type |
|--------|------|
| `dbo.dbm_ResponseTime_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_ResponseTime_HourlyToDaily` | SQL_STORED_PROCEDURE |
| [`dbo.ResponseTime`](dbo.ResponseTime.md) | VIEW |
| `dbo.ResponseTime_Daily_Trigger` | SQL_TRIGGER |
| `dbo.ResponseTimeByDaysFnc` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.swsp_Node_GetAvailability` | SQL_STORED_PROCEDURE |

## Definition

```sql
Create View [dbo].[ResponseTime_Daily] As
		
			Select * FROM ResponseTime_Daily_20201030 
			Union All
			Select * FROM ResponseTime_Daily_20201023 
			Union All
			Select * FROM ResponseTime_Daily_20201016 
			Union All
			Select * FROM ResponseTime_Daily_20201009 
			Union All
			Select * FROM ResponseTime_Daily_20201002 
			Union All
			Select * FROM ResponseTime_Daily_20200925 
			Union All
			Select * FROM ResponseTime_Daily_20200918 
			Union All
			Select * FROM ResponseTime_Daily_20200911 
			Union All
			Select * FROM ResponseTime_Daily_20200904 
			Union All
			Select * FROM ResponseTime_Daily_20200828 
			Union All
			Select * FROM ResponseTime_Daily_20200821 
			Union All
			Select * FROM ResponseTime_Daily_20200814 
			Union All
			Select * FROM ResponseTime_Daily_20200807 
			Union All
			Select * FROM ResponseTime_Daily_20200731 
			Union All
			Select * FROM ResponseTime_Daily_20200724 
			Union All
			Select * FROM ResponseTime_Daily_20200717 
			Union All
			Select * FROM ResponseTime_Daily_20200710 
			Union All
			Select * FROM ResponseTime_Daily_20200703 
			Union All
			Select * FROM ResponseTime_Daily_20200626 
			Union All
			Select * FROM ResponseTime_Daily_20200619 
			Union All
			Select * FROM ResponseTime_Daily_20200612 
			Union All
			Select * FROM ResponseTime_Daily_20200605 
			Union All
			Select * FROM ResponseTime_Daily_20200529 
			Union All
			Select * FROM ResponseTime_Daily_20200522 
			Union All
			Select * FROM ResponseTime_Daily_20200515 
			Union All
			Select * FROM ResponseTime_Daily_20200508 
			Union All
			Select * FROM ResponseTime_Daily_20200501 
			Union All
			Select * FROM ResponseTime_Daily_20200424 
			Union All
			Select * FROM ResponseTime_Daily_20200417 
			Union All
			Select * FROM ResponseTime_Daily_20200410 
			Union All
			Select * FROM ResponseTime_Daily_20200403 
			Union All
			Select * FROM ResponseTime_Daily_20200327 
			Union All
			Select * FROM ResponseTime_Daily_20200320 
			Union All
			Select * FROM ResponseTime_Daily_20200313 
			Union All
			Select * FROM ResponseTime_Daily_20200306 
			Union All
			Select * FROM ResponseTime_Daily_20200228 
			Union All
			Select * FROM ResponseTime_Daily_20200221 
			Union All
			Select * FROM ResponseTime_Daily_20200214 
			Union All
			Select * FROM ResponseTime_Daily_20200207 
			Union All
			Select * FROM ResponseTime_Daily_20200131 
			Union All
			Select * FROM ResponseTime_Daily_20200124 
			Union All
			Select * FROM ResponseTime_Daily_20200117 
			Union All
			Select * FROM ResponseTime_Daily_20200110 
			Union All
			Select * FROM ResponseTime_Daily_20200103 
			Union All
			Select * FROM ResponseTime_Daily_20191227 
			Union All
			Select * FROM ResponseTime_Daily_20191220 
			Union All
			Select * FROM ResponseTime_Daily_20191213 
			Union All
			Select * FROM ResponseTime_Daily_20191206 
			Union All
			Select * FROM ResponseTime_Daily_20191129 
			Union All
			Select * FROM ResponseTime_Daily_20191122 
			Union All
			Select * FROM ResponseTime_Daily_20191115 
			Union All
			Select * FROM ResponseTime_Daily_20191108 
			Union All
			Select * FROM ResponseTime_Daily_20191101 
			Union All
			Select * FROM ResponseTime_Daily_20191025 
			Union All
			Select * FROM ResponseTime_Daily_20191018 
			Union All
			Select * FROM ResponseTime_Daily_20191011 
			Union All
			Select * FROM ResponseTime_Daily_20191004 
			Union All
			Select * FROM ResponseTime_Daily_20190927 
			Union All
			Select * FROM ResponseTime_Daily_20190920 
			Union All
			Select * FROM ResponseTime_Daily_20190913 
			Union All
			Select * FROM ResponseTime_Daily_20190906 
			Union All
			Select * FROM ResponseTime_Daily_20190830 
			Union All
			Select * FROM ResponseTime_Daily_20190823 
			Union All
			Select * FROM ResponseTime_Daily_20190816 
			Union All
			Select * FROM ResponseTime_Daily_20190809 
			Union All
			Select * FROM ResponseTime_Daily_20190802 
			Union All
			Select * FROM ResponseTime_Daily_20190726 
			Union All
			Select * FROM ResponseTime_Daily_20190719 
			Union All
			Select * FROM ResponseTime_Daily_20190712 
			Union All
			Select * FROM ResponseTime_Daily_20190705 
			Union All
			Select * FROM ResponseTime_Daily_20190628 
			Union All
			Select * FROM ResponseTime_Daily_20190621 
			Union All
			Select * FROM ResponseTime_Daily_20190614 
			Union All
			Select * FROM ResponseTime_Daily_20190607 
			Union All
			Select * FROM ResponseTime_Daily_20190531 
			Union All
			Select * FROM ResponseTime_Daily_20190524 
			Union All
			Select * FROM ResponseTime_Daily_20190517 
			Union All
			Select * FROM ResponseTime_Daily_20190510 
			Union All
			Select * FROM ResponseTime_Daily_20190503 
			Union All
			Select * FROM ResponseTime_Daily_20190426 
			Union All
			Select * FROM ResponseTime_Daily_20190419 
			Union All
			Select * FROM ResponseTime_Daily_20190412 
			Union All
			Select * FROM ResponseTime_Daily_20190405 
			Union All
			Select * FROM ResponseTime_Daily_20190329 
			Union All
			Select * FROM ResponseTime_Daily_20190322 
			Union All
			Select * FROM ResponseTime_Daily_20190315 
			Union All
			Select * FROM ResponseTime_Daily_20190308 
			Union All
			Select * FROM ResponseTime_Daily_20190301
```
