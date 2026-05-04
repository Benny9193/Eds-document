# View: `dbo.vw_RequisitionShippingCosts`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 16 | `TotalShippingCost` | decimal(38,2) | YES |  |  |
| 17 | `UpdateRequired` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
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

| Object | Type |
|--------|------|
| `dbo.sp_ConvertReqs` | SQL_STORED_PROCEDURE |
| `dbo.sp_DistrictRequisitionDetail` | SQL_STORED_PROCEDURE |
| `dbo.sp_UpdatePOAmounts` | SQL_STORED_PROCEDURE |
| `dbo.trig_DetailDelete` | SQL_TRIGGER |
| `dbo.trig_RequisitionsUpdate` | SQL_TRIGGER |
| `dbo.uf_DistrictSummary1_Test` | SQL_TABLE_VALUED_FUNCTION |
| [`dbo.vw_ApproveRequisitionsBySession`](dbo.vw_ApproveRequisitionsBySession.md) | VIEW |
| [`dbo.vw_ReqTotalsByVendor`](dbo.vw_ReqTotalsByVendor.md) | VIEW |
| [`dbo.vw_ReqTotalsByVendorTest`](dbo.vw_ReqTotalsByVendorTest.md) | VIEW |

## Definition

```sql
--select * from vw_RequisitionShippingCosts where RequisitionId = 59157267
CREATE       view  [dbo].[vw_RequisitionShippingCosts]
as
select Requisitions.RequisitionId, BidData.BidHeaderId, Vendors.VendorId, coalesce(Vendors.DisplayAs,Vendors.Name,'') VendorName, 
       SUM(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) Extended, 
       isnull(case 
						when BidData.FreeHandlingStart is null or BidData.FreeHandlingEnd is null then 0
						when coalesce(ap.ApprovalDate,GETDATE()) between BidData.FreeHandlingStart and BidData.FreeHandlingEnd then 0
						when getdate() < BidData.FreeHandlingEnd and isnull(Requisitions.OrderType,1) = 1 then 0 -- Early Annual Orders as per Gerard will NOT have shipping added DCH 1/11/16
						else case 
							   when sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) < BidData.FreeHandlingAmount then BidData.AdditionalHandlingAmount 
							   else 0 
							 end 
					  end,0) ShippingCost, 
         isnull(BidData.FreeHandlingAmount,0) FreeHandlingAmount, BidData.FreeHandlingStart, BidData.FreeHandlingEnd, 
         isnull(BidData.AdditionalHandlingAmount,0) AdditionalHandlingAmount, 
         case 
           when SUM(Detail.Quantity * Detail.BidPrice) + coalesce(case 
						when BidData.FreeHandlingStart is null or BidData.FreeHandlingEnd is null then 0
						when coalesce(ap.ApprovalDate,GETDATE()) between BidData.FreeHandlingStart and BidData.FreeHandlingEnd then 0
						when getdate() < BidData.FreeHandlingEnd and isnull(Requisitions.OrderType,1) = 1 then 0 -- Early Annual Orders as per Gerard will NOT have shipping added DCH 1/11/16
						else case 
							   when sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) < BidData.FreeHandlingAmount then BidData.AdditionalHandlingAmount 
							   else 0 
							 end 
					  end,0) + coalesce(sum(case when Detail.AdditionalShipping = 1 then isnull(Detail.ShippingCost,0) else 0 end),0) < isnull(District.MinimumPOAmount,0) then 1 
           else 0 
         end POBelowMinimum, 
         isnull(District.MinimumPOAmount,0) MinimumPOAmount,
         MAX(isnull(Detail.AdditionalShipping,0)) AdditionalShipping,
         isnull(case isnull(District.UseEDSVendorCodes,0) 
                  when 0 then isnull(DistrictVendor.Value,'') 
                  else isnull(Vendors.Code,'') 
                end,'') DistrictVendorCode,
		 isnull(case isnull(rtrim(BidData.Description),'') 
			      when '' then '' 
				  else isnull(rtrim(ltrim(BidData.Description)),'') + char(13) + char(10) 
				end +     
				case isnull(rtrim(BidData.VendorBidNumber),'') 
				  when '' then 'Bid Date: ' + isnull(convert(varchar(16),BidData.BidAwardDate,101),'') 
				  else 'Bid Number: ' + isnull(rtrim(BidData.VendorBidNumber),'') 
				end,'') VendorBidInfo,
		 sum(case when Detail.AdditionalShipping = 1 then isnull(Detail.ShippingCost,0) else 0 end) TotalShippingCost,
		 max(case when Detail.AdditionalShipping = 1 and (isnull(Detail.ShippingQuantity,0) != isnull(Detail.Quantity,0) or isnull(Detail.ShippingCost,0) = 0 or Detail.ShippingUpdated is null) then 1 else 0 end) UpdateRequired
  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Vendors on Vendors.VendorId = case ISNULL(Detail.VendorId,0) when 0 then 7691 else Detail.VendorId end
  outer apply (Select top 1 Approvals.ApprovalId, Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6, 35, 45, 49) order by Approvals.ApprovalDate desc)ap
  outer apply (select Bids.BidHeaderId from BidItems join Bids on Bids.BidId = BidItems.BidId where BidItems.BidItemId = Detail.BidItemId) DetailBid
  outer apply (select distinct BidHeaders.BidHeaderId, BidHeaders.BidAwardDate, BidHeaders.Description, Bids.FreeHandlingStart, Bids.FreeHandlingEnd, Bids.FreeHandlingAmount, Bids.AdditionalHandlingAmount, Bids.VendorBidNumber
                 from BidHeaders
				 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId 
				          and Bids.VendorId = Vendors.VendorId
						  and Bids.Active = 1
				where BidHeaders.BidHeaderId = case 
				                                 when Detail.BidItemId is null then 
												   case isnull(Detail.BidHeaderId,0) 
												     when 0 then isnull(Requisitions.BidHeaderId,0) 
													 else Detail.BidHeaderId 
												   end 
												 else 
												   DetailBid.BidHeaderId 
											   end) BidData
  left outer join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
                                and DistrictVendor.VendorId = Vendors.VendorId
                                and DistrictVendor.Active = 1
 group by Requisitions.RequisitionId, Requisitions.OrderType, BidData.BidHeaderId, Vendors.VendorId, coalesce(Vendors.DisplayAs,Vendors.Name,''), BidData.FreeHandlingStart, 
          BidData.FreeHandlingEnd, BidData.FreeHandlingAmount, BidData.AdditionalHandlingAmount, isnull(District.MinimumPOAmount,0), Budgets.BudgetId,
         isnull(case isnull(District.UseEDSVendorCodes,0) 
                  when 0 then isnull(DistrictVendor.Value,'') 
                  else isnull(Vendors.Code,'') 
                end,''),
		 isnull(case isnull(rtrim(BidData.Description),'') 
			      when '' then '' 
				  else isnull(rtrim(ltrim(BidData.Description)),'') + char(13) + char(10) 
				end +     
				case isnull(rtrim(BidData.VendorBidNumber),'') 
				  when '' then 'Bid Date: ' + isnull(convert(varchar(16),BidData.BidAwardDate,101),'') 
				  else 'Bid Number: ' + isnull(rtrim(BidData.VendorBidNumber),'') 
				end,'') , ap.ApprovalDate
```
