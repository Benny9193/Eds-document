# View: `dbo.POHeaderSummary`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POId` | int | YES |  |  |
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
| 12 | `DistrictNameAddress` | varchar(189) | YES |  |  |
| 13 | `SchoolName` | varchar(50) | YES |  |  |
| 14 | `SchoolNameAddress` | varchar(189) | YES |  |  |
| 15 | `VendorCode` | varchar(16) | YES |  |  |
| 16 | `VendorPhone` | varchar(25) | YES |  |  |
| 17 | `VendorFax` | varchar(20) | YES |  |  |
| 18 | `DistrictVendorCode` | varchar(20) | YES |  |  |
| 19 | `VendorName` | varchar(50) | YES |  |  |
| 20 | `VendorNameAddress` | varchar(249) | YES |  |  |
| 21 | `PODate` | datetime | YES |  |  |
| 22 | `DatePrinted` | datetime | YES |  |  |
| 23 | `DatePrintedDetail` | datetime | YES |  |  |
| 24 | `DateExported` | datetime | YES |  |  |
| 25 | `DistrictId` | int | NO |  |  |
| 26 | `CategoryId` | int | YES |  |  |
| 27 | `BudgetId` | int | NO |  |  |
| 28 | `AccountId` | int | NO |  |  |
| 29 | `VendorId` | int | YES |  |  |
| 30 | `UserId` | int | YES |  |  |
| 31 | `SchoolId` | int | YES |  |  |
| 32 | `VendorBidNumber` | varchar(50) | NO |  |  |
| 33 | `VendorBidComments` | varchar(606) | YES |  |  |
| 34 | `CategoryCode` | varchar(16) | YES |  |  |
| 35 | `CategoryName` | varchar(50) | YES |  |  |
| 36 | `DiscountRate` | decimal(38,6) | YES |  |  |
| 37 | `DiscountAmount` | money | YES |  |  |
| 38 | `TotalGross` | money | YES |  |  |
| 39 | `LocationCode` | varchar(32) | YES |  |  |
| 40 | `ShippingAmount` | money | YES |  |  |
| 41 | `ShippingPercentage` | decimal(9,5) | YES |  |  |
| 42 | `ShippingNameAddress` | varchar(189) | YES |  |  |
| 43 | `DistrictAddress1` | varchar(30) | YES |  |  |
| 44 | `DistrictAddress2` | varchar(30) | YES |  |  |
| 45 | `DistrictAddress3` | varchar(30) | YES |  |  |
| 46 | `DistrictCity` | varchar(25) | YES |  |  |
| 47 | `DistrictState` | varchar(2) | YES |  |  |
| 48 | `DistrictZipcode` | varchar(10) | YES |  |  |
| 49 | `SchoolAddress1` | varchar(30) | YES |  |  |
| 50 | `SchoolAddress2` | varchar(30) | YES |  |  |
| 51 | `SchoolAddress3` | varchar(30) | YES |  |  |
| 52 | `SchoolCity` | varchar(25) | YES |  |  |
| 53 | `SchoolState` | varchar(2) | YES |  |  |
| 54 | `SchoolZipcode` | varchar(10) | YES |  |  |
| 55 | `VendorsAddress1` | varchar(50) | YES |  |  |
| 56 | `VendorsAddress2` | varchar(50) | YES |  |  |
| 57 | `VendorsAddress3` | varchar(50) | YES |  |  |
| 58 | `VendorsCity` | varchar(50) | YES |  |  |
| 59 | `VendorsState` | varchar(2) | YES |  |  |
| 60 | `VendorsZipcode` | varchar(10) | YES |  |  |
| 61 | `ShipLocationsAddress1` | varchar(30) | YES |  |  |
| 62 | `ShipLocationsAddress2` | varchar(30) | YES |  |  |
| 63 | `ShipLocationsAddress3` | varchar(30) | YES |  |  |
| 64 | `ShipLocationsCity` | varchar(25) | YES |  |  |
| 65 | `ShipLocationsState` | varchar(2) | YES |  |  |
| 66 | `ShipLocationsZipcode` | varchar(10) | YES |  |  |
| 67 | `ShipLocationsName` | varchar(50) | YES |  |  |
| 68 | `DistrictMessage` | varchar(4096) | YES |  |  |
| 69 | `BidDate` | datetime | YES |  |  |
| 70 | `UsersDistrictAcctgCode` | varchar(20) | YES |  |  |
| 71 | `AwardsBidHeaderId` | int | YES |  |  |
| 72 | `ExportedToVendor` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `NextNumber` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_POHeaderBidImports` | VIEW |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[POHeaderSummary] AS select min(PO.POId) POId, 
       PO.PONumber, 
       sum(PO.ItemCount) ItemCount, 
       sum(PO.Amount) Amount, 
       Budgets.[Name] BudgetName, 
       min(Requisitions.RequisitionNumber) RequisitionNumber, 
       min(acc.Code) AccountCode,
       max(Requisitions.Attention) Attention, 
       min(Users.CometId) CometId, 
       min(District.DistrictCode) DistrictCode, 
       min(District.[Name]) DistrictName,
       min(District.[Name] + case isnull(District.Address1,'') when '' then '' else char(13) + char(10) + District.Address1 end + case isnull(District.Address2,'') when '' then '' else char(13) + char(10) + District.Address2 end + case isnull(District.Address3,'') when '' then '' else char(13) + char(10) + District.Address3 end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'')) DistrictNameAddress, 
       min(School.[Name]) SchoolName,
       min(School.[Name] + case isnull(School.Address1,'') when '' then '' else char(13) + char(10) + School.Address1 end + case isnull(School.Address2,'') when '' then '' else char(13) + char(10) + School.Address2 end + case isnull(School.Address3,'') when '' then '' else char(13) + char(10) + School.Address3 end + char(13) + char(10) + isnull(School.City,'') + ', ' + isnull(School.State,'') + '  ' + isnull(School.Zipcode,'')) SchoolNameAddress, 
       min(Vendors.Code) VendorCode, 
       min(case 
         when VendorContacts.VendorContactId is null then Vendors.Phone 
         else VendorContacts.Phone
       end) VendorPhone, 
			 min(case 
         when VendorContacts.VendorContactId is null then Vendors.Fax 
         else VendorContacts.Fax
       end) VendorFax, 
/*       DistrictVendor.Value DistrictVendorCode, -- changed 1/21/11 kjm */
       min(case ISNULL(District.UseEDSVendorCodes,0) 
           when 0 then  
		     OADistrictVendor.Value
             --dv.Value  
           else
             Vendors.Code
           end) DistrictVendorCode, 
       min(Vendors.[Name]) VendorName,
       min(Vendors.[Name] + 
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
	   end) VendorNameAddress, 
       min(PO.PODate) PODate, 
       min(PO.DatePrinted) DatePrinted, 
       min(PO.DatePrintedDetail) DatePrintedDetail, 
       min(PO.DateExported) DateExported, 
       District.DistrictId, 
       min(Requisitions.CategoryId) CategoryId, 
       Budgets.BudgetId, 
--       Accounts.AccountId AccountId, 
--       BudgetAccounts.AccountId AccountId, -- Revised to match POHeader 7/12/07 kjm
       Isnull(BudgetAccounts.AccountId,0) AccountId, -- Revised to Allow Join on Blank Account Codes 3/27/2023 kjm
       PO.VendorId, 
       min(Requisitions.UserId) UserId, 
       min(School.SchoolId) SchoolId,
       isnull(BidImports.VendorBidNumber,'') VendorBidNumber, 
--       BidHeaders.Description VendorBidComments, 
--       isnull(BidHeaders.Description,'') + case Vendors.UploadType when 1 then case isnull(BidHeaders.Description,'') when '' then '' else char(10) + char(13) end + 'Mark For: ' + convert(varchar(16),min(PO.POId)) when 1 then case isnull(BidHeaders.Description,'') when '' then '' else char(10) + char(13) end + 'Mark For: ' + convert(varchar(16),min(PO.POId)) else '' end VendorBidComments, 
       isnull(BidHeaders.Description,'') + 
	     case  
           when Vendors.UploadType in (1,2,3) then 
             case isnull(BidHeaders.Description,'') 
               when '' then '' 
               else char(13) + char(10) 
             end + 
             'Mark For: ' + convert(varchar(16),Min(PO.POId)) +
             case isnull(Trim(OADistrictVendor.VendorsAccountCode),'')
               when '' then ''
			   else '  Vendor Acct#: ' + Trim(OADistrictVendor.VendorsAccountCode)
			 end 
           else '' 
         end VendorBidComments, 
       min(Category.Code) CategoryCode, 
       min(Category.[Name]) CategoryName,
       avg(PO.DiscountRate) DiscountRate, 
       sum(PO.DiscountAmount) DiscountAmount, 
       sum(PO.TotalGross) TotalGross, 
       min(isnull(ShipLocations.LocationCode,'')) LocationCode, 
       sum(PO.ShippingAmount) ShippingAmount, 
       min(Vendors.ShippingPercentage) ShippingPercentage,
       min(ShipLocations.[Name] + case isnull(ShipLocations.Address1,'') when '' then '' else char(13) + char(10) + ShipLocations.Address1 end + case isnull(ShipLocations.Address2,'') when '' then '' else char(13) + char(10) + ShipLocations.Address2 end + case isnull(ShipLocations.Address3,'') when '' then '' else char(13) + char(10) + ShipLocations.Address3 end + char(13) + char(10) + isnull(ShipLocations.City,'') + ', ' + isnull(ShipLocations.State,'') + '  ' + isnull(ShipLocations.Zipcode,'')) ShippingNameAddress,
       min(District.Address1) DistrictAddress1, 
       min(District.Address2) DistrictAddress2, 
       min(District.Address3) DistrictAddress3, 
       min(District.City) DistrictCity, 
       min(District.State) DistrictState, 
       min(District.Zipcode) DistrictZipcode,    
       min(School.Address1) SchoolAddress1, 
       min(School.Address2) SchoolAddress2, 
       min(School.Address3) SchoolAddress3, 
       min(School.City) SchoolCity, 
       min(School.State) SchoolState, 
       min(School.Zipcode) SchoolZipcode,    
       min(case 
         when VendorContacts.VendorContactId is null then Vendors.Address1 
         else VendorContacts.Address1
       end) VendorsAddress1, 
       min(case 
         when VendorContacts.VendorContactId is null then Vendors.Address2 
         else VendorContacts.Address2
       end) VendorsAddress2, 
       min(case 
         when VendorContacts.VendorContactId is null then Vendors.Address3 
         else ''
       end) VendorsAddress3, 
       min(case 
         when VendorContacts.VendorContactId is null then Vendors.City  
         else VendorContacts.City
       end) VendorsCity, 
       min(case 
         when VendorContacts.VendorContactId is null then Vendors.State 
         else VendorContacts.State
       end) VendorsState, 
       min(case 
         when VendorContacts.VendorContactId is null then Vendors.Zipcode 
         else VendorContacts.Zipcode
       end) VendorsZipcode,
       min(ShipLocations.Address1) ShipLocationsAddress1, 
       min(ShipLocations.Address2) ShipLocationsAddress2, 
       min(ShipLocations.Address3) ShipLocationsAddress3, 
       min(ShipLocations.City) ShipLocationsCity, 
       min(ShipLocations.State) ShipLocationsState, 
       min(ShipLocations.Zipcode) ShipLocationsZipcode,  
       min(ShipLocations.Name) ShipLocationsName,   
       NextNumber.FFMessage DistrictMessage, 
       BidHeaders.BidAwardDate BidDate,
       min(Users.DistrictAcctgCode) UsersDistrictAcctgCode,
       MIN(BidHeaders.BidHeaderId) AwardsBidHeaderId,  /* kjm 5/28/09 */
       --min(case isnull(Awards.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Awards.BidHeaderId end) AwardsBidHeaderId,
       min(PO.ExportedToVendor) ExportedToVendor
  from PO with (nolock)
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
--              and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
  join District on District.DistrictId = Budgets.DistrictId
  join Category on Category.CategoryId = Requisitions.CategoryId
  join Vendors on Vendors.VendorId = PO.VendorId 
/*
  join School on School.SchoolId = Requisitions.SchoolId
  join NextNumber on NextNumber.BudgetId = Budgets.BudgetId
                 and NextNumber.IdType = 'P'
                 and isnull(NextNumber.SchoolId,0) = case isnull(District.POsBySchool,0) 
                                                        when 0 then 0 
                                                        else isnull(School.SchoolId,0) 
                                                     end
  join dbo.Users on Users.UserId = Requisitions.UserId
  left outer join dbo.ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId 
  left outer join dbo.BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
*/
  outer apply (Select * from School sc where sc.SchoolId = Requisitions.SchoolId) School
  outer apply (Select nn.FFMessage from NextNumber nn where nn.BudgetId = Budgets.BudgetId and nn.IdType = 'P' and coalesce(nn.SchoolId,0) = case coalesce(District.POsBySchool,0) when 0 then 0 else coalesce(School.SchoolId,0) end) NextNumber
  outer apply (Select u.CometId, u.DistrictAcctgCode from Users u where u.UserId = Requisitions.UserId) Users
  outer apply (Select * from ShipLocations sl where sl.ShippingId = Requisitions.ShippingId) ShipLocations
  outer apply (Select ba.AccountId from BudgetAccounts ba where ba.BudgetAccountId = Requisitions.BudgetAccountId) BudgetAccounts
/*  left outer join dbo.BidImports on BidImports.VendorId = Vendors.VendorId
                                and BidImports.BidImportId = (select top 1 BidImportId
                                                                from (select BidImportId, BidType
                                                                        from vw_POHeaderBidImports bi
															           where bi.POId = PO.POId
																	     and bi.VendorId = Vendors.VendorId
															          ) bis 
															   order by BidType)
*/
  outer apply (select top 1 *
                 from (select BI.VendorBidNumber, BI.POVendorContactId, BI.BidHeaderId, HBI.BidType
                         from vw_POHeaderBidImports HBI
				         join BidImports BI on BI.BidImportId = HBI.BidImportId
				        where HBI.POId = PO.POId) x
				order by x.BidType) BidImports
/*  left outer join dbo.VendorContacts on VendorContacts.VendorId = Vendors.VendorId
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
*/
  outer apply (Select top 1 *
                 from VendorContacts vc
				where vc.VendorId = Vendors.VendorId
				  and vc.Active = 1
				  and vc.VendorContactId = case when isnull(BidImports.POVendorContactId,0) = 0 then vc.VendorContactId else BidImports.POVendorContactId end
                order by vc.POContact desc, vc.VendorContactId) VendorContacts
  left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = coalesce(BidImports.BidHeaderId, Requisitions.BidHeaderId)
/*  left outer join dbo.Accounts on Accounts.DistrictId = District.DistrictId
                              and Accounts.AccountId = (select UserAccounts.AccountId 
							                              from UserAccounts with (nolock) 
														 where UserAccounts.BudgetId = Budgets.BudgetId
														   and UserAccounts.UserAccountId = Requisitions.UserAccountId)
  left outer join dbo.DistrictVendor on DistrictVendor.VendorId = Vendors.VendorId 
                                    and DistrictVendor.DistrictId = District.DistrictId 
*/
  outer apply (Select Accounts.Code from Accounts join UserAccounts on UserAccounts.AccountId = Accounts.AccountId and UserAccounts.UserAccountId = Requisitions.UserAccountId where Accounts.DistrictId = District.DistrictId) acc
--  outer apply (Select DistrictVendor.Value from DistrictVendor where DistrictVendor.DistrictId = District.DistrictId and DistrictVendor.VendorId = Vendors.VendorId) dv
  outer apply (select top 1 dv.Value, dv.VendorsAccountCode 
               from DistrictVendor dv
			   where dv.Active = 1 and dv.VendorId = Vendors.VendorId and dv.DistrictId = Budgets.DistrictId 
			   order by dv.DistrictVendorId desc) OADistrictVendor
--  group by PO.PONumber, Budgets.BudgetId, Budgets.Name, District.DistrictId, PO.VendorId, Vendors.VendorId, District.POsBySchool, School.SchoolId, isnull(BidImports.VendorBidNumber,''), BidHeaders.Description, dv.Value, BudgetAccounts.AccountId, NextNumber.FFMessage, BidHeaders.BidAwardDate, vendors.UploadType  -- Revised KJM 7/12/07 for changes above
  group by PO.PONumber, Budgets.BudgetId, Budgets.Name, District.DistrictId, PO.VendorId, Vendors.VendorId, District.POsBySchool, School.SchoolId, isnull(BidImports.VendorBidNumber,''), BidHeaders.Description, OADistrictVendor.Value, OADistrictVendor.VendorsAccountCode, BudgetAccounts.AccountId, NextNumber.FFMessage, BidHeaders.BidAwardDate, vendors.UploadType  -- Revised KJM 7/12/07 for changes above
```
