# Procedure: `dbo.usp_UpdatePONumbers`

_Generated on 2026-05-04T13:04:24.399Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_UpdatePONumbers` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-05-01 11:38:14 |
| Modified | 2019-05-01 11:38:14 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pBudgetId` | IN | int |  |
| 3 | `@pPOUploads` | IN | varchar(max) |  |
| 4 | `@pPrefix` | IN | varchar(50) |  |
| 5 | `@pNextNumber` | IN | int |  |
| 6 | `@pSuffix` | IN | varchar(50) |  |
| 7 | `@pSuppressLZ` | IN | int |  |
| 8 | `@pNumberLength` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_UpdatePONumbers] @pDistrictId int, @pBudgetId int, @pPOUploads varchar(max), @pPrefix varchar(50), @pNextNumber int, @pSuffix varchar(50), @pSuppressLZ int, @pNumberLength int
as
begin
declare @POCount int

	/* Update PO Numbers */
	Update PO
	   set PONumber = poi.PONumber
	  from openjson(@pPOUploads)
	  with (POId int '$."POId"',
	        PONumber varchar(50) '$."PONumber"') poi
	  join PO on PO.POId = poi.POId
	  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
	  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
	 where Budgets.DistrictId = @pDistrictId
	   and Budgets.BudgetId = @pBudgetId

	select @POCount = @@rowcount

	if @pPrefix is not null or @pNextNumber is not null or @pSuffix is not null or @pSuppressLZ is not null or @pNumberLength is not null
	begin
		/* Update Next Number Info */
		Update NextNumber
		   set Prefix = @pPrefix,
			   NextNumber = @pNextNumber,
			   Suffix = @pSuffix,
			   SuppressLZ = @pSuppressLZ,
			   NumberLength = @pNumberLength
		 where IdType = 'P'
		   and DistrictId = @pDistrictId
		   and BudgetId = @pBudgetId

		if @@rowcount = 0
		begin
			insert NextNumber(DistrictId, BudgetId, IDType, Prefix, NextNumber, Suffix, SuppressLZ, NumberLength)
			  select DistrictId, BudgetId, 'P', @pPrefix, @pNextNumber, @pSuffix, @pSuppressLZ, @pNumberLength
				from Budgets
			   where Budgets.DistrictId = @pDistrictId
				 and Budgets.BudgetId = @pBudgetId
				 and Budgets.Active = 1
		end
	end

	select cast(@POCount as varchar) + ' PO Numbers updated successfully' as Status
end
```
