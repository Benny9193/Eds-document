# Procedure: `dbo.sp_FA_UpdatePOStatus`

_Generated on 2026-05-04T13:04:00.402Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_UpdatePOStatus` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:48:34 |
| Modified | 2012-06-13 23:48:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@poTempID` | IN | int |  |
| 3 | `@action` | IN | varchar(25) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PO` | USER_TABLE |  |
| `POStatusTable` | USER_TABLE |  |
| `POTemp` | USER_TABLE |  |
| `POTempDetails` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_UpdatePOStatus] @sessionID int, @poTempID int, @action varchar(25) AS

DECLARE @createdStatusID int
		, @downloadedStatusID int
		, @sentStatusID int
		
SELECT @createdStatusID = POStatusID FROM POStatusTable WHERE StatusName = 'Created'
SELECT @downloadedStatusID = POStatusID FROM POStatusTable WHERE StatusName = 'Downloaded'
SELECT @sentStatusID = POStatusID FROM POStatusTable WHERE StatusName = 'Electronically Sent'

UPDATE	PO
	SET	POStatusID = CASE @action
						WHEN 'Save' THEN @createdStatusID
						WHEN 'Download' THEN @downloadedStatusID
						WHEN 'Send' THEN @sentStatusID
						ELSE ISNULL(POStatusID,0)
					END
FROM	POTemp, POTempDetails
WHERE	PO.RequisitionId = POTempDetails.RequisitionID
	AND	PO.VendorId = POTempDetails.VendorID
	AND	POTempDetails.POTempID = POTemp.POTempID
	AND	POTemp.POTempID = @poTempID
	AND	POTemp.SessionID = @sessionID
	-- don't update rows if a lower level action is performed
	AND	PO.POStatusID < CASE @action
							WHEN 'Save' THEN @createdStatusID
							WHEN 'Download' THEN @downloadedStatusID
							WHEN 'Send' THEN @sentStatusID
						END
```
