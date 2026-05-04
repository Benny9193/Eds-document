# Table: `dbo.AgentManagement_Agents`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AgentId` | int | NO |  | YES |
| 2 | `AgentGuid` | uniqueidentifier | NO | `('00000000-0000-0000-0000-000000000000')` |  |
| 3 | `NodeId` | int | YES |  |  |
| 4 | `Name` | nvarchar(512) | NO |  |  |
| 5 | `Hostname` | nvarchar(255) | NO |  |  |
| 6 | `DNSName` | nvarchar(255) | NO |  |  |
| 7 | `IP` | nvarchar(64) | NO |  |  |
| 8 | `OSVersion` | nvarchar(512) | NO |  |  |
| 9 | `PollingEngineId` | int | NO |  |  |
| 10 | `ConnectionStatus` | int | NO |  |  |
| 11 | `ConnectionStatusMessage` | nvarchar(max) | NO |  |  |
| 12 | `ConnectionStatusTimeStampUtc` | datetime | NO | `('1753-01-01')` |  |
| 13 | `AgentStatus` | int | NO |  |  |
| 14 | `AgentStatusMessage` | nvarchar(max) | NO |  |  |
| 15 | `AgentStatusData` | nvarchar(max) | YES |  |  |
| 16 | `AgentStatusTimeStampUtc` | datetime | NO | `('1753-01-01')` |  |
| 17 | `Mode` | int | NO | `((0))` |  |
| 18 | `AgentVersion` | nvarchar(24) | NO | `('0.0.0.0')` |  |
| 19 | `CPUArch` | nvarchar(28) | NO | `('')` |  |
| 20 | `OSArch` | nvarchar(28) | NO | `('')` |  |
| 21 | `OSType` | nvarchar(127) | NO | `('')` |  |
| 22 | `OSDistro` | nvarchar(127) | NO | `('')` |  |
| 23 | `AutoUpdateEnabled` | bit | NO | `((1))` |  |
| 24 | `PassiveAgentHostname` | nvarchar(255) | YES |  |  |
| 25 | `PassiveAgentPort` | int | NO | `((17790))` |  |
| 26 | `ProxyId` | int | NO | `((0))` |  |
| 27 | `SID` | nvarchar(184) | YES |  |  |
| 28 | `RegisteredOn` | datetime | NO | `(getutcdate())` |  |
| 29 | `ResponseTime` | int | NO | `((0))` |  |
| 30 | `Type` | int | NO | `((0))` |  |
| 31 | `Password` | nvarchar(512) | NO | `('')` |  |
| 32 | `ConnectionType` | int | NO | `((0))` |  |
| 33 | `RuntimeOSDistro` | nvarchar(127) | NO | `('')` |  |
| 34 | `RuntimeOSVersion` | nvarchar(127) | NO | `('0.0.0.0')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IAgentManagement_Agents_AgentGuid` | no | NONCLUSTERED | `AgentGuid` |  |
| `IAgentManagement_Agents_Hostname` | no | NONCLUSTERED | `Hostname` |  |
| `IAgentManagement_Agents_IP` | no | NONCLUSTERED | `IP` |  |
