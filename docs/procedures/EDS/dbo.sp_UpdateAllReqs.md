# Procedure: `dbo.sp_UpdateAllReqs`

_Generated on 2026-05-04T13:04:00.466Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateAllReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-25 16:53:50 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `district` | USER_TABLE |  |
| `requisitions` | USER_TABLE |  |
| `school` | USER_TABLE |  |
| `sp_UpdateReq` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_UpdateAllReqs @pDistrictId int as

declare @ReqId int

declare reqcur cursor fast_forward for
select RequisitionId 
  from requisitions 
  join school on school.schoolid = requisitions.schoolid 
  join district on district.districtid = school.districtid 
 where district.DistrictId = @pDistrictId

open reqcur

fetch next from reqcur into @ReqId
while @@fetch_status = 0
begin
exec sp_UpdateReq @ReqId,0,1
fetch next from reqcur into @ReqId
end

close reqcur
deallocate reqcur
```
