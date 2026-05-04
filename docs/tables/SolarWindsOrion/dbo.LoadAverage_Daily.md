# View: `dbo.LoadAverage_Daily`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `TimeStampUTC` | datetime | NO |  |  |
| 3 | `LoadAverage1Min` | real | YES |  |  |
| 4 | `LoadAverage1Max` | real | YES |  |  |
| 5 | `LoadAverage1Avg` | real | YES |  |  |
| 6 | `LoadAverage5Min` | real | YES |  |  |
| 7 | `LoadAverage5Max` | real | YES |  |  |
| 8 | `LoadAverage5Avg` | real | YES |  |  |
| 9 | `LoadAverage15Min` | real | YES |  |  |
| 10 | `LoadAverage15Max` | real | YES |  |  |
| 11 | `LoadAverage15Avg` | real | YES |  |  |
| 12 | `Archive` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `LoadAverage_Daily_20190301` | unresolved |
| `LoadAverage_Daily_20190308` | unresolved |
| `LoadAverage_Daily_20190315` | unresolved |
| `LoadAverage_Daily_20190322` | unresolved |
| `LoadAverage_Daily_20190329` | unresolved |
| `LoadAverage_Daily_20190405` | unresolved |
| `LoadAverage_Daily_20190412` | unresolved |
| `LoadAverage_Daily_20190419` | unresolved |
| `LoadAverage_Daily_20190426` | unresolved |
| `LoadAverage_Daily_20190503` | unresolved |
| `LoadAverage_Daily_20190510` | unresolved |
| `LoadAverage_Daily_20190517` | unresolved |
| `LoadAverage_Daily_20190524` | unresolved |
| `LoadAverage_Daily_20190531` | unresolved |
| `LoadAverage_Daily_20190607` | unresolved |
| `LoadAverage_Daily_20190614` | unresolved |
| `LoadAverage_Daily_20190621` | unresolved |
| `LoadAverage_Daily_20190628` | unresolved |
| `LoadAverage_Daily_20190705` | unresolved |
| `LoadAverage_Daily_20190712` | unresolved |
| `LoadAverage_Daily_20190719` | unresolved |
| `LoadAverage_Daily_20190726` | unresolved |
| `LoadAverage_Daily_20190802` | unresolved |
| `LoadAverage_Daily_20190809` | unresolved |
| `LoadAverage_Daily_20190816` | unresolved |
| `LoadAverage_Daily_20190823` | unresolved |
| `LoadAverage_Daily_20190830` | unresolved |
| `LoadAverage_Daily_20190906` | unresolved |
| `LoadAverage_Daily_20190913` | unresolved |
| `LoadAverage_Daily_20190920` | unresolved |
| `LoadAverage_Daily_20190927` | unresolved |
| `LoadAverage_Daily_20191004` | unresolved |
| `LoadAverage_Daily_20191011` | unresolved |
| `LoadAverage_Daily_20191018` | unresolved |
| `LoadAverage_Daily_20191025` | unresolved |
| `LoadAverage_Daily_20191101` | unresolved |
| `LoadAverage_Daily_20191108` | unresolved |
| `LoadAverage_Daily_20191115` | unresolved |
| `LoadAverage_Daily_20191122` | unresolved |
| `LoadAverage_Daily_20191129` | unresolved |
| `LoadAverage_Daily_20191206` | unresolved |
| `LoadAverage_Daily_20191213` | unresolved |
| `LoadAverage_Daily_20191220` | unresolved |
| `LoadAverage_Daily_20191227` | unresolved |
| `LoadAverage_Daily_20200103` | unresolved |
| `LoadAverage_Daily_20200110` | unresolved |
| `LoadAverage_Daily_20200117` | unresolved |
| `LoadAverage_Daily_20200124` | unresolved |
| `LoadAverage_Daily_20200131` | unresolved |
| `LoadAverage_Daily_20200207` | unresolved |
| `LoadAverage_Daily_20200214` | unresolved |
| `LoadAverage_Daily_20200221` | unresolved |
| `LoadAverage_Daily_20200228` | unresolved |
| `LoadAverage_Daily_20200306` | unresolved |
| `LoadAverage_Daily_20200313` | unresolved |
| `LoadAverage_Daily_20200320` | unresolved |
| `LoadAverage_Daily_20200327` | unresolved |
| `LoadAverage_Daily_20200403` | unresolved |
| `LoadAverage_Daily_20200410` | unresolved |
| `LoadAverage_Daily_20200417` | unresolved |
| `LoadAverage_Daily_20200424` | unresolved |
| `LoadAverage_Daily_20200501` | unresolved |
| `LoadAverage_Daily_20200508` | unresolved |
| `LoadAverage_Daily_20200515` | unresolved |
| `LoadAverage_Daily_20200522` | unresolved |
| `LoadAverage_Daily_20200529` | unresolved |
| `LoadAverage_Daily_20200605` | unresolved |
| `LoadAverage_Daily_20200612` | unresolved |
| `LoadAverage_Daily_20200619` | unresolved |
| `LoadAverage_Daily_20200626` | unresolved |
| `LoadAverage_Daily_20200703` | unresolved |
| `LoadAverage_Daily_20200710` | unresolved |
| `LoadAverage_Daily_20200717` | unresolved |
| `LoadAverage_Daily_20200724` | unresolved |
| `LoadAverage_Daily_20200731` | unresolved |
| `LoadAverage_Daily_20200807` | unresolved |
| `LoadAverage_Daily_20200814` | unresolved |
| `LoadAverage_Daily_20200821` | unresolved |
| `LoadAverage_Daily_20200828` | unresolved |
| `LoadAverage_Daily_20200904` | unresolved |
| `LoadAverage_Daily_20200911` | unresolved |
| `LoadAverage_Daily_20200918` | unresolved |
| `LoadAverage_Daily_20200925` | unresolved |
| `LoadAverage_Daily_20201002` | unresolved |
| `LoadAverage_Daily_20201009` | unresolved |
| `LoadAverage_Daily_20201016` | unresolved |
| `LoadAverage_Daily_20201023` | unresolved |
| `LoadAverage_Daily_20201030` | unresolved |

