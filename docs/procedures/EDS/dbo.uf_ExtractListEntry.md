# Function: scalar: `dbo.uf_ExtractListEntry`

_Generated on 2026-05-04T13:04:00.549Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ExtractListEntry` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2007-03-22 12:40:37 |
| Modified | 2007-03-22 12:40:37 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@FreqData` | IN | varchar(50) |  |
| 2 | `@FreqPtr` | IN | int |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_DistrictPaymentHistory` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentHistoryBudget` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentSchedule` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleBudget` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBO` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOBudget` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_ProposedDistrictPaymentSchedule` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
--select dbo.uf_ExtractListEntry('1123,4,337,10',5)
CREATE function dbo.uf_ExtractListEntry(@FreqData varchar(50),@FreqPtr int)
returns varchar(1024)
 
as
begin
declare @ReturnData varchar(1024),
        @StartPtr int,
	@CurPtr int,
	@MaxPtr int,
	@IndexCounter int

select @CurPtr = 0,
       @IndexCounter = 0,
       @StartPtr = 0,
       @MaxPtr = len(rtrim(ltrim(isnull(@FreqData,'')))),
       @ReturnData = null

while @CurPtr < @MaxPtr
  and @IndexCounter < @FreqPtr
begin
  select @CurPtr = @CurPtr + 1
  if substring(@FreqData,@CurPtr,1) = ','
  begin
    select @IndexCounter = @IndexCounter + 1
    if @FreqPtr = @IndexCounter
    begin
      if @StartPtr <= @CurPtr - 1
      begin
        select @ReturnData = substring(@FreqData,@StartPtr,@CurPtr - @StartPtr)
        continue
      end
    end
    select @StartPtr = @CurPtr + 1
  end
end

select @IndexCounter = @IndexCounter + 1
if @FreqPtr = @IndexCounter
begin
  select @ReturnData = substring(@FreqData,@StartPtr,@CurPtr - @StartPtr + 1)
end

return(@ReturnData)
end
```
