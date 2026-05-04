# Procedure: `dbo.sp_PostCatalogBG2013`

_Generated on 2026-05-04T13:43:20.009Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PostCatalogBG2013` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-02-19 14:16:48 |
| Modified | 2018-01-22 20:51:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Master Catalog` | USER_TABLE |  |
| `Master Catalog` | USER_TABLE | `Catalogs` |
| `Catalog` | unresolved | `eds` |
| `CrossRefs` | unresolved | `eds` |
| `Items` | unresolved | `eds` |
| `dbo.Catalog` | unresolved | `eds` |
| `dbo.CrossRefs` | unresolved | `eds` |
| `dbo.Items` | unresolved | `eds` |
| `dbo.Units` | unresolved | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_PostCatalogBG2013] @pCatalogId int as
declare @catalogId int
select @CatalogId = @pCatalogId

print 'Reset Item Matches'
Update [Master Catalog]
   set CrossRefId = null,
       ItemId = null
 where CatalogId = @CatalogId

print 'Match Existing Cross References'

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
Update [Master Catalog]
   set -- CrossRefId = CrossRefs.CrossRefId,
       ItemId = CrossRefs.ItemId
--select *
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = Catalog1.CatalogId
                                  and Crossrefs.PackedCode = mc.PackedCode
                                  and case isnull(Catalog.ImportFormat,1) 
                                      when 1 then isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'') 
                                      else isnull(ltrim(rtrim(CrossRefs.ManufacturorPartNumber)),'') 
                                      end = isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'')
--                                  and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
option (Force Order)



-- Special code for Brodhead Garrett 2013
-- If Not ItemId yet, Match PackedCode on AlternatePartNumber in Master catalog for CatalogId = 2278/2281
Update mca
   set ItemId = mcB.ItemId
--select *
  from [Master Catalog] mcA
--  join [Master Catalog] mcB on mcB.CatalogId = 2278 and mcB.AlternatePartNumber = mcA.PackedCode  -- technology
  join [Master Catalog] mcB on mcB.CatalogId = 2281 and mcB.AlternatePartNumber = mcA.PackedCode  -- Rocketry
 where mcA.CrossRefId is null
   and mcA.ItemId is null
   and mcA.CatalogId = @CatalogId
option (Force Order)




/*
update [Master Catalog]
   set CrossRefId = null,
       ItemId = null
 where CatalogId = 717

select * from edstest..catalog where CategoryId = 7 order by VendorId
select * from edstest..CrossRefs where CatalogId = 717 and active = 1
select * from [Master Catalog] where catalogId = 717 order by PackedCode
select * from [Master Catalog] where catalogId = 17 order by PackedCode
select *
  from [Master Catalog] mc1
  join [Master Catalog] mc2 on mc2.PackedCode = mc1.PackedCode
                           and mc2.CatalogId = 717
 where mc1.CatalogId = 17

*/

print 'Match Existing Items'

-- Match Existing Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
       and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
       and isnull(Items.ManufacturorNumber,'') = 
           case isnull(Catalog.ImportFormat,1) 
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
           else case isnull(Items.ManufacturorNumber,'') 
                when '' then isnull(Items.ManufacturorNumber,'') 
                else isnull(mc.ManufacturorPartNumber,'') 
                end 
           end
       and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
option (Force Order)
/*
-- Match Existing Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
                          and Items.PackedCode = eds.dbo.uf_PackCode(mc.PackedCode)
                          and isnull(Items.ManufacturorNumber,'') = case Catalog.ImportFormat when 1 then isnull(Items.ManufacturorNumber,'') when 2 then isnull(mc.ManufacturorPartNumber,'') else isnull(mc.ManufacturorPartNumber,'') end
                          and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
option (Force Order)
*/
print 'Inserting Missing Unit Codes'

-- Create Missing Unit Codes
insert eds.dbo.Units (Active, Code)
  select 1, ltrim(rtrim(mc.UnitCode))
    from [Master Catalog] mc
    left outer join eds.dbo.Units Units on isnull(Units.Code,'EACH') = isnull(ltrim(rtrim(mc.UnitCode)),'EACH')
                                       and Units.Active = 1
   where Units.UnitId is null
     and mc.CatalogId = @CatalogId
   group by mc.UnitCode

print 'Insert Missing Items'

-- Create Missing Items
insert eds.dbo.Items (Active, CategoryId, ItemCode, Description, UnitId)
  select 1, Catalog.CategoryId, isnull(Catalog.Prefix,'') + mc.PackedCode, mc.Description, Units.UnitId
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
    join eds.dbo.Units Units on Units.Code = isnull(ltrim(rtrim(mc.UnitCode)),'EACH')
                            and Units.Active = 1
    left outer join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
         and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
         and isnull(Items.ManufacturorNumber,'') = 
             case isnull(Catalog.ImportFormat,1) 
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
             else case isnull(Items.ManufacturorNumber,'') 
                  when '' then isnull(Items.ManufacturorNumber,'') 
                  else isnull(mc.ManufacturorPartNumber,'') 
                  end 
             end
         and Items.Active = 1
   where mc.ItemId is null
     and mc.CatalogId = @CatalogId
     and Items.ItemId is null
   group by Catalog.CategoryId, mc.PackedCode, mc.Description, Units.UnitId, Catalog.Prefix
