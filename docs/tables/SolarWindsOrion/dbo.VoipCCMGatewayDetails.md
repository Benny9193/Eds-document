# View: `dbo.VoipCCMGatewayDetails`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `GatewayID` | int | NO |  |  |
| 3 | `VoipCCMMonitoringID` | int | NO |  |  |
| 4 | `GatewayDeviceName` | nvarchar(50) | NO |  |  |
| 5 | `IPAddress` | nvarchar(50) | NO |  |  |
| 6 | `Status` | int | NO |  |  |
| 7 | `GatewayRegion` | nvarchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMGateways`](dbo.VoipCCMGateways.md) | USER_TABLE |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMRegions`](dbo.VoipCCMRegions.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipCallDetails`](dbo.VoipCallDetails.md) | VIEW |
| [`dbo.VoipCallDetailsAlert`](dbo.VoipCallDetailsAlert.md) | VIEW |

## Definition

```sql
CREATE VIEW dbo.VoipCCMGatewayDetails
AS
SELECT 0 AS NodeID
	  ,vccmg.GatewayID AS GatewayID
	  ,vccm.ID AS VoipCCMMonitoringID
      ,vccmg.Name AS GatewayDeviceName
      ,vccmg.IpAddress as IPAddress
      ,vccmg.Status as Status
      ,vccmr.RegionName as GatewayRegion
  FROM dbo.VoipCCMMonitoring vccm
  INNER JOIN dbo.VoipCCMGateways vccmg ON vccm.ID = vccmg.VoipCCMMonitoringID
  LEFT OUTER JOIN dbo.VoipCCMRegions vccmr on vccmg.RegionID = vccmr.RegionID
  WHERE vccm.Deleted != 1
```
