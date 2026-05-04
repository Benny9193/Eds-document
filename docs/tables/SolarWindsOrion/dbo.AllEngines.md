# View: `dbo.AllEngines`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EngineID` | int | NO |  |  |
| 2 | `ServerName` | nvarchar(50) | YES |  |  |
| 3 | `IP` | varchar(50) | YES |  |  |
| 4 | `ServerType` | varchar(50) | YES |  |  |
| 5 | `PrimaryServers` | varchar(50) | YES |  |  |
| 6 | `KeepAlive` | datetime | YES |  |  |
| 7 | `FailOverActive` | datetime | YES |  |  |
| 8 | `SysLogKeepAlive` | datetime | YES |  |  |
| 9 | `TrapsKeepAlive` | datetime | YES |  |  |
| 10 | `Restart` | datetime | YES |  |  |
| 11 | `Elements` | int | YES |  |  |
| 12 | `Nodes` | int | YES |  |  |
| 13 | `Interfaces` | int | YES |  |  |
| 14 | `Volumes` | int | YES |  |  |
| 15 | `Pollers` | int | YES |  |  |
| 16 | `MaxPollsPerSecond` | smallint | YES |  |  |
| 17 | `MaxStatPollsPerSecond` | smallint | YES |  |  |
| 18 | `NodePollInterval` | smallint | YES |  |  |
| 19 | `InterfacePollInterval` | smallint | YES |  |  |
| 20 | `VolumePollInterval` | smallint | YES |  |  |
| 21 | `NodeStatPollInterval` | smallint | YES |  |  |
| 22 | `InterfaceStatPollInterval` | smallint | YES |  |  |
| 23 | `VolumeStatPollInterval` | smallint | YES |  |  |
| 24 | `RediscoveryInterval` | smallint | YES |  |  |
| 25 | `LicensedElements` | int | YES |  |  |
| 26 | `SerialNumber` | varchar(50) | YES |  |  |
| 27 | `LicenseKey` | varchar(50) | YES |  |  |
| 28 | `StartTime` | datetime | YES |  |  |
| 29 | `CompanyName` | nvarchar(255) | YES |  |  |
| 30 | `CustomerID` | varchar(50) | YES |  |  |
| 31 | `Evaluation` | varchar(50) | YES |  |  |
| 32 | `EvalDaysLeft` | smallint | YES |  |  |
| 33 | `PackageName` | varchar(255) | YES |  |  |
| 34 | `EngineVersion` | nvarchar(255) | YES |  |  |
| 35 | `WindowsVersion` | nvarchar(255) | YES |  |  |
| 36 | `ServicePack` | nvarchar(255) | YES |  |  |
| 37 | `AvgCPUUtil` | real | YES |  |  |
| 38 | `MemoryUtil` | real | YES |  |  |
| 39 | `PollingCompletion` | real | YES |  |  |
| 40 | `StatPollInterval` | int | YES |  |  |
| 41 | `BusinessLayerPort` | int | YES |  |  |
| 42 | `FIPSModeEnabled` | bit | NO |  |  |
| 43 | `IsFree` | bit | NO |  |  |
| 44 | `MasterEngineID` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Engines`](dbo.Engines.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.AllEngines
AS
SELECT [EngineID]
		,[ServerName]
		,[IP]
		,[ServerType]
		,[PrimaryServers]
		,[KeepAlive]
		,[FailOverActive]
		,[SysLogKeepAlive]
		,[TrapsKeepAlive]
		,[Restart]
		,[Elements]
		,[Nodes]
		,[Interfaces]
		,[Volumes]
		,[Pollers]
		,[MaxPollsPerSecond]
		,[MaxStatPollsPerSecond]
		,[NodePollInterval]
		,[InterfacePollInterval]
		,[VolumePollInterval]
		,[NodeStatPollInterval]
		,[InterfaceStatPollInterval]
		,[VolumeStatPollInterval]
		,[RediscoveryInterval]
		,[LicensedElements]
		,[SerialNumber]
		,[LicenseKey]
		,[StartTime]
		,[CompanyName]
		,[CustomerID]
		,[Evaluation]
		,[EvalDaysLeft]
		,[PackageName]
		,[EngineVersion]
		,[WindowsVersion]
		,[ServicePack]
		,[AvgCPUUtil]
		,[MemoryUtil]
		,[PollingCompletion]
		,[StatPollInterval]
		,[BusinessLayerPort]
		,[FIPSModeEnabled]
		,[IsFree]
		,[MasterEngineID]
	FROM [dbo].[Engines]
```
