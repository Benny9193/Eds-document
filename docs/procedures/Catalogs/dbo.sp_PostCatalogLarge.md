# Procedure: `dbo.sp_PostCatalogLarge`

_Generated on 2026-05-04T13:07:58.737Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PostCatalogLarge` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-01-22 15:24:46 |
| Modified | 2018-01-22 20:51:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Items` | unresolved |  |
| `Master Catalog` | USER_TABLE |  |
| `mc` | unresolved |  |
| `mc1` | unresolved |  |
| `Master Catalog` | USER_TABLE | `Catalogs` |
| `dbo.Master Catalog` | USER_TABLE | `Catalogs` |
| `Catalog` | unresolved | `eds` |
| `Items` | unresolved | `eds` |
| `dbo.Catalog` | unresolved | `EDS` |
| `dbo.CrossRefs` | unresolved | `eds` |
| `dbo.Items` | unresolved | `eds` |
| `dbo.uf_PackCodeCatalog` | unresolved | `eds` |
| `dbo.Units` | unresolved | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_PostCatalogLarge] @pCatalogId int as
declare @catalogId int, @ImportFormat int, @CategoryId int, @Pass int, @CurrentId int, @StartId int, @EndId int, @MaxId int

set transaction isolation level read uncommitted

select @CatalogId = CatalogId, @ImportFormat = ImportFormat, @CategoryId = CategoryId
  from EDS.dbo.Catalog
 where CatalogId = @pCatalogId

print 'Begining Post of Catalog #' + cast(@CatalogId as varchar)
print 'Check for Blank UniqueItemNumber'
Update mc
   set UniqueItemNumber = eds.dbo.uf_PackCodeCatalog(VendorItemCode,@catalogId)
  from [Master Catalog] mc
 where mc.CatalogId = @catalogId
   and isnull(rtrim(ltrim(mc.UniqueItemNumber)),'') = ''

Update mc
   set ManufacturorPartNumber = ''
  from [Master Catalog] mc
 where mc.CatalogId = @catalogId
   and isnull(rtrim(ltrim(mc.ManufacturorPartNumber)),'') = ''

print 'Remove duplicates involving only multiple pages'
--Select MC1.UniqueItemNumber, MC1.PageNumber, MC2.PageNumber, *
select MC1.SysID into #delList
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

delete mc1
  FROM [Master Catalog] MC1
  join #delList dl on dl.SysId = MC1.SysID

print 'Checking for Unresolved Duplicates'
If Exists
(
SELECT UniqueItemNumber, count(*)
FROM [Catalogs].[dbo].[Master Catalog]
where catalogid=@CatalogId 
group by UniqueItemNumber 
having count(*) > 1
)
BEGIN
  RAISERROR('Unresolved duplicates were found, process cancelled.',16,1)
  return
END

create table #workFile (Id int identity(1,1), SysId int, UniqueItemNumber varchar(50))
insert #workFile(SysId, UniqueItemNumber)
  select SysId, UniqueItemNumber
    from [Master Catalog] 
   where CatalogId = @catalogId 

create unique index SKI_ID_SYSId on #workFile(Id) include(SysId, UniqueItemNumber)

print 'Reset Item Matches'
select @Pass = 0
select @MaxId = MAX(Id) from #WorkFile
while (@Pass * 20000) < @MaxId
begin
	select @Pass = @Pass + 1
	Update mc
	   set CrossRefId = null,
		   ItemId = null
	  from [Master Catalog] mc
	  join #workFile wf on wf.SysID = mc.SysID
	                   and wf.Id between (((@Pass - 1) * 20000) + 1) and (@Pass * 20000)
	-- where mc.CatalogId = @CatalogId
end

print 'Match Existing Cross References'

