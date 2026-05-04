# Procedure: `dbo.bid2xlsTest`

_Generated on 2026-05-04T13:07:57.293Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `bid2xlsTest` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-06-26 19:37:54 |
| Modified | 2018-07-23 12:40:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[bid2xlsTest] @pBidHeaderId int
as
declare @DynSql varchar(max),
	@Part1 varchar(max),
	@Part2 varchar(max),
	@Part3 varchar(max),
--	@CatalogId int,
	@VendorId int,
	@CatalogName varchar(50),
	@VendorName varchar(50),
	@BidHeaderId int,
	@BHold int,
	@IncludeManufacturer tinyint

select @BidHeaderId = isnull(@pBidHeaderId,0)

select @IncludeManufacturer = case when BidHeaders.CategoryId in (2,4) then 1 else 0 end
  from BidHeaders
 where BidHeaderId = @BidHeaderId
 
declare CatCur cursor read_only fast_forward for
select Vendors.VendorId, Vendors.Name, isnull((select top 1 bh.BidHeaderId
      from BidHeaders bh
      join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
                       and BidImports.VendorId = Vendors.VendorId
--                     and BidImports.Active = 1
     where bh.CategoryId = BidHeaders.CategoryId
--       and case bh.PricePlanId when 36 then BidHeaders.PricePlanId else bh.PricePlanId end = BidHeaders.PricePlanId
       and bh.Active = 1
       and bh.EffectiveFrom between dateadd(month,-14,isnull(min(BidHeaders.EffectiveFrom),cast('11/01/' + cast(year(getdate()) as char(4)) as datetime))) and dateadd(month,-10,isnull(max(BidHeaders.EffectiveFrom),cast('11/01/' + cast(year(getdate()) as char(4)) as datetime)))
       and bh.EffectiveUntil between dateadd(month,-14,isnull(min(BidHeaders.EffectiveUntil),cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime))) and dateadd(month,-10,isnull(max(BidHeaders.EffectiveUntil),cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime)))
     order by bh.BidheaderId desc), BidHeaders.BidHeaderId)
  from BidHeaders
  join BidHeaders bhold on bhold.BidHeaderId in 
   (select bh.BidHeaderId
      from BidHeaders bh
      join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
--                     and BidImports.Active = 1
     where bh.CategoryId = BidHeaders.CategoryId
--       and case bh.PricePlanId when 36 then BidHeaders.PricePlanId else bh.PricePlanId end = BidHeaders.PricePlanId
       and bh.Active = 1
       and bh.EffectiveFrom between dateadd(month,-14,isnull(BidHeaders.EffectiveFrom,cast('11/01/' + cast(year(getdate()) as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveFrom,cast('11/01/' + cast(year(getdate()) as char(4)) as datetime)))
       and bh.EffectiveUntil between dateadd(month,-14,isnull(BidHeaders.EffectiveUntil,cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveUntil,cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime))))
   join BidImports on BidImports.BidHeaderId = bhold.BidHeaderId
--   join BidImportCatalogList bicl on bicl.BidImportId = BidImports.BidImportId
--   join Catalog on Catalog.CatalogId = bicl.CatalogId
   join Vendors on Vendors.VendorId = BidImports.VendorId
               and Vendors.Active = 1
 where BidHeaders.BidHeaderId = @BidHeaderId
 group by Vendors.VendorId, Vendors.Name, BidHeaders.CategoryId, bhold.BidHeaderId, BidHeaders.BidHeaderId
union (
select Vendors.VendorId, Vendors.Name, isnull((select top 1 bh.BidHeaderId
      from BidHeaders bh
      join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
--                     and BidImports.Active = 1
     where bh.CategoryId = BidHeaders.CategoryId
--       and case bh.PricePlanId when 36 then BidHeaders.PricePlanId else bh.PricePlanId end = BidHeaders.PricePlanId
       and bh.Active = 1
       and bh.EffectiveFrom between dateadd(month,-14,isnull(BidHeaders.EffectiveFrom,cast('11/01/' + cast(year(getdate()) as char(4)) as datetime))) and dateadd(month,-10,isnull(BidHeaders.EffectiveFrom,cast('11/01/' + cast(year(getdate()) as char(4)) as datetime)))
       and bh.EffectiveUntil between dateadd(month,-14,isnull(BidHeaders.EffectiveUntil,cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime))) and dateadd(month,-10,isnull(BidHeaders.EffectiveUntil,cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime)))
     order by bh.BidheaderId desc), BidHeaders.BidHeaderId)
  from Vendors with (nolock)
  join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId
 where cast(Vendors.VendorId as varchar(20)) in (select case BidHeaders.CategoryId
                                                          when 4 then '455'
                                                          when 7 then '947'
--                                                          when 11 then '947'
                                                        end)
      )
 order by Vendors.VendorId
