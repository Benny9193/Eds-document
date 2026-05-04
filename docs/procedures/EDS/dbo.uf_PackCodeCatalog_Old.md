# Function: scalar: `dbo.uf_PackCodeCatalog_Old`

_Generated on 2026-05-04T13:04:00.596Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCodeCatalog_Old` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-11-10 21:54:48 |
| Modified | 2011-11-10 21:54:48 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |
| 2 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select dbo.uf_PackCodeCatalog('30008985N',1649)

create function [dbo].[uf_PackCodeCatalog_Old](@pCode varchar(255), @pCatalogId int)
returns varchar(255)   AS
begin
declare @ReturnValue varchar(255),
	@Idx int,
	@CodeLen int,
	@TestChar char(1),
	@DropSeq varchar(16),
             @DigitsOnly varchar(255)

select @Idx = 1,
       @CodeLen = len(rtrim(@pCode)),
       @ReturnValue = ''

if @CodeLen = 10 and substring(@pCode,3,4) = 'ADD0'
begin
  select @ReturnValue = rtrim(@pCode)
end
else
begin
  select @DropSeq = isnull(DropSeq,'')
    from dbo.Catalog
   where CatalogId = @pCatalogId

  if @@rowcount = 0
  begin
    select @DropSeq = ''
  end

  while @Idx <= @CodeLen
  begin
    -- Get Character to Test
    select @TestChar = upper(substring(@pCode,@Idx,1))

    -- Test Character for Range
    if (@TestChar >= '0' and @TestChar <= '9') or
       (@TestChar >= 'A' and @TestChar <= 'Z')
    begin
      select @ReturnValue = @ReturnValue + @TestChar
    end

    -- Bump Pointer
    select @Idx = @Idx + 1
  end

  if substring(@ReturnValue,1,len(@DropSeq)) = @DropSeq
  begin
    select @ReturnValue = substring(@ReturnValue,len(@DropSeq) + 1, len(@ReturnValue) - len(@DropSeq))
  end

  -- Special test for Sport-Time
  if @pCatalogId = 3
  begin
    if len(@ReturnValue) = 9 and substring(@ReturnValue,7,3) = '641'
    begin
      select @ReturnValue = substring(@ReturnValue,1,6)
    end  
  end

  -- Special test for Sport-Time
  if @pCatalogId = 745 or @pCatalogId = 795
  begin
    if len(@ReturnValue) = 9 and substring(@ReturnValue,7,3) = '741'
    begin
      select @ReturnValue = substring(@ReturnValue,1,6)
    end  
  end

  -- Special test for Sport-Time
  if @pCatalogId = 829 or @pCatalogId = 903
  begin
    if len(@ReturnValue) = 9 and substring(@ReturnValue,7,3) = '841'
    begin
      select @ReturnValue = substring(@ReturnValue,1,6)
    end  
  end

 -- Special test for Sport-Time
  if @pCatalogId = 1174 or @pCatalogId = 1271
  begin
    if len(@ReturnValue) = 9 and substring(@ReturnValue,7,3) = '941'
    begin
      select @ReturnValue = substring(@ReturnValue,1,6)
    end  
  end

 -- Special test for Sport-Time
  if @pCatalogId = 1497 or @pCatalogId = 1573
  begin
    if len(@ReturnValue) = 9 and substring(@ReturnValue,7,3) = '971'
    begin
      select @ReturnValue = substring(@ReturnValue,1,6)
    end  
  end

 -- Special test for Sport-Time
  if @pCatalogId = 1630 or @pCatalogId = 1686 or @pCatalogId = 1689
  begin
    if len(@ReturnValue) >= 9 and substring(@ReturnValue, Len(@ReturnValue)-2, 3) = '171'    -- Note: New item codes >= 9 digits   kjm
    begin
      select @ReturnValue = substring(@ReturnValue,1,Len(@ReturnValue)-3)
    end  
  end

 -- Special test for Sport-Time
  if @pCatalogId = 1777 
  begin
    if len(@ReturnValue) >= 9 and substring(@ReturnValue, Len(@ReturnValue)-2, 3) = '501'    -- Note: New item codes >= 9 digits   kjm
    begin
      select @ReturnValue = substring(@ReturnValue,1,Len(@ReturnValue)-3)
    end  
  end

 -- Special test for Sport-Time
 -- If len > 8
 --   If trailing string of 504 or 514 or 492 or 163 or 506
 --      remove trailing string AND REMOVE LEADING DIGIT
  if @pCatalogId = 1820 
  or @pCatalogId = 1887
  or @pCatalogId = 1889
  begin
    if len(@ReturnValue) > 8
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '504'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '514'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '492'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '163'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '506'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '494'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '484'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '501'
      or substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '944'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
      end
    end
  end

  -- Special Test for School Specialty
  if @pCatalogId = 30 or @pCatalogId = 287 or @pCatalogId = 798 or @pCatalogId = 895 or @pCatalogId = 1179 or @pCatalogId = 1180 or @pCatalogId = 1505 or @pCatalogId = 1649
  begin
    if len(@ReturnValue) = 8 or len(@ReturnValue) = 9
    begin
      if    substring(@ReturnValue,1,2) = '30'
         or substring(@ReturnValue,1,2) = '31'
         or substring(@ReturnValue,1,2) = '32'
      begin
        select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-2)
      end
    end
--    else
    if (len(@ReturnValue) = 7 or len(@ReturnValue) = 8) and substring(@ReturnValue,len(@ReturnValue),1) = 'N'
    begin
      select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-1)
    end
  end

  -- Special Test for School Specialty
  if @pCatalogId = 1674 or @pCatalogId = 1741 or @pCatalogId = 1814
  begin
    if len(@ReturnValue) = 9 or len(@ReturnValue) = 10
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '030'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
      end
    end
  end
/*
  -- Special Test for School Specialty - Childcraft Fall 2009
  if @pCatalogId = ???? -- to be done
  begin
    if len(@ReturnValue) = 9 or len(@ReturnValue) = 10
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '230'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
      end
    end
  end
*/
  -- Special Test for School Specialty
  -- IF Trailing 3 digits found THEN Remove trailing 3 digits AND Remove Leading digit  
  -- note: when center group is 7 digit, 1st digit must be 0, 1, 2
  -- Sample: e.g. 9-053688-030 or 9-1283257-030  (oddest one found = 9-120-0836-1-030)
  if @pCatalogId in (1979, 1980, 1965, 1982, 1987, 1955, 2024, 2046, 2047)
  begin
    if len(@ReturnValue) > 8
    begin
      select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-4)
    end
  end

  if @pCatalogId = 1813 or 
     @pCatalogId = 1835 or
     @pCatalogId = 1790 or
     @pCatalogId = 1836 or
     @pCatalogId = 1885 or 
     @pCatalogId = 1888 or
     @pCatalogId = 1886
  begin
    if len(@ReturnValue) = 9
    begin
      select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
    end
    else
    if len(@ReturnValue) > 9
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '030' or 
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '054' or 
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '705' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '105' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '401' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '501'
      begin
        if substring(@ReturnValue,1,1) < '6' and substring(@pCode,2,1) != '-'
        begin
          /* Drop last 3 characters */
          select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
        end
        else
        begin        
          /* Drop First character and last 3 characters */
          select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-4)
        end
      end
    end
    if len(@ReturnValue) > 7
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '030' or 
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '054' or 
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '705' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '105' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '401' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '501'
      begin
        /* Drop last 3 characters */
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
      end
    end
    --if len(@ReturnValue) > 6
    --begin
    --  if substring(@ReturnValue,1,1) not in ('0','1','2')
    --  begin
    --    select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
    --  end
    --end
  end

/*
  -- Special Test for School Specialty 2006 Catalog 
  -- (catalog drop sequence is 32. Also allow a drop sequence of 30)
  if @pCatalogId = 895
  begin
    -- strip all additional allowed drop seq
    if len(@ReturnValue) = 8 or len(@ReturnValue) = 9
    begin
      if    substring(@ReturnValue,1,2) = '30'
         or substring(@ReturnValue,1,2) = '31'
         or substring(@ReturnValue,1,2) = '32'
      begin
        select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-2)
      end
    end
    -- after all drop sequences stripped, strip n from end
    if len(@ReturnValue) = 7
    begin 
      if substring(@ReturnValue,7,1) = 'N'
      begin
        select @ReturnValue = substring(@ReturnValue,1,6)
      end
    end
  end
*/

  -- Special Test for Wards
  if @pCatalogId = 171 or
     @pCatalogId = 722 or
     @pCatalogId = 723 or
     @pCatalogId = 724 or
     @pCatalogId = 845 or
     @pCatalogId = 847 or
     @pCatalogId = 848 or
     @pCatalogId = 905 or
     @pCatalogId = 906 or
     @pCatalogId = 907 or
     @pCatalogId = 1267 or
     @pCatalogId = 1268 or
     @pCatalogId = 1269 or
     @pCatalogId = 1557 or
     @pCatalogId = 1558 or
     @pCatalogId = 1559 or
     @pCatalogId = 1724 or
     @pCatalogId = 1725 or
     @pCatalogId = 1726 or
     @pCatalogId = 1727 or
     @pCatalogId = 1728 or
     @pCatalogId = 1729 or
     @pCatalogId = 1795 or
     @pCatalogId = 1796 or
     @pCatalogId = 1797 or
     @pCatalogId = 1865 or
     @pCatalogId = 1866 or
     @pCatalogId = 1867 or
     @pCatalogId = 1868 or
     @pCatalogId = 1869 or
     @pCatalogId = 1870 or
     @pCatalogId = 1871 or
     @pCatalogId = 1872 or
     @pCatalogId = 1873 or
     @pCatalogId = 1874 or
     @pCatalogId = 1875 or
     @pCatalogId = 1876 or
     @pCatalogId = 2056 or
     @pCatalogId = 2057 or
     @pCatalogId = 2058 or
     @pCatalogId = 2059 or
     @pCatalogId = 2060 or
     @pCatalogId = 2061 or
     @pCatalogId = 2062 or
     @pCatalogId = 2063 or
     @pCatalogId = 2064 or
     @pCatalogId = 2065 or
     @pCatalogId = 2066 or
     @pCatalogId = 2067 
     

  begin
    if len(@ReturnValue) = 7 and isnumeric(substring(@ReturnValue,3,1)) = 0
    begin
      select @ReturnValue = substring(@ReturnValue,1,2) + substring(@ReturnValue,4,4)
    end
    else
    if len(@ReturnValue) = 8 and isnumeric(substring(@ReturnValue,4,1)) = 0
    begin
      select @ReturnValue = substring(@ReturnValue,1,3) + substring(@ReturnValue,5,4)
    end
  end

  -- Special Test for Pitsco
  if @pCatalogId = 769 or
     @pCatalogId = 842 or
     @pCatalogId = 862 or 
     @pCatalogId = 1230 or 
     @pCatalogId = 1534 or 
     @pCatalogId = 1536 or
     @pCatalogId = 1666 or
     @pCatalogId = 1667 or
     @pCatalogId = 1792 or
     @pCatalogId = 1793 or
     @pCatalogId = 1794 or
     @pCatalogId = 1923 or
     @pCatalogId = 1924 or
     @pCatalogId = 1925 or
     @pCatalogId = 1928 or
     @pCatalogId = 1929 or
     @pCatalogId = 1930 or
     @pCatalogId = 2018 or
     @pCatalogId = 2025 or
     @pCatalogId = 2026 or
     @pCatalogId = 2027 or 
     @pCatalogId = 2028 or 
     @pCatalogId = 2029 
  begin
    if len(@ReturnValue) = 8
    begin
        select @ReturnValue = substring(@ReturnValue,1,5)
    end
  end

  -- Special Test for Sax Sneak Peak
  if @pCatalogId = 276
  begin
    if substring(@ReturnValue,len(@ReturnValue),1) = 'N'
    begin
      select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue) - 1)
    end
  end

  if @pCatalogId = 1193 or @pCatalogId = 1194
  begin
    if substring(@ReturnValue,1,1) = 'T' or
       substring(@ReturnValue,1,1) = 'M'
    begin
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
    end
  end

  -- SANE
  if @pCatalogId = 748
  begin
    if substring(@ReturnValue,1,1) = '0'
    begin
      select @ReturnValue = dbo.uf_RemoveLeadingZeros(@ReturnValue)
    end
  end
end

  -- Special Test for M-F Athletic
  if @pCatalogId = 1204 
  begin
    if upper(right(@ReturnValue,1)) = 'A' and len(@ReturnValue) > 1
    begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-1)
    end
  end

  -- Special Test for Frey   -- added 1/8/08 kjm
  if @pCatalogId = 1479 or @pCatalogId = 911 or @pCatalogId = 912
  begin
     if len(@ReturnValue) = 8
     begin
        if ( left(@ReturnValue,2) = '11' or left(@ReturnValue,2) = '15' ) 
        begin
           select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-2)
        end
     end
  end

  -- Special Test for Frey   -- added 1/8/08 kjm
  if @pCatalogId = 1551 or @pCatalogId = 1713
  begin
     if len(@ReturnValue) = 10 or len(@ReturnValue) = 11
     begin
        if ( left(@ReturnValue,2) = '11' or left(@ReturnValue,2) = '15' ) and right(@ReturnValue,2) = '21'
        begin
           select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-4)
        end
     end
  end

  -- Special Test for Frey Science and Elem Science
  if @pCatalogId = 1711 or
     @pCatalogId = 1712 or
     @pCatalogId = 1843 or
     @pCatalogId = 1845 or
     @pCatalogId = 1852 or
     @pCatalogId = 1856 or
     @pCatalogId = 2043 or    
     @pCatalogId = 2044 or    
     @pCatalogId = 2045    
  begin
     -- remove prefix (if applicable) of one LETTER
     if (left(@ReturnValue,1) >= 'A' and left(@ReturnValue,1) <= 'Z')
     begin
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
     end
     -- remove prefix (if applicable) of second LETTER
     if (left(@ReturnValue,1) >= 'A' and left(@ReturnValue,1) <= 'Z')
     begin
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
     end
     -- remove suffix 
     if len(@ReturnValue) > 8
     begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
     end
  end

  -- Special Test for Frey Elementary 2007   -- added 1/9/08 kjm
  if @pCatalogId = 1480
  begin
     if left(@ReturnValue,3) = 'F13' 
     begin
        select @ReturnValue = substring(@ReturnValue,4,len(@ReturnValue)-3)
     end
  end

  -- Special Test for Frey Elementary 2008   -- added 1/9/08 kjm
  if @pCatalogId = 1552 or @pCatalogId = 1714
  begin
     if len(@ReturnValue) = 8 or len(@ReturnValue) = 9
     begin
        if right(@ReturnValue,2) = '31' 
        begin
           select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-2)
        end
     end
  end

  -- Special Test for ScienceKit - allow digits only  -- added 1/28/08 kjm
  if @pCatalogId = 1541 or 
     @pCatalogId = 1572 or 
     @pCatalogId = 1687 or 
     @pCatalogId = 1688 or 
     @pCatalogId = 1772 or
     @pCatalogId = 1895 or
     @pCatalogId = 1896 or
     @pCatalogId = 1977 or
     @pCatalogId = 2072 or
     @pCatalogId = 2073 
     
  begin
    select @DigitsOnly=''
    select @Idx = 1
    while @Idx <= len(@ReturnValue)
    begin
      -- Get Character to Test
      select @TestChar = upper(substring(@ReturnValue,@Idx,1))
      -- Test Character for Range
      if (@TestChar >= '0' and @TestChar <= '9') 
      begin
        select @DigitsOnly = @DigitsOnly + @TestChar
      end
      -- Bump Pointer
      select @Idx = @Idx + 1
    end
    select @ReturnValue=@DigitsOnly
  end

  -- Sax catalogs - drop sequence moved to suffix (was prefix) - 1/14/09 kjm
  if @pCatalogId = 1700
  begin
    if len(@ReturnValue) > 8
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '705' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '786' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '752'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
      end
    end
/*
    if len(@ReturnValue) = 9 or len(@ReturnValue) = 10
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '705' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '786' or
         substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '752'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
      end
    end
*/    
  end

  -- Sax catalogs - drop sequence moved to suffix (was prefix) - 1/14/09 kjm
  if @pCatalogId = 1730
  begin
    if len(@ReturnValue) > 8
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '779' 
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
      end
    end
  end

  -- Camcor catalogs - drop sequence as suffix (new for 08-09 catalog) - 1/22/09 kjm
  if @pCatalogId = 1658
  begin
    if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = 'AV9'
    begin
      select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
    end
  end
  if @pCatalogId = 1804
  begin
    if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = 'AV0'
    begin
      select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
    end
  end
  if @pCatalogId = 1963
  begin
    if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = 'AV1'
    begin
      select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
    end
  end

  -- Brodhead Garrett catalogs - drop sequence moved to suffix - 1/23/09 kjm
  if @pCatalogId = 1718 or @pCatalogId = 1884
  begin
    if len(@ReturnValue) > 6 
    begin
      if substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '080'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
      end
    end
  end

/*

  -- Brodhead Garrett catalogs - removed leading digit and 3 digit dropseq - 2/5/10 kjm
  if @pCatalogId IN (1883, 1991, 2082, 2083, 1952, 2091, 2092) 
  begin
    if len(@ReturnValue) > 8
    begin
      if (@pCatalogId IN (1883, 1991, 2092)) and substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '085'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
      end
      if (@pCatalogId IN (2082, 2083, 1952, 2091)) and substring(@ReturnValue,len(@ReturnValue) - 2, 3) = '088'
      begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
        select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
      end
    end
  end

*/

  -- Brodhead Garrett catalogs - remove leading digit and 3 trailing digits - 2/16/11 kjm
  if @pCatalogId IN (1883, 1991, 2082, 2083, 1952, 2091, 2092) 
  begin
    if len(@ReturnValue) > 8 AND Right(@ReturnValue,3) IN ('085', '088')
    begin
      select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
      select @ReturnValue = substring(@ReturnValue,2,len(@ReturnValue)-1)
    end
  end

  -- Kaplan catalogs 
  
  -- 2 drop sequences for same catalog 
  -- i.e. the Early Childhood Edition Catalog merged with K-5 Catalog
  if @pCatalogId = 1802
  begin
    if    substring(@ReturnValue,1,2) = '19'
       or substring(@ReturnValue,1,2) = '59'
    begin
      select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-2)
    end
  end

  if @pCatalogId = 2041
  begin
    if substring(@ReturnValue,1,2) = '11' and len(@ReturnValue) > 5
    begin
      select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-2)
    end
  end     

  if @pCatalogId = 2042
  begin
    if substring(@ReturnValue,1,2) = '50' and len(@ReturnValue) > 5
    begin
      select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-2)
    end
  end     

  -- Highsmith Library - 2 drop sequences for same catalog
  -- Catalog = L21H   Web site = L2WH
  if @pCatalogId = 1783
  begin
    if    substring(@ReturnValue,1,4) = 'L21H'
       or substring(@ReturnValue,1,4) = 'L2WH'
    begin
      select @ReturnValue = substring(@ReturnValue,5,len(@ReturnValue)-4)
    end
  end

  -- Highsmith Library - 2 drop sequences for same catalog
  -- Catalog = L31H   Web site = L3WH 
  -- Itemcode may be 5 or 6 digits e.g. L31H123456ABC
  if @pCatalogId = 1956
  begin
    if    substring(@ReturnValue,1,4) = 'L31H'
       or substring(@ReturnValue,1,4) = 'L3WH'
    begin
      --select @ReturnValue = substring(@ReturnValue,5,len(@ReturnValue)-4)
      select @ReturnValue = 
      case 
      when LEN(@ReturnValue) > 9 AND SUBSTRING(@ReturnValue,10,1) IN ('1','2','3','4','5','6','7','8','9','0')
      then SUBSTRING( ltrim(rtrim(@ReturnValue)), 5, 6 )
      else SUBSTRING( ltrim(rtrim(@ReturnValue)), 5, 5 )
      end    
    end
  end
  -- Highsmith Library 2011-12
  -- Catalog = LH   Web site = L3WH
  if @pCatalogId = 2137
  begin
    if    substring(@ReturnValue,1,2) = 'LH'
    begin
      --select @ReturnValue = substring(@ReturnValue,5,len(@ReturnValue)-4)
      select @ReturnValue = 
      case 
      when LEN(@ReturnValue) > 7 AND SUBSTRING(@ReturnValue,8,1) IN ('1','2','3','4','5','6','7','8','9','0')
      then SUBSTRING( ltrim(rtrim(@ReturnValue)), 3, 6 )
      else SUBSTRING( ltrim(rtrim(@ReturnValue)), 3, 5 )
      end    
    end
    else
    if    substring(@ReturnValue,1,4) = 'L3WH'
    begin
      --select @ReturnValue = substring(@ReturnValue,5,len(@ReturnValue)-4)
      select @ReturnValue = 
      case 
      when LEN(@ReturnValue) > 9 AND SUBSTRING(@ReturnValue,10,1) IN ('1','2','3','4','5','6','7','8','9','0')
      then SUBSTRING( ltrim(rtrim(@ReturnValue)), 5, 6 )
      else SUBSTRING( ltrim(rtrim(@ReturnValue)), 5, 5 )
      end    
    end
  end

  -- Highsmith Upstart - 2 drop sequences for same catalog
  -- Catalog = K21H   Web site = U2WH
  if @pCatalogId = 1785
  begin
    if substring(@ReturnValue,1,4) = 'K21H'
    or substring(@ReturnValue,1,4) = 'U2WH'
      select @ReturnValue = substring(@ReturnValue,5,len(@ReturnValue)-4)
  end
  -- Catalog = K31H   Web site = U3WH
  if @pCatalogId = 1983
  begin
    if substring(@ReturnValue,1,4) = 'K31H'
    or substring(@ReturnValue,1,4) = 'U3WH'
      select @ReturnValue = substring(@ReturnValue,5,len(@ReturnValue)-4)
  end
  -- 2011 Catalog = KRH   Web site = U3WH
  if @pCatalogId = 2138
  begin
    if substring(@ReturnValue,1,3) = 'KRH'
      select @ReturnValue = substring(@ReturnValue,4,len(@ReturnValue)-3)
    else
    if substring(@ReturnValue,1,4) = 'U3WH'
      select @ReturnValue = substring(@ReturnValue,5,len(@ReturnValue)-4)
  end

  -- Special Test for Childcraft (School Specialty)
  if @pCatalogId = 1853
  begin
     -- remove suffix 
     if len(@ReturnValue) > 8
     begin
        select @ReturnValue = substring(@ReturnValue,1,len(@ReturnValue)-3)
     end
  end

  -- Discount School Supply   (Web site itemcode prefix = 8WW)
  if @pCatalogId in (1662, 1706, 1824)
  begin
    if substring(@ReturnValue,1,3) = '8WW'   -- web site prefix for all catalogs 
       or @pCatalogId=1662 and substring(@ReturnValue,1,3) = '819'
       or @pCatalogId=1706 and substring(@ReturnValue,1,3) = '820'
       or @pCatalogId=1824 and substring(@ReturnValue,1,3) in ('822','825','826')
       or @pCatalogId=1932 and substring(@ReturnValue,1,3) in ('822','825','826')
       or @pCatalogId=1933 and substring(@ReturnValue,1,3) in ('822','825','826')
    begin
      select @ReturnValue = substring(@ReturnValue,4,len(@ReturnValue)-3)
    end
  end
  
  -- EAI  drop 1st 3 chars 
  if @pCatalogId in (2107, 2114, 2115, 2116)
  begin
    if len(@ReturnValue) > 6
    begin
      if (upper(substring(@ReturnValue,1,1)) between 'A' and 'Z') and
         (upper(substring(@ReturnValue,2,1)) between 'A' and 'Z') and
         (upper(substring(@ReturnValue,3,1)) between 'A' and 'Z')
      begin
        select @ReturnValue = substring(@ReturnValue,4,len(@ReturnValue)-3)
      end
    end
  end

  -- Special Test for School Health Nurse 2010 (second drop sequence)
  if @pCatalogId = 2048
  begin
     if substring(@ReturnValue,1,2) = 'AB'
     begin
        select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue)-2)
     end
  end


return isnull(@ReturnValue,'null')
end
```
