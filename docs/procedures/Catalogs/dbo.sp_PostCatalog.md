# Procedure: `dbo.sp_PostCatalog`

_Generated on 2026-05-04T13:43:20.007Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PostCatalog` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-03-27 17:30:59 |
| Modified | 2024-09-10 16:54:39 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Headings` | unresolved |  |
| `Items` | unresolved |  |
| `Master Catalog` | USER_TABLE |  |
| `Master Catalog` | USER_TABLE | `Catalogs` |
| `dbo.Master Catalog` | USER_TABLE | `Catalogs` |
| `Catalog` | unresolved | `eds` |
| `CrossRefs` | unresolved | `eds` |
| `Items` | unresolved | `eds` |
| `dbo.Catalog` | unresolved | `EDS` |
| `dbo.CrossRefs` | unresolved | `eds` |
| `dbo.Headings` | unresolved | `EDS` |
| `dbo.Items` | unresolved | `eds` |
| `dbo.PostCatalogDetail` | unresolved | `EDS` |
| `dbo.PostCatalogHeader` | unresolved | `EDS` |
| `dbo.uf_PackCode` | unresolved | `eds` |
| `dbo.uf_PackCodeCatalog` | unresolved | `eds` |
| `dbo.Units` | unresolved | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   PROCEDURE [dbo].[sp_PostCatalog] @pCatalogId int as
declare @catalogId int, @ImportFormat int, @CategoryId int, @PostCatalogHeaderId int

select @CatalogId = CatalogId, @ImportFormat = case when isnull(ImportFormat,0) in (0,1) then 4 else ImportFormat end, @CategoryId = CategoryId
  from EDS.dbo.Catalog
 where CatalogId = @pCatalogId

print 'Begining Post of Catalog #' + cast(@CatalogId as varchar)
--print 'Check for Blank UniqueItemNumber'
Update mc
   set UniqueItemNumber = eds.dbo.uf_PackCodeCatalog(VendorItemCode,@catalogId)
  from [Master Catalog] mc
 where mc.CatalogId = @catalogId
   and isnull(trim(mc.UniqueItemNumber),'') = ''

update xr
   set UniqueItemNumber = eds.dbo.uf_PackCodeCatalog(xr.VendorItemCode,xr.CatalogId)
  from eds.dbo.Catalog Catalog
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs xr on xr.CatalogId = catalog1.CatalogId
                           and xr.Active = 1
                           and xr.UniqueItemNumber is null
 where Catalog.CatalogId = @CatalogId
 
--print 'Remove duplicates involving only multiple pages'
DELETE MC1 
--Select MC1.UniqueItemNumber, MC1.PageNumber, MC2.PageNumber, *
FROM [Master Catalog] MC1
JOIN [Master Catalog] MC2 ON MC2.SysId = (Select Top 1 MC3.SysId 
                                          From [Master Catalog] MC3
                                          Where MC3.CatalogId = @CatalogId
                                            AND MC3.UniqueItemNumber = MC1.UniqueItemNumber 
                                            AND MC3.CatalogPrice = MC1.CatalogPrice
                                            AND MC3.GrossPrice = MC1.GrossPrice
                                            AND MC3.Description = MC1.Description
                                            AND MC3.UnitCode = MC1.UnitCode
                                            AND MC3.NoDiscount = MC1.NoDiscount
                                          Order By Case Isnull(MC3.PageNumber,0) When 0 Then 9999 Else MC3.PageNumber End, MC3.SysId)
Where MC1.CatalogId = @CatalogId and MC1.SysId != MC2.SysId
--Order by MC1.UniqueItemNumber


--print 'Checking for Unresolved Duplicates'
If Exists
(
SELECT UniqueItemNumber, count(*)
FROM [Catalogs].[dbo].[Master Catalog]
where catalogid=@CatalogId 
group by UniqueItemNumber having count(*) > 1
)
BEGIN
  RAISERROR('Unresolved duplicates were found, process cancelled.',16,1)
  return
END

-- Create Post Audit Header
INSERT INTO [EDS].[dbo].[PostCatalogHeader](CatalogId, PostDateStart) VALUES ( @CatalogId, getdate() )
Select @PostCatalogHeaderId = Scope_Identity() --DCH 11/24/2015 @@Identity

