# View: `dbo.VoipConnectedPhonesReport`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `CallManagerName` | nvarchar(255) | YES |  |  |
| 3 | `PhoneName` | varchar(255) | YES |  |  |
| 4 | `IPAddress` | varchar(50) | YES |  |  |
| 5 | `Description` | ntext(1073741823) | YES |  |  |
| 6 | `MACAddress` | varchar(50) | YES |  |  |
| 7 | `Status` | int | YES |  |  |
| 8 | `LicenseStatus` | bit | NO |  |  |
| 9 | `RegionName` | nvarchar(50) | YES |  |  |
| 10 | `Extension` | nvarchar(50) | YES |  |  |
| 11 | `LastRegistered` | varchar(30) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Nodes` | VIEW |
| `VoipCCMMonitoring` | USER_TABLE |
| `VoipCCMPhones` | USER_TABLE |
| `VoipCCMPhonesAvayaData` | USER_TABLE |
| `VoipCCMPhonesCiscoData` | USER_TABLE |
| `VoipCCMRegions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipConnectedPhonesReport]
AS

SELECT
	N.NodeID,
	N.Caption     AS CallManagerName,
	P.Name        AS PhoneName,
	P.IP_Address  AS IPAddress,
	P.Description,
	P.MAC_Address AS MACAddress,
	P.Status,
	P.Licensed    AS LicenseStatus,
	CR.RegionName,
	CASE WHEN (CD.ID IS NOT NULL) THEN CD.Extension
		 WHEN (AD.ID IS NOT NULL) THEN AD.Extension ELSE '' END AS Extension,
	CASE WHEN (VCM.VoipCCMMonitoringTypeID = 1) THEN CONVERT(VARCHAR, CD.LastRegisteredUTC, 121) ELSE NULL END AS LastRegistered

FROM VoipCCMPhones AS P

INNER JOIN VoipCCMMonitoring VCM ON P.VoipCCMMonitoringID = VCM.ID
INNER JOIN Nodes N ON N.NodeID = VCM.NodeID
 LEFT JOIN VoipCCMPhonesCiscoData AS CD ON CD.VoipCCMPhonesID = P.ID
 LEFT JOIN VoipCCMPhonesAvayaData AS AD ON AD.VoipCCMPhonesID = P.ID
 LEFT JOIN VoipCCMRegions AS CR ON (CR.RegionID = CD.RegionID  OR CR.RegionID = AD.RegionID) AND CR.VoipCCMMonitoringID = P.VoipCCMMonitoringID

WHERE VCM.Deleted <> 1
```
