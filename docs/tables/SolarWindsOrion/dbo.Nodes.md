# View: `dbo.Nodes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `ObjectSubType` | nvarchar(50) | YES |  |  |
| 3 | `IP_Address` | nvarchar(50) | YES |  |  |
| 4 | `IP_Address_Type` | nvarchar(10) | NO |  |  |
| 5 | `DynamicIP` | bit | YES |  |  |
| 6 | `UnManaged` | bit | YES |  |  |
| 7 | `UnManageFrom` | datetime | YES |  |  |
| 8 | `UnManageUntil` | datetime | YES |  |  |
| 9 | `Caption` | nvarchar(255) | YES |  |  |
| 10 | `DNS` | varchar(255) | YES |  |  |
| 11 | `Community` | nvarchar(250) | YES |  |  |
| 12 | `RWCommunity` | nvarchar(250) | YES |  |  |
| 13 | `SysName` | nvarchar(255) | YES |  |  |
| 14 | `Vendor` | nvarchar(255) | YES |  |  |
| 15 | `SysObjectID` | nvarchar(255) | YES |  |  |
| 16 | `Description` | nvarchar(max) | YES |  |  |
| 17 | `Location` | nvarchar(255) | YES |  |  |
| 18 | `Contact` | nvarchar(255) | YES |  |  |
| 19 | `RediscoveryInterval` | int | YES |  |  |
| 20 | `PollInterval` | smallint | YES |  |  |
| 21 | `VendorIcon` | char(20) | YES |  |  |
| 22 | `IOSImage` | nvarchar(255) | YES |  |  |
| 23 | `IOSVersion` | nvarchar(255) | YES |  |  |
| 24 | `GroupStatus` | char(40) | YES |  |  |
| 25 | `StatusDescription` | nvarchar(2000) | YES |  |  |
| 26 | `Status` | char(20) | YES |  |  |
| 27 | `StatusLED` | char(20) | YES |  |  |
| 28 | `ChildStatus` | int | NO |  |  |
| 29 | `EngineID` | int | YES |  |  |
| 30 | `MachineType` | nvarchar(255) | YES |  |  |
| 31 | `IsServer` | bit | YES |  |  |
| 32 | `Severity` | int | YES |  |  |
| 33 | `StatCollection` | smallint | YES |  |  |
| 34 | `Allow64BitCounters` | bit | YES |  |  |
| 35 | `SNMPV2Only` | bit | YES |  |  |
| 36 | `AgentPort` | nvarchar(250) | NO |  |  |
| 37 | `SNMPVersion` | tinyint | YES |  |  |
| 38 | `TotalMemory` | real | YES |  |  |
| 39 | `External` | bit | YES |  |  |
| 40 | `EntityType` | nvarchar(100) | YES |  |  |
| 41 | `CMTS` | char(1) | YES |  |  |
| 42 | `BlockUntil` | datetime | NO |  |  |
| 43 | `IPAddressGUID` | uniqueidentifier | YES |  |  |
| 44 | `CustomStatus` | bit | NO |  |  |
| 45 | `NodesData_Category` | int | YES |  |  |
| 46 | `NodesData_CustomCategory` | int | YES |  |  |
| 47 | `EffectiveCategory` | int | YES |  |  |
| 48 | `LastBoot` | smalldatetime | YES |  |  |
| 49 | `SystemUpTime` | real | YES |  |  |
| 50 | `LastSystemUpTimePollUtc` | datetime | YES |  |  |
| 51 | `ResponseTime` | smallint | YES |  |  |
| 52 | `PercentLoss` | real | YES |  |  |
| 53 | `AvgResponseTime` | smallint | YES |  |  |
| 54 | `MinResponseTime` | smallint | YES |  |  |
| 55 | `MaxResponseTime` | smallint | YES |  |  |
| 56 | `NextPoll` | datetime | YES |  |  |
| 57 | `LastSync` | datetime | YES |  |  |
| 58 | `NextRediscovery` | datetime | YES |  |  |
| 59 | `CPUCount` | tinyint | YES |  |  |
| 60 | `CPULoad` | smallint | YES |  |  |
| 61 | `MemoryUsed` | real | YES |  |  |
| 62 | `PercentMemoryUsed` | int | YES |  |  |
| 63 | `BufferNoMemThisHour` | real | YES |  |  |
| 64 | `BufferNoMemToday` | real | YES |  |  |
| 65 | `BufferSmMissThisHour` | real | YES |  |  |
| 66 | `BufferSmMissToday` | real | YES |  |  |
| 67 | `BufferMdMissThisHour` | real | YES |  |  |
| 68 | `BufferMdMissToday` | real | YES |  |  |
| 69 | `BufferBgMissThisHour` | real | YES |  |  |
| 70 | `BufferBgMissToday` | real | YES |  |  |
| 71 | `BufferLgMissThisHour` | real | YES |  |  |
| 72 | `BufferLgMissToday` | real | YES |  |  |
| 73 | `BufferHgMissThisHour` | real | YES |  |  |
| 74 | `BufferHgMissToday` | real | YES |  |  |
| 75 | `LoadAverage1` | real | YES |  |  |
| 76 | `LoadAverage5` | real | YES |  |  |
| 77 | `LoadAverage15` | real | YES |  |  |
| 78 | `CustomPollerLastStatisticsPoll` | datetime | YES |  |  |
| 79 | `CustomPollerLastStatisticsPollSuccess` | datetime | YES |  |  |
| 80 | `City` | nvarchar(50) | YES |  |  |
| 81 | `Department` | nvarchar(50) | YES |  |  |
| 82 | `Comments` | nvarchar(250) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `NodesCustomProperties` | USER_TABLE |
| `NodesData` | USER_TABLE |
| `NodesStatistics` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.CiscoBuffers`](dbo.CiscoBuffers.md) | VIEW |
| [`dbo.CPULoad`](dbo.CPULoad.md) | VIEW |
| [`dbo.CPUMultiLoad`](dbo.CPUMultiLoad.md) | VIEW |
| `dbo.dbm_CiscoBuffers_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_CPULoad_DailyToForecastCoefficients` | SQL_STORED_PROCEDURE |
| `dbo.dbm_CPULoad_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_Forecast_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_GetNetworkElements` | SQL_STORED_PROCEDURE |
| `dbo.dbm_LoadAverage_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_MaintenancePlanAssignments_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_NodeMACAddresses_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_Nodes_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_Pollers_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_ResponseTime_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_ShadowNodes_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_Thresholds_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_TopologyPollingTables_DeleteOrphans` | SQL_STORED_PROCEDURE |
| `dbo.dbm_VoipCCM_AcmNameUpdate` | SQL_STORED_PROCEDURE |
| `dbo.dbm_VoipRemovedDeletedData` | SQL_STORED_PROCEDURE |
| `dbo.dbm_VolumeUsage_DeleteOrphans` | SQL_STORED_PROCEDURE |
| [`dbo.LoadAverage`](dbo.LoadAverage.md) | VIEW |
| [`dbo.MemoryMultiLoad`](dbo.MemoryMultiLoad.md) | VIEW |
| [`dbo.NodesForecastCapacity`](dbo.NodesForecastCapacity.md) | VIEW |
| `dbo.NodeStatsHasChangedAlert` | SQL_TRIGGER |
| [`dbo.NodesThresholds`](dbo.NodesThresholds.md) | VIEW |
| [`dbo.PRIGatewayUtilization`](dbo.PRIGatewayUtilization.md) | VIEW |
| [`dbo.ResponseTime`](dbo.ResponseTime.md) | VIEW |
| `dbo.swsp_Node_GetAvailability` | SQL_STORED_PROCEDURE |
| `dbo.swsp_ReflowAllNodeChildStatus` | SQL_STORED_PROCEDURE |
| `dbo.swsp_ReflowNodeChildStatus` | SQL_STORED_PROCEDURE |
| [`dbo.VoipAlertQos`](dbo.VoipAlertQos.md) | VIEW |
| [`dbo.VoipCallDetails`](dbo.VoipCallDetails.md) | VIEW |
| [`dbo.VoipCallDetailsAlert`](dbo.VoipCallDetailsAlert.md) | VIEW |
| [`dbo.VoipCallManagerDetails`](dbo.VoipCallManagerDetails.md) | VIEW |
| [`dbo.VoipCallManagerQualityAggregate1Hour`](dbo.VoipCallManagerQualityAggregate1Hour.md) | VIEW |
| [`dbo.VoipCallManagerQualityAggregate30Mins`](dbo.VoipCallManagerQualityAggregate30Mins.md) | VIEW |
| [`dbo.VoipCallManagerStats`](dbo.VoipCallManagerStats.md) | VIEW |
| [`dbo.VoipCallQualityDetails`](dbo.VoipCallQualityDetails.md) | VIEW |
| [`dbo.VoipCCMMonitoringDetail`](dbo.VoipCCMMonitoringDetail.md) | VIEW |
| [`dbo.VoipConnectedPhonesReport`](dbo.VoipConnectedPhonesReport.md) | VIEW |
| [`dbo.VoipGatewayDetails`](dbo.VoipGatewayDetails.md) | VIEW |
| [`dbo.VoipGatewaysDetail`](dbo.VoipGatewaysDetail.md) | VIEW |
| [`dbo.VoIPInterface`](dbo.VoIPInterface.md) | VIEW |
| [`dbo.VoipNodesAvailabilityReport`](dbo.VoipNodesAvailabilityReport.md) | VIEW |
| [`dbo.VoIPOperationCurrentStats`](dbo.VoIPOperationCurrentStats.md) | VIEW |
| [`dbo.VoipQoS`](dbo.VoipQoS.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[Nodes] AS SELECT nd.[NodeID], nd.[ObjectSubType], nd.[IP_Address], nd.[IP_Address_Type], nd.[DynamicIP], nd.[UnManaged], nd.[UnManageFrom], nd.[UnManageUntil], nd.[Caption], nd.[DNS], nd.[Community], nd.[RWCommunity], nd.[SysName], nd.[Vendor], nd.[SysObjectID], nd.[Description], nd.[Location], nd.[Contact], nd.[RediscoveryInterval], nd.[PollInterval], nd.[VendorIcon], nd.[IOSImage], nd.[IOSVersion], nd.[GroupStatus], nd.[StatusDescription], nd.[Status], nd.[StatusLED], nd.[ChildStatus], nd.[EngineID], nd.[MachineType], nd.[IsServer], nd.[Severity], nd.[StatCollection], nd.[Allow64BitCounters], nd.[SNMPV2Only], nd.[AgentPort], nd.[SNMPVersion], nd.[TotalMemory], nd.[External], nd.[EntityType], nd.[CMTS], nd.[BlockUntil], nd.[IPAddressGUID], nd.[CustomStatus], nd.[Category] AS [NodesData_Category], nd.[CustomCategory] AS [NodesData_CustomCategory], nd.[EffectiveCategory], ns.[LastBoot], ns.[SystemUpTime], ns.[LastSystemUpTimePollUtc], ns.[ResponseTime], ns.[PercentLoss], ns.[AvgResponseTime], ns.[MinResponseTime], ns.[MaxResponseTime], ns.[NextPoll], ns.[LastSync], ns.[NextRediscovery], ns.[CPUCount], ns.[CPULoad], ns.[MemoryUsed], ns.[PercentMemoryUsed], ns.[BufferNoMemThisHour], ns.[BufferNoMemToday], ns.[BufferSmMissThisHour], ns.[BufferSmMissToday], ns.[BufferMdMissThisHour], ns.[BufferMdMissToday], ns.[BufferBgMissThisHour], ns.[BufferBgMissToday], ns.[BufferLgMissThisHour], ns.[BufferLgMissToday], ns.[BufferHgMissThisHour], ns.[BufferHgMissToday], ns.[LoadAverage1], ns.[LoadAverage5], ns.[LoadAverage15], ns.[CustomPollerLastStatisticsPoll], ns.[CustomPollerLastStatisticsPollSuccess], ncp.[City], ncp.[Department], ncp.[Comments] FROM [NodesData] nd WITH(NOLOCK) LEFT JOIN [NodesStatistics] ns WITH(NOLOCK) ON nd.[NodeID] = ns.[NodeID] LEFT JOIN [NodesCustomProperties] ncp WITH(NOLOCK) ON nd.[NodeID] = ncp.[NodeID]
```
