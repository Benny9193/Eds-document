# Procedure: `dbo.sp_SchoolMerge`

_Generated on 2026-05-04T13:07:57.523Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SchoolMerge` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2016-09-26 11:45:44 |
| Modified | 2016-09-26 11:49:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceSchoolId` | IN | int |  |
| 2 | `@pDestSchoolId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_SchoolMerge @pSourceSchoolId int, @pDestSchoolId int
as
begin
declare @SourceDistrictId int, 
		@DestDistrictId int,
		@StatusMsg varchar(4096)
		
select @SourceDistrictId = DistrictId
  from School
 where SchoolId = @pSourceSchoolId
 
select @DestDistrictId = DistrictId
  from School
 where SchoolId = @pDestSchoolId

-- Check for Districts being the same
if isnull(@SourceDistrictId,0) = isnull(@DestDistrictId,0)
begin
	-- Move Source Users to Dest School
	Update Users
	   set SchoolId = @pDestSchoolId
	 where Users.DistrictId = @SourceDistrictId
	   and Users.SchoolId = @pSourceSchoolId
	   and Users.Active = 1
	   
	-- Update Accounts That Point to Source School to Point to Dest School
	Update Accounts
	   set SchoolId = @pDestSchoolId
	 where Accounts.DistrictId = @SourceDistrictId
	   and Accounts.SchoolId = @pSourceSchoolId
	   and Accounts.Active = 1
	   
	-- Deactivate School
	update School
	   set Active = 0
	 where SchoolId = @pSourceSchoolId
end
else
begin
	select @StatusMsg = coalesce(@StatusMsg,'') + 'Source and Destination Districts are not the same. Process Aborted.'
end

select @StatusMsg StatusMsg
end
```
