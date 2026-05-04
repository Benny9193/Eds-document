# View: `dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 13 | `DiscountRate` | decimal(38,6) | YES |  |  |
| 14 | `PriceListTypeId` | int | YES |  |  |
| 15 | `TotalAward` | tinyint | YES |  |  |
| 16 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 17 | `ProductLineWeight` | decimal(9,5) | YES |  |  |
| 18 | `TotalAwardManufacturerWeight` | decimal(38,6) | YES |  |  |
| 19 | `TotalAwardProductLineWeight` | decimal(38,6) | YES |  |  |
| 20 | `SortKey` | varchar(15) | YES |  |  |
| 21 | `PriceListType` | varchar(50) | YES |  |  |
| 22 | `VendorId` | int | YES |  |  |
| 23 | `VendorName` | varchar(50) | YES |  |  |
| 24 | `PriceListWarning` | varchar(28) | NO |  |  |
| 25 | `AllFlag` | int | NO |  |  |
| 26 | `AllActive` | int | NO |  |  |
| 27 | `EntryFiltered` | int | NO |  |  |

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

| Object | Type |
|--------|------|
| [`dbo.BidMgrMSRP2ResultsView`](dbo.BidMgrMSRP2ResultsView.md) | VIEW |
| [`dbo.BidMgrMSRP2VendorReportView`](dbo.BidMgrMSRP2VendorReportView.md) | VIEW |
| [`dbo.BidMgrMSRP2VendorReportViewTemp`](dbo.BidMgrMSRP2VendorReportViewTemp.md) | VIEW |
| `dbo.sp_AwardBidHeader` | SQL_STORED_PROCEDURE |
| `dbo.sp_CopyMSRPVers2Bid` | SQL_STORED_PROCEDURE |
| `dbo.sp_CopyMSRPVers3Bid` | SQL_STORED_PROCEDURE |
| `dbo.sp_CopyMSRPVers4Bid` | SQL_STORED_PROCEDURE |
| [`dbo.vw_WinningMSRPEntryPrices`](dbo.vw_WinningMSRPEntryPrices.md) | VIEW |

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
create   view  [dbo].[vw_BidMSRPRankedManufacturerProductLinesOrdered] as
select plo.*, bmr.BidMSRPResultsId, 
       case 
         when bmpl.BidMSRPResultsProductLineId is null then
           bmrpla.BidMSRPResultsProductLineId
         else 
           bmpl.BidMSRPResultsProductLineId
       end BidMSRPResultsProductLineId, 
       bmr.WriteInManufacturer, bmr.WriteInFlag, bmr.WinningBidOverride, 
