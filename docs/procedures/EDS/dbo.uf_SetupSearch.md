# Function: scalar: `dbo.uf_SetupSearch`

_Generated on 2026-05-04T14:49:07.430Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SetupSearch` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2013-02-13 13:40:00 |
| Modified | 2019-09-26 08:47:39 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SearchTermUQ` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.ufn_RegExIsMatch` | unresolved | `master` |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_SearchItemsByReqHK` | SQL_STORED_PROCEDURE |
| `dbo.uf_CatalogFtsHighlights` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_CatalogFtsPageHighlights` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.usp_SearchItems_SearchDataDB` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS_David` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSDavid` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSError` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSTest` | SQL_STORED_PROCEDURE |

## Definition

```sql
--USE [master]
--GO

--/****** Object:  UserDefinedFunction [dbo].[uf_SetupSearch]    Script Date: 10/22/2018 2:53:51 PM ******/
--SET ANSI_NULLS ON
--GO

--SET QUOTED_IDENTIFIER ON
--GO


--select '>' + dbo.uf_SetupSearch('9-12348 -red gre''en yellow') + '<'
CREATE function [dbo].[uf_SetupSearch] (@SearchTermUQ varchar(4096))
returns varchar(4096)
as
begin
declare @maxPtr int,
		@SearchTerm varchar(4096),
		@SearchWord varchar(4096),
		@Idx int,
		@EndPtr int,
		@NextPtr int
		
-- Remove dash characters
set @SearchTermUQ = replace(@SearchTermUQ,'-', ' ')
-- Remove single quote characters
set @SearchTermUQ = replace(@SearchTermUQ,'"', ' ')
-- Remove double quote characters
set @SearchTermUQ = replace(@SearchTermUQ,'''', ' ')

select @maxPtr = len(@SearchTermUQ),
       @SearchTerm = '',
       @SearchWord = '', 
       @Idx = 1,
       @EndPtr = 0,
       @NextPtr = 0

while(@Idx < @maxPtr) 
begin
	select @SearchWord = ''
	if(substring(@SearchTermUQ,@Idx,1) = char(39)) 
	begin
		--Find end Single Quote
		select @EndPtr = charindex(char(39),@SearchTermUQ,@Idx + 1)
		if(@EndPtr = 0)
		begin
			--No End Single Quote - Remove Leading Quote
			select @SearchWord = ' '
			select @EndPtr = @Idx + 1
			--No End Single Quote - Add to End - Code Below Removed 10/19/2018 DCH
--			select @SearchWord = substring(@SearchTermUQ,@Idx,len(@SearchTermUQ) - @Idx + 1) + char(39)
--			select @EndPtr = len(@SearchTermUQ)
		end 
		else 
		begin
			select @SearchWord = substring(@SearchTermUQ,@Idx,@EndPtr - @Idx + 1)
		end
	end 
	else
	if(substring(@SearchTermUQ,@Idx,1) = char(34)) 
	begin
		--Find end Double Quote
		select @EndPtr = charindex(char(34),@SearchTermUQ,@Idx + 1)
		if(@EndPtr = 0) 
		begin
			--No End Double Quote - Remove Leading Quote
			select @SearchWord = ' '
			select @EndPtr = @Idx + 1
			--No End Double Quote - Add to End - Code below Removed 10/19/2018 DCH
--			select @SearchWord = substring(@SearchTermUQ,@Idx,len(@SearchTermUQ) - @Idx + 1) + char(34)
--			select @EndPtr = len(@SearchTermUQ)
		end 
		else 
		begin
			select @SearchWord = substring(@SearchTermUQ,@Idx,@EndPtr - @Idx + 1) 
		end
	end 
	else
	if(substring(@SearchTermUQ,@Idx,1) = char(32)) 
	begin
		select @EndPtr = @Idx + 1
	end 
	else 
	begin
		--Find Space Character
		select @EndPtr = charindex(char(32),@SearchTermUQ,@Idx + 1)

		--No Spaces Left
		if(@EndPtr = 0) 
		begin
			select @SearchWord = substring(@SearchTermUQ,@Idx,len(@SearchTermUQ) - @Idx + 1)
			select @EndPtr = len(@SearchTermUQ)
		end 
		else 
		begin
			--Bracket word in Quotes
			select @SearchWord = substring(@SearchTermUQ,@Idx,@EndPtr - @Idx)
		end

		--Check for leading Special Character
		if(master.dbo.ufn_RegExIsMatch(substring(@SearchWord,1,1),'^[^0-9A-Za-z]{1}',1) != 0) 
		begin
			--Check for Containing Special Character(s) beyond leading position
			if(master.dbo.ufn_RegExIsMatch(substring(@SearchWord,2,len(@SearchWord) - 1),'[^0-9A-Za-z]',1) != 0) 
			begin
				--And Contains Special Characters so Wrap following in Quotes
				select @SearchWord = substring(@SearchWord,1,1) + char(34) + substring(@SearchWord,2,len(@SearchWord) - 1) + char(34)
			end 
		end 
		else
		-- Contains Special Character(s) beyond leading
		if(master.dbo.ufn_RegExIsMatch(@SearchWord, '[^0-9A-Za-z]', 1) != 0) 
		begin
			--Wrap in Quotes
			select @SearchWord = char(34) + @SearchWord + char(34)
		end

		--Add space if word already exists to total Term
		if(@SearchTerm != '') 
		begin
			select @SearchTerm += char(32)
		end
	end
	--Add word to Total Search term
	select @SearchTerm += @SearchWord
	select @NextPtr = @EndPtr + 1
	select @Idx = @NextPtr
end

return @SearchTerm
end
```
