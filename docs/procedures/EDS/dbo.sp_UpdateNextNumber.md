# Procedure: `dbo.sp_UpdateNextNumber`

_Generated on 2026-05-04T13:43:18.929Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateNextNumber` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-04-04 15:19:08 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pNextNumberId` | IN | int |  |
| 3 | `@pIdType` | IN | varchar(255) |  |
| 4 | `@pDistrictId` | IN | int |  |
| 5 | `@pSchoolId` | IN | int |  |
| 6 | `@pBudgetId` | IN | int |  |
| 7 | `@pPrefix` | IN | varchar(255) |  |
| 8 | `@pSuffix` | IN | varchar(255) |  |
| 9 | `@pNextNumber` | IN | int |  |
| 10 | `@pSuppressLZ` | IN | tinyint |  |
| 11 | `@pNumberLength` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `NextNumber` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_UpdateNextNumber @pSessionId int, @pNextNumberId int, @pIdType varchar(255), @pDistrictId int, @pSchoolId int, @pBudgetId int, @pPrefix varchar(255), @pSuffix varchar(255), @pNextNumber int, @pSuppressLZ tinyint, @pNumberLength tinyint AS

if @pNextNumberId = 0
begin
  insert NextNumber (DistrictId, BudgetId, IdType, Prefix, Suffix, NextNumber, SuppressLZ, NumberLength)
    values (@pDistrictId, @pBudgetId, @pIDType, @pPrefix, @pSuffix, @pNextNumber, @pSuppressLZ, @pNumberLength)
end
else
begin
  Update NextNumber
     set Prefix = @pPrefix, 
	 Suffix = @pSuffix, 
	 NextNumber = @pNextNumber, 
	 SuppressLZ = @pSuppressLZ, 
	 NumberLength = @pNumberLength
   where NextNumberId = @pNextNumberId
end
```
