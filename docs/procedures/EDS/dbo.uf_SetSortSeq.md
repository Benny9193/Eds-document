# Function: scalar: `dbo.uf_SetSortSeq`

_Generated on 2026-05-04T14:49:07.428Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SetSortSeq` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2002-02-18 17:28:04 |
| Modified | 2014-09-02 17:01:38 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSource` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `null.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.sp_BidCompare` | SQL_STORED_PROCEDURE |
| `dbo.sp_BidCompareDiscount` | SQL_STORED_PROCEDURE |
| `dbo.sp_BidCompareSame` | SQL_STORED_PROCEDURE |
| `dbo.sp_BidCompareSummary` | SQL_STORED_PROCEDURE |
| `dbo.trig_Items` | SQL_TRIGGER |
| `dbo.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBook03` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookNew` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookSaved` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest1` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_PARequisitions` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_PARequisitionsTest` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
--select dbo.uf_SetSortSeqTest('RAY AL AA')

CREATE function [dbo].[uf_SetSortSeq] (@pSource varchar(255)) returns varchar(255) with schemabinding AS
begin
declare @ReturnValue varchar(255)
declare @Index int,
	@MaxIndex int,
	@State int,
	@PrefixLength int,
	@PrefixStart int,
	@PrefixEnd int,
	@SuffixLength int,
	@SuffixStart int,
	@SuffixEnd int,
	@BodyLength int,
	@BodyStart int,
	@BodyEnd int,
	@SpaceLength int,
	@Prefix varchar(64),
	@Suffix varchar(64),
	@Body varchar(64)

select @Index = 0,
       @PrefixLength = 0,
       @Prefix = '',
       @SuffixLength = 0,
       @Suffix = '',
       @BodyLength = 0,
       @Body = '',
       @State = 1,
       @SuffixStart = 1,
       @MaxIndex = len(@pSource)

select @Index = @MaxIndex + 1

while (@Index > 0 and @State < 4)
begin
  if @Index <= 0
  begin
    select @SuffixStart = 0
    select @State = 5
  end
  
  -- Point to Prior Entry
  select @Index = @Index - 1

  if @State = 1 -- Looking for Trailing Spaces
  begin
    if substring(@pSource,@Index,1) != ' '
    begin
      select @State = 2
      select @SuffixEnd = @Index + 1
    end
  end

  if @State = 2 -- Looking for Suffix Start
  begin
    if substring(@pSource,@Index,1) >= '0' and substring(@pSource,@Index,1) <= '9'
    begin
      select @State = 3
      select @SuffixStart = @Index + 1
      select @BodyEnd = @Index + 1
    end
  end

  if @State = 3 -- Looking for Body Start
  begin
    if substring(@pSource,@Index,1) < '0' or substring(@pSource,@Index,1) > '9'
    begin
      select @State = 4
      select @BodyStart = @Index + 1
      select @PrefixEnd = @Index + 1
    end
  end
end

-- Point to End of Data
select @Index = 0

-- Find Suffix
while (@Index < @MaxIndex and @State < 5)
begin
  -- Point to Next Entry
  select @Index = @Index + 1

  if @State = 4 -- Looking for Leading Spaces
  begin
    if substring(@pSource,@Index,1) != ' '
    begin
      select @State = 5
      select @PrefixStart = @Index
    end
  end
end

select @PrefixLength = @PrefixEnd - @PrefixStart
if @PrefixLength != 0
begin
  select @Prefix = substring(@pSource,@PrefixStart,@PrefixLength)
end

select @SuffixLength = @SuffixEnd - @SuffixStart
if @SuffixLength != 0
begin
  select @Suffix = substring(@pSource,@SuffixStart,@SuffixLength)
end

-- Save Body
select @BodyLength = @BodyEnd - @BodyStart
if @BodyLength > 0
begin
  select @Body = substring(@pSource,@BodyStart,@BodyLength)
end

select @SpaceLength = 24 - (@PrefixLength + @BodyLength)

if isnull(@SpaceLength,0) <= 0
begin
  select @ReturnValue = isnull(@Prefix,'') + isnull(@Body,'') + isnull(@Suffix,'')
end
else
begin
--  select @ReturnValue = convert(varchar(16),@BodyStart) + '/' + convert(varchar(16),@BodyEnd) + '/' + convert(varchar(16),@BodyLength) + @Prefix + space(@SpaceLength) + @Body + @Suffix
  select @ReturnValue = isnull(@Prefix,'') + isnull(space(@SpaceLength),'') + isnull(@Body,'') + isnull(@Suffix,'')
end

--return isnull(@ReturnValue,'null ps=' + isnull(cast(@PrefixStart as varchar(18)),'') + ' pe=' + isnull(cast(@PrefixEnd as varchar(18)),'') + ' bs=' + isnull(cast(@BodyStart as varchar(18)),'') + ' be=' + isnull(cast(@BodyEnd as varchar(18)),'') + ' ss=' + isnull(cast(@SuffixStart as varchar(18)),'') + ' se=' + isnull(cast(@suffixEnd as varchar(18)),''))
return isnull(@ReturnValue,'')

end
```
