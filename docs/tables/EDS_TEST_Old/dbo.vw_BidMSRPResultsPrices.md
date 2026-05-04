# View: `dbo.vw_BidMSRPResultsPrices`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | NO |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `BidMSRPResultsId` | int | NO |  |  |
| 4 | `BidMSRPResultsProductLineId` | int | YES |  |  |
| 5 | `ManufacturerProductLineId` | int | YES |  |  |
| 6 | `ProductLineName` | varchar(100) | YES |  |  |
| 7 | `MSRPOptionId` | int | YES |  |  |
| 8 | `OptionName` | varchar(50) | YES |  |  |
| 9 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 10 | `TotalAward` | tinyint | YES |  |  |
| 11 | `ManufacturerId` | int | YES |  |  |
| 12 | `WeightedDiscount` | decimal(9,5) | YES |  |  |
| 13 | `TotalWeights` | decimal(38,5) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMSRPResultPrices` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |
| `BidRequestManufacturer` | USER_TABLE |
| `BidRequestOptions` | USER_TABLE |
| `BidRequestProductLines` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.usp_BidRanking` | SQL_STORED_PROCEDURE |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered.md) | VIEW |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) | VIEW |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_BidMSRPResultsPrices] as  
select bmr.BidHeaderId, bmr.BidImportId, bmr.BidMSRPResultsId, 
       case         
         when bmrpl.BidMSRPResultsProductLineId is null or upper(bmrs.ProductLineName) = 'ALL' then           
           bmrpla.BidMSRPResultsProductLineId        
         else          
           bmrpl.BidMSRPResultsProductLineId      
         end 
       BidMSRPResultsProductLineId, 
--       bmrpl.BidMSRPResultsProductLineId, 
       bmrs.ManufacturerProductLineId,
       bmrs.ProductLineName,
       bmrs.MSRPOptionId, bmrs.OptionName, bmr.TotalAwardDiscount, bmr.TotalAward, bmr.ManufacturerId,       
       case         
         when bmrpl.WeightedDiscount is null then           
           isnull(bmrpla.WeightedDiscount,0)              -- change 12/18/13 kjm
         else          
           bmrpl.WeightedDiscount      
         end WeightedDiscount,  
       (select SUM(RangeWeight)
               from BidMSRPResultPrices bmrp1
              where bmrp1.BidMSRPResultsProductLineId = bmrpl.BidMSRPResultsProductLineId) TotalWeights  
  from (      
    SELECT bmr1.BidHeaderId, bmr1.ManufacturerId, bmrpl1.ManufacturerProductLineId, bmrpl1.MSRPOptionId, bmrpl1.OptionName, coalesce(mpl.Name,'ALL') ProductLineName   
      from BidMSRPResults bmr1        
      join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsId = bmr1.BidMSRPResultsId  
      left outer join ManufacturerProductLines mpl on mpl.ManufacturerProductLineId = bmrpl1.ManufacturerProductLineId
-- DCH Removed 4/4/2014                                            and bmrpl1.Active = 1       
-- DCH Removed 4/4/2014     where bmr1.Active = 1      
     union (        
       select brm.BidHeaderId, brm.ManufacturerId, brpl.ManufacturerProductLineId, bro.OptionId MSRPOptionId, bro.Name OptionName, coalesce(mpl.Name,'ALL') ProductLineName      
         from BidRequestManufacturer brm          
         join BidRequestProductLines brpl on brpl.BidRequestManufacturerId = brm.BidRequestManufacturerId                                          
-- DCH Removed 4/4/2014                                         and brpl.Active = 1          
         join BidRequestOptions bro on bro.BidRequestManufacturerId = brpl.BidRequestManufacturerId                                    
                                   and bro.BidRequestProductLineId = brpl.BidRequestProductLineId 
        left outer join ManufacturerProductLines mpl on mpl.ManufacturerProductLineId = brpl.ManufacturerProductLineId
-- DCH Removed 4/4/2014        where brm.Active = 1            
           )         
        ) bmrs    
  join BidMSRPResults bmr on bmr.BidHeaderId = bmrs.BidHeaderId                           
                         and bmr.ManufacturerId = bmrs.ManufacturerId                           
-- DCH Removed 4/4/2014                         and bmr.Active = 1    
  left outer join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsId = bmr.BidMSRPResultsId                                                    
                                                  and bmrpl.ManufacturerProductLineId = bmrs.ManufacturerProductLineId   