/*
select Vendors.VendorId, Vendors.Name, bhold.BidHeaderId
  from BidHeaders
  join BidHeaders bhold on bhold.BidHeaderId = 
   (select top 1 bh.BidHeaderId
      from BidHeaders bh
      join BidImports on BidImports.BidHeaderId = bh.BidHeaderId
--                     and BidImports.Active = 1
     where bh.CategoryId = BidHeaders.CategoryId
--       and case bh.PricePlanId when 36 then BidHeaders.PricePlanId else bh.PricePlanId end = BidHeaders.PricePlanId
       and bh.Active = 1
       and bh.EffectiveFrom between dateadd(month,-13,isnull(BidHeaders.EffectiveFrom,cast('11/01/' + cast(year(getdate()) as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveFrom,cast('11/01/' + cast(year(getdate()) as char(4)) as datetime)))
       and bh.EffectiveUntil between dateadd(month,-13,isnull(BidHeaders.EffectiveUntil,cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveUntil,cast('11/01/' + cast(year(getdate()) + 1 as char(4)) as datetime)))
     order by bh.BidheaderId desc)
   join BidImports on BidImports.BidHeaderId = bhold.BidHeaderId
--   join BidImportCatalogList bicl on bicl.BidImportId = BidImports.BidImportId
--   join Catalog on Catalog.CatalogId = bicl.CatalogId
   join Vendors on Vendors.VendorId = BidImports.VendorId
 where BidHeaders.BidHeaderId = @BidHeaderId
 group by Vendors.VendorId, Vendors.Name, bhold.BidHeaderId
 order by Vendors.VendorId
*/

open CatCur

select @Part1 = '',
       @Part2 = '',
       @Part3 = ''

fetch next from CatCur into @VendorId, @VendorName, @BHold


