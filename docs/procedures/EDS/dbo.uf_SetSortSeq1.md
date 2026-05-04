# Function: scalar: `dbo.uf_SetSortSeq1`

_Generated on 2026-05-04T14:49:07.429Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SetSortSeq1` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2006-11-14 21:11:44 |
| Modified | 2006-11-14 21:11:44 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSource` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function dbo.uf_SetSortSeq1 (@pSource varchar(255)) returns varchar(255) AS
begin
declare @ReturnValue varchar(255)
declare @Index int,
	@MaxIndex int,
	@State int,
	@PrefixLength int,
	@SuffixLength int,
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
       @MaxIndex = len(@pSource)

while (@Index < @MaxIndex and @State < 3)
begin
  -- Point to Next Entry
  select @Index = @Index + 1

  if @State = 1 -- Looking for Leading Spaces
  begin
    if substring(@pSource,@Index,1) != ' '
    begin
      select @State = 2
    end
  end

  if @State = 2 -- Looking for Prefix
  begin
    if substring(@pSource,@Index,1) >= '0' and substring(@pSource,@Index,1) <= '9'
    begin
      select @State = 3
    end
    else
    begin
      select @Prefix = @Prefix + substring(@pSource,@Index,1),
             @PrefixLength = @PrefixLength + 1
    end
  end
end

-- Set Body Starting Point
select @BodyStart = @Index

-- Point to End of Data
select @Index = @MaxIndex + 1

-- Find Suffix
while (@Index > 0 and @State < 5)
begin
  -- Point to Previous Entry
  select @Index = @Index - 1

  if @State = 3 -- Looking for Trailing Spaces
  begin
    if substring(@pSource,@Index,1) != ' '
    begin
      select @State = 4
    end
  end

  if @State = 4 -- Looking for Suffix
  begin
    if substring(@pSource,@Index,1) >= '0' and substring(@pSource,@Index,1) <= '9'
    begin
      select @State = 5
    end
    else
    begin
      select @Suffix = @Suffix + substring(@pSource,@Index,1),
             @SuffixLength = @SuffixLength + 1
    end
  end
end

-- Set Body Ending Point
select @BodyEnd = @Index

-- Save Body
select @BodyLength = @BodyEnd - @BodyStart + 1
if @BodyLength > 0
begin
  select @Body = substring(@pSource,@BodyStart,@BodyLength)
end

select @SpaceLength = 24 - (@PrefixLength + @BodyLength)

if @SpaceLength <= 0
begin
  select @ReturnValue = @Prefix + @Body + @Suffix
end
else
begin
  select @ReturnValue = @Prefix + space(@SpaceLength) + @Body + @Suffix
end

return isnull(@ReturnValue,'null')

end
```
