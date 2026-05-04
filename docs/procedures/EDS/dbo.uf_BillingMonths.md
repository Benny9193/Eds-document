# Function: scalar: `dbo.uf_BillingMonths`

_Generated on 2026-05-04T13:07:57.584Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BillingMonths` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2018-07-09 14:45:56 |
| Modified | 2018-07-09 14:58:51 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pMonths` | IN | varchar(1024) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Months` | USER_TABLE |  |
| `dbo.ufn_RegExSplit` | unresolved | `master` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_BillingMonths] (@pMonths varchar(1024))
returns varchar(1024)
  
as
begin
declare @ReturnValue varchar(1024)

select @ReturnValue = coalesce( @ReturnValue + ', ','') + Months.MonthName
  from master.dbo.ufn_RegExSplit(@pMonths,',',1) st
  join Months on Months.MonthId = case when st.Match > 6 then st.Match - 6 else st.Match + 6 end

return(@ReturnValue)
end
```
