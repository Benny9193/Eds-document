# Function: scalar: `dbo.UrlDecode`

_Generated on 2026-05-04T13:43:19.141Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `UrlDecode` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2020-11-03 14:51:07 |
| Modified | 2020-11-03 14:51:07 |
| Encrypted | no |
| Returns | nvarchar(4000) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@URL` | IN | nvarchar(4000) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE FUNCTION [dbo].[UrlDecode]
(
    @URL NVARCHAR(4000)
)  
RETURNS NVARCHAR(4000)
AS
BEGIN
    DECLARE @Position INT, @Base CHAR(16), @High TINYINT, @Low TINYINT, @Pattern CHAR(21)
    DECLARE @Byte1Value INT, @SurrogateHign INT, @SurrogateLow INT
    SELECT @Pattern = '%[%][0-9a-f][0-9a-f]%', @Position = PATINDEX(@Pattern, @URL)

    WHILE @Position > 0
    BEGIN
       SELECT @High = ASCII(UPPER(SUBSTRING(@URL, @Position + 1, 1))) - 48,
              @Low  = ASCII(UPPER(SUBSTRING(@URL, @Position + 2, 1))) - 48,
              @High = @High / 17 * 10 + @High % 17,
              @Low  = @Low  / 17 * 10 + @Low  % 17,
              @Byte1Value = 16 * @High + @Low
       IF @Byte1Value < 128 --1-byte UTF-8
          SELECT @URL = STUFF(@URL, @Position, 3, NCHAR(@Byte1Value)),
                 @Position = PATINDEX(@Pattern, @URL)
       ELSE IF @Byte1Value >= 192 AND @Byte1Value < 224 AND @Position > 0 --2-byte UTF-8
       BEGIN
           SELECT @Byte1Value = (@Byte1Value & (POWER(2,5) - 1)) * POWER(2,6),
                  @URL = STUFF(@URL, @Position, 3, ''),
                  @Position = PATINDEX(@Pattern, @URL)
           IF @Position > 0
              SELECT @High = ASCII(UPPER(SUBSTRING(@URL, @Position + 1, 1))) - 48,
                     @Low  = ASCII(UPPER(SUBSTRING(@URL, @Position + 2, 1))) - 48,
                     @High = @High / 17 * 10 + @High % 17,
                     @Low  = @Low  / 17 * 10 + @Low  % 17,
                     @Byte1Value = @Byte1Value + ((16 * @High + @Low) & (POWER(2,6) - 1)),
                     @URL = STUFF(@URL, @Position, 3, NCHAR(@Byte1Value)),
                     @Position = PATINDEX(@Pattern, @URL)
       END
       ELSE IF @Byte1Value >= 224 AND @Byte1Value < 240 AND @Position > 0 --3-byte UTF-8
       BEGIN
           SELECT @Byte1Value = (@Byte1Value & (POWER(2,4) - 1)) * POWER(2,12),
                  @URL = STUFF(@URL, @Position, 3, ''),
                  @Position = PATINDEX(@Pattern, @URL)
           IF @Position > 0
              SELECT @High = ASCII(UPPER(SUBSTRING(@URL, @Position + 1, 1))) - 48,
                     @Low  = ASCII(UPPER(SUBSTRING(@URL, @Position + 2, 1))) - 48,
                     @High = @High / 17 * 10 + @High % 17,
                     @Low  = @Low  / 17 * 10 + @Low  % 17,
                     @Byte1Value = @Byte1Value + ((16 * @High + @Low) & (POWER(2,6) - 1)) * POWER(2,6),
                     @URL = STUFF(@URL, @Position, 3, ''),
                     @Position = PATINDEX(@Pattern, @URL)
           IF @Position > 0
              SELECT @High = ASCII(UPPER(SUBSTRING(@URL, @Position + 1, 1))) - 48,
                     @Low  = ASCII(UPPER(SUBSTRING(@URL, @Position + 2, 1))) - 48,
                     @High = @High / 17 * 10 + @High % 17,
                     @Low  = @Low  / 17 * 10 + @Low  % 17,
                     @Byte1Value = @Byte1Value + ((16 * @High + @Low) & (POWER(2,6) - 1)),
                     @URL = STUFF(@URL, @Position, 3, NCHAR(@Byte1Value)),
                     @Position = PATINDEX(@Pattern, @URL)
       END
       ELSE IF @Byte1Value >= 240 AND @Position > 0  --4-byte UTF-8
       BEGIN
           SELECT @Byte1Value = (@Byte1Value & (POWER(2,3) - 1)) * POWER(2,18),
                  @URL = STUFF(@URL, @Position, 3, ''),
                  @Position = PATINDEX(@Pattern, @URL)
           IF @Position > 0
              SELECT @High = ASCII(UPPER(SUBSTRING(@URL, @Position + 1, 1))) - 48,
                     @Low  = ASCII(UPPER(SUBSTRING(@URL, @Position + 2, 1))) - 48,
                     @High = @High / 17 * 10 + @High % 17,
                     @Low  = @Low  / 17 * 10 + @Low  % 17,
                     @Byte1Value = @Byte1Value + ((16 * @High + @Low) & (POWER(2,6) - 1)) * POWER(2,12),
                     @URL = STUFF(@URL, @Position, 3, ''),
                     @Position = PATINDEX(@Pattern, @URL)
           IF @Position > 0
              SELECT @High = ASCII(UPPER(SUBSTRING(@URL, @Position + 1, 1))) - 48,
                     @Low  = ASCII(UPPER(SUBSTRING(@URL, @Position + 2, 1))) - 48,
                     @High = @High / 17 * 10 + @High % 17,
                     @Low  = @Low  / 17 * 10 + @Low  % 17,
                     @Byte1Value = @Byte1Value + ((16 * @High + @Low) & (POWER(2,6) - 1)) * POWER(2,6),
                     @URL = STUFF(@URL, @Position, 3, ''),
                     @Position = PATINDEX(@Pattern, @URL)
           IF @Position > 0
           BEGIN
              SELECT @High = ASCII(UPPER(SUBSTRING(@URL, @Position + 1, 1))) - 48,
                     @Low  = ASCII(UPPER(SUBSTRING(@URL, @Position + 2, 1))) - 48,
                     @High = @High / 17 * 10 + @High % 17,
                     @Low  = @Low  / 17 * 10 + @Low  % 17,
                     @Byte1Value = @Byte1Value + ((16 * @High + @Low) & (POWER(2,6) - 1))
                     --,@URL = STUFF(@URL, @Position, 3, cast(@Byte1Value as varchar))
                     --,@Position = PATINDEX(@Pattern, @URL)

              SELECT @SurrogateHign = ((@Byte1Value - POWER(16,4)) & (POWER(2,20) - 1)) / POWER(2,10) + 13 * POWER(16,3) + 8 * POWER(16,2),
                     @SurrogateLow = ((@Byte1Value - POWER(16,4)) & (POWER(2,10) - 1)) + 13 * POWER(16,3) + 12 * POWER(16,2),
                     @URL = STUFF(@URL, @Position, 3, NCHAR(@SurrogateHign) + NCHAR(@SurrogateLow)),
                     @Position = PATINDEX(@Pattern, @URL)
           END
       END
    END
    RETURN REPLACE(@URL, '+', ' ')
END
```
