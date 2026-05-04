# Procedure: `dbo.sp_FA_NewPONumbers`

_Generated on 2026-05-04T13:43:18.833Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_NewPONumbers` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:08:08 |
| Modified | 2012-06-14 00:08:08 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@RSID` | IN | int |  |
| 3 | `@budgetID` | IN | int |  |
| 4 | `@nextNumber` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `sp_FA_RequisitionsForPurchaseOrderModal` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_FA_NewPONumbers] @sessionID int, @RSID int, @budgetID int, @nextNumber int

AS

DECLARE @temp table ([counter] int identity(1,1), firstNumber int)
DECLARE @rTemp table (ID int identity(1,1) , RequisitionID int, RequisitionNumber varchar(24), StatusName varchar(50), CategoryName varchar(50), CometID int, Attention varchar(50), VendorName varchar(50), VendorID int, VendorTotal money, PONumber int, BidHeaderID int, POStatus varchar(50), Prefix varchar(20), Suffix varchar(20))

-- get all the PO line items
insert into @rTemp exec sp_FA_RequisitionsForPurchaseOrderModal @sessionID,@budgetID,@RSID,0

-- put the next number into a table with ID's to use for adding later
INSERT	INTO @temp
SELECT	ISNULL(@nextNumber,1)
FROM	@rTemp

SELECT	CAST((firstNumber+[counter]-1) AS varchar) AS poNumber
FROM	@temp
```
