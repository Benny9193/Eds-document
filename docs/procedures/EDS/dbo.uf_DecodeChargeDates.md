# Function: scalar: `dbo.uf_DecodeChargeDates`

_Generated on 2026-05-04T13:07:57.597Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DecodeChargeDates` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2017-03-01 10:32:36 |
| Modified | 2017-03-01 10:36:37 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@FreqData` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.ufn_RegExSplit` | unresolved | `master` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function dbo.uf_DecodeChargeDates(@FreqData varchar(50))
returns varchar(1024)
as
begin
declare @months table (Seq int identity(1,1), Code varchar(10), Name varchar(20))
declare @ReturnString varchar(1024)

	if isnull(@FreqData,'') = ''
	begin
	  select @ReturnString = ''
	end
	else
	begin
		insert @Months(Code, Name)
		  select Match, 
				 case ltrim(rtrim(Match)) 
				   when '1' then 'July'
				   when '2' then 'August'
				   when '3' then 'September'
				   when '4' then 'October'
				   when '5' then 'November'
				   when '6' then 'December'
				   when '7' then 'January'
				   when '8' then 'February'
				   when '9' then 'March'
				   when '10' then 'April'
				   when '11' then 'May'
				   when '12' then 'June'
				   else 'Unknown'
				 end
			from master.dbo.ufn_RegExSplit(@FreqData,',',1)

		select @ReturnString = coalesce(@ReturnString + ', ','') + Name
		  from @Months
		 order by Seq
	end
		 
	return @ReturnString
end
```
