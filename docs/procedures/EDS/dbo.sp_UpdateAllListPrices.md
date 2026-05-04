# Procedure: `dbo.sp_UpdateAllListPrices`

_Generated on 2026-05-04T13:04:24.192Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateAllListPrices` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-10-12 13:06:31 |
| Modified | 2012-10-12 13:06:31 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `sp_UpdateListPrices` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_UpdateAllListPrices as
set transaction isolation level read uncommitted
declare @CategoryId int, @CategoryName varchar(50)
declare CatCur cursor for
select category.CategoryId, Category.Name
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type = 1
 where getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
   and BidHeaders.BidType in (1,2)
   and BidHeaders.Active = 1
 group by category.CategoryId, Category.Name

open CatCur

fetch Next From catCur into @CategoryId, @CategoryName

while @@FETCH_STATUS = 0
begin
  print 'Updating ' + @CategoryName
  
  exec sp_UpdateListPrices @CategoryId
  
  fetch Next From catCur into @CategoryId, @CategoryName
end
close CatCur
deallocate CatCur
```
