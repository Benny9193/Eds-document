# View: `dbo.vw_FA_EDSUser`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | int | NO |  |  |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `ShippingId` | int | YES |  |  |
| 5 | `Active` | tinyint | NO |  |  |
| 6 | `UserName` | varchar(50) | YES |  |  |
| 7 | `Password` | varchar(100) | YES |  |  |
| 8 | `Attention` | varchar(50) | YES |  |  |
| 9 | `ApprovalLevel` | tinyint | YES |  |  |
| 10 | `CometId` | int | YES |  |  |
| 11 | `DisableNewRequisition` | tinyint | YES |  |  |
| 12 | `DistrictAcctgCode` | varchar(20) | YES |  |  |
| 13 | `ApproverId` | int | YES |  |  |
| 14 | `NewRequisitionButton` | int | NO |  |  |
| 15 | `AllowIncidentals` | tinyint | NO |  |  |
| 16 | `AllowVendorChanges` | tinyint | NO |  |  |
| 17 | `AllowShipToChanges` | tinyint | NO |  |  |
| 18 | `AllowTM` | tinyint | NO |  |  |
| 19 | `Email` | varchar(255) | YES |  |  |
| 20 | `SecurityRoleId` | int | YES |  |  |
| 21 | `Use20` | int | YES |  |  |
| 22 | `EmailByPassDate` | date | YES |  |  |
| 23 | `FirstName` | varchar(20) | YES |  |  |
| 24 | `LastName` | varchar(30) | YES |  |  |
| 25 | `useCF` | int | NO |  |  |
| 26 | `AllowExport` | bit | NO |  |  |
| 27 | `HasAdminAccess` | bit | NO |  |  |
| 28 | `Role` | varchar(50) | NO |  |  |
| 29 | `UserDisplayName` | varchar(56) | YES |  |  |
| 30 | `AllowAddenda` | bit | NO |  |  |
| 31 | `AllowMSRP` | tinyint | NO |  |  |
| 32 | `AllowAccountCodeMgmt` | tinyint | NO |  |  |
| 33 | `POAccess` | int | NO |  |  |
| 34 | `AllowVendorCodeMaintenance` | tinyint | NO |  |  |
| 35 | `PositionData` | nvarchar(4000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `SecurityRoles` | USER_TABLE |
| `SecurityRoleUsers` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_FA_UserDisplayName` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_FA_EDSUser]

AS

	SELECT	U.UserId, U.DistrictId, U.SchoolId, U.ShippingId, isnull(U.Active,0) Active, U.UserName, U.Password, U.Attention, U.ApprovalLevel, U.CometId, U.DisableNewRequisition, U.DistrictAcctgCode, U.ApproverId, isnull(U.NewRequisitionButton,0) NewRequisitionButton, isnull(U.AllowIncidentals,0) AllowIncidentals, isnull(U.AllowVendorChanges,0) AllowVendorChanges, isnull(U.AllowShipToChanges,0) AllowShipToChanges, isnull(U.AllowTM,0) AllowTM, U.Email, U.SecurityRoleId, cast(1 as int) Use20, U.EmailByPassDate, U.FirstName, U.LastName, ISNULL(U.useCF,0) AS useCF, ISNULL(U.AllowExport,0) AS AllowExport, ISNULL(HasAdminAccess,0) AS HasAdminAccess
			, SR.Name AS Role
			, vFAUDN.UserDisplayName
			, ISNULL(U.AllowAddenda,0) AS AllowAddenda -- bh 5/14/2012
			, ISNULL(U.allowMSRP,0) AS AllowMSRP
			, ISNULL(U.AllowAccountCodeMgmt,0) AS AllowAccountCodeMgmt
			, isnull(u.POAccess,0) as POAccess
			, isnull(u.AllowVendorCodeMaintenance,0) AllowVendorCodeMaintenance
			, coalesce(u.PositionData,'') PositionData
	FROM	Users U, vw_FA_UserDisplayName vFAUDN, SecurityRoleUsers SRU, SecurityRoles SR
	WHERE	SR.SecurityRoleID = SRU.SecurityRoleID
		AND	SRU.UserID = U.UserID
		AND	vFAUDN.UserID = U.UserID
```
