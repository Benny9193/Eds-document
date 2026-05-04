# View: `dbo.vw_FA_UserLogin`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserIsActive` | tinyint | YES |  |  |
| 2 | `UserID` | int | NO |  |  |
| 3 | `CometId` | int | YES |  |  |
| 4 | `Password` | varchar(10) | YES |  |  |
| 5 | `Attention` | varchar(50) | YES |  |  |
| 6 | `ApprovalLevel` | tinyint | YES |  |  |
| 7 | `ApproverID` | int | YES |  |  |
| 8 | `HasAdminAccess` | bit | YES |  |  |
| 9 | `SchoolIsActive` | tinyint | YES |  |  |
| 10 | `SchoolID` | int | NO |  |  |
| 11 | `SchoolName` | varchar(50) | YES |  |  |
| 12 | `DistrictIsActive` | tinyint | YES |  |  |
| 13 | `DistrictName` | varchar(50) | YES |  |  |
| 14 | `DistrictID` | int | NO |  |  |
| 15 | `DistrictCode` | varchar(4) | YES |  |  |
| 16 | `CSRepID` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `School` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_FA_UserLogin]

AS 

SELECT	U.Active AS UserIsActive, U.UserID, U.CometId, U.[Password], U.Attention, U.ApprovalLevel, U.ApproverID, U.HasAdminAccess
		, S.Active AS SchoolIsActive,S.SchoolID, S.Name AS SchoolName
		, D.Active AS DistrictIsActive, D.Name AS DistrictName, D.DistrictID, D.DistrictCode, D.CSRepID
		
FROM	Users U, School S, District D
WHERE	D.DistrictId = S.DistrictId
	AND	S.SchoolId = U.SchoolId
```