--print 'Reset Item Matches'
Update [Master Catalog]
   set CrossRefId = null,
       ItemId = null
 where CatalogId = @CatalogId
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 1, 'Reset Item Matches', @@RowCount, getdate())

--print 'Match Existing Cross References'

/*
-- Match Existing CrossRefs
Update [Master Catalog]
   set CrossRefId = CrossRefs.CrossRefId
--       ItemId = CrossRefs.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.catalogId = mc.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
                                  and Crossrefs.PackedCode = mc.PackedCode
                                  and case isnull(Catalog.ImportFormat,1) when 1 then isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'') else isnull(ltrim(rtrim(CrossRefs.ManufacturorPartNumber)),'') end = isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'')
--                                  and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
option (Force Order)
*/

-- Use for Same Catalog just Different Year 
-- Match Existing CrossRefs from the vendors other catalogs - match on: packedcode (and if ImportFormat type 2, also Manufacturor part#)
if @ImportFormat = 4 
begin
Update [Master Catalog]
   set ItemId = CrossRefs.ItemId
--select *
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = Catalog1.CatalogId
                                  and isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 2, 'Match Existing Cross References', @@RowCount, getdate())
if 1=0 -- Disable this code
begin
--print 'Match Existing Items'

-- Match Existing Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
       and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
       and isnull(Items.ManufacturorNumber,'') = isnull(mc.ManufacturorPartNumber,'') 
       and Items.Description = mc.Description
       and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 3, 'Match Existing Items', @@RowCount, getdate())
end
end
else
if @ImportFormat = 5
begin
Update [Master Catalog]
   set ItemId = CrossRefs.ItemId
--select *
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = Catalog1.CatalogId
                                  and isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
                                  and Crossrefs.Active = 1
  join EDS.dbo.Items Items on Items.ItemId = Crossrefs.ItemId
  join EDS.dbo.Units Units on Units.UnitId = Items.UnitId
                          and Units.Code = mc.UnitCode
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 2, 'Match Existing Cross References', @@RowCount, getdate())

if 1=0 -- Disable this Code
begin
--print 'Match Existing Items'

-- Match Existing Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items with (INDEX(SKI_ActiveHeading_ItemItemcodeDescrUnitSortseq)) on Items.CategoryId = Catalog.CategoryId
       and Items.Active = 1
       and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
       and isnull(Items.ManufacturorNumber,'') = isnull(mc.ManufacturorPartNumber,'') 
       and Items.Description = isnull(mc.Description,'')
  join EDS.dbo.Units Units on Units.UnitId = Items.UnitId
                          and Units.Code = mc.UnitCode
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 3, 'Match Existing Items', @@RowCount, getdate())
end
end
else
begin
Update [Master Catalog]
   set ItemId = CrossRefs.ItemId
--select *
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = Catalog1.CatalogId
                                  and case isnull(Catalog.ImportFormat,1) 
                                        when 4 then mc.PackedCode 
                                        else Crossrefs.PackedCode 
                                      end = mc.PackedCode
                                  and case isnull(Catalog.ImportFormat,1) 
                                      when 0 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
                                      when 1 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
                                      when 4 then isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') 
                                      else isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') 
                                      end = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
--                                  and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 2, 'Match Existing Cross References', @@RowCount, getdate())

if 1=0 -- Disable This code
begin
--print 'Match Existing Items'

