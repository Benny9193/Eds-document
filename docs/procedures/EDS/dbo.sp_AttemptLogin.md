# Procedure: `dbo.sp_AttemptLogin`

_Generated on 2026-05-04T13:04:00.284Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AttemptLogin` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:44 |
| Modified | 2025-03-26 09:00:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@rtDistrictCode` | IN | char(2) |  |
| 2 | `@rtCometId` | IN | varchar(50) |  |
| 3 | `@rtUserName` | IN | varchar(50) |  |
| 4 | `@rtPassword` | IN | varchar(100) |  |
| 5 | `@rtResolutionX` | IN | int |  |
| 6 | `@rtResolutionY` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CSRep` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_SetDistrictAndBudgetYear` | unresolved |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |
| `dbo.Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   PROCEDURE [dbo].[sp_AttemptLogin] @rtDistrictCode char(2), @rtCometId varchar(50), @rtUserName varchar(50), @rtPassword varchar(100), @rtResolutionX int, @rtResolutionY int AS
declare @tempSessionId int,
        @tempBudgetId int,
	@StartDate varchar(32)
set nocount on
/*
select @tempBudgetId = BudgetId
  from SessionTable
 where SessionId = (select max(SessionId)
                      from SessionTable
                      JOIN dbo.Users on dbo.Users.UserId = SessionTable.UserId
                      JOIN dbo.School on dbo.School.SchoolId = dbo.Users.SchoolId
                      JOIN dbo.District on dbo.District.DistrictId = dbo.School.DistrictId
                     WHERE dbo.District.DistrictCode = @rtDistrictCode
                       AND dbo.Users.CometId = convert(int,@rtCometId)
                       AND dbo.Users.UserName = @rtUserName
                       AND dbo.Users.Password = @rtPassword)

if @@rowcount = 0
begin
  select @tempBudgetId = MAX(Budgets.BudgetId)
    FROM Budgets
    JOIN dbo.District on dbo.District.DistrictId = Budgets.DistrictId
   WHERE dbo.District.DistrictCode = @rtDistrictCode
end
*/

insert SessionTable (UserId, SchoolId, DistrictId, BudgetId, CSRepId, RepUserId, ApprovalLevel, Attention, ResolutionX, ResolutionY, ReqMode, AllowIncidentals)
SELECT dbo.Users.UserId, dbo.School.SchoolId, dbo.District.DistrictId, @tempBudgetId, CSRep.CSRepId, CSRep.UserId, Users.ApprovalLevel, Users.Attention, @rtResolutionX, @rtResolutionY, 1, Users.AllowIncidentals
  FROM dbo.Users    
  JOIN dbo.School on dbo.School.SchoolId = dbo.Users.SchoolId
                 and dbo.School.Active = 1
  JOIN dbo.District on dbo.District.DistrictId = dbo.School.DistrictId
                   and dbo.District.Active = 1
                   and isnull(dbo.District.DisableLogins,0) = 0
  left outer JOIN CSRep on CSRep.UserId = Users.UserId
 WHERE dbo.District.DistrictCode = @rtDistrictCode
   AND dbo.Users.CometId = convert(int,@rtCometId)
   AND dbo.Users.UserName = @rtUserName
   AND dbo.Users.Password = @rtPassword
   and dbo.Users.Active = 1

if @@RowCount != 0
begin
  select @tempSessionId = scope_identity()

  exec sp_SetDistrictAndBudgetYear @tempSessionId, 0, 0
end

select @tempSessionId as 'SessionId'

set nocount off
```
