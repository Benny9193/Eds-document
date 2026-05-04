# Table: `dbo.NodesData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 110

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `ObjectSubType` | nvarchar(50) | YES | `(N'SNMP')` |  |
| 3 | `IP_Address` | nvarchar(50) | YES | `('')` |  |
| 4 | `IP_Address_Type` | nvarchar(10) | NO | `('IPv4')` |  |
| 5 | `DynamicIP` | bit | YES | `((0))` |  |
| 6 | `UnManaged` | bit | YES | `((0))` |  |
| 7 | `UnManageFrom` | datetime | YES | `('1899-12-30T00:00:00')` |  |
| 8 | `UnManageUntil` | datetime | YES | `('1899-12-30T00:00:00')` |  |
| 9 | `Caption` | nvarchar(255) | YES | `('')` |  |
| 10 | `DNS` | varchar(255) | YES | `('')` |  |
| 11 | `Community` | nvarchar(250) | YES | `(N'public')` |  |
| 12 | `RWCommunity` | nvarchar(250) | YES | `('')` |  |
| 13 | `SysName` | nvarchar(255) | YES | `('')` |  |
| 14 | `Vendor` | nvarchar(255) | YES |  |  |
| 15 | `SysObjectID` | nvarchar(255) | YES |  |  |
| 16 | `Description` | nvarchar(max) | YES |  |  |
| 17 | `Location` | nvarchar(255) | YES |  |  |
| 18 | `Contact` | nvarchar(255) | YES |  |  |
| 19 | `RediscoveryInterval` | int | YES | `((30))` |  |
| 20 | `PollInterval` | smallint | YES | `((120))` |  |
| 21 | `VendorIcon` | char(20) | YES | `('Unknown.gif')` |  |
| 22 | `IOSImage` | nvarchar(255) | YES |  |  |
| 23 | `IOSVersion` | nvarchar(255) | YES |  |  |
| 24 | `GroupStatus` | char(40) | YES | `('Unknown.gif')` |  |
| 25 | `StatusDescription` | nvarchar(2000) | YES | `(N'Node status is Unknown.')` |  |
| 26 | `Status` | char(20) | YES | `((0))` |  |
| 27 | `StatusLED` | char(20) | YES |  |  |
| 28 | `ChildStatus` | int | NO | `((1))` |  |
| 29 | `EngineID` | int | YES |  |  |
| 30 | `MachineType` | nvarchar(255) | YES | `('Unknown')` |  |
| 31 | `IsServer` | bit | YES |  |  |
| 32 | `Severity` | int | YES |  |  |
| 33 | `StatCollection` | smallint | YES | `((10))` |  |
| 34 | `Allow64BitCounters` | bit | YES | `((1))` |  |
| 35 | `SNMPV2Only` | bit | YES |  |  |
| 36 | `AgentPort` | nvarchar(250) | NO | `((161))` |  |
| 37 | `SNMPVersion` | tinyint | YES | `((0))` |  |
| 38 | `TotalMemory` | real | YES |  |  |
| 39 | `External` | bit | YES |  |  |
| 40 | `EntityType` | nvarchar(100) | YES |  |  |
| 41 | `CMTS` | char(1) | YES | `('N')` |  |
| 42 | `BlockUntil` | datetime | NO | `((-2))` |  |
| 43 | `IPAddressGUID` | uniqueidentifier | YES |  |  |
| 44 | `CustomStatus` | bit | NO | `((0))` |  |
| 45 | `Category` | int | YES |  |  |
| 46 | `CustomCategory` | int | YES |  |  |
| 47 | `EffectiveCategory` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodesData_EffectiveCategory` | no | NONCLUSTERED | `EffectiveCategory` |  |
| `IX_NodesData_EngineID` | no | NONCLUSTERED | `EngineID` |  |
| `IX_NodesData_IPAddress` | no | NONCLUSTERED | `IP_Address` |  |
| `IX_NodesData_MachineType` | no | NONCLUSTERED | `MachineType` |  |
| `IX_NodesData_Vendor` | no | NONCLUSTERED | `Vendor` |  |