-- Match Existing Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
       and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
       and isnull(Items.ManufacturorNumber,'') = 
           case isnull(Catalog.ImportFormat,1) 
           when 0 then isnull(Items.ManufacturorNumber,'') 
           when 1 then isnull(Items.ManufacturorNumber,'') 
           when 2 then case isnull(Items.ManufacturorNumber,'') 
                       when '' then case rtrim(Items.Description) 
                                    when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                    else isnull(mc.ManufacturorPartNumber,'') 
                                    end 
                       else isnull(mc.ManufacturorPartNumber,'') 
                       end 
           when 3 then case isnull(Items.ManufacturorNumber,'') 
                       when '' then case rtrim(Items.Description) 
                                    when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                    else isnull(mc.ManufacturorPartNumber,'') 
                                    end 
                       else isnull(mc.ManufacturorPartNumber,'')
                       end 
           when 4 then case isnull(Items.ManufacturorNumber,'') 
                       when '' then case rtrim(Items.Description) 
                                    when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                    else isnull(mc.ManufacturorPartNumber,'') 
                                    end 
                       else isnull(mc.ManufacturorPartNumber,'') 
                       end 
           else case isnull(Items.ManufacturorNumber,'') 
                when '' then isnull(Items.ManufacturorNumber,'') 
                else isnull(mc.ManufacturorPartNumber,'') 
                end 
           end
       and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 3, 'Match Existing Items', @@RowCount, getdate())
end
end

--print 'Inserting Missing Unit Codes'

-- Create Missing Unit Codes
insert eds.dbo.Units (Active, Code)
  select 1, ltrim(rtrim(mc.UnitCode))
    from [Master Catalog] mc
    left outer join eds.dbo.Units Units on isnull(Units.Code,'EACH') = isnull(ltrim(rtrim(mc.UnitCode)),'EACH')
                                       and Units.Active = 1
   where Units.UnitId is null
     and mc.CatalogId = @CatalogId
   group by mc.UnitCode
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 4, 'Inserting Missing Unit Codes', @@RowCount, getdate())

--print 'Inserting Missing Headings'

-- Create Missing Headings
-- CODE TO INSERT MISSING HEADINGS (i.e. add new Headings to Heading table)
INSERT INTO EDS.dbo.Headings (Active, CategoryId, Title)
SELECT 1 Active, @CategoryId CategoryId, MC.Heading Title                     
FROM [Catalogs].[dbo].[MASTER CATALOG] MC 
LEFT OUTER JOIN EDS.dbo.Headings ON Headings.Title = MC.Heading 
                                AND Headings.CategoryId = @CategoryId
								and coalesce(Headings.DistrictId,0) = 0
WHERE Headings.HeadingId is null 
  AND MC.catalogid = @CatalogId
  and coalesce(rtrim(MC.Heading),'') != ''
Group by MC.Heading
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 10, 'Inserting Missing Headings', @@RowCount, getdate())

-- Cleanup Matching District Specific Headings
select dsh.HeadingId DistrictHeadingId, gh.HeadingId GlobalHeadingId into #HeadingFixes
  from eds.dbo.Headings dsh
  join eds.dbo.Headings gh on gh.CategoryId = dsh.CategoryId
                          and gh.Active = 1
						  and gh.Title = dsh.Title
						  and coalesce(rtrim(gh.Title),'') != ''
 where dsh.CategoryId = @CategoryId
   and dsh.Active = 1
   and dsh.DistrictId > 0
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 11, 'Fixup District Headings', @@RowCount, getdate())

Update Items
   set HeadingId = hf.GlobalHeadingId
  from #HeadingFixes hf
  join eds.dbo.Items Items on Items.HeadingId = hf.DistrictHeadingId
	                      and Items.Active = 1
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 12, 'Fixup Items of District Headings', @@RowCount, getdate())

Update Headings
   set Active = 0
  from #HeadingFixes hf
  join eds.dbo.Headings Headings on headings.HeadingId = hf.DistrictHeadingId
	                            and Headings.Active = 1
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 13, 'Deactivate District Headings now Global', @@RowCount, getdate())

drop table #HeadingFixes

--print 'Insert Missing Items'

if @ImportFormat = 4 
begin
-- Create Missing Items
insert eds.dbo.Items (Active, CategoryId, ItemCode, Description, UnitId, ManufacturorNumber, HeadingId)
  select 1, Catalog.CategoryId, isnull(Catalog.Prefix,'') + mc.UniqueItemNumber, mc.Description, Units.UnitId, mc.ManufacturorPartNumber, Headings.HeadingId
