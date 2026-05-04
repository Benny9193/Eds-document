# View: `dbo.POHeaderTest`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POId` | int | NO |  |  |
| 2 | `PONumber` | varchar(24) | YES |  |  |
| 3 | `ItemCount` | int | YES |  |  |
| 4 | `Amount` | money | YES |  |  |
| 5 | `BudgetName` | varchar(30) | YES |  |  |
| 6 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 7 | `AccountCode` | varchar(50) | YES |  |  |
| 8 | `Attention` | varchar(50) | YES |  |  |
| 9 | `CometId` | int | YES |  |  |
| 10 | `DistrictCode` | varchar(4) | YES |  |  |
| 11 | `DistrictName` | varchar(50) | YES |  |  |
| 12 | `DistrictNameAddress` | varchar(237) | YES |  |  |
| 13 | `SchoolName` | varchar(50) | YES |  |  |
| 14 | `SchoolNameAddress` | varchar(189) | YES |  |  |
| 15 | `VendorCode` | varchar(16) | YES |  |  |
| 16 | `VendorPhone` | varchar(25) | YES |  |  |
| 17 | `DistrictVendorCode` | varchar(20) | YES |  |  |
| 18 | `VendorName` | varchar(50) | YES |  |  |
| 19 | `VendorNameAddress` | varchar(249) | YES |  |  |
| 20 | `PODate` | datetime | YES |  |  |
| 21 | `DatePrinted` | datetime | YES |  |  |
| 22 | `DatePrintedDetail` | datetime | YES |  |  |
| 23 | `DateExported` | datetime | YES |  |  |
| 24 | `DistrictId` | int | YES |  |  |
| 25 | `CategoryId` | int | YES |  |  |
| 26 | `BudgetId` | int | YES |  |  |
| 27 | `AccountId` | int | YES |  |  |
| 28 | `VendorId` | int | YES |  |  |
| 29 | `UserId` | int | YES |  |  |
| 30 | `SchoolId` | int | NO |  |  |
| 31 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 32 | `VendorBidComments` | varchar(540) | YES |  |  |
| 33 | `CategoryCode` | char(1) | YES |  |  |
| 34 | `CategoryName` | varchar(50) | YES |  |  |
| 35 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 36 | `DiscountAmount` | money | YES |  |  |
| 37 | `TotalGross` | money | YES |  |  |
| 38 | `LocationCode` | varchar(32) | NO |  |  |
| 39 | `ShippingAmount` | money | YES |  |  |
| 40 | `ShippingPercentage` | decimal(9,5) | YES |  |  |
| 41 | `ShippingNameAddress` | varchar(189) | YES |  |  |
| 42 | `DistrictAddress1` | varchar(30) | YES |  |  |
| 43 | `DistrictAddress2` | varchar(30) | YES |  |  |
| 44 | `DistrictAddress3` | varchar(30) | YES |  |  |
| 45 | `DistrictCity` | varchar(25) | YES |  |  |
| 46 | `DistrictState` | varchar(2) | YES |  |  |
| 47 | `DistrictZipcode` | varchar(10) | YES |  |  |
| 48 | `SchoolAddress1` | varchar(30) | YES |  |  |
| 49 | `SchoolAddress2` | varchar(30) | YES |  |  |
| 50 | `SchoolAddress3` | varchar(30) | YES |  |  |
| 51 | `SchoolCity` | varchar(25) | YES |  |  |
| 52 | `SchoolState` | varchar(2) | YES |  |  |
| 53 | `SchoolZipcode` | varchar(10) | YES |  |  |
| 54 | `VendorsAddress1` | varchar(50) | YES |  |  |
| 55 | `VendorsAddress2` | varchar(50) | YES |  |  |
| 56 | `VendorsAddress3` | varchar(50) | YES |  |  |
| 57 | `VendorsCity` | varchar(50) | YES |  |  |
| 58 | `VendorsState` | varchar(2) | YES |  |  |
| 59 | `VendorsZipcode` | varchar(10) | YES |  |  |
| 60 | `ShipLocationsAddress1` | varchar(30) | YES |  |  |
| 61 | `ShipLocationsAddress2` | varchar(30) | YES |  |  |
| 62 | `ShipLocationsAddress3` | varchar(30) | YES |  |  |
| 63 | `ShipLocationsCity` | varchar(25) | YES |  |  |
| 64 | `ShipLocationsState` | varchar(2) | YES |  |  |
| 65 | `ShipLocationsZipcode` | varchar(10) | YES |  |  |
| 66 | `ShipLocationsName` | varchar(50) | YES |  |  |
| 67 | `DistrictMessage` | varchar(4096) | YES |  |  |
| 68 | `BidDate` | datetime | YES |  |  |
| 69 | `UsersDistrictAcctgCode` | varchar(20) | YES |  |  |
| 70 | `AwardsBidHeaderId` | int | YES |  |  |
| 71 | `ExportedToVendor` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `NextNumber` | USER_TABLE |
| `PO` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `vw_POHeaderBidImports` | VIEW |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.BudgetAccounts`](dbo.BudgetAccounts.md) | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.School`](dbo.School.md) | USER_TABLE |
| [`dbo.ShipLocations`](dbo.ShipLocations.md) | USER_TABLE |
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |
| [`dbo.VendorContacts`](dbo.VendorContacts.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view  [dbo].[POHeaderTest] AS

select PO.POId, 
       PO.PONumber, 
       PO.ItemCount, 
       PO.Amount, 
       Budgets.[Name] BudgetName, 
       Requisitions.RequisitionNumber, 
       (select top 1 Code from Accounts with (nolock) join UserAccounts on UserAccounts.AccountId = Accounts.AccountId and UserAccounts.UserAccountId = Requisitions.UserAccountId order by Accounts.AccountId) AccountCode,
       Requisitions.Attention, 
       Users.CometId, 
       District.DistrictCode, 
       District.[Name] DistrictName,
       District.[Name] + case isnull(District.Address1,'') when '' then '' else char(13) + char(10) + District.Address1 end + case isnull(District.Address2,'') when '' then '' else char(13) + char(10) + District.Address2 end + case isnull(District.Address3,'') when '' then '' else char(13) + char(10) + District.Address3 end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') + char(13) + char(10) + isnull(rtrim(District.PhoneNumber),'') + case ISNULL(rtrim(District.Fax),'') when '' then '' else ' FAX: ' + RTRIM(District.Fax) end DistrictNameAddress, 
       School.[Name] SchoolName,
       School.[Name] + case isnull(School.Address1,'') when '' then '' else char(13) + char(10) + School.Address1 end + case isnull(School.Address2,'') when '' then '' else char(13) + char(10) + School.Address2 end + case isnull(School.Address3,'') when '' then '' else char(13) + char(10) + School.Address3 end + char(13) + char(10) + isnull(School.City,'') + ', ' + isnull(School.State,'') + '  ' + isnull(School.Zipcode,'') SchoolNameAddress, 
       Vendors.Code VendorCode, 
       case 
         when VendorContacts.VendorContactId is null then Vendors.Phone 
         else VendorContacts.Phone
       end VendorPhone, 
       case ISNULL(District.UseEDSVendorCodes,0) 
       when 0 then  
         (select top 1 DistrictVendor.Value from DistrictVendor with (nolock) where DistrictVendor.VendorId = Vendors.VendorId and DistrictVendor.DistrictId = Budgets.DistrictId order by DistrictVendorId desc)  
       else
         Vendors.Code
       end DistrictVendorCode, 
       Vendors.[Name] VendorName,
       Vendors.[Name] + 
       case 
         when VendorContacts.VendorContactId is null then 
		   case isnull(Vendors.Address1,'') 
			 when '' then '' 
			 else char(13) + char(10) + Vendors.Address1 
		   end + 
		   case isnull(Vendors.Address2,'') 
			 when '' then '' 
			 else char(13) + char(10) + Vendors.Address2 
		   end + 
		   case isnull(Vendors.Address3,'') 
			 when '' then '' 
			 else char(13) + char(10) + Vendors.Address3 
		   end + 
		   char(13) + char(10) + isnull(Vendors.City,'') + ', ' + isnull(Vendors.State,'') + '  ' + isnull(Vendors.Zipcode,'') 
		 else
		   case isnull(VendorContacts.Address1,'') 
			 when '' then '' 
			 else char(13) + char(10) + VendorContacts.Address1 
		   end + 
		   case isnull(VendorContacts.Address2,'') 
			 when '' then '' 
			 else char(13) + char(10) + VendorContacts.Address2 
		   end + 
		   char(13) + char(10) + isnull(VendorContacts.City,'') + ', ' + isnull(VendorContacts.State,'') + '  ' + isnull(VendorContacts.Zipcode,'') 
	   end VendorNameAddress, 
       PO.PODate, 
       PO.DatePrinted, 
       PO.DatePrintedDetail, 
       PO.DateExported, 
       School.DistrictId, 
       Requisitions.CategoryId, 
       Requisitions.BudgetId, 
       BudgetAccounts.AccountId AccountId, 
       PO.VendorId, 
       Requisitions.UserId, 
       School.SchoolId,
       case isnull(BidImports.VendorBidNumber,'') 
         when '' then 
           case Category.Type 
             when 2 then 'Bid: ' + convert(varchar(16),Requisitions.BidHeaderId) 
             else '' 
           end 
         else 
           BidImports.VendorBidNumber 
       end VendorBidNumber,  
       isnull(BidHeaders.Description,'') + 
         case Vendors.UploadType 
           when 1 then 
             case isnull(BidHeaders.Description,'') 
               when '' then '' 
               else char(10) + char(13) 
             end + 
             'Mark For: ' + convert(varchar(16),PO.POId) 
           when 2 then 
             case isnull(BidHeaders.Description,'') 
               when '' then '' 
               else char(10) + char(13) 
             end + 
             'Mark For: ' + convert(varchar(16),PO.POId) 
           else '' 
         end VendorBidComments, 
       char(Category.EDSId) CategoryCode, 
       Category.[Name] CategoryName,
       PO.DiscountRate, 
       PO.DiscountAmount, 
       PO.TotalGross, 
       isnull(ShipLocations.LocationCode,'') LocationCode, 
       PO.ShippingAmount, 
       Vendors.ShippingPercentage,
       ShipLocations.[Name] + 
         case isnull(ShipLocations.Address1,'') 
           when '' then '' 
           else char(13) + char(10) + ShipLocations.Address1 
         end + 
         case isnull(ShipLocations.Address2,'') 
           when '' then '' 
           else char(13) + char(10) + ShipLocations.Address2 
         end + 
         case isnull(ShipLocations.Address3,'') 
           when '' then '' 
           else char(13) + char(10) + ShipLocations.Address3 
         end + 
         char(13) + char(10) + isnull(ShipLocations.City,'') + ', ' + isnull(ShipLocations.State,'') + '  ' + isnull(ShipLocations.Zipcode,'') ShippingNameAddress,
       District.Address1 DistrictAddress1,  
       District.Address2 DistrictAddress2,  
       District.Address3 DistrictAddress3, 
       District.City DistrictCity, 
       District.State DistrictState, 
       District.Zipcode DistrictZipcode,
       School.Address1 SchoolAddress1,  
       School.Address2 SchoolAddress2,  
       School.Address3 SchoolAddress3, 
       School.City SchoolCity, 
       School.State SchoolState, 
       School.Zipcode SchoolZipcode,
       case 
         when VendorContacts.VendorContactId is null then Vendors.Address1 
         else VendorContacts.Address1
       end VendorsAddress1,  
       case 
         when VendorContacts.VendorContactId is null then Vendors.Address2 
         else VendorContacts.Address2
       end VendorsAddress2,  
       case 
         when VendorContacts.VendorContactId is null then Vendors.Address3 
         else ''
       end VendorsAddress3, 
       case 
         when VendorContacts.VendorContactId is null then Vendors.City  
         else VendorContacts.City
       end VendorsCity, 
       case 
         when VendorContacts.VendorContactId is null then Vendors.State 
         else VendorContacts.State
       end VendorsState, 
       case 
         when VendorContacts.VendorContactId is null then Vendors.Zipcode 
         else VendorContacts.Zipcode
       end VendorsZipcode,
       ShipLocations.Address1 ShipLocationsAddress1,  
       ShipLocations.Address2 ShipLocationsAddress2,  
       ShipLocations.Address3 ShipLocationsAddress3, 
       ShipLocations.City ShipLocationsCity, 
       ShipLocations.State ShipLocationsState, 
       ShipLocations.Zipcode  ShipLocationsZipcode,
       ShipLocations.[Name] ShipLocationsName, 
       NextNumber.FFMessage DistrictMessage,
       BidHeaders.BidAwardDate BidDate, 
       Users.DistrictAcctgCode UsersDistrictAcctgCode,
       BidHeaders.BidHeaderId AwardsBidHeaderId,    /* kjm 5/28/09 */
       PO.ExportedToVendor
  from PO with (nolock)
  join dbo.Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
--                  and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
  join dbo.District on District.DistrictId = Budgets.DistrictId
  join dbo.School on School.SchoolId = Requisitions.SchoolId
  inner join NextNumber on NextNumber.BudgetId = Budgets.BudgetId
                       and NextNumber.IdType = 'P'
                       and isnull(NextNumber.SchoolId,0) = case isnull(District.POsBySchool,0) 
                                                             when 0 then 0 
                                                             else isnull(School.SchoolId,0) 
                                                           end
  join dbo.Users on Users.UserId = Requisitions.UserId
  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
  join dbo.Vendors on Vendors.VendorId = PO.VendorId 
  left outer join dbo.ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId 
  left outer join dbo.BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
/*  outer apply (select top 1 BidImportId, POVendorContactId
                 from BidImports
				 outer apply (select b.BidImportId BidImportId, b.VendorId, 0 BidType
								from PODetailItems PDI with (nolock)
								join Detail on Detail.DetailId = PDI.DetailId
								join Requisitions r on r.RequisitionId = Detail.RequisitionId
								join BidItems bi on bi.BidItemId = PDI.BidItemId
								join Bids b on b.BidId = bi.BidId
											and b.VendorId = PDI.VendorId
											and b.BidHeaderId = case when coalesce(detail.BidHeaderId,0) = 0 then r.BidHeaderId else Detail.BidHeaderId end
							   where PDI.POId = PO.POId
						       group by PDI.POId, b.BidImportId, b.VendorId
							) bt0 
				 outer apply (select Bids.BidImportId BidImportId, Bids.VendorId, 1 BidType
								from PODetailItems PDI with (nolock)
								join Detail on Detail.DetailId = PDI.DetailId
								join Requisitions r on r.RequisitionId = Detail.RequisitionId
								join Bids on Bids.VendorId = PDI.VendorId
										 and Bids.BidHeaderId = case when coalesce(detail.BidHeaderId,0) = 0 then r.BidHeaderId else Detail.BidHeaderId end
										 and Bids.Active = 1
							   where PDI.POId = PO.POId
		  					   group by PDI.POId, Bids.BidImportId, Bids.VendorId
							) bt1
				where 
									order by BidType) BidImports
  outer apply (select *
                 from VendorContacts vc
				where VendorContactId = case isnull(BidImports.POVendorContactId,0)
										  when 0 then
											(select Top 1 vc.VendorContactId
											   from VendorContacts vc with (nolock)
											  where vc.VendorId = Vendors.VendorId
												and vc.Active = 1
											  order by vc.POContact desc, vc.VendorContactId)
										  else
											(select Top 1 vc.VendorContactId
											   from VendorContacts vc with (nolock)
											  where vc.VendorId = Vendors.VendorId
												and vc.Active = 1
												and vc.VendorContactId = BidImports.POVendorContactId)
										end

*/
  outer apply (select bis1.*
				 from dbo.BidImports bis1
				where bis1.VendorId = Vendors.VendorId
                  and bis1.BidImportId = (select top 1 BidImportId
                                                  from (select BidImportId, BidType
                                                          from vw_POHeaderBidImports bi
														 where bi.POId = PO.POId
														   and bi.VendorId = Vendors.VendorId
														) bis 
												order by BidType)) BidImports
  left outer join dbo.VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                    and VendorContacts.VendorContactId =
    case isnull(BidImports.POVendorContactId,0)
      when 0 then
		(select Top 1 vc.VendorContactId
		   from VendorContacts vc with (nolock)
		  where vc.VendorId = Vendors.VendorId
			and vc.Active = 1
		  order by vc.POContact desc, vc.VendorContactId)
      else
        (select Top 1 vc.VendorContactId
		   from VendorContacts vc with (nolock)
		  where vc.VendorId = Vendors.VendorId
			and vc.Active = 1
			and vc.VendorContactId = BidImports.POVendorContactId)
    end
  left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = coalesce(BidImports.BidHeaderId, Requisitions.BidHeaderId)
/*
  left outer join dbo.BidImports on BidImports.VendorId = Vendors.VendorId
                                and BidImports.BidImportId = (select top 1 BidImportId
                                                                from (select BidImportId, BidType
                                                                        from vw_POHeaderBidImports bi
															           where bi.POId = PO.POId
															             and bi.VendorId = Vendors.VendorId
															          ) bis 
															   order by BidType)
  left outer join dbo.VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                    and VendorContacts.VendorContactId =
    case isnull(BidImports.POVendorContactId,0)
      when 0 then
		(select Top 1 vc.VendorContactId
		   from VendorContacts vc with (nolock)
		  where vc.VendorId = Vendors.VendorId
			and vc.Active = 1
		  order by vc.POContact desc, vc.VendorContactId)
      else
        (select Top 1 vc.VendorContactId
		   from VendorContacts vc with (nolock)
		  where vc.VendorId = Vendors.VendorId
			and vc.Active = 1
			and vc.VendorContactId = BidImports.POVendorContactId)
    end
  left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = coalesce(BidImports.BidHeaderId, Requisitions.BidHeaderId)
*/
```
