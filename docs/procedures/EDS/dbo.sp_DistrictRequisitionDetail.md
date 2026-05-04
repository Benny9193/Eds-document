# Procedure: `dbo.sp_DistrictRequisitionDetail`

_Generated on 2026-05-04T14:49:07.261Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DistrictRequisitionDetail` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-12-11 16:55:27 |
| Modified | 2025-03-03 18:46:38 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_RequisitionShippingCosts` | VIEW |  |
| `dbo.sp_CreateNewDistrictReqNumber` | SQL_STORED_PROCEDURE |  |
| `dbo.uf_CleanExtdAsciiChars` | SQL_SCALAR_FUNCTION |  |
| `dbo.vw_DetailDescription` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE          procedure [dbo].[sp_DistrictRequisitionDetail] (@pRSId int)
as
declare @DistrictRequisitionNumber varchar(50),
        @VendorId int,
	@RequisitionId int

set nocount on

declare VenCur cursor fast_forward read_only for
select Detail.RequisitionId, Detail.VendorId
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Users on Users.UserId = Requisitions.UserId
  join ReportSessionLinks on ReportSessionLinks.IntId = Detail.RequisitionId
 where ReportSessionLinks.RSId = @pRSId
   and Detail.DistrictRequisitionNumber is null
   and case isnull(Detail.VendorId,0) when 0 then 7691 else Detail.VendorId end != 7691
 group by Detail.RequisitionId, Detail.VendorId, Users.CometId
 order by Users.CometId, Detail.RequisitionId, Detail.VendorId
 
open VenCur

fetch next from VenCur into @RequisitionId, @VendorId

while @@fetch_status = 0
begin
  -- Check for Existing Items for this vendor
  select top 1 @DistrictRequisitionNumber = Detail.DistrictRequisitionNumber
    from Detail
   where Detail.RequisitionId = @RequisitionId
     and Detail.VendorId = @VendorId
     and Detail.DistrictRequisitionNumber is not null
   order by Detail.SortSeq


  if @@rowcount = 0
  begin
    -- Get New District Req Number if needed
    exec dbo.sp_CreateNewDistrictReqNumber @RequisitionId, @DistrictRequisitionNumber output
  end
 
  -- Update Detail with District Req Number
  update Detail
     set DistrictRequisitionNumber = @DistrictRequisitionNumber
    from Detail
   where Detail.RequisitionId = @RequisitionId
     and Detail.VendorId = @VendorId
     and Detail.DistrictRequisitionNumber is null

  fetch next from VenCur into @RequisitionId, @VendorId
end

close VenCur
deallocate VenCur

set nocount off