--  select 1, Catalog.CategoryId, isnull(Catalog.Prefix,'') + mc.PackedCode, mc.Description, Units.UnitId, mc.ManufacturorPartNumber, Headings.HeadingId -- DCH Changed 4/1/21
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
    join eds.dbo.Units Units on Units.Code = isnull(ltrim(rtrim(mc.UnitCode)),'EACH')
                            and Units.Active = 1
	left outer join eds.dbo.Headings Headings on Headings.CategoryId = @CategoryId
	                                         and Headings.Active = 1
											 and Headings.Title = coalesce(rtrim(mc.Heading),'')
											 and rtrim(mc.Heading) != ''
   where mc.ItemId is null
     and mc.CatalogId = @CatalogId
--   group by Catalog.CategoryId, mc.PackedCode, mc.Description, Units.UnitId, Catalog.Prefix, mc.ManufacturorPartNumber, Headings.HeadingId
   group by Catalog.CategoryId, mc.UniqueItemNumber, mc.Description, Units.UnitId, Catalog.Prefix, mc.ManufacturorPartNumber, Headings.HeadingId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 5, 'Inserting Missing Items', @@RowCount, getdate())

--print 'Match Newly Created Items'

-- Match Newly Created Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
                          and Items.PackedCode = isnull(Catalog.Prefix,'') + eds.dbo.uf_PackCode(mc.UniqueItemNumber)
--                          and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
                          and isnull(Items.ManufacturorNumber,'') = isnull(mc.ManufacturorPartNumber,'') 
                          and Items.Description = mc.Description
                          and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 6, 'Matching Newly Created Items', @@RowCount, getdate())
end
else
if @ImportFormat = 5
begin
-- Create Missing Items
insert eds.dbo.Items (Active, CategoryId, ItemCode, Description, UnitId, ManufacturorNumber, HeadingId)
  select 1, Catalog.CategoryId, isnull(Catalog.Prefix,'') + mc.UniqueItemNumber, mc.Description, Units.UnitId, mc.ManufacturorPartNumber, Headings.HeadingId
--  select 1, Catalog.CategoryId, isnull(Catalog.Prefix,'') + mc.PackedCode, mc.Description, Units.UnitId, mc.ManufacturorPartNumber, Headings.HeadingId
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
    join eds.dbo.Units Units on Units.Code = isnull(ltrim(rtrim(mc.UnitCode)),'EACH')
                            and Units.Active = 1
	left outer join eds.dbo.Headings Headings on Headings.CategoryId = @CategoryId
	                                         and Headings.Active = 1
											 and Headings.Title = coalesce(rtrim(mc.Heading),'')
											 and rtrim(mc.Heading) != ''
   where mc.ItemId is null
     and mc.CatalogId = @CatalogId
   group by Catalog.CategoryId, mc.UniqueItemNumber, mc.Description, Units.UnitId, Catalog.Prefix, mc.ManufacturorPartNumber, Headings.HeadingId
--   group by Catalog.CategoryId, mc.PackedCode, mc.Description, Units.UnitId, Catalog.Prefix, mc.ManufacturorPartNumber, Headings.HeadingId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 5, 'Inserting Missing Items', @@RowCount, getdate())

--print 'Match Newly Created Items'

-- Match Newly Created Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
                          and Items.PackedCode = isnull(Catalog.Prefix,'') + eds.dbo.uf_PackCode(mc.UniqueItemNumber)
