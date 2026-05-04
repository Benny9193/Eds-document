# Procedure: `dbo.usp_POPrintExport`

_Generated on 2026-05-04T13:04:00.733Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_POPrintExport` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-04-29 14:48:09 |
| Modified | 2019-04-29 14:48:09 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pDistrictId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |
| 4 | `@pPOPrint` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure [dbo].[usp_POPrintExport] @pSessionId int, @pDistrictId int, @pBudgetId int, @pPOPrint varchar(max)
as
begin
declare @RequestDate datetime = getdate(),
		@RSId int

	insert ReportSession(ReportStarted) values(@RequestDate)
	select @RSId = Scope_Identity()

	insert ReportSessionLinks(RSId, IntId)
  	    select @RSId, PO.POId
		  from SessionTable
		  join Budgets on Budgets.BudgetId = @pBudgetId
		  join District on District.DistrictId = Budgets.DistrictId
					   and District.DistrictId = @pDistrictId
		  join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
		  join PO on PO.RequisitionId = Requisitions.RequisitionId
		  join openjson(@pPOPrint) with (POId int '$."POId"', Seq int '$."Seq"') poi on poi.POId = PO.POId
		 where SessionTable.SessionId = @pSessionId
		 order by poi.Seq

	select @RSId RSId, cast(@@RowCount as varchar) + ' POs were printed/exported successfully' as Status
end
```
