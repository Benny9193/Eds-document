# Procedure: `dbo.sp_FA_SavePOs`

_Generated on 2026-05-04T14:49:07.279Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SavePOs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:59:03 |
| Modified | 2014-01-10 17:09:15 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@poTempID` | IN | int |  |
| 3 | `@pRequisitionId` | IN | int |  |
| 4 | `@poGenerationMethod` | IN | varchar(10) |  |
| 5 | `@poEnd` | IN | int |  |
| 6 | `@created` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `POTemp` | USER_TABLE |  |
| `POTempDetails` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `sp_FA_CreatePO` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_SavePOs] @pSessionId int, @poTempID int, @pRequisitionId int, @poGenerationMethod varchar(10), @poEnd int, @created int OUTPUT

/*
declare
	@pSessionId int = 2926562
	, @poTempID int = 220
	, @pRequisitionId int = 1471345
	, @poGenerationMethod varchar(10) = 'Automatic'
	, @poEnd int = 24
	, @created int;
*/

AS

	DECLARE @PONumber int
			, @districtID int
			, @schoolID int
			, @budgetID int
			, @nextNumberID int
			, @nextNumber int
			, @useSchool bit
			, @lastPONumber int
			, @prefix varchar(20)
			, @suffix varchar(20)
			, @endNumber int

-- get variables for setting next PO number
SELECT	@districtID = S.DistrictId, @schoolID=S.SchoolId, @budgetID = R.BudgetId, @useSchool = ISNULL(D.POsBySchool,0)
FROM	Requisitions R, School S, District D
WHERE	D.DistrictID = S.DistrictId
	AND	S.SchoolId = R.SchoolID
	AND	R.RequisitionId = @pRequisitionID
	
-- get the prefix and suffix
SELECT	@prefix  = ISNULL(prefix,''), @suffix = ISNULL(suffix,'')
FROM	NextNumber
WHERE	BudgetId = @budgetID
	AND	IdType = 'P'

if (select count(*) FROM PO where RequisitionId = @pRequisitionId) > 0
	begin
		--update POs
		UPDATE	PO
			SET	PONumber = @prefix + POTempDetails.PONumber + @suffix
		FROM	POTemp, POTempDetails
		WHERE	PO.RequisitionId = POTempDetails.RequisitionID
			AND PO.AwardId = (SELECT AwardId FROM Awards WHERE BidHeaderID=POTempDetails.BidHeaderID AND VendorID=POTempDetails.VendorID AND Active=1)
			AND	PO.VendorId = POTempDetails.VendorID
			AND	POTempDetails.POTempID = POTemp.POTempID
			AND	POTemp.POTempID = @poTempID
			AND	POTemp.SessionID = sessionID
			
		SET @created = 0;
	end
else
	begin
		--create POs
		exec sp_FA_CreatePO @pSessionId, @poTempID, @pRequisitionId
		
		SET @created = 1;
	end

SET	@PONumber = (
					SELECT	CASE ISNUMERIC(MAX(Replace(Replace(POTempDetails.PONumber,@suffix,''),@prefix,'')))
								WHEN 1 THEN MAX(Replace(Replace(POTempDetails.PONumber,@suffix,''),@prefix,''))
								ELSE ''
							END
					FROM	PO, POTemp, POTempDetails
					WHERE	PO.RequisitionId = POTempDetails.RequisitionID
						AND PO.AwardId = (SELECT AwardId FROM Awards WHERE BidHeaderID=POTempDetails.BidHeaderID AND VendorID=POTempDetails.VendorID AND Active=1)
						AND	PO.VendorId = POTempDetails.VendorID
						AND	POTempDetails.POTempID = POTemp.POTempID
						AND	POTemp.POTempID = @poTempID
						AND	POTemp.SessionID = sessionID
				);

/* This was all moved to the CF code
/* If there is no PO number, there is no reason to process all this stuff */
/* There will be no PO number if the District poGenerationMethod is 'None' */
if (ISNUMERIC(@PONumber) = 1)
	BEGIN
		if (@useSchool = 1)
			begin
				SELECT	@nextNumberID = NextNumberID, @nextNumber = NextNumber, @endNumber = EndNumber
				FROM	NextNumber
				WHERE	DistrictId = @districtID
					AND	BudgetId = @budgetID
					AND	SchoolID = @schoolID
					AND	IdType = 'P'
			end
		else
			begin
				SELECT	@nextNumberID = NextNumberID, @nextNumber = NextNumber, @endNumber = ISNULL(EndNumber,0)
				FROM	NextNumber
				WHERE	DistrictId = @districtID
					AND	BudgetId = @budgetID
					AND	SchoolID IS NULL
					AND	IdType = 'P'
			end

		if (@poGenerationMethod IN ('Automatic','Manual'))
			BEGIN
			
				SET @nextNumber = @PONumber + 1
				
				UPDATE	NextNumber
					SET	NextNumber = @nextNumber
				WHERE	NextNumberId = @nextNumberID
				
				if (@endNumber < @nextNumber)
					BEGIN
						SET @endNumber = @nextNumber
					END
					
				if (@endNumber < @poEnd)
					BEGIN
						SET @endNumber = @poEnd
					END
					
				UPDATE	NextNumber
					SET	EndNumber = @endNumber
				WHERE	NextNumberId = @nextNumberID
				
			END
	END
*/
```
