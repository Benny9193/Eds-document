# View: `dbo.VoipCCMPhoneDetails`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `PhoneID` | int | NO |  |  |
| 3 | `VoipCCMMonitoringID` | int | NO |  |  |
| 4 | `PhoneMacAddress` | varchar(50) | YES |  |  |
| 5 | `PhoneDeviceName` | varchar(255) | YES |  |  |
| 6 | `IPAddress` | varchar(50) | YES |  |  |
| 7 | `Status` | int | YES |  |  |
| 8 | `StatusDescription` | nvarchar(255) | YES |  |  |
| 9 | `Location` | nvarchar(255) | YES |  |  |
| 10 | `Extension` | nvarchar(50) | YES |  |  |
| 11 | `PhoneRegion` | nvarchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMPhones`](dbo.VoipCCMPhones.md) | USER_TABLE |
| [`dbo.VoipCCMPhonesAvayaData`](dbo.VoipCCMPhonesAvayaData.md) | USER_TABLE |
| [`dbo.VoipCCMPhonesCiscoData`](dbo.VoipCCMPhonesCiscoData.md) | USER_TABLE |
| [`dbo.VoipCCMRegions`](dbo.VoipCCMRegions.md) | USER_TABLE |
| [`dbo.VoipCCMStatsType`](dbo.VoipCCMStatsType.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipCallDetails`](dbo.VoipCallDetails.md) | VIEW |
| [`dbo.VoipCallDetailsAlert`](dbo.VoipCallDetailsAlert.md) | VIEW |

## Definition

```sql
CREATE VIEW dbo.VoipCCMPhoneDetails
AS

SELECT DISTINCT   0 AS NodeID,
                     vccmp.ID AS PhoneID,
                     vccm.ID AS VoipCCMMonitoringID,
                     vccmp.MAC_Address AS PhoneMacAddress,
                     vccmp.Name AS PhoneDeviceName,
                     vccmp.IP_Address AS IPAddress,
                     vccmp.Status,
                     vccms.Description AS StatusDescription,
                    CASE 
                      WHEN vccm.VoipCCMMonitoringTypeID IN(1, 2) THEN vccmpcd.Location
                      WHEN vccm.VoipCCMMonitoringTypeID = 3 THEN CAST(vccmpad.Location AS nvarchar(255))
                    END AS Location,
                    CASE 
                      WHEN vccm.VoipCCMMonitoringTypeID IN(1, 2) THEN vccmpcd.Extension 
                      WHEN vccm.VoipCCMMonitoringTypeID = 3 THEN vccmpad.Extension 
                    END AS Extension,
                    CASE 
                      WHEN vccm.VoipCCMMonitoringTypeID IN(1, 2) THEN vccmrc.RegionName 
                      WHEN vccm.VoipCCMMonitoringTypeID = 3 THEN vccmra.RegionName
                    END AS PhoneRegion

   FROM dbo.VoipCCMMonitoring AS vccm
           INNER JOIN dbo.VoipCCMPhones AS vccmp  ON vccm.ID = vccmp.VoipCCMMonitoringID AND vccmp.Licensed = 1
           LEFT JOIN dbo.VoipCCMPhonesCiscoData AS vccmpcd ON vccmp.ID = vccmpcd.VoipCCMPhonesID AND vccm.VoipCCMMonitoringTypeID IN (1, 2)
           LEFT JOIN dbo.VoipCCMPhonesAvayaData AS vccmpad ON vccmp.ID = vccmpad.VoipCCMPhonesID AND vccm.VoipCCMMonitoringTypeID = 3
           INNER JOIN dbo.VoipCCMStatsType AS vccms ON vccmp.Status = vccms.ID
           LEFT OUTER JOIN dbo.VoipCCMRegions AS vccmrc ON vccmpcd.RegionID = vccmrc.RegionID and vccm.VoipCCMMonitoringTypeID IN (1, 2)
    LEFT OUTER JOIN dbo.VoipCCMRegions AS vccmra ON vccmpad.RegionID = vccmra.RegionID and vccm.VoipCCMMonitoringTypeID = 3 
    WHERE (vccm.Deleted <> 1)
```