while @@fetch_status = 0
begin
/*
  select @Part1 = @Part1 +
		' isnull(xr' + cast(@VendorId as varchar(16)) + '.VendorItemCode,'''') as [' + @VendorName + ' Item Code],' +
        case when @IncludeManufacturer = 1 then ' isnull(xr' + cast(@VendorId as varchar(16)) + '.Manufacturor,'''') as [' + @VendorName + ' Manufacturer],' else '' end +
        ' isnull(xr' + cast(@VendorId as varchar(16)) + '.ManufacturorPartNumber,'''') as [' + @VendorName + ' Manufacturer Part Number],' +
		' isnull(xr' + cast(@VendorId as varchar(16)) + '.Page,'''') as [Catalog Page],' +
		' isnull(cat' + cast(@VendorId as varchar(16)) + '.Name,'''') as [Catalog Name],' +
		' isnull(br' + cast(@VendorId as varchar(16)) + '.VendorItemCode,'''') as [Last Item Bid],' +
		' isnull(cast(br' + CAST(@VendorId as varchar(16)) + '.BidHeaderId as varchar(16)),'''') as [Last Bid],'

  select @Part2 = @Part2 +
		' left outer join Crossrefs xr' + cast(@VendorId as varchar(16)) + ' on xr' + cast(@VendorId as varchar(16)) + '.ItemId = Items.ItemId and xr' + cast(@VendorId as varchar(16)) + '.CrossRefId = ' +
		' (select top 1 CrossRefs.CrossRefId ' +
		' from Crossrefs with (nolock)' +
		' join Catalog on Catalog.CatalogId = CrossRefs.CatalogId' +
		' and Catalog.VendorId = ' + cast(@VendorId as varchar(16)) +
		' and Catalog.Active = 1' +
		' where CrossRefs.ItemId = Items.ItemId ' +
		' and CrossRefs.Active = 1' +
		' order by Crossrefs.CatalogYear desc, CrossRefs.CrossRefId desc)' +
		' left outer join Catalog cat' + cast(@VendorId as varchar(16)) + ' on cat' + cast(@VendorId as varchar(16)) + '.CatalogId = xr' + cast(@VendorId as varchar(16)) + '.CatalogId' +
		' left outer join BidResults br' + cast(@VendorId as varchar(16)) + ' on br' + cast(@VendorId as varchar(16)) + '.BidResultsId = ' +
		' (select top 1 BidResults.BidResultsId ' +
		' from BidResults with (nolock)' +
		' join BidImports on BidImports.BidImportId = BidResults.BidImportId' +
		' and BidImports.VendorId = ' + cast(@VendorId as varchar(16)) +
		' join BidHeaders bh on bh.BidHeaderId = BidImports.BidHeaderId' +
        ' and bh.CategoryId = BidHeaders.CategoryId' +
        ' and bh.Active = 1' +
        ' and bh.EffectiveFrom between dateadd(month,-13,isnull(BidHeaders.EffectiveFrom,cast(''11/01/'' + cast(year(getdate()) as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveFrom,cast(''11/01/'' + cast(year(getdate()) as char(4)) as datetime)))' +
        ' and bh.EffectiveUntil between dateadd(month,-13,isnull(BidHeaders.EffectiveUntil,cast(''11/01/'' + cast(year(getdate()) + 1 as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveUntil,cast(''11/01/'' + cast(year(getdate()) + 1 as char(4)) as datetime)))' +
		' where BidResults.ItemId = Items.ItemId' +
		' and BidResults.Active = 1' +
		' order by bh.BidType, case bh.PricePlanId when BidHeaders.PricePlanId then 0 else bh.PricePlanId end, bh.BidHeaderId, BidImports.Active desc, BidResults.BidResultsId)'
*/
  select @Part1 = @Part1 +
		' isnull(xr' + cast(@VendorId as varchar(16)) + '.VendorItemCode,'''') as [' + @VendorName + ' Item Code],' +
        case when @IncludeManufacturer = 1 then ' isnull(xr' + cast(@VendorId as varchar(16)) + '.Manufacturor,'''') as [' + @VendorName + ' Manufacturer],' else '' end +
        ' isnull(xr' + cast(@VendorId as varchar(16)) + '.ManufacturorPartNumber,'''') as [' + @VendorName + ' Manufacturer Part Number],' +
		' isnull(xr' + cast(@VendorId as varchar(16)) + '.Page,'''') as [Catalog Page],' +
		' isnull(xr' + cast(@VendorId as varchar(16)) + '.Name,'''') as [Catalog Name],' +
		' isnull(br' + cast(@VendorId as varchar(16)) + '.VendorItemCode,'''') as [Last Item Bid],' +
		' isnull(cast(br' + CAST(@VendorId as varchar(16)) + '.BidHeaderId as varchar(16)),'''') as [Last Bid],'

  select @Part2 = @Part2 +
		' outer apply (select top 1 CrossRefs.CrossRefId, CrossRefs.VendorItemCode, CrossRefs.Manufacturor, CrossRefs.ManufacturorPartNumber, CrossRefs.Page, Catalog.Name ' +
		'                from CrossRefs with (nolock)' +
		'				 join Catalog on Catalog.CatalogId = CrossRefs.CatalogId' +
		'				             and Catalog.VendorId = ' + cast(@vendorId as varchar(16)) +
		'							 and Catalog.Active = 1' +
		'				where CrossRefs.ItemId = Items.ItemId' +
		'               order by Crossrefs.CatalogYear desc, CrossRefs.CrossRefId desc) xr' + cast(@VendorId as varchar(16)) + 
		' outer apply (select top 1 BidResults.BidResultsId, BidResults.VendorItemCode, bh.BidHeaderId ' +
		'                from BidResults with (nolock)' +
		'                join BidImports on BidImports.BidImportId = BidResults.BidImportId' +
		'                               and BidImports.VendorId = ' + cast(@VendorId as varchar(16)) + 
		'                join BidHeaders bh on bh.BidHeaderId = BidImports.BidHeaderId' +
		'                                  and bh.CategoryId = BidHeaders.CategoryId' +
		'                                  and bh.Active = 1' +
        '                                  and bh.EffectiveFrom between dateadd(month,-13,isnull(BidHeaders.EffectiveFrom,cast(''11/01/'' + cast(year(getdate()) as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveFrom,cast(''11/01/'' + cast(year(getdate()) as char(4)) as datetime)))' +
        '                                  and bh.EffectiveUntil between dateadd(month,-13,isnull(BidHeaders.EffectiveUntil,cast(''11/01/'' + cast(year(getdate()) + 1 as char(4)) as datetime))) and dateadd(month,-11,isnull(BidHeaders.EffectiveUntil,cast(''11/01/'' + cast(year(getdate()) + 1 as char(4)) as datetime)))' +
		' where BidResults.ItemId = Items.ItemId' +
		' and BidResults.Active = 1' +
		' order by bh.BidType, case bh.PricePlanId when BidHeaders.PricePlanId then 0 else bh.PricePlanId end, bh.BidHeaderId, BidImports.Active desc, BidResults.BidResultsId) br' + cast(@VendorId as varchar(16))

  select @Part3 = @Part3 +
		'''' + replace(@VendorName,'''','') + ' Item Code'',''Page'',''Catalog Name'',''Last Item Bid'',''Last Bid'',' 

  fetch next from CatCur into @VendorId, @VendorName, @BHold
end

close CatCur
deallocate CatCur

/*
select @DynSql= 'select top 1 ''Item Code'', ''Description'', ''Quantity'', ''Locations'', ''Unit Code'',' +
		@Part3 +
		' ''Last Column''' +
		' from BidRequestItems with (nolock)' +
		' join BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId' +
		' join Items on Items.ItemId = BidRequestItems.ItemId' +
		' join Units on Units.UnitId = Items.UnitId' +
		' where BidRequestItems.BidHeaderId = ' + cast(@BidHeaderId as varchar(16)) +
		' and BidRequestItems.Active = 1' +
		' order by Items.SortSeq'
*/
--print @DynSql
--exec(@DynSql)

select @DynSql= 'select Items.ItemCode as [Item Code], ' +
		' ltrim(dbo.uf_ItemDescription(Items.ItemId)) Description,' +
		' BidRequestItems.BidRequest as Quantity,' +
		' BidRequestItems.RequisitionCount as Locations,' +
		' Units.Code as [Unit Code],' +
		' isnull(Headings.Title,'''') [Heading], ' +
		' isnull(Keywords.Keyword,'''') [Keyword], ' +
		@Part1 +
		'''*'' as [Last Column]' +
		' from BidRequestItems with (nolock)' +
		' join BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId' +
		' join Items on Items.ItemId = BidRequestItems.ItemId' +
		' join Units on Units.UnitId = Items.UnitId' +
		' left outer join Headings on Headings.HeadingId = Items.HeadingId' +
		' left outer join Keywords on Keywords.KeywordId = Items.KeywordId' +
		@Part2 +
		' where BidRequestItems.BidHeaderId = ' + cast(@BidHeaderId as varchar(16)) +
		' and BidRequestItems.Active = 1' +
		' order by Items.SortSeq'

print @DynSql
exec(@DynSql)
```
