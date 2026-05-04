# View: `dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ManufacturerId` | int | YES |  |  |
| 3 | `ManufacturerName` | varchar(100) | NO |  |  |
| 4 | `ManufacturerProductLineId` | int | NO |  |  |
| 5 | `ProductLineName` | varchar(100) | NO |  |  |
| 6 | `MSRPOptionId` | int | NO |  |  |
| 7 | `OptionName` | varchar(50) | NO |  |  |
| 8 | `BidMSRPResultsId` | int | YES |  |  |
| 9 | `BidMSRPResultsProductLineId` | int | YES |  |  |
| 10 | `WriteInManufacturer` | varchar(100) | YES |  |  |
| 11 | `WriteInFlag` | tinyint | YES |  |  |
| 12 | `WinningBidOverride` | tinyint | YES |  |  |
| 13 | `DiscountRate` | decimal(10,5) | NO |  |  |
| 14 | `PriceListTypeId` | int | YES |  |  |
| 15 | `TotalAward` | tinyint | YES |  |  |
| 16 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 17 | `ProductLineWeight` | decimal(9,5) | YES |  |  |
| 18 | `TotalAwardManufacturerWeight` | decimal(38,6) | YES |  |  |
| 19 | `TotalAwardProductLineWeight` | decimal(38,6) | YES |  |  |
| 20 | `SortKey` | varchar(14) | YES |  |  |
| 21 | `PriceListType` | varchar(50) | YES |  |  |
| 22 | `VendorId` | int | YES |  |  |
| 23 | `VendorName` | varchar(50) | YES |  |  |
| 24 | `PriceListWarning` | varchar(28) | NO |  |  |
| 25 | `AllFlag` | int | NO |  |  |
| 26 | `AllActive` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |
| `PriceListTypes` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidMSRPRankedManufacturerProductLines` | VIEW |
| `vw_BidMSRPResultsPrices` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
/*
select *
  from [vw_BidMSRPRankedManufacturerProductLines] r with (nolock)
 where r.BidHeaderId = 5942
   and r.ManufacturerId = 716

select *
  from vw_BidMSRPRankedManufacturerProductLinesOrdered r
 where r.BidHeaderId = 5927
--   and r.ManufacturerId = 716
--   and r.ManufacturerName = 'SPARTAN CHEMICAL COMPANY, INC.'
--   and r.BidMSRPResultsId in ( 20065, 20094) -- 20065, 20094
 order by r.ManufacturerName, r.ProductLineName, r.SortKey


*/
create   view  [dbo].[vw_BidMSRPRankedManufacturerProductLinesOrderedSaved] as
select plo.*, bmr.BidMSRPResultsId, 
       case 
         when bmpl.BidMSRPResultsProductLineId is null then
           bmrpla.BidMSRPResultsProductLineId
         else 
           bmpl.BidMSRPResultsProductLineId
       end BidMSRPResultsProductLineId, 
       bmr.WriteInManufacturer, bmr.WriteInFlag, bmr.WinningBidOverride, 
       case -- Check for Total Award being a better deal
         when isnull(bmr.TotalAward,0) = 1
          and isnull(((select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
                 from vw_BidMSRPResultsPrices bmrp
                where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId)),0) >=
             isnull(((select AVG(bmrp.WeightedDiscount)
                        from vw_BidMSRPResultsPrices bmrp with (nolock)
                       where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                         and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId)),0)
           then -- Total Award is Better
             isnull(((select top 1 bmrp.WeightedDiscount + bmrp.TotalAwardDiscount
                           from vw_BidMSRPResultsPrices bmrp with (nolock)
                          where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                            and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId
-- DCH Changed 4/4/2014                            and bmrp.MSRPOptionId = plo.MSRPOptionId
                            and bmrp.OptionName = plo.OptionName
                          GROUP by bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)),0)
         else -- Line Award is better
             isnull(((select top 1 bmrp.WeightedDiscount
                        from vw_BidMSRPResultsPrices bmrp with (nolock)
                       where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                         and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId
-- DCH Change 4/4/2014                         and bmrp.MSRPOptionId = plo.MSRPOptionId
                         and bmrp.OptionName = plo.OptionName
                       group by bmrp.WeightedDiscount)),0)
       end
       DiscountRate, 
       bmr.PriceListTypeId, bmr.TotalAward, bmr.TotalAwardDiscount,
       (select max(bmrp.WeightedDiscount)
          from vw_BidMSRPResultsPrices bmrp with (nolock)
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId
           and bmrp.OptionName = plo.OptionName) ProductLineWeight,
       (select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
          from vw_BidMSRPResultsPrices bmrp with (nolock)
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId) TotalAwardManufacturerWeight,
       (select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
          from vw_BidMSRPResultsPrices bmrp with (nolock)
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId) TotalAwardProductLineWeight,
       case 
         when bmr.Active = 1 and bmpl.Active = 1 and bi.Active = 1 then '0'
         else '1'
       end +
       Case 
         when bmr.WinningBidOverride = 1 then '0' 
         else '1' 
       end + 
       right(replicate('0',12) + 
             cast(cast(9999999999 - 
			   case -- Check for Total Award being a better deal
				 when isnull(bmr.TotalAward,0) = 1
				  and isnull(((select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
						 from vw_BidMSRPResultsPrices bmrp
						where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId)),0) >=
					 isnull(((select AVG(bmrp.WeightedDiscount)
								from vw_BidMSRPResultsPrices bmrp with (nolock)
							   where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
								 and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId)),0)
				   then -- Total Award is Better
					 isnull(((select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
								   from vw_BidMSRPResultsPrices bmrp with (nolock)
								  where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
									and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId)),0) * 10000
				 else -- Line Award is better
					 isnull(((select AVG(bmrp.WeightedDiscount)
								from vw_BidMSRPResultsPrices bmrp with (nolock)
							   where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
								 and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId)),0) * 10000
			   end as bigint) 
                   as varchar),12) SortKey,
       plt.Name PriceListType,
       Vendors.VendorId,
       Vendors.Name VendorName,
       case (select count(*)
               from (select bmr1.PriceListTypeId
                       from BidMSRPResults bmr1 with (nolock)
                       join BidImports bi1 on bi1.BidImportId = bmr1.BidImportId
                                          and bi1.Active = 1
                                          and bi1.BidHeaderId = plo.BidHeaderId
                      where bmr1.ManufacturerId = bmr.ManufacturerId
                      group by bmr1.PriceListTypeId) ss)
         when 0 then '*** No Bid ***'
         when 1 then 
           case 
             when (select top 1 bmr1.PriceListTypeId
                     from BidMSRPResults bmr1 with (nolock)
                     join BidImports bi1 on bi1.BidImportId = bmr1.BidImportId
                                        and bi1.Active = 1
                                        and bi1.BidHeaderId = plo.BidHeaderId
                    where bmr1.ManufacturerId = bmr.ManufacturerId
                    group by bmr1.PriceListTypeId) = 1 then 'All Manufacturer Price Lists'
             else 'All Vendor Price Lists'
           end
         else
           'Mixed Price List Types'
       end PriceListWarning, 
       case when Upper(Ltrim(Rtrim(PLO.ProductLineName)))='ALL' then 1 else 0 end AllFlag,
       case when bmr.Active = 1 and bmpl.Active = 1 and bi.Active = 1 then 1 else 0 end as AllActive
  from [vw_BidMSRPRankedManufacturerProductLines] plo with (nolock)
  left outer join BidMSRPResults bmr on bmr.BidHeaderId = plo.BidHeaderId
                                    and bmr.ManufacturerId = plo.ManufacturerId
--                                    and bmr.Active = 1
  left outer join BidMSRPResultsProductLines bmpl on bmpl.BidMSRPResultsId = bmr.BidMSRPResultsId
--                                                 and bmpl.Active = 1
                                                 and bmpl.ManufacturerProductLineId = plo.ManufacturerProductLineId
                                                 and bmpl.OptionName = plo.OptionName
  left outer join BidMSRPResultsProductLines bmrpla on bmrpla.BidMSRPResultsProductLineId =      
    (select /*Top 1*/bmrpls.BidMSRPResultsProductLineId         
       from BidMSRPResults bmrs1         
       join BidMSRPResultsProductLines bmrpls on bmrpls.BidMSRPResultsId = bmrs1.BidMSRPResultsId                                               
                                             and bmrpls.Active = 1  
-- DCH Changed 4/4/2014                                             and bmrpls.MSRPOptionId = plo.MSRPOptionId       
                                             and bmrpls.OptionName = plo.OptionName
       join ManufacturerProductLines mpls on mpls.ManufacturerProductLineId = bmrpls.ManufacturerProductLineId                                           
                                         and mpls.Active = 1                                           
                                         and mpls.Name = 'ALL'        
      where bmrs1.Active = 1          
        and bmrs1.BidMSRPResultsId = bmr.BidMSRPResultsId)
  left outer join BidImports bi on bi.BidImportId = bmr.BidImportId
  left outer join PriceListTypes plt on plt.PriceListTypeId = bmr.PriceListTypeId
  left outer join Vendors on Vendors.VendorId = bi.VendorId
-- where plo.BidHeaderId = 5784
 where not (    bmpl.BidMSRPResultsProductLineId is null
            and bmrpla.BidMSRPResultsProductLineId is not null)
```
