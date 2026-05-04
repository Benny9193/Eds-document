# Table: `dbo.DiscoveredNodes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 108

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `ProfileID` | int | NO |  | YES |
| 3 | `IPAddress` | nvarchar(50) | NO |  |  |
| 4 | `IPAddressGUID` | uniqueidentifier | NO |  |  |
| 5 | `SnmpVersion` | int | NO |  |  |
| 6 | `SubType` | int | NO |  |  |
| 7 | `CredentialID` | int | YES |  |  |
| 8 | `Hostname` | nvarchar(255) | YES |  |  |
| 9 | `DNS` | nvarchar(255) | YES |  |  |
| 10 | `SysObjectID` | nvarchar(255) | YES |  |  |
| 11 | `Vendor` | nvarchar(255) | YES |  |  |
| 12 | `VendorIcon` | nvarchar(255) | YES |  |  |
| 13 | `MachineType` | nvarchar(255) | YES |  |  |
| 14 | `SysDescription` | nvarchar(max) | YES |  |  |
| 15 | `SysName` | nvarchar(255) | YES |  |  |
| 16 | `Location` | nvarchar(255) | YES |  |  |
| 17 | `Contact` | nvarchar(255) | YES |  |  |
| 18 | `IgnoredNodeID` | int | YES |  |  |
| 19 | `AgentAddress` | nvarchar(255) | YES |  |  |
| 20 | `DynamicIP` | bit | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