-- Use for Same Catalog just Different Year 
select @Pass = 0
while (@Pass * 20000) < @MaxId
begin
	select @Pass = @Pass + 1
	Update [Master Catalog]
	   set ItemId = CrossRefs.ItemId
	--select *
	  from [Master Catalog] mc
	  join #workFile wf on wf.SysID = mc.SysID
	                   and wf.Id between (((@Pass - 1) * 20000) + 1) and (@Pass * 20000)
	  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
	  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
								   and Catalog1.VendorId = Catalog.VendorId
								   and Catalog1.Active = 1
								   and Catalog1.CatalogId != Catalog.CatalogId
	  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = Catalog1.CatalogId
									  and (   CrossRefs.UniqueItemNumber = mc.UniqueItemNumber
										   or Crossrefs.UniqueItemNumber is null)
--									  and isnull(CrossRefs.UniqueItemNumber,'') = isnull(mc.UniqueItemNumber,'')
									  and Crossrefs.Active = 1
	 where mc.CrossRefId is null
	   and mc.CatalogId = @CatalogId

end
--option (Force Order)
/*
print 'Match Existing Items'

-- Match Existing Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
       and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
       and isnull(Items.ManufacturorNumber,'') = isnull(mc.ManufacturorPartNumber,'') 
       and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)
*/
print 'Inserting Missing Unit Codes'

-- Create Missing Unit Codes
  select 1 Active, mc.UnitCode Code
   into #newUnits
    from [Master Catalog] mc with (nolock)
    left outer join eds.dbo.Units Units on isnull(Units.Code,'EACH') = isnull(mc.UnitCode,'EACH')
                                       and Units.Active = 1
   where Units.UnitId is null
     and mc.CatalogId = @CatalogId
   group by mc.UnitCode

insert eds.dbo.Units (Active, Code)
  select Active, Code
    from #NewUnits
    
print 'Insert Missing Items'

-- Create Missing Items
  select 1 Active, Catalog.CategoryId, isnull(Catalog.Prefix,'') + mc.PackedCode ItemCode, mc.Description, Units.UnitId, mc.ManufacturorPartNumber ManufacturerNumber, max(SysId) maxSysId
   into #newItems
    from [Master Catalog] mc with (nolock)
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
    join eds.dbo.Units Units on Units.Code = isnull(mc.UnitCode,'EACH')
                            and Units.Active = 1
   where mc.ItemId is null
     and mc.CatalogId = @CatalogId
   group by Catalog.CategoryId, mc.PackedCode, mc.Description, Units.UnitId, Catalog.Prefix, mc.ManufacturorPartNumber
--option (Force Order)

create unique clustered index SKI_SysId on #NewItems(maxSysId)

select @StartId = MIN(MaxSysId),@EndId = max(maxSysId)
  from #NewItems

select @Pass = 0
while @Pass >= 0
begin
	select @Pass = @Pass + 1
	insert eds.dbo.Items (Active, CategoryId, ItemCode, Description, UnitId, ManufacturorNumber)
	  select Active, CategoryId, ItemCode, Description, UnitId, ManufacturerNumber
		from #NewItems ni
       where ni.MaxSysId between (((@Pass - 1) * 20000) + @StartId) and ((@Pass * 20000) + @StartId - 1)
	if @@ROWCOUNT = 0 and (((@Pass - 1) * 20000) + @StartId) > @EndId
	begin
		Select @Pass = -1
	end
end

print 'Match Newly Created Items'

-- Match Newly Created Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join #newItems ni on ni.MaxSysId = mc.SysId
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
                          and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
                          and (   Items.ManufacturorNumber = mc.ManufacturorPartNumber
                               or Items.ManufacturorNumber is null)
 --                         and isnull(Items.ManufacturorNumber,'') = isnull(mc.ManufacturorPartNumber,'') 
                          and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
--option (Force Order)

print 'Create EDS CrossRef Entries'

-- Create New CrossRef Entries
  select 1 Active, Items.ItemId, Items.ItemCode VendorItemCode, getdate() DateUpdated
   into #newCrossRefs
    from eds.dbo.Items Items with (nolock)
    join #newItems ni on ni.CategoryId = Items.CategoryId
                     and ni.ItemCode = Items.ItemCode
                     and isnull(ni.ManufacturerNumber,'') = isnull(Items.ManufacturorNumber,'')
    join eds.dbo.Catalog Catalog on Catalog.CategoryId = Items.CategoryId
                                and Catalog.CatalogId = @CatalogId
    left outer join eds.dbo.CrossRefs CrossRefs on CrossRefs.ItemId = Items.ItemId
                                               and CrossRefs.Active = 1
