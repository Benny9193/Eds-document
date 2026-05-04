# Procedure: `dbo.sp_EnhancedSearchItem`

_Generated on 2026-05-04T14:49:07.265Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_EnhancedSearchItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2020-06-08 14:39:41 |
| Modified | 2024-07-12 09:40:43 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pCatalogId` | IN | int |  |
| 4 | `@pSearchBy` | IN | int |  |
| 5 | `@pSearchStart` | IN | varchar(255) |  |
| 6 | `@pSearchEnd` | IN | varchar(255) |  |
| 7 | `@pSearchPrev` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `SearchSets` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- sp_EnhancedSearchItem 1785380869, 91, 999999, 4, 'BN-PDSWNG-GRYBLU-BT', '', 0
--exec sp_SearchItems 1785380869, 91, 'BN-PDSWNG-GRYBLU-BT', 999999, 4

CREATE   procedure [dbo].[sp_EnhancedSearchItem] @pSessionId int, @pCategoryId int, @pCatalogId int, @pSearchBy int, @pSearchStart varchar(255), @pSearchEnd varchar(255), @pSearchPrev tinyint AS

declare @SessionId int,
	@DistrictId int,
	@CategoryId int,
	@CatalogId int,
	@SearchBy int,
	@SearchSessionId int,
	@DynSql varchar(max),
	@Select varchar(max),
	@From varchar(max),
        @Join varchar(max),
	@Where1 varchar(max),
	@Where varchar(max),
	@Declare varchar(max),
	@VariLoad varchar(max),
	@Order varchar(max),
	@Group varchar(max),
	@SSId varchar(16),
	@SearchStart varchar(64),
	@SearchEnd varchar(64),
	@CrossRefNeeded tinyint,
	@BidItemsNeeded tinyint,
	@Hold int,
	@PageNeeded tinyint,
	@VendorItemCodeNeeded tinyint

select @SessionId = @pSessionId,
       @CategoryId = @pCategoryId,
       @CatalogId = @pCatalogId,
       @SearchBy = @pSearchBy

select @DistrictId = DistrictId
  from SessionTable
 WHERE SessionId = @SessionId
   AND SessionEnd is null

if @@rowcount = 0
begin
  RAISERROR('Invalid Session or Session has Timed Out',16,1)
  return
end

UPDATE SessionTable
   SET SessionLast = GetDate()
 WHERE SessionId = @SessionId
   AND SessionEnd is null

select @SearchStart = case @SearchBy
                        when 1 then @pSearchStart
                        when 2 then @pSearchStart
                        when 3 then right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchStart)),4)
                        when 4 then case @CatalogId when 999999 then @pSearchStart else dbo.uf_PackCodeCatalog(@pSearchStart,@CatalogId) end 
                        else ''
                      end

-- Check for Range
if isnull(rtrim(@pSearchEnd),'') = ''
begin
  select @SearchEnd = case @SearchBy
                        when 1 then
                          case @SearchStart
                            when '' then 
                              'zzzzzzzzzzzzzzz'
                            else
                              @SearchStart
                          end
                        when 2 then
                          @SearchStart
                        when 3 then
                          case @SearchStart
                            when '' then
                              'zzzz'
                            else
                              @SearchStart
                          end
                        when 4 then
                          left(@SearchStart + replicate('z',64), 64)
                        else
                          @SearchStart
                      end
end
else
begin
  select @SearchEnd = case @SearchBy
                        when 1 then @pSearchEnd
                        when 2 then @pSearchEnd
                        when 3 then right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchEnd)),4)
                        when 4 then @pSearchEnd
                        else ''
                      end
end

-- Check for Rerun
select @Hold = SSId
  from SearchSets
 where SessionId = @SessionId
   and CategoryId = @CategoryId
   and CatalogId = @pcatalogId
   and SearchBy = @SearchBy
   and SearchStart = @SearchStart
   and SearchEnd = @SearchEnd

if @@rowcount = 0
begin
  -- Check for Subsequent Searches
  if @pSearchPrev = 0
  begin
    delete SearchSets
     where SessionId = @SessionId
  end

  -- Add This Search
  Insert SearchSets (SessionId, CategoryId, CatalogId, SearchBy, SearchStart, SearchEnd)
    values (@SessionId, @CategoryId, @CatalogId, @SearchBy, @SearchStart, @SearchEnd)
end

declare SetCursor cursor forward_only read_only for
select convert(varchar(16),SSId), CategoryId, CatalogId, SearchBy, SearchStart, SearchEnd
  from SearchSets
 where SessionId = @SessionId
 order by SSId

open SetCursor

fetch next from SetCursor into @SSId, @CategoryId, @CatalogId, @SearchBy, @pSearchStart, @pSearchEnd

select @Select = ' SELECT dbo.Items.ItemId, case isnull(dbo.Items.Active,0) when 0 then ''No'' else ''Yes'' end Active, dbo.Items.CategoryId, dbo.Items.DistrictId, dbo.Items.ItemCode, dbo.Items.Description, dbo.Items.UnitId, dbo.Items.ParentCatalogId, dbo.Items.HeadingId, dbo.Items.RTK, dbo.Units.Code as UnitCode, dbo.Catalog.Name as CatalogName, dbo.Headings.Code as HeadingCode, dbo.Headings.[Description] as HeadingDescription, dbo.Items.SortSeq'

select @From =   '   FROM dbo.Items' +
                 '   JOIN Units on Units.UnitId = Items.UnitId' +
                 '   LEFT OUTER JOIN Catalog on Catalog.CatalogId = Items.ParentCatalogId' +
                 '   LEFT OUTER JOIN Headings on Headings.HeadingId = Items.HeadingId'

-- Mark Not Needed
select @CrossRefNeeded = 0,
       @BidItemsNeeded = 0

select @Where1 = '  WHERE Items.CategoryId = ' + convert(varchar(16),@CategoryId)

-- Initialize Variables
select @Where = '',
       @Order = '',
       @Group = '',
       @Declare = 'declare @Hold int',
       @VariLoad = ''

while @@fetch_status = 0
begin
  -- Check for CrossRefs Needed
  select @CrossRefNeeded = @CrossRefNeeded +
                  case @SearchBy 
                    when 1 then 0
                    when 2 then 0
                    when 3 then 1
                    when 4 then 1
                    else 0
                  end +
                  case @CatalogId
                    when 0 then 0
                    when 999999 then 0
                    else 1
                  end

  -- Check for BidItems Needed
  select @BidItemsNeeded = @BidItemsNeeded +
                  case @SearchBy 
                    when 1 then
                      case @CatalogId
                        when 0 then 1
                        else 0
                      end
                    when 2 then 
                      case @CatalogId
                        when 0 then 1
                        else 0
                      end
                    when 3 then 
                      case @CatalogId
                        when 0 then 1
                        else 0
                      end
                    when 4 then 
                      case @CatalogId
                        when 0 then 1
                        else 0
                      end
                    else 
                      case @CatalogId
                        when 0 then 1
                        else 0
                      end
                  end

  -- Declare Local Variables
  select @Declare = @Declare + ', @Start' + @SSId + ' varchar(255), @End' + @SSId + ' varchar(255)'

  -- Build Variable Load Statement
  select @VariLoad = @VariLoad + ' select @Start' + @SSId + ' = dbo.uf_PackCode(SearchStart)' + 
                                 ', @End' + @SSId + ' = dbo.uf_PackCode(SearchEnd)' +
                                 ' from SearchSets where SSId = ' + @SSId +
                                 ' print @Start' + @SSId +
                                 ' print @End' + @SSId

  -- Build Where Clause
  select @Where = @Where +
                  case @CatalogId
                    when 0 then
                      ' AND dbo.BidItems.ItemId is not null'
                    when 999999 then
                      ''
                    else
                      ' AND isnull(CrossRefs.CatalogId,0) = ' + convert(varchar(16),isnull(@CatalogId,0))
                  end +
                  case @SearchBy
                    when 1 then 
                      ' AND Items.PackedCode between @Start' + @SSId + ' and @End' + @SSId
                    when 2 then 
                      case @pSearchStart
                        when '' then
                          ''
                        else
                          ' AND FREETEXT(dbo.Items.[Description], @Start' + @SSId + ')'
                      end
                    when 3 then 
                      ' AND CrossRefs.Page between @Start' + @SSId + ' and @End' + @SSId
                    when 4 then 
                      ' AND CrossRefs.PackedCode between @Start' + @SSId + ' and @End' + @SSId
                    else
                      ''
                  end
  
  -- Set Group By Sequence
  select @Group = 'dbo.Items.ItemId, case isnull(dbo.Items.Active,0) when 0 then ''No'' else ''Yes'' end, dbo.Items.CategoryId, dbo.Items.DistrictId, dbo.Items.ItemCode, dbo.Items.Description, dbo.Items.UnitId, dbo.Items.ParentCatalogId, dbo.Items.HeadingId, dbo.Items.RTK, dbo.Units.Code, dbo.Catalog.Name, dbo.Headings.Code, dbo.Headings.[Description], dbo.Items.SortSeq' + 
                  case @SearchBy 
                    when 1 then ''
                    when 2 then ''
                    when 3 then ', CrossRefs.Page'
                    when 4 then ', CrossRefs.VendorItemCode'
                    else ''
                  end
                  
  -- Set Order By Sequence
  select @Order = case @SearchBy 
                    when 1 then 'dbo.Items.SortSeq'
                    when 2 then 'dbo.Items.[Description]'
                    when 3 then 'dbo.Items.SortSeq' --'CrossRefs.Page'
                    when 4 then 'dbo.Items.SortSeq' --'CrossRefs.VendorItemCode'
                    else 'dbo.Items.SortSeq'
                  end

  fetch next from SetCursor into @SSId, @CategoryId, @CatalogId, @SearchBy, @pSearchStart, @pSearchEnd

end

-- Check for Page Needed
select @Select = @Select + 
					 case @SearchBy --@PageNeeded
					   when 1 then ','''' as Page'
					   when 2 then ','''' as Page'
					   when 3 then ','''' as Page' -- CrossRefs.Page'
					   when 4 then ','''' as Page'
					   else ','''' as Page'
					 end

-- Check for VendorItemCode Needed
select @Select = @Select + 
                   case @SearchBy --@VendorItemCodeNeeded
                     when 1 then ','''' as VendorItemCode'
                     when 2 then ','''' as VendorItemCode'
                     when 3 then ','''' as VendorItemCode'
                     when 4 then ','''' as VendorItemCode' -- CrossRefs.VendorItemCode'
                     else ','''' as VendorItemCode'
                   end
                 
-- Check for CrossRefs Needed
if @CrossRefNeeded > 0
begin
  select @Join = '   LEFT OUTER JOIN CrossRefs on CrossRefs.ItemId = Items.ItemId and Crossrefs.Active = 1'
end
else
begin
  select @Join = ''
end

-- Check for CrossRefs Needed
if @BidItemsNeeded > 0
begin
  select @Join = @Join + '   LEFT OUTER JOIN BidItems on BidItems.ItemId = Items.ItemId'
end

close SetCursor
deallocate SetCursor

select @DynSql = @Declare + @VariLoad + @Select + @From + @Join + @Where1 + @Where + ' GROUP BY ' + @Group + ' ORDER BY ' + @Order

print @DynSql

exec (@DynSql)
```