## Used by

| Object | Type |
|--------|------|
| `dbo.dbm_LoadAverage_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_LoadAverage_HourlyToDaily` | SQL_STORED_PROCEDURE |
| [`dbo.LoadAverage`](dbo.LoadAverage.md) | VIEW |
| `dbo.LoadAverage_Daily_Trigger` | SQL_TRIGGER |

## Definition

```sql
Create View [dbo].[LoadAverage_Daily] As
		
			Select * FROM LoadAverage_Daily_20201030 
			Union All
			Select * FROM LoadAverage_Daily_20201023 
			Union All
			Select * FROM LoadAverage_Daily_20201016 
			Union All
			Select * FROM LoadAverage_Daily_20201009 
			Union All
			Select * FROM LoadAverage_Daily_20201002 
			Union All
			Select * FROM LoadAverage_Daily_20200925 
			Union All
			Select * FROM LoadAverage_Daily_20200918 
			Union All
			Select * FROM LoadAverage_Daily_20200911 
			Union All
			Select * FROM LoadAverage_Daily_20200904 
			Union All
			Select * FROM LoadAverage_Daily_20200828 
			Union All
			Select * FROM LoadAverage_Daily_20200821 
			Union All
			Select * FROM LoadAverage_Daily_20200814 
			Union All
			Select * FROM LoadAverage_Daily_20200807 
			Union All
			Select * FROM LoadAverage_Daily_20200731 
			Union All
			Select * FROM LoadAverage_Daily_20200724 
			Union All
			Select * FROM LoadAverage_Daily_20200717 
			Union All
			Select * FROM LoadAverage_Daily_20200710 
			Union All
			Select * FROM LoadAverage_Daily_20200703 
			Union All
			Select * FROM LoadAverage_Daily_20200626 
			Union All
			Select * FROM LoadAverage_Daily_20200619 
			Union All
			Select * FROM LoadAverage_Daily_20200612 
			Union All
			Select * FROM LoadAverage_Daily_20200605 
			Union All
			Select * FROM LoadAverage_Daily_20200529 
			Union All
			Select * FROM LoadAverage_Daily_20200522 
			Union All
			Select * FROM LoadAverage_Daily_20200515 
			Union All
			Select * FROM LoadAverage_Daily_20200508 
			Union All
			Select * FROM LoadAverage_Daily_20200501 
			Union All
			Select * FROM LoadAverage_Daily_20200424 
			Union All
			Select * FROM LoadAverage_Daily_20200417 
			Union All
			Select * FROM LoadAverage_Daily_20200410 
			Union All
			Select * FROM LoadAverage_Daily_20200403 
			Union All
			Select * FROM LoadAverage_Daily_20200327 
			Union All
			Select * FROM LoadAverage_Daily_20200320 
			Union All
			Select * FROM LoadAverage_Daily_20200313 
			Union All
			Select * FROM LoadAverage_Daily_20200306 
			Union All
			Select * FROM LoadAverage_Daily_20200228 
			Union All
			Select * FROM LoadAverage_Daily_20200221 
			Union All
			Select * FROM LoadAverage_Daily_20200214 
			Union All
			Select * FROM LoadAverage_Daily_20200207 
			Union All
			Select * FROM LoadAverage_Daily_20200131 
			Union All
			Select * FROM LoadAverage_Daily_20200124 
			Union All
			Select * FROM LoadAverage_Daily_20200117 
			Union All
			Select * FROM LoadAverage_Daily_20200110 
			Union All
			Select * FROM LoadAverage_Daily_20200103 
			Union All
			Select * FROM LoadAverage_Daily_20191227 
			Union All
			Select * FROM LoadAverage_Daily_20191220 
			Union All
			Select * FROM LoadAverage_Daily_20191213 
			Union All
			Select * FROM LoadAverage_Daily_20191206 
			Union All
			Select * FROM LoadAverage_Daily_20191129 
			Union All
			Select * FROM LoadAverage_Daily_20191122 
			Union All
			Select * FROM LoadAverage_Daily_20191115 
			Union All
			Select * FROM LoadAverage_Daily_20191108 
			Union All
			Select * FROM LoadAverage_Daily_20191101 
			Union All
			Select * FROM LoadAverage_Daily_20191025 
			Union All
			Select * FROM LoadAverage_Daily_20191018 
			Union All
			Select * FROM LoadAverage_Daily_20191011 
			Union All
			Select * FROM LoadAverage_Daily_20191004 
			Union All
			Select * FROM LoadAverage_Daily_20190927 
			Union All
			Select * FROM LoadAverage_Daily_20190920 
			Union All
			Select * FROM LoadAverage_Daily_20190913 
			Union All
			Select * FROM LoadAverage_Daily_20190906 
			Union All
			Select * FROM LoadAverage_Daily_20190830 
			Union All
			Select * FROM LoadAverage_Daily_20190823 
			Union All
			Select * FROM LoadAverage_Daily_20190816 
			Union All
			Select * FROM LoadAverage_Daily_20190809 
			Union All
			Select * FROM LoadAverage_Daily_20190802 
			Union All
			Select * FROM LoadAverage_Daily_20190726 
			Union All
			Select * FROM LoadAverage_Daily_20190719 
			Union All
			Select * FROM LoadAverage_Daily_20190712 
			Union All
			Select * FROM LoadAverage_Daily_20190705 
			Union All
			Select * FROM LoadAverage_Daily_20190628 
			Union All
			Select * FROM LoadAverage_Daily_20190621 
			Union All
			Select * FROM LoadAverage_Daily_20190614 
			Union All
			Select * FROM LoadAverage_Daily_20190607 
			Union All
			Select * FROM LoadAverage_Daily_20190531 
			Union All
			Select * FROM LoadAverage_Daily_20190524 
			Union All
			Select * FROM LoadAverage_Daily_20190517 
			Union All
			Select * FROM LoadAverage_Daily_20190510 
			Union All
			Select * FROM LoadAverage_Daily_20190503 
			Union All
			Select * FROM LoadAverage_Daily_20190426 
			Union All
			Select * FROM LoadAverage_Daily_20190419 
			Union All
			Select * FROM LoadAverage_Daily_20190412 
			Union All
			Select * FROM LoadAverage_Daily_20190405 
			Union All
			Select * FROM LoadAverage_Daily_20190329 
			Union All
			Select * FROM LoadAverage_Daily_20190322 
			Union All
			Select * FROM LoadAverage_Daily_20190315 
			Union All
			Select * FROM LoadAverage_Daily_20190308 
			Union All
			Select * FROM LoadAverage_Daily_20190301
```