--                          and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
                          and isnull(Items.ManufacturorNumber,'') = isnull(mc.ManufacturorPartNumber,'') 
                          and Items.Description = mc.Description
                          and Items.Active = 1
  join EDS.dbo.Units Units on Units.UnitId = Items.UnitId
                          and Units.Code = mc.UnitCode
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 6, 'Matching Newly Created Items', @@RowCount, getdate())
end
else
begin
-- Create Missing Items
insert eds.dbo.Items (Active, CategoryId, ItemCode, Description, UnitId, ManufacturorNumber, HeadingId)
  select 1, Catalog.CategoryId, isnull(Catalog.Prefix,'') + mc.PackedCode, mc.Description, Units.UnitId, mc.ManufacturorPartNumber, Headings.HeadingId
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
    join eds.dbo.Units Units on Units.Code = isnull(ltrim(rtrim(mc.UnitCode)),'EACH')
                            and Units.Active = 1
    left outer join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
         and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
         and isnull(Items.ManufacturorNumber,'') = 
             case isnull(Catalog.ImportFormat,1) 
             when 0 then isnull(Items.ManufacturorNumber,'') 
             when 1 then isnull(Items.ManufacturorNumber,'') 
             when 2 then case isnull(Items.ManufacturorNumber,'') 
                         when '' then case rtrim(Items.Description) 
                                      when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                      else isnull(mc.ManufacturorPartNumber,'') 
                                      end 
                         else isnull(mc.ManufacturorPartNumber,'') 
                         end 
             when 3 then case isnull(Items.ManufacturorNumber,'') 
                         when '' then case rtrim(Items.Description) 
                                 when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                 else isnull(mc.ManufacturorPartNumber,'') 
                                 end 
                         else isnull(mc.ManufacturorPartNumber,'') 
                         end 
             when 4 then case isnull(Items.ManufacturorNumber,'') 
                         when '' then case rtrim(Items.Description) 
                                      when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                      else isnull(mc.ManufacturorPartNumber,'') 
                                      end 
                         else isnull(mc.ManufacturorPartNumber,'') 
                         end 
             else case isnull(Items.ManufacturorNumber,'') 
                  when '' then isnull(Items.ManufacturorNumber,'') 
                  else isnull(mc.ManufacturorPartNumber,'') 
                  end 
             end
         and Items.Active = 1
	left outer join eds.dbo.Headings Headings on Headings.CategoryId = @CategoryId
	                                         and Headings.Active = 1
											 and Headings.Title = coalesce(rtrim(mc.Heading),'')
											 and rtrim(mc.Heading) != ''
   where mc.ItemId is null
     and mc.CatalogId = @CatalogId
     and Items.ItemId is null
   group by Catalog.CategoryId, mc.PackedCode, mc.Description, Units.UnitId, Catalog.Prefix, mc.ManufacturorPartNumber, Headings.HeadingId
option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 5, 'Inserting Missing Items', @@RowCount, getdate())

--print 'Match Newly Created Items'

-- Match Newly Created Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
                          and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
                          and isnull(Items.ManufacturorNumber,'') = 
                              case isnull(Catalog.ImportFormat,1) 
                              when 0 then isnull(Items.ManufacturorNumber,'') 
                              when 1 then isnull(Items.ManufacturorNumber,'') 
                              when 2 then case isnull(Items.ManufacturorNumber,'') 
                                          when '' then case rtrim(Items.Description) 
                                                       when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                                       else isnull(mc.ManufacturorPartNumber,'') 
                                                       end 
                                          else isnull(mc.ManufacturorPartNumber,'') 
                                          end 
                              when 3 then case isnull(Items.ManufacturorNumber,'') 
                                          when '' then case rtrim(Items.Description) 
                                                       when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                                       else isnull(mc.ManufacturorPartNumber,'') 
                                                       end 
                                          else isnull(mc.ManufacturorPartNumber,'') 
                                          end
                              when 4 then case isnull(Items.ManufacturorNumber,'') 
                                          when '' then case rtrim(Items.Description) 
                                                       when rtrim(mc.Description) then isnull(Items.ManufacturorNumber,'') 
                                                       else isnull(mc.ManufacturorPartNumber,'') 
                                                       end 
                                          else isnull(mc.ManufacturorPartNumber,'') 
                                          end 
                              else case isnull(Items.ManufacturorNumber,'') 
                                   when '' then isnull(Items.ManufacturorNumber,'') 
                                   else isnull(mc.ManufacturorPartNumber,'') 
                                   end 
                              end
                          and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 6, 'Matching Newly Created Items', @@RowCount, getdate())
end

--print 'Create EDS CrossRef Entries'

-- Create New CrossRef Entries
insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, DateUpdated)
  select 1, Items.ItemId, Items.ItemCode, getdate()
    from eds.dbo.Items Items
    join eds.dbo.Catalog Catalog on Catalog.CategoryId = Items.CategoryId
                                and Catalog.CatalogId = @CatalogId
    left outer join eds.dbo.CrossRefs CrossRefs on CrossRefs.ItemId = Items.ItemId
                                               and CrossRefs.Active = 1
                                               and isnull(Crossrefs.CatalogId,0) = 0
   where Items.Active = 1
     and CrossRefs.CrossrefId is null
