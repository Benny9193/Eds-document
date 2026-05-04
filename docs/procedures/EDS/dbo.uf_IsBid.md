# Function: scalar: `dbo.uf_IsBid`

_Generated on 2026-05-04T13:07:57.631Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_IsBid` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2013-07-01 16:21:20 |
| Modified | 2014-07-08 10:49:47 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_IsBid](@pRequisitionId int)
returns int
as
begin
declare @RetVal int

	select top 1 @RetVal = cast(1 as int)
	  from BidHeaderDetail
	  join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId
	                 and BidHeaders.BidType = 2
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
		   	     and Detail.RequisitionId = @pRequisitionId
		   	     
	if @@ROWCOUNT = 0
	  select @RetVal = 0

	return(@RetVal)
end
```