SELECT ReportSessionLinks.RSLId RSLID, 
       case when coalesce(Requisitions.OrderDate,getdate()) < Budgets.StartDate then Budgets.StartDate else coalesce(Requisitions.OrderDate,getdate()) end OrderDate, 
       Requisitions.RequisitionId RequisitionId, 
       Requisitions.RequisitionNumber RequisitionNumber, 
       Detail.DistrictRequisitionNumber DistrictRequisitionNumber,
       Requisitions.TotalRequisitionCost TotalRequisitionCost, 
       Requisitions.TotalItemsCost RequisitionTotalItemsCost, 
       -- Requisitions.AccountCode AccountCode,  -- changed 7/20/2020
	   Isnull(Accounts.Code,'') AccountCode,
       isnull(Requisitions.DiscountPercent,0) RequisitionDiscountPercent, 
       isnull((select sum(rsc.ShippingCost + rsc.TotalShippingCost) ShippingCost from vw_RequisitionShippingCosts rsc where rsc.RequisitionId = Requisitions.RequisitionId and rsc.VendorId = Vendors.VendorId),0) RequisitionShippingCost, 
       isnull(Requisitions.ShippingPercent,0) RequisitionShippingPercent, 
       Requisitions.Attention RequisitionAttention,
       Category.Name CategoryName, 
       Category.Code CategoryCode,
       Detail.DetailId DetailId,
       Detail.ItemCode DetailItemCode, 
       -- Detail.Description DetailDescription,   --changed 11/05/2019 kjm
	   -- dbo.uf_CleanExtdAsciiChars(Detail.Description) DetailDescription,
	   dbo.uf_CleanExtdAsciiChars(coalesce(dd.ShortDescription,dd.ItemDescription)) DetailDescription,
       Detail.VendorItemCode DetailVendorItemCode, 
       (case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else '' end) DetailAlternate, -- changed 10/12/2021
       -- isnull(Detail.Alternate,'') DetailAlternate, 
       Detail.Quantity DetailQuantity, 
       Detail.UnitCode DetailUnitCode, 
       Detail.GrossPrice DetailGrossPrice, 
       (isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) DetailExtendedGross,
       Detail.BidPrice DetailBidPrice, 
       (isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) DetailExtendedBid,
       Detail.VendorId DetailVendorId, 
       (case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price ' else 'Bid Item ' end + isnull(Detail.VendorItemCode,'') ) DetailVendorData,  -- changed 10/12/2021 
       -- (case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else isnull(Detail.Alternate,'') end + ' ' + isnull(Detail.VendorItemCode,'')) DetailVendorData, 
       --Detail.DiscountRate DetailDiscountRate,
       0.0000 DetailDiscountRate,  -- kjm 3/9/2023 changed to match data in POPrint (from sp_PODetail)
       --Round( (isnull(Detail.DiscountRate,0)/100 * isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)), 4) DetailDiscountAmount,
       0.0000 DetailDiscountAmount,  -- kjm 3/9/2023 changed to match data in POPrint (from sp_PODetail)
       -- isnull(DistrictVendor.Value,'') DistrictVendorValue,  -- changed 2/17/2023 to mirror code used in the view POHeader
       --case ISNULL(District.UseEDSVendorCodes,0) when 0 then isnull(DistrictVendor.Value,'') else Vendors.Code end DistrictVendorValue,  -- switch to Outer Apply 5/5/2023 kjm
       case ISNULL(District.UseEDSVendorCodes,0) when 0 then isnull(OADistrictVendor.Value,'') else Vendors.Code end DistrictVendorValue,  -- switch to Outer Apply 5/5/2023 kjm
       ShipLocations.LocationCode ShipLocationsLocationCode, 
       ShipLocations.Name ShipLocationsName,
       ShipLocations.Address1 ShipLocationsAddress1,
       ShipLocations.Address2 ShipLocationsAddress2,
       ShipLocations.Address3 ShipLocationsAddress3,
       ShipLocations.City ShipLocationsCity,
       ShipLocations.State ShipLocationsState,
       ShipLocations.Zipcode ShipLocationsZipcode,
       Users.DistrictAcctgCode UsersDistrictAcctgCode,
       Users.CometId UsersCometId,
       Users.UserName UsersUserName,
       Vendors.Name VendorsName,
       Vendors.Code VendorsCode,
       Vendors.Phone VendorsPhone,
       Vendors.Address1 VendorsAddress1,
       Vendors.Address2 VendorsAddress2,
       Vendors.Address3 VendorsAddress3,
       Vendors.City VendorsCity,
       Vendors.State VendorsState,
       Vendors.Zipcode VendorsZipcode,
       School.Name SchoolName,
       School.Address1 SchoolAddress1,
       School.Address2 SchoolAddress2,
       School.Address3 SchoolAddress3,
       School.City SchoolCity,
       School.State SchoolState,
       School.ZipCode SchoolZipCode,
       Awards.VendorBidNumber VendorsBidNumber, 
       Awards.Description VendorsBidComments,
       District.DistrictCode DistrictCode,
       District.Name DistrictName,
       District.Address1 DistrictAddress1,
       District.Address2 DistrictAddress2,
       District.Address3 DistrictAddress3,
       District.City DistrictCity,
       District.State DistrictState,
       District.ZipCode DistrictZipCode,
       Budgets.Name BudgetName,
       rc.ItemCount ReqItemCount,
       rc.TotalPrice + round(rc.TotalPrice * isnull(Vendors.ShippingPercentage,0) / 100,2) + case when Detail.AdditionalShipping = 1 then isnull(Detail.ShippingCost,0) else 0 end ReqBidPrice,
       isnull(BidHeaders.Description,'') + 
	     case  
           when Vendors.UploadType in (1,2,3) then 
             case isnull(BidHeaders.Description,'') 
               when '' then '' 
               else char(13) + char(10) 
             end + 
             'Mark For: R' + convert(varchar(16),Requisitions.RequisitionId) +
             case isnull(Trim(OADistrictVendor.VendorsAccountCode),'')
               when '' then ''
			   else '  Vendor Acct#: ' + Trim(OADistrictVendor.VendorsAccountCode)
			 end 
           else '' 
         end BidComments, 
       /* replaced 5/1/2023 - add VendorsAccountCode using outer apply 
       isnull(BidHeaders.Description,'') + 
         case Vendors.UploadType 
           when 1 then 
             case isnull(BidHeaders.Description,'') 
               when '' then '' 
               else char(10) + char(13) 
             end + 
             'Mark For: R' + convert(varchar(16),Requisitions.RequisitionId) 
           when 2 then 
             case isnull(BidHeaders.Description,'') 
               when '' then '' 
               else char(10) + char(13) 
             end + 
             'Mark For: R' + convert(varchar(16),Requisitions.RequisitionId) 
           else '' 
         end BidComments,
         */
         convert(varchar(5),BidHeaders.BidHeaderId) BidNumber
       -- end add kjm                         
  FROM District
  join Budgets on Budgets.DistrictId = District.DistrictId