--     and Catalog.CatalogId = @CatalogId
   group by Items.ItemId, Items.ItemCode
--option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 7, 'Create EDS CrossRef Entries', @@RowCount, getdate())

--print 'Create Catalog CrossRef Entries'

if @ImportFormat = 4 
begin
-- Create Missing CrossRef Entries for Catalog
--insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription, UniqueItemNumber, MSDSRef, ShortDescription, UOM, Heading, Keyword, ImageURL, UPC_ISBN, UNSPSC)
--  select 1, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4), Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate(), mc.GrossPrice, mc.NoDiscount, coalesce(mc.FullDescription, mc.Description), rtrim(ltrim(mc.UniqueItemNumber)), mc.MSDSURL, coalesce(mc.Description, mc.FullDescription), mc.UnitCode, coalesce(rtrim(mc.Heading),''), coalesce(rtrim(mc.Keyword),''), mc.ImageURL, mc.UPC_ISBN, mc.UNSPSC 
-- added fields 9/10/24
insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription, UniqueItemNumber, MSDSRef, ShortDescription, UOM, Heading, Keyword, ImageURL, UPC_ISBN, UNSPSC, PerishableItem, PrescriptionRequired, DigitallyDelivered, MinimumOrderQuantity)
  select 1, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4), Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate(), mc.GrossPrice, mc.NoDiscount, coalesce(mc.FullDescription, mc.Description), rtrim(ltrim(mc.UniqueItemNumber)), mc.MSDSURL, coalesce(mc.Description, mc.FullDescription), mc.UnitCode, coalesce(rtrim(mc.Heading),''), coalesce(rtrim(mc.Keyword),''), mc.ImageURL, mc.UPC_ISBN, mc.UNSPSC,  mc.PerishableItem, mc.PrescriptionRequired, mc.DigitallyDelivered, mc.MinimumOrderQuantity 
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.catalogId
    left outer join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
         and CrossRefs.UniqueItemNumber = mc.UniqueItemNumber
         and Crossrefs.Active = 1
   where mc.CrossRefId is null
     and Crossrefs.CrossRefId is null
     and mc.CatalogId = @Catalogid
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 8, 'Create Catalog CrossRef Entries', @@RowCount, getdate())

--print 'Match New CrossRefs'

-- Match Newly Created CrossRefs
Update [Master Catalog]
   set CrossRefId = CrossRefs.CrossRefId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
                                  and Crossrefs.UniqueItemNumber = mc.UniqueItemNumber
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 9, 'Match New CrossRefs', @@RowCount, getdate())
end
else
if @ImportFormat = 5
begin
-- Create Missing CrossRef Entries for Catalog
--insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription, UniqueItemNumber, MSDSRef, ShortDescription, UOM, Heading, Keyword, ImageURL, UPC_ISBN, UNSPSC)
--  select 1, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4), Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate(), mc.GrossPrice, mc.NoDiscount, coalesce(mc.FullDescription, mc.Description), rtrim(ltrim(mc.UniqueItemNumber)), mc.MSDSURL, coalesce(mc.Description, mc.FullDescription), mc.UnitCode, coalesce(rtrim(mc.Heading),''), coalesce(rtrim(mc.Keyword),''), mc.ImageURL, mc.UPC_ISBN, mc.UNSPSC
-- added fields 9/10/24
insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription, UniqueItemNumber, MSDSRef, ShortDescription, UOM, Heading, Keyword, ImageURL, UPC_ISBN, UNSPSC, PerishableItem, PrescriptionRequired, DigitallyDelivered, MinimumOrderQuantity)
  select 1, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4), Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate(), mc.GrossPrice, mc.NoDiscount, coalesce(mc.FullDescription, mc.Description), rtrim(ltrim(mc.UniqueItemNumber)), mc.MSDSURL, coalesce(mc.Description, mc.FullDescription), mc.UnitCode, coalesce(rtrim(mc.Heading),''), coalesce(rtrim(mc.Keyword),''), mc.ImageURL, mc.UPC_ISBN, mc.UNSPSC, mc.PerishableItem, mc.PrescriptionRequired, mc.DigitallyDelivered, mc.MinimumOrderQuantity
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.catalogId
    left outer join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
         and CrossRefs.UniqueItemNumber = mc.UniqueItemNumber
         and Crossrefs.Active = 1
   where mc.CrossRefId is null
     and Crossrefs.CrossRefId is null
     and mc.CatalogId = @Catalogid
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 8, 'Create Catalog CrossRef Entries', @@RowCount, getdate())

