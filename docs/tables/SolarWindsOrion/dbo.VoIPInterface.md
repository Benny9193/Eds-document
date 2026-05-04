# View: `dbo.VoIPInterface`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `ObjectSubType` | nvarchar(50) | YES |  |  |
| 3 | `IP_Address` | nvarchar(50) | YES |  |  |
| 4 | `DynamicIP` | bit | YES |  |  |
| 5 | `UnManaged` | bit | YES |  |  |
| 6 | `UnManageUntil` | datetime | YES |  |  |
| 7 | `Caption` | nvarchar(255) | YES |  |  |
| 8 | `DNS` | varchar(255) | YES |  |  |
| 9 | `Community` | nvarchar(250) | YES |  |  |
| 10 | `SysName` | nvarchar(255) | YES |  |  |
| 11 | `Vendor` | nvarchar(255) | YES |  |  |
| 12 | `LastBoot` | smalldatetime | YES |  |  |
| 13 | `SystemUpTime` | real | YES |  |  |
| 14 | `SysObjectID` | nvarchar(255) | YES |  |  |
| 15 | `Description` | nvarchar(max) | YES |  |  |
| 16 | `Location` | nvarchar(255) | YES |  |  |
| 17 | `Contact` | nvarchar(255) | YES |  |  |
| 18 | `RediscoveryInterval` | int | YES |  |  |
| 19 | `PollInterval` | smallint | YES |  |  |
| 20 | `VendorIcon` | char(20) | YES |  |  |
| 21 | `IOSImage` | nvarchar(255) | YES |  |  |
| 22 | `IOSVersion` | nvarchar(255) | YES |  |  |
| 23 | `GroupStatus` | char(40) | YES |  |  |
| 24 | `StatusDescription` | nvarchar(2000) | YES |  |  |
| 25 | `Status` | char(20) | YES |  |  |
| 26 | `StatusLED` | char(20) | YES |  |  |
| 27 | `ResponseTime` | smallint | YES |  |  |
| 28 | `PercentLoss` | real | YES |  |  |
| 29 | `AvgResponseTime` | smallint | YES |  |  |
| 30 | `MinResponseTime` | smallint | YES |  |  |
| 31 | `MaxResponseTime` | smallint | YES |  |  |
| 32 | `NextPoll` | datetime | YES |  |  |
| 33 | `EngineID` | int | YES |  |  |
| 34 | `LastSync` | datetime | YES |  |  |
| 35 | `MachineType` | nvarchar(255) | YES |  |  |
| 36 | `Severity` | int | YES |  |  |
| 37 | `NextRediscovery` | datetime | YES |  |  |
| 38 | `StatCollection` | smallint | YES |  |  |
| 39 | `Allow64BitCounters` | bit | YES |  |  |
| 40 | `SNMPV2Only` | bit | YES |  |  |
| 41 | `AgentPort` | nvarchar(250) | NO |  |  |
| 42 | `SNMPVersion` | tinyint | YES |  |  |
| 43 | `CPULoad` | smallint | YES |  |  |
| 44 | `TotalMemory` | real | YES |  |  |
| 45 | `MemoryUsed` | real | YES |  |  |
| 46 | `PercentMemoryUsed` | int | YES |  |  |
| 47 | `BufferNoMemThisHour` | real | YES |  |  |
| 48 | `BufferNoMemToday` | real | YES |  |  |
| 49 | `BufferSmMissThisHour` | real | YES |  |  |
| 50 | `BufferSmMissToday` | real | YES |  |  |
| 51 | `BufferMdMissThisHour` | real | YES |  |  |
| 52 | `BufferMdMissToday` | real | YES |  |  |
| 53 | `BufferBgMissThisHour` | real | YES |  |  |
| 54 | `BufferBgMissToday` | real | YES |  |  |
| 55 | `BufferLgMissThisHour` | real | YES |  |  |
| 56 | `BufferLgMissToday` | real | YES |  |  |
| 57 | `BufferHgMissThisHour` | real | YES |  |  |
| 58 | `BufferHgMissToday` | real | YES |  |  |
| 59 | `CMTS` | char(1) | YES |  |  |
| 60 | `BlockUntil` | datetime | NO |  |  |
| 61 | `CustomPollerLastStatisticsPoll` | datetime | YES |  |  |
| 62 | `CustomPollerLastStatisticsPollSuccess` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipInfrastructureNodes`](dbo.VoipInfrastructureNodes.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoIPInterface]
AS
SELECT     TOP 100 PERCENT dbo.Nodes.NodeID, dbo.Nodes.ObjectSubType, dbo.Nodes.IP_Address, dbo.Nodes.DynamicIP, dbo.Nodes.UnManaged, 
                      dbo.Nodes.UnManageUntil, dbo.Nodes.Caption, dbo.Nodes.DNS, dbo.Nodes.Community, dbo.Nodes.SysName, dbo.Nodes.Vendor, 
                      dbo.Nodes.LastBoot, dbo.Nodes.SystemUpTime, dbo.Nodes.SysObjectID, dbo.Nodes.Description, dbo.Nodes.Location, dbo.Nodes.Contact, 
                      dbo.Nodes.RediscoveryInterval, dbo.Nodes.PollInterval, dbo.Nodes.VendorIcon, dbo.Nodes.IOSImage, dbo.Nodes.IOSVersion, dbo.Nodes.GroupStatus, 
                      dbo.Nodes.StatusDescription, dbo.Nodes.Status, dbo.Nodes.StatusLED, dbo.Nodes.ResponseTime, dbo.Nodes.PercentLoss, 
                      dbo.Nodes.AvgResponseTime, dbo.Nodes.MinResponseTime, dbo.Nodes.MaxResponseTime, dbo.Nodes.NextPoll, dbo.Nodes.EngineID, 
                      dbo.Nodes.LastSync, dbo.Nodes.MachineType, dbo.Nodes.Severity, dbo.Nodes.NextRediscovery, dbo.Nodes.StatCollection, 
                      dbo.Nodes.Allow64BitCounters, dbo.Nodes.SNMPV2Only, dbo.Nodes.AgentPort, dbo.Nodes.SNMPVersion, 
					  --dbo.Nodes.SNMPV3Username, dbo.Nodes.SNMPV3Context, dbo.Nodes.SNMPV3PrivMethod, dbo.Nodes.SNMPV3PrivKey, dbo.Nodes.SNMPV3PrivKeyIsPwd, 
                      --dbo.Nodes.SNMPV3AuthMethod, dbo.Nodes.SNMPV3AuthKey, dbo.Nodes.SNMPV3AuthKeyIsPwd, 
					  dbo.Nodes.CPULoad, dbo.Nodes.TotalMemory, 
                      dbo.Nodes.MemoryUsed, dbo.Nodes.PercentMemoryUsed, dbo.Nodes.BufferNoMemThisHour, dbo.Nodes.BufferNoMemToday, 
                      dbo.Nodes.BufferSmMissThisHour, dbo.Nodes.BufferSmMissToday, dbo.Nodes.BufferMdMissThisHour, dbo.Nodes.BufferMdMissToday, 
                      dbo.Nodes.BufferBgMissThisHour, dbo.Nodes.BufferBgMissToday, dbo.Nodes.BufferLgMissThisHour, dbo.Nodes.BufferLgMissToday, 
                      dbo.Nodes.BufferHgMissThisHour, dbo.Nodes.BufferHgMissToday, dbo.Nodes.CMTS, dbo.Nodes.BlockUntil, 
                      dbo.Nodes.CustomPollerLastStatisticsPoll, dbo.Nodes.CustomPollerLastStatisticsPollSuccess
FROM         dbo.Nodes INNER JOIN
                      dbo.VoipInfrastructureNodes ON dbo.Nodes.NodeID = dbo.VoipInfrastructureNodes.NodeID
```
