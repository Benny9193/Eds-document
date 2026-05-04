# Procedure: `dbo.usp_GeneratePassword`

_Generated on 2026-05-04T13:04:24.359Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GeneratePassword` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2023-09-20 16:34:11 |
| Modified | 2024-12-01 19:39:15 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserId` | IN | int |  |
| 2 | `@pLength` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Users` | USER_TABLE |  |
| `dbo.uf_EncryptPassword` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE     procedure [dbo].[usp_GeneratePassword] @pUserId int, @pLength int
as
begin
set NOCOUNT on
declare @CharSet varchar(128) = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345789abcdefghijklmnopqrstuvwxyz~!@#$^&*()_-+=',
		@NewPass varchar(64) = '',
		@Idx int = 1,
		@MeetsRequirements tinyint = 0,
		@RandChar char(1),
		@RandIdx int,
		@CometId int

Select @CometId = CometId
  from Users
 where UserId = @pUserId
--print @CometId
--print @pUserId
while @MeetsRequirements = 0
begin
	select @NewPass = ''
	select @Idx = 1
	while @Idx <= @pLength
	begin
		Select @RandIdx = cast(RAND() * len(@CharSet) as int) + 1
		if @RandIdx > len(@CharSet) or @RandIdx < 1
			Raiserror('Random Index is out of Range',16,1)
		Select @RandChar = substring(@CharSet,@RandIdx,1)
--		print @RandChar
		Select @NewPass = @NewPass + @RandChar
		Select @Idx += 1
	end
--	print @NewPass
--	print len(@NewPass)
--	Print PATINDEX('%[A-Z]%', @NewPass)
--	Print PATINDEX('%[a-z]%', @NewPass)
--	Print PATINDEX('%[0-9]%', @NewPass)
--	Print PATINDEX('%[^A-Za-z0-9]%', @NewPass)
	if PATINDEX('%[A-Z]%', @NewPass) > 0
	begin
		if PATINDEX('%[a-z]%', @NewPass) > 0
		begin
			if PATINDEX('%[0-9]%', @NewPass) > 0
			begin
				if PATINDEX('%[^A-Za-z0-9]%', @NewPass) > 0
				begin
					Select @MeetsRequirements = 1
				end
--				else
--					Print 'No Special Characters'
			end
--			else
--				Print 'No Numbers'
		end
--		else
--			Print 'No Lowercase Characters'
	end
--	else
--		Print 'No Uppercase Characters'
--	Print @NewPass
end
Update Users
   set Password = dbo.uf_EncryptPassword(@NewPass)
 where Users.UserId = @pUserId
set NOCOUNT off
end
```