--              and Budgets.Active = 1
  join School on School.DistrictId = District.DistrictId
  join Users on Users.SchoolId = School.SchoolId
  join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
                   and Requisitions.UserId = Users.UserId
  join Category on Category.CategoryId = Requisitions.CategoryId
  JOIN ShipLocations ON ShipLocations.ShippingId = Requisitions.ShippingId 
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
  JOIN Awards ON Awards.AwardId = Detail.AwardId
  join Vendors on Vendors.VendorId = Detail.VendorId
              and Vendors.VendorId = Awards.VendorId
              and Vendors.VendorId != 7691
  join dbo.vw_DetailDescription dd on dd.DetailId = Detail.DetailId
--  left outer join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId    -- switch to Outer Apply 5/5/2023 kjm
--                     and DistrictVendor.VendorId = Vendors.VendorId
--                     and DistrictVendor.Active = 1
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId  -- added 7/20/2020
  left outer join Accounts on Accounts.AccountId = UserAccounts.AccountId                  -- added 7/20/2020
  join ReportSessionLinks on ReportSessionLinks.RSId = @pRSId
                         and ReportSessionLinks.IntId = Requisitions.RequisitionId
  join BidHeaders on BidHeaders.BidHeaderId = Awards.BidHeaderId
  -- Switched to outer apply to replace left outer join (commented out above) - 5-5-2023 kjm
  outer apply (select count(*) ItemCount, sum(isnull(d1.Quantity,0) * isnull(d1.BidPrice,0) ) TotalPrice
                 from Detail d1 
				 join Vendors v1 on v1.VendorId = d1.VendorId 
				where d1.RequisitionId = Detail.RequisitionId 
				  and d1.VendorId != 7691
				  and d1.DistrictRequisitionNumber = Detail.DistrictRequisitionNumber) rc
  outer apply (select top 1 dv.Value, dv.VendorsAccountCode 
               from DistrictVendor dv
			   where dv.Active = 1 and dv.VendorId = Vendors.VendorId and dv.DistrictId = Budgets.DistrictId 
			   order by dv.DistrictVendorId desc) OADistrictVendor
 where District.Active = 1

/*
 FROM ReportSessionLinks 
 INNER JOIN Requisitions ON Requisitions.RequisitionId = ReportSessionLinks.IntID
 INNER JOIN Users ON Users.UserId = Requisitions.UserId 
 INNER JOIN Category ON Requisitions.CategoryId = Category.CategoryId 
 INNER JOIN Detail ON Requisitions.RequisitionId = Detail.RequisitionId 
 INNER JOIN DistrictVendor ON DistrictVendor.VendorId = Detail.VendorId 
                          AND DistrictVendor.DistrictId = Users.DistrictId
                          AND DistrictVendor.Active = 1 
 INNER JOIN ShipLocations ON ShipLocations.ShippingId = Requisitions.ShippingId 
 INNER JOIN Vendors ON Vendors.VendorId = Detail.VendorId
 INNER JOIN School ON School.SchoolId = Requisitions.SchoolId
 INNER JOIN Awards ON Awards.AwardId = Detail.AwardId
 INNER JOIN District ON District.DistrictId =  Users.DistrictId AND District.Active = 1
 INNER JOIN Budgets ON Requisitions.BudgetId = Budgets.BudgetId AND Budgets.Active = 1
 where ReportSessionLinks.RSId = @pRSId
*/
 ORDER BY Requisitions.RequisitionId, Detail.VendorId, Detail.DistrictRequisitionNumber, Detail.SortSeq
```
