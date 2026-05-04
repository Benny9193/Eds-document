# Procedure: `dbo.usp_ContinuanceAcceptance`

_Generated on 2026-05-04T13:04:00.694Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_ContinuanceAcceptance` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2017-11-01 10:46:44 |
| Modified | 2024-02-28 14:28:10 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pId` | IN | uniqueidentifier |  |
| 2 | `@pStatus` | IN | varchar(50) |  |
| 3 | `@pSignedBy` | IN | varchar(255) |  |
| 4 | `@pComments` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DistrictContinuances` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[usp_ContinuanceAcceptance] @pId uniqueidentifier, @pStatus varchar(50), @pSignedBy varchar(255), @pComments varchar(4096)
as
begin
declare @BudgetId int, @DCRows int

	-- Get District Continuance
	select @BudgetId = BudgetId
	  from DistrictContinuances
	 where DistrictContinuances.Id = @pId

	select @DCRows = @@rowcount

	if @DCRows > 0
	begin
		-- Update Continuance Status
		update DistrictContinuances
		   set [Status] = case UPPER(@pStatus) when 'ACCEPT' then 'A' when 'REJECT' then 'R' else 'U' end,
			   Received = getdate(),
			   SignedBy = @pSignedBy,
			   Comments = @pComments
		 where Id = @pId
	end

end
```
