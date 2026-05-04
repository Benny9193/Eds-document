# View: `dbo.vw_RequisitionShippingCostsTest`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `Extended` | money | YES |  |  |
| 6 | `ShippingCost` | money | NO |  |  |
| 7 | `FreeHandlingAmount` | money | NO |  |  |
| 8 | `FreeHandlingStart` | datetime | YES |  |  |
| 9 | `FreeHandlingEnd` | datetime | YES |  |  |
| 10 | `AdditionalHandlingAmount` | money | NO |  |  |
| 11 | `POBelowMinimum` | int | NO |  |  |
| 12 | `MinimumPOAmount` | money | NO |  |  |
| 13 | `AdditionalShipping` | tinyint | YES |  |  |
| 14 | `DistrictVendorCode` | varchar(20) | NO |  |  |
| 15 | `VendorBidInfo` | varchar(576) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_RequisitionShippingCosts where RequisitionId = 819135

create     view  [dbo].[vw_RequisitionShippingCostsTest]
as
select Requisitions.RequisitionId, BidHeaders.BidHeaderId, Vendors.VendorId, Vendors.Name VendorName, 
       SUM(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) Extended, 
       isnull(case 
                when Bids.FreeHandlingStart is null or Bids.FreeHandlingEnd is null then 0
                when GETDATE() between Bids.FreeHandlingStart and Bids.FreeHandlingEnd then 0
                when getdate() < Bids.FreeHandlingEnd and isnull(Requisitions.OrderType,1) = 1 then 0 -- Early Annual Orders as per Gerard will NOT have shipping added DCH 1/11/16
--                when getdate() < Bids.FreeHandlingStart and isnull(Requisitions.OrderType,1) != 1 then 0 
                else case 
                       when sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) < Bids.FreeHandlingAmount then Bids.AdditionalHandlingAmount 
                       else 0 
                     end 
              end,0) ShippingCost, 
         isnull(Bids.FreeHandlingAmount,0) FreeHandlingAmount, Bids.FreeHandlingStart, Bids.FreeHandlingEnd, 
         isnull(Bids.AdditionalHandlingAmount,0) AdditionalHandlingAmount, 
         case 
           when SUM(Detail.Quantity * Detail.BidPrice) < isnull(District.MinimumPOAmount,0) then 1 
           else 0 
         end POBelowMinimum, 
         isnull(District.MinimumPOAmount,0) MinimumPOAmount,
         MAX(isnull(Detail.AdditionalShipping,0)) AdditionalShipping,
         isnull(case isnull(District.UseEDSVendorCodes,0) 
                  when 0 then isnull(DistrictVendor.Value,'') 
                  else isnull(Vendors.Code,'') 
                end,'') DistrictVendorCode,
		 isnull(case isnull(rtrim(BidHeaders.Description),'') 
			      when '' then '' 
				  else isnull(rtrim(ltrim(BidHeaders.Description)),'') + char(13) + char(10) 
				end +     
				case isnull(rtrim(Bids.VendorBidNumber),'') 
				  when '' then 'Bid Date: ' + isnull(convert(varchar(16),BidHeaders.BidAwardDate,101),'') 
				  else 'Bid Number: ' + isnull(rtrim(Bids.VendorBidNumber),'') 
				end,'') VendorBidInfo
  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Vendors on Vendors.VendorId = case ISNULL(Detail.VendorId,0) when 0 then 7691 else Detail.VendorId end
  outer apply (select * from BidHeaders where BidHeaders.BidHeaderId = case when Detail.BidItemId is null then case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end else (select BidHeaderId from BidItems join Bids b on b.BidId = BidItems.BidId where BidItems.BidItemId = Detail.BidItemId) end) BidHeaders
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.VendorId = Vendors.VendorId
           and Bids.Active = 1
  left outer join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
                                and DistrictVendor.VendorId = Vendors.VendorId
                                and DistrictVendor.Active = 1
 group by Requisitions.RequisitionId, Requisitions.OrderType, BidHeaders.BidHeaderId, Vendors.VendorId, Vendors.Name, Bids.FreeHandlingStart, 
          Bids.FreeHandlingEnd, Bids.FreeHandlingAmount, Bids.AdditionalHandlingAmount, isnull(District.MinimumPOAmount,0),
         isnull(case isnull(District.UseEDSVendorCodes,0) 
                  when 0 then isnull(DistrictVendor.Value,'') 
                  else isnull(Vendors.Code,'') 
                end,''),
		 isnull(case isnull(rtrim(BidHeaders.Description),'') 
			      when '' then '' 
				  else isnull(rtrim(ltrim(BidHeaders.Description)),'') + char(13) + char(10) 
				end +     
				case isnull(rtrim(Bids.VendorBidNumber),'') 
				  when '' then 'Bid Date: ' + isnull(convert(varchar(16),BidHeaders.BidAwardDate,101),'') 
				  else 'Bid Number: ' + isnull(rtrim(Bids.VendorBidNumber),'') 
				end,'')
```