--print 'Match New CrossRefs'

-- Match Newly Created CrossRefs
Update [Master Catalog]
   set CrossRefId = CrossRefs.CrossRefId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
                                  and Crossrefs.UniqueItemNumber = mc.UniqueItemNumber
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 9, 'Match New CrossRefs', @@RowCount, getdate())
end
else
begin
-- Create Missing CrossRef Entries for Catalog
--insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription, UniqueItemNumber, MSDSRef, ShortDescription, UOM, Heading, Keyword, ImageURL, UPC_ISBN, UNSPSC)
--  select 1, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4), Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate(), mc.GrossPrice, mc.NoDiscount, coalesce(mc.FullDescription, mc.Description), rtrim(ltrim(mc.UniqueItemNumber)), mc.MSDSURL, coalesce(mc.Description, mc.FullDescription), mc.UnitCode, coalesce(rtrim(mc.Heading),''), coalesce(rtrim(mc.Keyword),''), mc.ImageURL, mc.UPC_ISBN, mc.UNSPSC
-- added fields 9/10/24
insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription, UniqueItemNumber, MSDSRef, ShortDescription, UOM, Heading, Keyword, ImageURL, UPC_ISBN, UNSPSC, PerishableItem, PrescriptionRequired, DigitallyDelivered, MinimumOrderQuantity)
  select 1, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4), Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate(), mc.GrossPrice, mc.NoDiscount, coalesce(mc.FullDescription, mc.Description), rtrim(ltrim(mc.UniqueItemNumber)), mc.MSDSURL, coalesce(mc.Description, mc.FullDescription), mc.UnitCode, coalesce(rtrim(mc.Heading),''), coalesce(rtrim(mc.Keyword),''), mc.ImageURL, mc.UPC_ISBN, mc.UNSPSC, mc.PerishableItem, mc.PrescriptionRequired, mc.DigitallyDelivered, mc.MinimumOrderQuantity
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.catalogId
    left outer join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
         and Crossrefs.PackedCode = case isnull(Catalog.ImportFormat,1) 
                                      when 4 then CrossRefs.PackedCode
                                      else mc.PackedCode
                                    end
         and case isnull(Catalog.ImportFormat,1) 
             when 0 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
             when 1 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
             when 4 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
             else isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') 
             end = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
--         and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
         and Crossrefs.Active = 1
   where mc.CrossRefId is null
     and Crossrefs.CrossRefId is null
     and mc.CatalogId = @Catalogid
option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 8, 'Create Catalog CrossRef Entries', @@RowCount, getdate())

--print 'Match New CrossRefs'

-- Match Newly Created CrossRefs
Update [Master Catalog]
   set CrossRefId = CrossRefs.CrossRefId
--       ItemId = CrossRefs.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
                                  and Crossrefs.PackedCode = case isnull(Catalog.ImportFormat,1)
                                                               when 4 then CrossRefs.PackedCode
                                                               else mc.PackedCode
                                                             end
                                  and case isnull(Catalog.ImportFormat,1) 
                                      when 0 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
                                      when 1 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
                                      when 4 then isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') 
                                      else isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') 
                                      end = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
--                                  and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
option (Force Order)
INSERT INTO [EDS].[dbo].[PostCatalogDetail](PostCatalogHeaderId, PostInfoType, PostInfoDesc, PostInfoValue, PostDateTime)
     VALUES(@PostCatalogHeaderId, 9, 'Match New CrossRefs', @@RowCount, getdate())
end

