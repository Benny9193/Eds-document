# Procedure: `dbo.usp_UpdatePONextNumber`

_Generated on 2026-05-04T13:07:57.814Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_UpdatePONextNumber` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-08-08 19:37:13 |
| Modified | 2024-04-11 21:59:10 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pBudgetId` | IN | int |  |
| 3 | `@pPrefix` | IN | varchar(50) |  |
| 4 | `@pNextNumber` | IN | int |  |
| 5 | `@pSuffix` | IN | varchar(50) |  |
| 6 | `@pSuppressLZ` | IN | int |  |
| 7 | `@pNumberLength` | IN | int |  |
| 8 | `@pActualNumber` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       procedure [dbo].[usp_UpdatePONextNumber] @pDistrictId int, @pBudgetId int, @pPrefix varchar(50), @pNextNumber int, @pSuffix varchar(50), @pSuppressLZ int, @pNumberLength int, @pActualNumber tinyint = 0
as
begin

	if @pPrefix is not null or @pNextNumber is not null or @pSuffix is not null or @pSuppressLZ is not null or @pNumberLength is not null or @pActualNumber is not null
	begin
		/* Update Next Number Info */
		Update NextNumber
		   set Prefix = @pPrefix,
			   NextNumber = @pNextNumber,
			   Suffix = @pSuffix,
			   SuppressLZ = @pSuppressLZ,
			   NumberLength = @pNumberLength,
			   ActualNumber = @pActualNumber
		 where IdType = 'P'
		   and DistrictId = @pDistrictId
		   and BudgetId = @pBudgetId

		if @@rowcount = 0
		begin
			insert NextNumber(DistrictId, BudgetId, IDType, Prefix, NextNumber, Suffix, SuppressLZ, NumberLength, ActualNumber)
			  select DistrictId, BudgetId, 'P', @pPrefix, @pNextNumber, @pSuffix, @pSuppressLZ, @pNumberLength, @pActualNumber
				from Budgets
			   where Budgets.DistrictId = @pDistrictId
				 and Budgets.BudgetId = @pBudgetId
				 and Budgets.Active = 1
		end
	end
	select '200' as [Code], 'OK' as [Text]
end
```
