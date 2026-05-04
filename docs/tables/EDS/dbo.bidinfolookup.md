# View: `dbo.bidinfolookup`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | varchar(50) | YES |  |  |
| 2 | `CategoryName` | varchar(50) | YES |  |  |
| 3 | `PriceplanCode` | varchar(20) | YES |  |  |
| 4 | `PricePlanDescription` | varchar(278) | YES |  |  |
| 5 | `BidType` | varchar(30) | NO |  |  |
| 6 | `BidYears` | varchar(11) | YES |  |  |
| 7 | `BidAdDate` | datetime | YES |  |  |
| 8 | `BidHeaderKey` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Category` | USER_TABLE |
| `PricePlans` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_AVBidsVendorsCategoriesBySession`](dbo.vw_AVBidsVendorsCategoriesBySession.md) | VIEW |
| [`dbo.vw_BidYears`](dbo.vw_BidYears.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[bidinfolookup] as
select cast(BidHeaders.BidHeaderId as varchar(50)) BidHeaderId, Category.Name CategoryName, PricePlans.Code PriceplanCode, isnull(PricePlans.Code,'') + ' - ' + PricePlans.description PricePlanDescription, 
       case ISNULL(category.type,0) 
         when 2 then 'TextBooks' 
         when 3 then 'Time and Materials'
         when 4 then 'Time and Materials'
         when 5 then 'MSRP'
         else 
           case isnull(BidHeaders.BidType,0) 
             when 1 then 'Pre-Bid' 
             when 2 then 'Supplemental' 
             when 3 then 'Time and Materials' 
             when 4 then 'Time and Materials - Line Item' 
             when 5 then 'MSRP' 
             else 'Unknown'
           end
       end BidType, 
       case 
         when BidHeaders.BidAwardDate is not null then
           case ISNULL(Category.type,0)
             when 2 then
			   case 
				 when month(BidHeaders.BidAwardDate) < 12 then CAST(year(BidHeaders.BidAwardDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) 
				 else CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) 
			   end 
             when 3 then
			   case 
			     when month(BidHeaders.BidAwardDate) > 5 then
			       CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+2 as CHAR(4)) 
			     else
			       CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) 
			   end
             when 4 then
			   case 
			     when month(BidHeaders.BidAwardDate) > 5 then
			       CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+2 as CHAR(4)) 
			     else
			       CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) 
			   end
             else
			   case isnull(BidHeaders.BidType,0) 
				 when 1 then -- Pre-Bid
				   case 
					 when month(BidHeaders.BidAwardDate) < 8 then CAST(year(BidHeaders.BidAwardDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) 
					 else CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) 
				   end 
				 when 2 then -- Supplemental
				   case 
					 when month(BidHeaders.BidAwardDate) < 12 then CAST(year(BidHeaders.BidAwardDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) 
					 else CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) 
				   end 
				 when 3 then -- T&M
				   CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) 
				 else
				   case 
					 when month(BidHeaders.BidAwardDate) < 12 then CAST(year(BidHeaders.BidAwardDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) 
					 else CAST(year(BidHeaders.BidAwardDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidAwardDate)+1 as CHAR(4)) 
				   end 
			   end
		   end
         when BidHeaders.BidDate is not null then
           case ISNULL(Category.type,1)
             when 2 then 
			   case 
				 when month(BidHeaders.BidDate) < 12 then CAST(year(BidHeaders.BidDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate) as CHAR(4)) 
				 else CAST(year(BidHeaders.BidDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) 
			   end 
			 when 3 then
			   case 
			     when month(BidHeaders.BidDate) > 5 then
			       CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+2 as CHAR(4)) 
			     else
			       CAST(year(BidHeaders.BidDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) 
			   end
			 when 4 then
			   case 
			     when month(BidHeaders.BidDate) > 5 then
			       CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+2 as CHAR(4)) 
			     else
			       CAST(year(BidHeaders.BidDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) 
			   end
			 else
			   case isnull(BidHeaders.BidType,1) 
				 when 1 then -- Pre-Bid
				   case 
					 when month(BidHeaders.BidDate) < 7 then CAST(year(BidHeaders.BidDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate) as CHAR(4)) 
					 else CAST(year(BidHeaders.BidDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) 
				   end 
				 when 2 then -- Supplemental
				   case 
					 when month(BidHeaders.BidDate) < 12 then CAST(year(BidHeaders.BidDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate) as CHAR(4)) 
					 else CAST(year(BidHeaders.BidDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) 
				   end 
				 when 3 then -- T&M
				   case 
					 when month(BidHeaders.BidDate) > 5 then
					   CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+2 as CHAR(4)) 
					 else
					   CAST(year(BidHeaders.BidDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) 
				   end
				 else
				   case 
					 when month(BidHeaders.BidDate) < 12 then CAST(year(BidHeaders.BidDate)-1 as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate) as CHAR(4)) 
					 else CAST(year(BidHeaders.BidDate) as CHAR(4)) + ' - ' + CAST(year(BidHeaders.BidDate)+1 as CHAR(4)) 
				   end 
			   end
		   END
         else
           'Unknown' 
       end BidYears,
       BidHeaders.BidDate BidAdDate,
	   BidHeaders.BidHeaderKey
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
```