--                                               and isnull(Crossrefs.CatalogId,0) = 0
                                               and (   Crossrefs.CatalogId = 0
                                                    or CrossRefs.CatalogId is null)
   where Items.Active = 1
     and CrossRefs.CrossrefId is null
--     and Catalog.CatalogId = @CatalogId
   group by Items.ItemId, Items.ItemCode
--option (Force Order)

	insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, DateUpdated)
	  select Active, ItemId, VendorItemCode, DateUpdated
		from #newCrossRefs
    
print 'Create Catalog CrossRef Entries'

-- Create Missing CrossRef Entries for Catalog
  select mc.SysId, 1 Active, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4) Page, Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate() DateUpdated, mc.GrossPrice, mc.NoDiscount, mc.Description FullDescription, mc.UniqueItemNumber
   into #newXRefs
    from [Master Catalog] mc with (nolock)
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.catalogId
    left outer join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
--         and isnull(CrossRefs.UniqueItemNumber,'') = isnull(mc.UniqueItemNumber,'')
         and (   CrossRefs.UniqueItemNumber = mc.UniqueItemNumber
              or Crossrefs.UniqueItemNumber is null)
         and Crossrefs.Active = 1
   where mc.CrossRefId is null
     and Crossrefs.CrossRefId is null
     and mc.CatalogId = @Catalogid

create unique clustered index SKI_SysId on #newXRefs(SysId)

insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription, UniqueItemNumber)
  select Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLetter, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, NoDiscount, FullDescription, UniqueItemNumber
    from #newXRefs
    
print 'Match New CrossRefs'

-- Match Newly Created CrossRefs
select mc.SysID, CrossRefs.CrossRefId, Catalog.CatalogYear into #updXref
  from [Master Catalog] mc
  join #newXrefs xr on xr.SysId = mc.SysId
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
                                  and (   CrossRefs.UniqueItemNumber = mc.UniqueItemNumber
                                       or Crossrefs.UniqueItemNumber is null)
                                  and Crossrefs.Active = 1
 where mc.CatalogId = @CatalogId

create Unique index SKI_SYSId_CrossRefYear on #updXRef(SysId) include(CrossRefId, CatalogYear)

-- Update Pages,Prices, etc...
Update eds.dbo.CrossRefs
   set CatalogYear = ux.CatalogYear,
       Page = right('    ' + convert(varchar(16),mc.PageNumber),4),
       CatalogPrice = mc.CatalogPrice,
       GrossPrice = mc.GrossPrice,
       DoNotDiscount = mc.NoDiscount,
       DateUpdated = getdate(),
       FullDescription = mc.Description,
       AdditionalShipping = mc.AdditionalShipping,
       CrossRefId = ux.CrossRefId
  from [Master Catalog] mc
  join #updXref ux on ux.sysId = mc.SysID
  join eds.dbo.CrossRefs CrossRefs on CrossRefs.CrossRefId = ux.CrossRefId
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
/*
Update eds..CrossRefs
   set Catalogid = null
 where active = 1
   and catalogid = 0
*/

select items.ItemId into #rtkItems
  from eds..Items items
  join Catalogs..[Master Catalog] mc on mc.itemid = items.itemid
       and mc.catalogid = @catalogid
  join #newItems ni on ni.maxSysId = mc.SysId
 where mc.rtk = 1
   and (Items.RTK = 0 or Items.RTK is null)

Update Items
   set RTK = 1
  from eds..Items items
  join #rtkItems ri on ri.ItemId = items.ItemId

Update Catalog
   set PostDate = getdate()
  from eds..Catalog catalog
 where Catalog.catalogId = @catalogid
 
print 'Post of Catalog #' + cast(@CatalogId as varchar) + ' Complete'
```