/* DCH Removed 4/21/2014 
       case -- Check for Total Award being a better deal
         when isnull(((select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
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
*/
		  coalesce((select AVG(bmrp.WeightedDiscount)
				   	           from vw_BidMSRPResultsPrices bmrp with (nolock)
				              where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
					            and (bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId
					                 or bmrp.ProductLineName = plo.ProductLineName)
					            and bmrp.OptionName = plo.OptionName),
			                (select AVG(bmrp.WeightedDiscount)
					           from vw_BidMSRPResultsPrices bmrp with (nolock)
				              where bmrp.BidMSRPResultsId = bmrpla.BidMSRPResultsId
					            and (bmrp.ManufacturerProductLineId = bmrpla.ManufacturerProductLineId
					                 or bmrp.ProductLineName = plo.ProductLineName)
					            and bmrp.OptionName = plo.OptionName),0) + case when bmr.TotalAward = 1 then bmr.TotalAwardDiscount else 0 end
       DiscountRate, 
       bmr.PriceListTypeId, bmr.TotalAward, bmr.TotalAwardDiscount,
       (select max(bmrp.WeightedDiscount)
          from vw_BidMSRPResultsPrices bmrp with (nolock)
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId
           and bmrp.OptionName = plo.OptionName) ProductLineWeight,
       (select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
          from vw_BidMSRPResultsPrices bmrp with (nolock)
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrp.TotalWeights != 0) TotalAwardManufacturerWeight,
       (select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
          from vw_BidMSRPResultsPrices bmrp with (nolock)
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId
           and bmrp.TotalWeights != 0) TotalAwardProductLineWeight,
       case 
         when bmr.Active = 1 and case when bmpl.BidMSRPResultsProductLineId is null and bmrpla.BidMSRPResultsProductLineId is not null then bmrpla.Active else bmpl.Active end = 1 and bi.Active = 1 then '0'
         else '1'
       end +
       Case 
         when bmr.WinningBidOverride = 1 then '0' 
         else '1' 
       end + 
       case
         when bmr.TotalAward = 1 then '0'
         else '1'
       end +
       right(replicate('0',12) + 
             cast(cast(9999999999 - 
/* DCH Removed 4/21/2014
			   case -- Check for Total Award being a better deal
				 when isnull(((select AVG(bmrp.WeightedDiscount + bmrp.TotalAwardDiscount)
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
			   end */
		  coalesce((select AVG(bmrp.WeightedDiscount)
				   	           from vw_BidMSRPResultsPrices bmrp with (nolock)
				              where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
					            and bmrp.ManufacturerProductLineId = plo.ManufacturerProductLineId
					            and bmrp.TotalWeights != 0),
			                (select AVG(bmrp.WeightedDiscount)
					           from vw_BidMSRPResultsPrices bmrp with (nolock)
				              where bmrp.BidMSRPResultsId = bmrpla.BidMSRPResultsId
					            and bmrp.ManufacturerProductLineId = bmrpla.ManufacturerProductLineId
					            and bmrp.TotalWeights != 0),0) * 10000
			       as bigint) 
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
       case when Upper(Ltrim(Rtrim(PLO.ProductLineName))) = 'ALL' then 1 else 0 end AllFlag,
       case when bmr.Active = 1 and case when bmpl.BidMSRPResultsProductLineId is null and bmrpla.BidMSRPResultsProductLineId is not null then bmrpla.Active else bmpl.Active end = 1 and bi.Active = 1 then 1 else 0 end as AllActive,
       case 
         when (select COUNT(*) 
                 from BidMSRPResultsProductLines bmrplav
                 join BidMSRPResults bmrav on bmrav.BidMSRPResultsId = bmrplav.BidMSRPResultsId
                                          and bmrav.BidHeaderId = plo.BidHeaderId
                where bmrplav.ManufacturerProductLineId = plo.ManufacturerProductLineId
              ) = 0 then 1
         else 0
       end EntryFiltered
  from [vw_BidMSRPRankedManufacturerProductLines] plo with (nolock)
  left outer join BidMSRPResults bmr on bmr.BidHeaderId = plo.BidHeaderId
                                    and bmr.ManufacturerId = plo.ManufacturerId
--                                    and bmr.Active = 1
  left outer join BidMSRPResultsProductLines bmpl on bmpl.BidMSRPResultsId = bmr.BidMSRPResultsId
--                                                 and bmpl.Active = 1
                                                 and bmpl.ManufacturerProductLineId = plo.ManufacturerProductLineId
                                                 and bmpl.OptionName = plo.OptionName
  left outer join BidMSRPResultsProductLines bmrpla on bmrpla.BidMSRPResultsId = bmr.BidMSRPResultsId
                                                   and bmrpla.OptionName = plo.OptionName
                                                   and bmrpla.BidMSRPResultsProductLineId =      
    (select top 1 bmrpls.BidMSRPResultsProductLineId         
       from BidMSRPResults bmrs1         
       join BidMSRPResultsProductLines bmrpls on bmrpls.BidMSRPResultsId = bmrs1.BidMSRPResultsId                                               
                                             and bmrpls.Active = 1  
-- DCH Changed 4/4/2014                                             and bmrpls.MSRPOptionId = plo.MSRPOptionId       
                                             and bmrpls.OptionName = plo.OptionName
       join ManufacturerProductLines mpls on mpls.ManufacturerProductLineId = bmrpls.ManufacturerProductLineId                                           
-- DCH Changed 5/16/2014                                        and mpls.Active = 1                                           
                                         and mpls.Name = 'ALL'        
      where /*bmrs1.Active = 1          DCH Removed 5/20/2014
        and */bmrs1.BidMSRPResultsId = bmr.BidMSRPResultsId)
  left outer join BidImports bi on bi.BidImportId = bmr.BidImportId
  left outer join PriceListTypes plt on plt.PriceListTypeId = bmr.PriceListTypeId
  left outer join Vendors on Vendors.VendorId = bi.VendorId
-- where plo.BidHeaderId = 5784
 where (   bmpl.BidMSRPResultsProductLineId is not null
        or (    bmpl.BidMSRPResultsProductLineId is null
            and bmrpla.BidMSRPResultsProductLineId is not null
           )
        or exists(select BidMSRPResultsProductLineId
                    from BidMSRPResultsProductLines bmpl2
                    join BidMSRPResults bmr2 on bmr2.BidMSRPResultsId = bmpl2.BidMSRPResultsId
                                            and bmr2.BidHeaderId = plo.BidHeaderId
                   where bmpl2.ManufacturerProductLineId = plo.ManufacturerProductLineId)
       )
```