-- DCH Changed 4/4/2014                                                  and bmrpl.MSRPOptionId = bmrs.MSRPOptionId                                                 
                                                  and bmrpl.OptionName = bmrs.OptionName
-- DCH Removed 4/4/2014                                                  and bmrpl.Active = 1    
  left outer join BidMSRPResultsProductLines bmrpla on bmrpla.BidMSRPResultsId = bmr.BidMSRPResultsId
                                                   and bmrpla.Active = 1
                                                   and bmrpla.BidMSRPResultsProductLineId =      
    (select bmrpls.BidMSRPResultsProductLineId         
       from BidMSRPResults bmrs1         
       join BidMSRPResultsProductLines bmrpls on bmrpls.BidMSRPResultsId = bmrs1.BidMSRPResultsId                                               
                                             and bmrpls.Active = 1  
-- DCH Changed 4/4/2014                                             and bmrpls.MSRPOptionId = bmrs.MSRPOptionId       
                                             and bmrpls.OptionName = bmrs.OptionName
       join ManufacturerProductLines mpls on mpls.ManufacturerProductLineId = bmrpls.ManufacturerProductLineId                                           
                                         and mpls.Active = 1                                           
                                         and mpls.Name = 'ALL'        
      where bmrs1.Active = 1          
        and bmrs1.BidMSRPResultsId = bmr.BidMSRPResultsId)



/* backup 12-18-13

select bmr.BidHeaderId, bmr.BidImportId, bmr.BidMSRPResultsId, 
       case         
         when bmrpl.BidMSRPResultsProductLineId is null then           
           bmrpla.BidMSRPResultsProductLineId        
         else          
           bmrpl.BidMSRPResultsProductLineId      
         end 
       BidMSRPResultsProductLineId, 
--       bmrpl.BidMSRPResultsProductLineId, 
       bmrs.ManufacturerProductLineId,
       bmrs.MSRPOptionId, bmrs.OptionName, bmr.TotalAwardDiscount, bmr.TotalAward, bmr.ManufacturerId,       
       case         
         when bmrpl.WeightedDiscount is null then           
           bmrpla.WeightedDiscount        
         else          
           bmrpl.WeightedDiscount      
         end WeightedDiscount    
  from (      
    SELECT bmr1.BidHeaderId, bmr1.ManufacturerId, bmrpl1.ManufacturerProductLineId, bmrpl1.MSRPOptionId, bmrpl1.OptionName        
      from BidMSRPResults bmr1        
      join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsId = bmr1.BidMSRPResultsId                                              
                                            and bmrpl1.Active = 1       
     where bmr1.Active = 1      
     union (        
       select brm.BidHeaderId, brm.ManufacturerId, brpl.ManufacturerProductLineId, bro.OptionId MSRPOptionId, bro.Name OptionName          
         from BidRequestManufacturer brm          
         join BidRequestProductLines brpl on brpl.BidRequestManufacturerId = brm.BidRequestManufacturerId                                          
                                         and brpl.Active = 1          
         join BidRequestOptions bro on bro.BidRequestManufacturerId = brpl.BidRequestManufacturerId                                    
                                   and bro.BidRequestProductLineId = brpl.BidRequestProductLineId         
        where brm.Active = 1            
           )         
        ) bmrs    
  join BidMSRPResults bmr on bmr.BidHeaderId = bmrs.BidHeaderId                           
                         and bmr.ManufacturerId = bmrs.ManufacturerId                           
                         and bmr.Active = 1    
  left outer join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsId = bmr.BidMSRPResultsId                                                    
                                                  and bmrpl.ManufacturerProductLineId = bmrs.ManufacturerProductLineId                                                    
                                                  and bmrpl.Active = 1    
  left outer join BidMSRPResultsProductLines bmrpla on bmrpla.BidMSRPResultsProductLineId =      
    (select bmrpls.BidMSRPResultsProductLineId         
       from BidMSRPResults bmrs1         
       join BidMSRPResultsProductLines bmrpls on bmrpls.BidMSRPResultsId = bmrs1.BidMSRPResultsId                                               
                                             and bmrpls.Active = 1  
                                             and bmrpls.MSRPOptionId = bmrs.MSRPOptionId       
       join ManufacturerProductLines mpls on mpls.ManufacturerProductLineId = bmrpls.ManufacturerProductLineId                                           
                                         and mpls.Active = 1                                           
                                         and mpls.Name = 'ALL'        
      where bmrs1.Active = 1          
        and bmrs1.BidMSRPResultsId = bmr.BidMSRPResultsId)
 
*/
```
