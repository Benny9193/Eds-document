# Function: scalar: `dbo.uf_SearchKeywords`

_Generated on 2026-05-04T13:43:19.102Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SearchKeywords` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2004-10-27 09:31:08 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pHeadingId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Keywords` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   function dbo.uf_SearchKeywords (@pHeadingId int)
returns varchar(4096) as
begin
declare @RetVal varchar(4096),
	@KeywordId int,
	@Keyword varchar(255)

declare KC cursor fast_forward read_only for
select KeywordId, Keyword
  from dbo.Keywords
 where HeadingId = @pHeadingId
 order by Keyword

open KC

fetch next from KC into @KeywordId, @Keyword

select @RetVal = '<table border="0"><tr><td width=10></td>'

while @@fetch_status = 0
begin
  select @RetVal = @RetVal + '<td>' + '<A href="SearchItemsDetail.asp&HeadingId=' + convert(varchar(16),@pHeadingId) + '&KeywordId=' + convert(varchar(16),@KeywordId) + '">' + isnull(rtrim(@Keyword),'') + '</A></td>'

  fetch next from KC into @KeywordId, @Keyword
end

close KC
deallocate KC

select @RetVal = @RetVal + '</tr></table>'

return @RetVal
end
```