-- Update Pages,Prices, etc...
Update eds.dbo.CrossRefs
   set CatalogYear = Catalog.CatalogYear,
       Page = right('    ' + convert(varchar(16),mc.PageNumber),4),
       CatalogPrice = mc.CatalogPrice,
       GrossPrice = mc.GrossPrice,
       DoNotDiscount = mc.NoDiscount,
       DateUpdated = getdate(),
       FullDescription = coalesce(mc.FullDescription, mc.Description),
       ShortDescription = coalesce(mc.Description,mc.FullDescription),
       UOM = mc.UnitCode,
       MSDSRef = mc.MSDSURL,
	   ImageURL = mc.ImageURL,
	   UPC_ISBN = mc.UPC_ISBN,
	   UNSPSC = mc.UNSPSC,
       PerishableItem = mc.PerishableItem,               -- added field 9/10/24
	   PrescriptionRequired = mc.PrescriptionRequired,   -- added field 9/10/24
	   DigitallyDelivered = mc.DigitallyDelivered,       -- added field 9/10/24
	   MinimumOrderQuantity = mc.MinimumOrderQuantity    -- added field 9/10/24
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.CrossRefs CrossRefs on CrossRefs.CrossRefId = mc.CrossRefId
 where mc.CatalogId = @CatalogId
--option (Force Order)

/* DCH Removed 01/18/2015 - Do not believe is needed anymore
update eds..CrossRefs
   set Active = 0
  from eds..Crossrefs CrossRefs
  join EDS.dbo.Items Items on Items.ItemId = CrossRefs.ItemId
  join (
select i.CategoryId, CrossRefs.ItemId, min(CrossRefs.CrossRefId) MinCrossrefId
  from eds.dbo.CrossRefs CrossRefs
  join eds.dbo.Items i on i.ItemId = CrossRefs.ItemId
                      and i.Active = 1
                      and i.CategoryId = @CategoryId
 where isnull(CrossRefs.CatalogId,0) = 0
   and CrossRefs.active = 1
 group by i.CategoryId, CrossRefs.ItemId
 having count(*) > 1
) ss on ss.CategoryId = Items.CategoryId
    and ss.ItemId = Crossrefs.Itemid
 where isnull(CrossRefs.CatalogId,0) = 0
   and CrossRefs.active = 1
   and CrossRefs.CrossRefId != ss.MinCrossRefId
*/

Update eds..CrossRefs
   set Catalogid = null
 where active = 1
   and catalogid = 0

Update eds..Items
   set HeadingId = Headings.HeadingId
  from eds..Items items
  join Catalogs..[Master Catalog] mc on mc.itemid = items.itemid and mc.catalogid = @CatalogId
  JOIN EDS.dbo.Headings Headings ON Headings.CategoryId = @CategoryId
                                and Headings.Active = 1
	  						    and rtrim(Headings.Title) = rtrim(mc.Heading)
							    and rtrim(mc.Heading) != ''
 where Items.CategoryId = @CategoryId
   and coalesce(Items.HeadingId,0) = 0
   and Items.Active = 1

Update eds..CrossRefs
   set AdditionalShipping = mc.AdditionalShipping
 from EDS..CrossRefs crossrefs
 join Catalogs..[Master Catalog] mc on mc.crossrefid = crossrefs.crossrefid 
      and mc.catalogid = @catalogid
	  and coalesce(CrossRefs.AdditionalShipping,0) != coalesce(mc.AdditionalShipping,0)

Update eds..Items
   set RTK = 1
  from eds..Items items
  join Catalogs..[Master Catalog] mc on mc.itemid = items.itemid
       and mc.catalogid = @catalogid
 where mc.rtk = 1
   and coalesce(Items.RTK,0) != 1

Update eds..Catalog
   set PostDate = getdate()
  from eds..Catalog catalog
 where Catalog.catalogId = @catalogid
 
print 'Post of Catalog #' + cast(@CatalogId as varchar) + ' Complete'

UPDATE [EDS].[dbo].[PostCatalogHeader]
   SET [PostDateComplete] = getdate()
 WHERE PostCatalogHeaderId = @PostCatalogHeaderId
```
