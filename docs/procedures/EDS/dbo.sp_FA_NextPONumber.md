# Procedure: `dbo.sp_FA_NextPONumber`

_Generated on 2026-05-04T13:07:57.464Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_NextPONumber` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:57:58 |
| Modified | 2014-01-10 17:09:24 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@RSID` | IN | int |  |
| 3 | `@budgetID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `District` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_FA_NextPONumber] @sessionID int, @RSID int, @budgetID int

AS
			
DECLARE	@districtID int
		, @UseSchool bit
		, @schoolID int
		, @allowLZ bit
		, @prefix varchar(20)
		, @nextNumber int
		, @endNumber int
		, @suffix varchar(20)

SET	@schoolID = NULL;
SET @allowLZ = 1;
SET @prefix = '';
SET @nextNumber = NULL;
SET @endNumber = NULL;
SET @suffix = '';

-- find out if we are going to use school specific PO numbers
SELECT	@districtID = D.DistrictId
		, @UseSchool = D.POsbySchool
FROM	District D, SessionTable ST
WHERE	D.DistrictId = ST.DistrictID
	AND	ST.SessionId = @sessionID

 
if (@UseSchool = 0 AND (SELECT COUNT(*) FROM NextNumber WHERE DistrictId = @districtID AND SchoolId IS NULL AND BudgetId = @budgetID AND IdType='P') < 1)
	begin
		SET @nextNumber = 1;
		INSERT	INTO NextNumber(DistrictId, SchoolId, BudgetId, IdType, Prefix, Suffix, NextNumber, EndNumber, SuppressLZ, NumberLength, FFMessage)
		VALUES	(@districtID,@schoolID,@budgetID,'P',NULL,NULL,1,NULL,NULL,NULL,NULL)
	end
	
else if (@UseSchool = 1 AND (SELECT COUNT(*) FROM NextNumber WHERE DistrictId = @districtID AND SchoolId = @schoolID AND BudgetId = @budgetID AND IdType='P') < 1)
	begin
		SET @nextNumber = 1;
		INSERT	INTO NextNumber(DistrictId, SchoolId, BudgetId, IdType, Prefix, Suffix, NextNumber, EndNumber, SuppressLZ, NumberLength, FFMessage)
		VALUES	(@districtID,@schoolID,@budgetID,'P',NULL,NULL,1,1,NULL,NULL,NULL)
	end
else 
	

if @UseSchool = 1
	begin
		--print 'Create PO By School'
		select	@allowLZ = CASE isnull(SuppressLZ,1)
					WHEN 1 THEN 0
					ELSE 1
				END
				,@prefix = ISNULL(Prefix,'')
				,@nextNumber =	case isnull(SuppressLZ,1)
									when 0 then right(
										replicate('0'
											,case isnull(NumberLength,0)
												when 0 then 6
												else isnull(NumberLength,0) 
											end
										)
										+ CONVERT(varchar(16),ISNULL(@nextNumber,ISNULL(NextNumber,1)))
											,case isnull(NumberLength,0)
												when 0 then 6
												else isnull(NumberLength,0)
											end
									)
									else CONVERT(varchar(16),ISNULL(@nextNumber,ISNULL(NextNumber,1)))
								end
				, @endNumber = EndNumber
				, @suffix = ISNULL(Suffix,'')
		from NextNumber
		where DistrictId = @districtID
		 and SchoolId = @SchoolId
		 and BudgetId = @BudgetId
		 and IdType = 'P'

	end

else
    
	begin
	-- print 'Create PO By District'
	 select	@allowLZ = CASE isnull(SuppressLZ,1)
					WHEN 1 THEN 0
					ELSE 1
				END
			,@prefix = ISNULL(Prefix,'')
			,@nextNumber =	case isnull(SuppressLZ,1)
								when 0 then right(
									replicate('0'
										,case isnull(NumberLength,0)
											when 0 then 6
											else isnull(NumberLength,0) 
										end
									)
									+ CONVERT(varchar(16),ISNULL(@nextNumber,ISNULL(NextNumber,1)))
										,case isnull(NumberLength,0)
											when 0 then 6
											else isnull(NumberLength,0)
										end
								)
								else CONVERT(varchar(16),ISNULL(@nextNumber,ISNULL(NextNumber,1)))
							end
			, @endNumber = EndNumber
			, @suffix = ISNULL(Suffix,'')
		from NextNumber
		where DistrictId = @districtID
		 and SchoolId IS NULL
		 and BudgetId = @BudgetId
		 and IdType = 'P'
	end
	
SELECT	@allowLZ AS allowLZ,@prefix AS prefix, @nextNumber AS nextNumber, @endNumber AS endNumber ,@suffix AS suffix
```