option (Force Order)

print 'Match Newly Created Items'

-- Match Newly Created Items
Update [Master Catalog]
   set ItemId = Items.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Items Items on Items.CategoryId = Catalog.CategoryId
                          and Items.PackedCode = isnull(Catalog.Prefix,'') + mc.PackedCode
                          and isnull(Items.ManufacturorNumber,'') = 
                              case isnull(Catalog.ImportFormat,1) 
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
                              else case isnull(Items.ManufacturorNumber,'') 
                                   when '' then isnull(Items.ManufacturorNumber,'') 
                                   else isnull(mc.ManufacturorPartNumber,'') 
                                   end 
                              end
                          and Items.Active = 1
 where mc.ItemId is null
   and mc.CatalogId = @CatalogId
option (Force Order)

print 'Create EDS CrossRef Entries'

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
option (Force Order)

print 'Create Catalog CrossRef Entries'

-- Create Missing CrossRef Entries for Catalog
insert eds.dbo.CrossRefs (Active, ItemId, VendorItemCode, CatalogId, CatalogPrice, Page, CatalogYear, CrossRefLocation, Manufacturor, ManufacturorPartNumber, DateUpdated, GrossPrice, DoNotDiscount, FullDescription)
  select 1, mc.ItemId, mc.VendorItemCode, mc.CatalogId, mc.CatalogPrice, right('    ' + convert(varchar(10),mc.PageNumber),4), Catalog.CatalogYear, Catalog.CrossRefLetter, mc.Manufacturor, mc.ManufacturorPartNumber, getdate(), mc.GrossPrice, mc.NoDiscount, mc.Description
    from [Master Catalog] mc
    join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.catalogId
    left outer join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
         and Crossrefs.PackedCode = mc.PackedCode
         and case isnull(Catalog.ImportFormat,1) 
             when 1 then isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'') 
             else isnull(ltrim(rtrim(CrossRefs.ManufacturorPartNumber)),'') 
             end = isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'')
--         and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
         and Crossrefs.Active = 1
   where mc.CrossRefId is null
     and Crossrefs.CrossRefId is null
     and mc.CatalogId = @Catalogid
option (Force Order)

print 'Match New CrossRefs'

-- Match Newly Created CrossRefs
Update [Master Catalog]
   set CrossRefId = CrossRefs.CrossRefId
--       ItemId = CrossRefs.ItemId
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = mc.CatalogId
                                  and Crossrefs.PackedCode = mc.PackedCode
                                  and case isnull(Catalog.ImportFormat,1) 
                                      when 1 then isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'') 
                                      else isnull(ltrim(rtrim(CrossRefs.ManufacturorPartNumber)),'') 
                                      end = isnull(ltrim(rtrim(mc.ManufacturorPartNumber)),'')
--                                  and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
                                  and Crossrefs.Active = 1
 where mc.CrossRefId is null
   and mc.CatalogId = @CatalogId
option (Force Order)

-- Update Pages,Prices, etc...
Update eds.dbo.CrossRefs
   set CatalogYear = Catalog.CatalogYear,
       Page = right('    ' + convert(varchar(16),mc.PageNumber),4),
       CatalogPrice = mc.CatalogPrice,
       GrossPrice = mc.GrossPrice,
       DoNotDiscount = mc.NoDiscount,
       DateUpdated = getdate(),
       FullDescription = mc.Description
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.CrossRefs CrossRefs on CrossRefs.CrossRefId = mc.CrossRefId
 where mc.CatalogId = @CatalogId
option (Force Order)

update eds..CrossRefs
   set Active = 0
  from eds..Crossrefs CrossRefs
  join (
select ItemId, min(CrossRefId) MinCrossrefId
  from eds..CrossRefs
 where isnull(CatalogId,0) = 0
   and active = 1
 group by ItemId
 having count(*) > 1
) ss on ss.ItemId = Crossrefs.Itemid
 where isnull(CrossRefs.CatalogId,0) = 0
   and CrossRefs.active = 1
   and CrossRefs.CrossRefId != ss.MinCrossRefId

Update eds..CrossRefs
   set Catalogid = null
 where active = 1
   and catalogid = 0

Update eds..CrossRefs
   set AdditionalShipping = mc.AdditionalShipping
 from EDS..CrossRefs crossrefs
 join Catalogs..[Master Catalog] mc on mc.crossrefid = crossrefs.crossrefid 
      and mc.catalogid = @catalogid

Update eds..Items
   set RTK = 1
  from eds..Items items
  join Catalogs..[Master Catalog] mc on mc.itemid = items.itemid
       and mc.catalogid = @catalogid
 where mc.rtk = 1

Update eds..Catalog
   set PostDate = getdate()
  from eds..Catalog catalog
 where Catalog.catalogId = @catalogid
```
