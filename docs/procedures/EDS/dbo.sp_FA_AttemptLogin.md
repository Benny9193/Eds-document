# Procedure: `dbo.sp_FA_AttemptLogin`

_Generated on 2026-05-04T13:04:24.123Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_AttemptLogin` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:06:32 |
| Modified | 2024-10-18 03:57:04 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@rtDistrictCode` | IN | varchar(4) |  |
| 2 | `@rtCometId` | IN | varchar(50) |  |
| 3 | `@rtPassword` | IN | varchar(100) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CSRep` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_SetDistrictAndBudgetYear` | unresolved |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |
| `dbo.uf_EncryptPassword` | SQL_SCALAR_FUNCTION |  |
| `dbo.Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE dbo.sp_FA_AttemptLogin @rtDistrictCode varchar(4), @rtCometId varchar(50), @rtPassword varchar(100) AS

DECLARE	@tempSessionId int

set nocount on
insert DebugMsgs(Msg) values('DistrictCode=>' + isnull(@rtDistrictCode,'<null>') + '< CometId=>' + ISNULL(@rtCometId,'<null>') + '< Password=>' + ISNULL(@rtPassword,'<null>') + '<')


INSERT	SessionTable (UserId, SchoolId, DistrictId, CSRepId, RepUserId, ApprovalLevel, Attention, ReqMode, AllowIncidentals)
SELECT	dbo.Users.UserId, dbo.School.SchoolId, dbo.District.DistrictId, CSRep.CSRepId, CSRep.UserId, Users.ApprovalLevel, Users.Attention, 1, Users.AllowIncidentals
  FROM	dbo.Users    
  JOIN	dbo.School on dbo.School.SchoolId = dbo.Users.SchoolId
		AND	dbo.School.Active = 1
  JOIN	dbo.District on dbo.District.DistrictId = dbo.School.DistrictId
		AND dbo.District.Active = 1
		AND isnull(dbo.District.DisableLogins,0) = 0
  LEFT OUTER JOIN CSRep on CSRep.UserId = Users.UserId
WHERE	dbo.District.DistrictCode = @rtDistrictCode
   AND	dbo.Users.CometId = convert(int,@rtCometId)
   AND	(dbo.Users.Password = dbo.uf_EncryptPassword(@rtPassword) OR dbo.Users.Password = @rtPassword)
   AND	dbo.Users.Active = 1

if @@RowCount != 0
begin
  select @tempSessionId = scope_identity()

  exec sp_SetDistrictAndBudgetYear @tempSessionId, 0, 0

  insert DebugMsgs(Msg) values('Login Sucessful DistrictCode=>' + isnull(@rtDistrictCode,'<null>') + '< CometId=>' + ISNULL(@rtCometId,'<null>') + '< SessionId=' + CAST(@tempSessionId as varchar))
end
else
begin
  insert DebugMsgs(Msg) values('Login Failed DistrictCode=>' + isnull(@rtDistrictCode,'<null>') + '< CometId=>' + ISNULL(@rtCometId,'<null>') + '< Password=>' + ISNULL(@rtPassword,'<null>') + '<')
end

select @tempSessionId as 'SessionId'

set nocount off
```
