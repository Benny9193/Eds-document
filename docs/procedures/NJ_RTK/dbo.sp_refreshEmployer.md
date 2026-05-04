# Procedure: `dbo.sp_refreshEmployer`

_Generated on 2026-05-04T13:43:24.514Z_

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_refreshEmployer` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-01-13 17:58:58 |
| Modified | 2024-06-21 19:09:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@EIN` | IN | varchar(50) |  |
| 2 | `@Name` | IN | varchar(50) |  |
| 3 | `@Link` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Employers` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_refreshEmployer] @EIN varchar(50), @Name varchar(50), @Link varchar(255)
as
begin
declare @EmployerId uniqueidentifier,
		@DistrictId int

select @EmployerId = Employers.Id,
	   @DistrictId = Employers.DistrictId
  from Employers
 where Employers.EIN = @EIN
   and Employers.deletedAt is null

if @@ROWCOUNT = 0
begin
	select @EmployerId = NewId()
	insert Employers(Id, EIN, Name, ListLink)
      values (@EmployerId, @EIN, @Name, @Link)
    select @DistrictId = null
end
else
begin
  update Employers
     set Name = @Name,
         ListLink = @Link,
	     lastRefreshed = GETDATE()
    from Employers
   where Employers.EIN = @EIN
end

select @EmployerId as EmployerId, @DistrictId as DistrictId

end
```
