# Function: scalar: `dbo.uf_BidCategories`

_Generated on 2026-05-04T13:43:22.355Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidCategories` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-10-26 17:43:11 |
| Modified | 2024-06-21 20:44:12 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidScheduleId` | IN | int |  |
| 2 | `@pVendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.BidMgrCategoryByBidScheduleIdVendorId` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_BidCategories] (@pBidScheduleId int, @pVendorId int)
returns varchar(4096)
as
begin
declare @ReturnValue varchar(4096)

select @ReturnValue = coalesce( @ReturnValue + ', ','') + isnull(cl.CategoryName,'') --+ ' ( Bid ' + cast(isnull(rc.calendarid,0) as varchar(10)) + ' )'
  from dbo.BidMgrCategoryByBidScheduleIdVendorId cl with (nolock) 
--  join registrations reg on reg.vendorid = cl.vendorid
--  join regcalendar rc on rc.registrationid = reg.registrationid
 where cl.BidScheduleId = @pBidScheduleId 
   and cl.VendorId = @pVendorId

return(@ReturnValue)
end
```
