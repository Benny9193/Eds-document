# View: `dbo.POHeaderSummary_04232018`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 17 | `DistrictVendorCode` | varchar(20) | YES |  |  |
| 18 | `VendorName` | varchar(50) | YES |  |  |
| 19 | `VendorNameAddress` | varchar(249) | YES |  |  |
| 20 | `PODate` | datetime | YES |  |  |
| 21 | `DatePrinted` | datetime | YES |  |  |
| 22 | `DatePrintedDetail` | datetime | YES |  |  |
| 23 | `DateExported` | datetime | YES |  |  |
| 24 | `DistrictId` | int | NO |  |  |
| 25 | `CategoryId` | int | YES |  |  |
| 26 | `BudgetId` | int | NO |  |  |
| 27 | `AccountId` | int | YES |  |  |
| 28 | `VendorId` | int | YES |  |  |
| 29 | `UserId` | int | YES |  |  |
| 30 | `SchoolId` | int | YES |  |  |
| 31 | `VendorBidNumber` | varchar(50) | NO |  |  |
| 32 | `VendorBidComments` | varchar(540) | YES |  |  |
| 33 | `CategoryCode` | varchar(16) | YES |  |  |
| 34 | `CategoryName` | varchar(50) | YES |  |  |
| 35 | `DiscountRate` | decimal(38,6) | YES |  |  |
| 36 | `DiscountAmount` | money | YES |  |  |
| 37 | `TotalGross` | money | YES |  |  |
| 38 | `LocationCode` | varchar(32) | YES |  |  |
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
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `NextNumber` | USER_TABLE |
| `PO` | USER_TABLE |
| `School` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `vw_POHeaderBidImports` | VIEW |
| [`dbo.Accounts`](dbo.Accounts.md) | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.BudgetAccounts`](dbo.BudgetAccounts.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.DistrictVendor`](dbo.DistrictVendor.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.ShipLocations`](dbo.ShipLocations.md) | USER_TABLE |
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |
| [`dbo.VendorContacts`](dbo.VendorContacts.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[POHeaderSummary_04232018] /* with schemabinding */ AS

select min(PO.POId) POId, 
       PO.PONumber, 
       sum(PO.ItemCount) ItemCount, 
       sum(PO.Amount) Amount, 
       Budgets.[Name] BudgetName, 
       min(Requisitions.RequisitionNumber) RequisitionNumber, 
       min(Accounts.Code) AccountCode,
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
/*       DistrictVendor.Value DistrictVendorCode, -- changed 1/21/11 kjm */
       min(case ISNULL(District.UseEDSVendorCodes,0) 
           when 0 then  
             DistrictVendor.Value  
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
       BudgetAccounts.AccountId AccountId, -- Revised to match POHeader 7/12/07 kjm
       PO.VendorId, 
       min(Requisitions.UserId) UserId, 
       min(School.SchoolId) SchoolId,
       isnull(BidImports.VendorBidNumber,'') VendorBidNumber, 
--       BidHeaders.Description VendorBidComments, 
       isnull(BidHeaders.Description,'') + case Vendors.UploadType when 1 then case isnull(BidHeaders.Description,'') when '' then '' else char(10) + char(13) end + 'Mark For: ' + convert(varchar(16),min(PO.POId)) when 1 then case isnull(BidHeaders.Description,'') when '' then '' else char(10) + char(13) end + 'Mark For: ' + convert(varchar(16),min(PO.POId)) else '' end VendorBidComments, 
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
  join dbo.Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
  join dbo.Users on Users.UserId = Requisitions.UserId
  join District on District.DistrictId = Budgets.DistrictId
  join School on School.SchoolId = Requisitions.SchoolId
  inner join NextNumber on NextNumber.BudgetId = Budgets.BudgetId
                       and NextNumber.IdType = 'P'
                       and isnull(NextNumber.SchoolId,0) = case isnull(District.POsBySchool,0) 
                                                             when 0 then 0 
                                                             else isnull(School.SchoolId,0) 
                                                           end
  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
  join dbo.Vendors on Vendors.VendorId = PO.VendorId 
  left outer join dbo.ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId 
  left outer join dbo.BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
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
  left outer join dbo.Accounts on Accounts.DistrictId = District.DistrictId
                              and Accounts.AccountId = (select UserAccounts.AccountId 
							                              from UserAccounts with (nolock) 
														 where UserAccounts.BudgetId = Budgets.BudgetId
														   and UserAccounts.UserAccountId = Requisitions.UserAccountId)
  left outer join dbo.DistrictVendor on DistrictVendor.VendorId = Vendors.VendorId 
                                    and DistrictVendor.DistrictId = District.DistrictId 
 group by PO.PONumber, Budgets.BudgetId, Budgets.Name, District.DistrictId, PO.VendorId, Vendors.VendorId, District.POsBySchool, School.SchoolId, isnull(BidImports.VendorBidNumber,''), BidHeaders.Description, DistrictVendor.Value, BudgetAccounts.AccountId, NextNumber.FFMessage, BidHeaders.BidAwardDate, vendors.UploadType  -- Revised KJM 7/12/07 for changes above
```
