# Function: table-valued: `dbo.uf_NameParser`

_Generated on 2026-05-04T13:04:00.579Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_NameParser` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2011-08-29 15:24:36 |
| Modified | 2011-08-29 17:42:51 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@FullName` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Salutations` | USER_TABLE |  |
| `dbo.uf_FirstWord` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_NameParser](@FullName varchar(255))
returns @NameTable table ( SalutationId int,
			    FirstName varchar(50),
			    MiddleName varchar(50),
			    LastName varchar(50),
			    Suffix varchar(50))
as
begin
declare @Idx int,
		@PartIdx int,
		@NextWord varchar(50),
		@Part1 varchar(50),
		@Part2 varchar(50),
		@Part3 varchar(50),
		@Part4 varchar(50),
		@Part5 varchar(50),
		@MaxParts int,
		@Remainder varchar(255),
		@MaxLen int,
		@SalutationId int,
		@FirstName varchar(50),
		@MiddleName varchar(50),
		@LastName varchar(50),
		@Suffix varchar(50)
		
select @Remainder = @FullName, @Idx = 1, @PartIdx = 0, @MaxLen = LEN(@FullName)
select @Part1 = null, @Part2 = null, @Part3 = null, @Part4 = null, @Part5 = null

while @Idx < @MaxLen
begin
  select @PartIdx = @PartIdx + 1
  select @NextWord = dbo.uf_FirstWord(@Remainder)
  if @PartIdx = 1
  begin
    select @Part1 = @NextWord
  end
  if @PartIdx = 2
  begin
    select @Part2 = @NextWord
  end
  if @PartIdx = 3
  begin
    select @Part3 = @NextWord
  end
  if @PartIdx = 4
  begin
    select @Part4 = @NextWord
  end
  if @PartIdx = 5
  begin
    select @Part5 = @NextWord
  end
  select @Idx = @Idx + patindex('%' + @NextWord + '%',@Remainder)+len(@NextWord)-1
  select @Remainder = SUBSTRING(@FullName,@Idx,@MaxLen-@Idx+1)
end
select @Suffix = case upper(@NextWord)
                   when 'JR.' then 'Jr.'
                   when 'JR' then 'Jr.'
                   when 'I' then 'I'
                   when 'II' then 'II'
                   when 'III' then 'III'
                   when 'IV' then 'IV'
                   when 'SR.' then 'Sr.'
                   when 'SR' then 'Sr.'
                   else null
                 end
if @Suffix is not null
begin
  if @PartIdx = 5
  begin
    select @Part5 = null
  end
  if @PartIdx = 4
  begin
    select @Part4 = null
  end
  if @PartIdx = 3
  begin
    select @Part3 = null
  end
  if @PartIdx = 2
  begin
    select @Part2 = null
  end
  if @PartIdx = 1
  begin
    select @Part1 = null
  end
end

select @MaxParts = @PartIdx

select @SalutationId = SalutationId
  from Salutations with (nolock)
 where upper(Title) = upper(@Part1)
 
if @@rowcount != 1
begin
  select @SalutationId = null
end

select @FirstName = 
         case
           when @SalutationId is null then
             case 
               when substring(@Part2,2,1) = '.' then
                 isnull(@Part1,'')
               when substring(@Part3,2,1) = '.' then
                 isnull(@Part1,'') + case isnull(@Part2,'') when '' then '' else ' ' + @Part2 end
               else
                 isnull(@Part1,'')
             end
           when @SalutationId is not null then
             case 
               when substring(@Part2,2,1) = '.' then
                 ''
               when substring(@Part3,2,1) = '.' then
                 isnull(@Part2,'')
               when substring(@Part4,2,1) = '.' then
                 isnull(@Part2,'') + case isnull(@Part3,'') when '' then '' else ' ' + @Part3 end
               else
                 isnull(@Part2,'')
             end
         end
select @MiddleName =
         case
           when @SalutationId is null then
             case 
               when substring(@Part2,2,1) = '.' then
                 isnull(@Part2,'')
               when substring(@Part3,2,1) = '.' then
                 isnull(@Part3,'')
               else
                 ''
             end
           when @SalutationId is not null then
             case 
               when substring(@Part2,2,1) = '.' then
                 isnull(@Part2,'')
               when substring(@Part3,2,1) = '.' then
                 isnull(@Part3,'')
               when substring(@Part4,2,1) = '.' then
                 isnull(@Part4,'')
               else
                 ''
             end
         end
select @LastName = 
         case
           when @SalutationId is null then
             case 
               when substring(@Part2,2,1) = '.' then
                 isnull(@Part3,'') + case isnull(@Part4,'') when '' then '' else ' ' + @Part4 end + case isnull(@Part5,'') when '' then '' else ' ' + @Part5 end
               when substring(@Part3,2,1) = '.' then
                 isnull(@Part4,'') + case isnull(@Part5,'') when '' then '' else ' ' + @Part5 end
               else
                 isnull(@Part2,'') + case isnull(@Part3,'') when '' then '' else ' ' + @Part3 end + case isnull(@Part4,'') when '' then '' else ' ' + @Part4 end + case isnull(@Part5,'') when '' then '' else ' ' + @Part5 end
             end
           when @SalutationId is not null then
             case
               when substring(@Part3,2,1) = '.' then
                 isnull(@Part4,'') + case isnull(@Part5,'') when '' then '' else ' ' + @Part5 end
               when @SalutationId is not null and substring(@Part4,2,1) = '.' then
                 isnull(@Part5,'')
               else
                 isnull(@Part3,'') + case isnull(@Part4,'') when '' then '' else ' ' + @Part4 end + case isnull(@Part5,'') when '' then '' else ' ' + @Part5 end
             end
         end
insert @NameTable (SalutationId, FirstName, MiddleName, LastName, Suffix)
  select @SalutationId,
         @FirstName,
         @MiddleName,
         @LastName,
         @Suffix
return
end
```
