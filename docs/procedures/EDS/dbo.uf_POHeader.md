# Function: table-valued: `dbo.uf_POHeader`

_Generated on 2026-05-04T13:07:57.689Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_POHeader` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2003-05-15 15:12:58 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPOId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   function dbo.uf_POHeader (@pPOId int)
returns @HeaderTable table (
POId int null, 
PONumber varchar(50), 
ItemCount int, 
Amount money null, 
BudgetName varchar(50) null, 
RequisitionNumber varchar(50) null, 
AccountCode varchar(50) null, 
Attention varchar(50) null, 
CometId int null, 
DistrictCode varchar(50) null, 
DistrictName varchar(50) null,
DistrictNameAddress varchar(512) null, 
SchoolName varchar(50) null,
SchoolNameAddress varchar(512) null, 
VendorCode varchar(50) null, 
VendorPhone varchar(50) null, 
DistrictVendorCode varchar(50) null, 
VendorName varchar(50) null,
VendorNameAddress varchar(512) null, 
PODate datetime null, 
DatePrinted datetime null, 
DatePrintedDetail datetime null, 
DateExported datetime null, 
DistrictId int null, 
CategoryId int null, 
BudgetId int null, 
AccountId int null, 
VendorId int null, 
UserId int null, 
SchoolId int null,
VendorBidNumber varchar(50) null, 
VendorBidComments varchar(1024) null,
CategoryCode varchar(50) null, 
CategoryName varchar(50) null,
DiscountRate decimal(9,5) null, 
DiscountAmount money null, 
TotalGross money null, 
LocationCode varchar(50) null, 
ShippingAmount money null, 
ShippingPercentage decimal(9,5) null,
ShippingNameAddress varchar(512) null,
DistrictAddress1 varchar(50) null,  
DistrictAddress2 varchar(50) null,  
DistrictAddress3 varchar(50) null, 
DistrictCity varchar(50) null, 
DistrictState varchar(50) null, 
DistrictZipcode varchar(50) null,
SchoolAddress1 varchar(50) null,  
SchoolAddress2 varchar(50) null,  
SchoolAddress3 varchar(50) null, 
SchoolCity varchar(50) null, 
SchoolState varchar(50) null, 
SchoolZipcode varchar(50) null,
VendorsAddress1 varchar(50) null,  
VendorsAddress2 varchar(50) null,  
VendorsAddress3 varchar(50) null, 
VendorsCity varchar(50) null, 
VendorsState varchar(50) null, 
VendorsZipcode varchar(50) null,
ShipLocationsAddress1 varchar(50) null,  
ShipLocationsAddress2 varchar(50) null,  
ShipLocationsAddress3 varchar(50) null, 
ShipLocationsCity varchar(50) null, 
ShipLocationsState varchar(50) null, 
ShipLocationsZipcode varchar(50) null,
ShipLocationsName varchar(50) null, 
DistrictMessage varchar(1024) null, 
BidDate datetime null)
AS
begin
insert @HeaderTable (POId, PONumber, ItemCount, Amount, BudgetName, RequisitionNumber, 
                     AccountCode, Attention, CometId, DistrictCode, DistrictName, DistrictNameAddress, 
                     SchoolName, SchoolNameAddress, VendorCode, VendorPhone, DistrictVendorCode, 
                     VendorName, VendorNameAddress, PODate, DatePrinted, DatePrintedDetail, 
                     DateExported, DistrictId, CategoryId, BudgetId, AccountId, VendorId, 
                     UserId, SchoolId, VendorBidNumber, VendorBidComments, CategoryCode, 
                     CategoryName, DiscountRate, DiscountAmount, TotalGross, LocationCode, 
                     ShippingAmount, ShippingPercentage, ShippingNameAddress, 
                     DistrictAddress1, DistrictAddress2, DistrictAddress3, DistrictCity, 
                     DistrictState, DistrictZipcode, SchoolAddress1, SchoolAddress2, 
                     SchoolAddress3, SchoolCity, SchoolState, SchoolZipcode, VendorsAddress1, 
                     VendorsAddress2, VendorsAddress3, VendorsCity, VendorsState, 
                     VendorsZipcode, ShipLocationsAddress1, ShipLocationsAddress2, 
                     ShipLocationsAddress3, ShipLocationsCity, ShipLocationsState, 
                     ShipLocationsZipcode, ShipLocationsName, DistrictMessage, BidDate)
  select PO.POId, PO.PONumber, PO.ItemCount, PO.Amount, Budgets.[Name] BudgetName, 
         Requisitions.RequisitionNumber, Requisitions.AccountCode, Requisitions.Attention, Users.CometId, 
         District.DistrictCode, District.[Name] DistrictName,
         District.[Name] + case isnull(District.Address1,'') when '' then '' else char(13) + char(10) + District.Address1 end + case isnull(District.Address2,'') when '' then '' else char(13) + char(10) + District.Address2 end + case isnull(District.Address3,'') when '' then '' else char(13) + char(10) + District.Address3 end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictNameAddress, 
         School.[Name] SchoolName,
         School.[Name] + case isnull(School.Address1,'') when '' then '' else char(13) + char(10) + School.Address1 end + case isnull(School.Address2,'') when '' then '' else char(13) + char(10) + School.Address2 end + case isnull(School.Address3,'') when '' then '' else char(13) + char(10) + School.Address3 end + char(13) + char(10) + isnull(School.City,'') + ', ' + isnull(School.State,'') + '  ' + isnull(School.Zipcode,'') SchoolNameAddress, 
         Vendors.Code VendorCode, Vendors.Phone VendorPhone, DistrictVendor.Value DistrictVendorCode, Vendors.[Name] VendorName,
         Vendors.[Name] + case isnull(Vendors.Address1,'') when '' then '' else char(13) + char(10) + Vendors.Address1 end + case isnull(Vendors.Address2,'') when '' then '' else char(13) + char(10) + Vendors.Address2 end + case isnull(Vendors.Address3,'') when '' then '' else char(13) + char(10) + Vendors.Address3 end + char(13) + char(10) + isnull(Vendors.City,'') + ', ' + isnull(Vendors.State,'') + '  ' + isnull(Vendors.Zipcode,'') VendorNameAddress, 
         PO.PODate, PO.DatePrinted, PO.DatePrintedDetail, PO.DateExported, School.DistrictId, 
         Requisitions.CategoryId, Requisitions.BudgetId, 
         BudgetAccounts.AccountId, PO.VendorId, 
         Requisitions.UserId, School.SchoolId,
         ss.VendorBidNumber, ss.VendorBidComments VendorBidComments,
         char(Category.EDSId) CategoryCode, Category.[Name] CategoryName,
         PO.DiscountRate, PO.DiscountAmount, PO.TotalGross, isnull(ShipLocations.LocationCode,'') LocationCode, PO.ShippingAmount, Vendors.ShippingPercentage,
         ShipLocations.[Name] + case isnull(ShipLocations.Address1,'') when '' then '' else char(13) + char(10) + ShipLocations.Address1 end + case isnull(ShipLocations.Address2,'') when '' then '' else char(13) + char(10) + ShipLocations.Address2 end + case isnull(ShipLocations.Address3,'') when '' then '' else char(13) + char(10) + ShipLocations.Address3 end + char(13) + char(10) + isnull(ShipLocations.City,'') + ', ' + isnull(ShipLocations.State,'') + '  ' + isnull(ShipLocations.Zipcode,'') ShippingNameAddress,
         District.Address1 DistrictAddress1,  District.Address2 DistrictAddress2,  District.Address3 DistrictAddress3, District.City DistrictCity, District.State DistrictState, District.Zipcode DistrictZipcode,
         School.Address1 SchoolAddress1,  School.Address2 SchoolAddress2,  School.Address3 SchoolAddress3, School.City SchoolCity, School.State SchoolState, School.Zipcode SchoolZipcode,
         Vendors.Address1 VendorsAddress1,  Vendors.Address2 VendorsAddress2,  Vendors.Address3 VendorsAddress3, Vendors.City  VendorsCity, Vendors.State VendorsState, Vendors.Zipcode VendorsZipcode,
         ShipLocations.Address1 ShipLocationsAddress1,  ShipLocations.Address2 ShipLocationsAddress2,  ShipLocations.Address3 ShipLocationsAddress3, ShipLocations.City ShipLocationsCity, ShipLocations.State ShipLocationsState, ShipLocations.Zipcode  ShipLocationsZipcode,
         ShipLocations.[Name] ShipLocationsName, NextNumber.FFMessage DistrictMessage, BidHeaders.BidAwardDate BidDate
    from PO 
    join Requisitions on Requisitions.RequisitionId = PO.RequisitionId 
    join Vendors on Vendors.VendorId = PO.VendorId 
    join School on School.SchoolId = Requisitions.SchoolId     left outer join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId 
    join District on District.DistrictId = School.DistrictId
    join Users on Users.UserId = Requisitions.UserId 
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join Category on Category.CategoryId = Requisitions.CategoryId
    join PPCategory on PPCategory.CategoryId = Category.CategoryId
    join DistrictPP on DistrictPP.DistrictId = District.DistrictId
                   and DistrictPP.PricePlanId = PPCategory.PricePlanId
    left outer join DistrictVendor on DistrictVendor.VendorId = Vendors.VendorId
                                  and DistrictVendor.DistrictId = District.DistrictId
    left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId 
    left outer join Accounts on Accounts.AccountId = BudgetAccounts.AccountId 
    left outer join NextNumber on NextNumber.DistrictId = District.DistrictId
                              and NextNumber.BudgetId = Budgets.BudgetId
                              and isnull(NextNumber.SchoolId,0) = case isnull(District.POsBySchool,0) when 0 then 0 else isnull(School.SchoolId,0) end
                              and NextNumber.IdType = 'P'
    left outer join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
                              and BidHeaders.PricePlanId = DistrictPP.PricePlanId
                              and BidHeaders.BidAwardDate >= dateadd(year,-1,PO.PODate)
                              and BidHeaders.BidAwardDate <= PO.PODate
                              and BidHeaders.Active = 1
    left outer join (
      select CategoryId, PricePlanId, VendorId, BidStartDate, Max(VendorBidNumber) VendorBidNumber, max(Description) VendorBidComments
        from Awards
       where Active = 1
       group by CategoryId, PricePlanId, VendorId, BidStartDate
                    ) ss on ss.CategoryId = Requisitions.CategoryId
                        and ss.PricePlanId = DistrictPP.PricePlanId
                        and ss.VendorId = PO.VendorId
   where PO.POId = @pPOId

  return
end
```
