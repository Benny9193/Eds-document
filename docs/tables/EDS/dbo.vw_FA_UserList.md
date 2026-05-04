# View: `dbo.vw_FA_UserList`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `SchoolId` | int | NO |  |  |
| 4 | `UserId` | int | NO |  |  |
| 5 | `DisplayName` | varchar(56) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `School` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_FA_UserList] AS

	SELECT	ST.SessionId, D.DistrictId, S.SchoolId, U.UserId, right('00000' + cast(isnull(U.CometId,0) as varchar),5) + ' ' + U.Attention AS DisplayName
	FROM	SessionTable ST, District D, School S, Users U
	WHERE	U.SchoolId = S.SchoolID
		AND	U.Active = 1
		AND	S.DistrictId = D.DistrictId
		AND	S.Active = 1
		AND	D.DistrictId = ST.DistrictID
		AND	D.Active = 1
		AND	ST.SessionEnd IS NULL
```
