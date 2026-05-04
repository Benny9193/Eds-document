# View: `dbo.PODetailJavaExportNew`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PODetailItemId` | int | NO |  |  |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | NO |  |  |
| 4 | `Description` | varchar(3650) | YES |  |  |
| 5 | `Quantity` | int | NO |  |  |
| 6 | `UnitCode` | varchar(20) | NO |  |  |
| 7 | `GrossPrice` | money | NO |  |  |
| 8 | `ExtendedGross` | money | YES |  |  |
| 9 | `BidPrice` | money | NO |  |  |
| 10 | `ExtendedBid` | money | YES |  |  |
| 11 | `VendorData` | varchar(1075) | NO |  |  |
| 12 | `Alternate` | varchar(1024) | NO |  |  |
| 13 | `VendorItemCode` | varchar(255) | YES |  |  |
| 14 | `POId` | int | NO |  |  |
| 15 | `PONumber` | varchar(24) | NO |  |  |
| 16 | `POTotal` | money | NO |  |  |
| 17 | `POItemCount` | int | NO |  |  |
| 18 | `DiscountRate` | decimal(9,5) | NO |  |  |
| 19 | `TotalGross` | money | NO |  |  |
| 20 | `DiscountAmount` | money | NO |  |  |
| 21 | `VendorNameAddress` | varchar(249) | YES |  |  |
| 22 | `VendorPhone` | varchar(25) | NO |  |  |
| 23 | `VendorFax` | varchar(20) | NO |  |  |
| 24 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 25 | `VendorUseGross` | int | NO |  |  |
| 26 | `SchoolNameAddress` | varchar(189) | YES |  |  |
| 27 | `DistrictNameAddress` | varchar(189) | YES |  |  |
| 28 | `DistrictCode` | varchar(4) | NO |  |  |
| 29 | `DistrictUseGross` | tinyint | NO |  |  |
| 30 | `AccountCode` | varchar(50) | NO |  |  |
| 31 | `Attention` | varchar(50) | NO |  |  |
| 32 | `CategoryName` | varchar(50) | NO |  |  |
| 33 | `CategoryCode` | char(1) | YES |  |  |
| 34 | `LocationCode` | varchar(32) | NO |  |  |
| 35 | `SortSeq` | varchar(64) | NO |  |  |
| 36 | `ShippingNameAddress` | varchar(189) | YES |  |  |
| 37 | `ShippingPercentage` | decimal(9,5) | NO |  |  |
| 38 | `ShippingAmount` | money | NO |  |  |
| 39 | `PODate` | datetime | YES |  |  |
| 40 | `VendorId` | int | NO |  |  |
| 41 | `DistrictName` | varchar(50) | NO |  |  |
| 42 | `DistrictAddress1` | varchar(30) | NO |  |  |
| 43 | `DistrictAddress2` | varchar(30) | NO |  |  |
| 44 | `DistrictAddress3` | varchar(30) | NO |  |  |
| 45 | `DistrictCity` | varchar(25) | NO |  |  |
| 46 | `DistrictState` | varchar(2) | NO |  |  |
| 47 | `DistrictZip` | varchar(10) | NO |  |  |
| 48 | `DistrictPhone` | varchar(20) | NO |  |  |
| 49 | `DistrictFax` | varchar(20) | NO |  |  |
| 50 | `DistrictEMail` | varchar(255) | NO |  |  |
| 51 | `ShippingName` | varchar(50) | NO |  |  |
| 52 | `ShippingAddress1` | varchar(30) | NO |  |  |
| 53 | `ShippingAddress2` | varchar(30) | NO |  |  |
| 54 | `ShippingAddress3` | varchar(30) | NO |  |  |
| 55 | `ShippingCity` | varchar(25) | NO |  |  |
| 56 | `ShippingState` | varchar(2) | NO |  |  |
| 57 | `ShippingZipCode` | varchar(10) | NO |  |  |
| 58 | `ShippingPhone` | varchar(20) | NO |  |  |
| 59 | `ShippingFax` | varchar(14) | NO |  |  |
| 60 | `ShippingEMail` | varchar(255) | NO |  |  |
| 61 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 62 | `CometId` | int | YES |  |  |
| 63 | `ShippingId` | int | NO |  |  |
| 64 | `BusinessUnit` | varchar(17) | NO |  |  |
| 65 | `UploadType` | int | YES |  |  |
| 66 | `DistrictId` | int | NO |  |  |
| 67 | `cXMLAddress` | varchar(255) | NO |  |  |
| 68 | `UploadEmailList` | varchar(4096) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `Items` | USER_TABLE |
| `PO` | USER_TABLE |
| `PODetailItems` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `Users` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_DetailDescription` | VIEW |
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| `dbo.uf_PackCodeExport` | SQL_SCALAR_FUNCTION |
| [`dbo.VendorContacts`](dbo.VendorContacts.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[PODetailJavaExportNew]
AS
SELECT dbo.PODetailItems.PODetailItemId, 
       dbo.Detail.DetailId, 
       CASE isnull(Detail.ItemMustBeBid, 0) 
         WHEN 1 THEN isnull(Detail.ItemCode, '') 
         ELSE CASE isnull(Detail.BidItemId, 0) 
                WHEN 0 THEN isnull(Detail.VendorItemCode, isnull(Detail.ItemCode, '')) 
                ELSE ISNULL(Detail.ItemCode, '')
              END
       END AS ItemCode, 
       dd.ItemDescription AS Description, 
       ISNULL(dbo.PODetailItems.Quantity, 0) AS Quantity, 
       ISNULL(dbo.Detail.UnitCode, '') AS UnitCode, 
       ISNULL(dbo.Detail.GrossPrice, 0) AS GrossPrice, 
       ISNULL(dbo.PODetailItems.Quantity, 0) * ISNULL(dbo.PODetailItems.GrossPrice, 0) AS ExtendedGross, 
       CASE isnull(Detail.UseGrossPrices, 0) 
         WHEN 0 THEN round(isnull(PODetailItems.BidPrice, 0), 2) 
         ELSE round(isnull(PODetailItems.BidPrice, 0), 2) 
       END AS BidPrice, 
       ISNULL(dbo.PODetailItems.Quantity, 0) * CASE isnull(Detail.UseGrossPrices, 0) 
                                                 WHEN 0 THEN round(isnull(PODetailItems.BidPrice, 0), 2) 
                                                 ELSE isnull(PODetailItems.BidPrice, 0) 
                                               END AS ExtendedBid, 
       CASE isnull(Detail.BidItemId, 0) 
         WHEN 0 THEN 'Catalog Bid Price' 
         ELSE isnull(PODetailItems.Alternate, '') 
       END + ' ' + ISNULL(dbo.PODetailItems.VendorItemCode, '') AS VendorData, 
       CASE isnull(Detail.BidItemId, 0) 
         WHEN 0 THEN 'Catalog Bid Price' 
         ELSE isnull(PODetailItems.Alternate, '') 
       END AS Alternate, 
       dbo.uf_PackCodeExport(CASE isnull(PODetailItems.VendorItemCode, '') 
                               WHEN '' THEN 
                                 isnull(CrossRefs.VendorItemCode, '') 
                               ELSE PODetailItems.VendorItemCode 
                            END, 
       PO.VendorId) AS VendorItemCode, 
       dbo.PO.POId, 
       ISNULL(dbo.PO.PONumber, '') AS PONumber, 
       ISNULL(dbo.PO.Amount, 0) AS POTotal, 
       ISNULL(dbo.PO.ItemCount, 0) AS POItemCount, 
       ISNULL(dbo.PO.DiscountRate, 0) AS DiscountRate, 
       ISNULL(dbo.PO.TotalGross, 0) AS TotalGross, 
       ISNULL(dbo.PO.DiscountAmount, 0) AS DiscountAmount, 
       isnull(Vendors.[Name],'') + 
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
	   end AS VendorNameAddress, 
       ISNULL(case 
         when VendorContacts.VendorContactId is null then Vendors.Phone 
         else VendorContacts.Phone
       end, '') AS VendorPhone, 
       ISNULL(case 
         when VendorContacts.VendorContactId is null then Vendors.Fax 
         else VendorContacts.Fax
       end, '') AS VendorFax, 
       CASE PO.VendorId 
         WHEN 9 THEN isnull(rtrim(PODetailItems.ContractNumber), '') 
         WHEN 29 THEN isnull(rtrim(PODetailItems.ContractNumber), '') 
         ELSE CASE isnull(rtrim(PODetailItems.ContractNumber), '') 
                WHEN '' THEN dbo.Awards.VendorBidNumber 
                ELSE rtrim(PODetailItems.ContractNumber) 
              END 
       END AS VendorBidNumber, 
       ISNULL(dbo.Awards.UseGrossPrices, 0) AS VendorUseGross, 
       ISNULL(dbo.School.Name, '') + 
       CASE isnull(School.Address1, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + School.Address1 
       END + 
       CASE isnull(School.Address2, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + School.Address2 
       END + 
       CASE isnull(School.Address3, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + School.Address3 
       END + CHAR(13) + CHAR(10) + 
       ISNULL(dbo.School.City, '') + ', ' + ISNULL(dbo.School.State, '') + '  ' + ISNULL(dbo.School.Zipcode, '') AS SchoolNameAddress, 
       ISNULL(dbo.District.Name, '') + 
       CASE isnull(District.Address1, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + District.Address1 
       END + 
       CASE isnull(District.Address2, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + District.Address2 
       END + 
       CASE isnull(District.Address3, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + District.Address3 
       END + CHAR(13) + CHAR(10) + 
       ISNULL(dbo.District.City, '') + ', ' + ISNULL(dbo.District.State, '') + '  ' + ISNULL(dbo.District.Zipcode, '') AS DistrictNameAddress, 
       ISNULL(dbo.District.DistrictCode, '') AS DistrictCode, 
       ISNULL(dbo.Detail.UseGrossPrices, 0) AS DistrictUseGross, 
       ISNULL(dbo.Requisitions.AccountCode, '') AS AccountCode, 
       ISNULL(dbo.Requisitions.Attention, '') AS Attention, 
       ISNULL(dbo.Category.Name, '') AS CategoryName, 
       CHAR(dbo.Category.EDSId) AS CategoryCode, 
       ISNULL(dbo.ShipLocations.LocationCode, '') AS LocationCode, 
       ISNULL(dbo.Detail.SortSeq, '') AS SortSeq, 
       dbo.ShipLocations.Name + 
       CASE isnull(ShipLocations.Address1, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + ShipLocations.Address1 
       END + 
       CASE isnull(ShipLocations.Address2, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + ShipLocations.Address2 
       END + 
       CASE isnull(ShipLocations.Address3, '') 
         WHEN '' THEN '' 
         ELSE char(13) + char(10) + ShipLocations.Address3 
       END + CHAR(13) + CHAR(10) + 
       ISNULL(dbo.ShipLocations.City, '') + ', ' + ISNULL(dbo.ShipLocations.State, '') + '  ' + ISNULL(dbo.ShipLocations.ZipCode, '') AS ShippingNameAddress, 
       ISNULL(dbo.Vendors.ShippingPercentage, 0) AS ShippingPercentage, 
       ISNULL(dbo.PO.ShippingAmount, 0) AS ShippingAmount, 
       dbo.PO.PODate, 
       dbo.Vendors.VendorId, 
       ISNULL(dbo.District.Name, '') AS DistrictName, 
       ISNULL(dbo.District.Address1, '') AS DistrictAddress1, 
       ISNULL(dbo.District.Address2, '') AS DistrictAddress2, 
       ISNULL(dbo.District.Address3, '') AS DistrictAddress3, 
       ISNULL(dbo.District.City, '') AS DistrictCity, 
       ISNULL(dbo.District.State, '') AS DistrictState, 
       ISNULL(dbo.District.Zipcode, '') AS DistrictZip, 
       ISNULL(dbo.District.PhoneNumber, '') AS DistrictPhone, 
       ISNULL(dbo.District.Fax, '') AS DistrictFax, 
       ISNULL(dbo.District.EMail, '') AS DistrictEMail, 
       ISNULL(dbo.ShipLocations.Name, '') AS ShippingName, 
       ISNULL(dbo.ShipLocations.Address1, '') AS ShippingAddress1, 
       ISNULL(dbo.ShipLocations.Address2, '') AS ShippingAddress2, 
       ISNULL(dbo.ShipLocations.Address3, '') AS ShippingAddress3, 
       ISNULL(dbo.ShipLocations.City, '') AS ShippingCity, 
       ISNULL(dbo.ShipLocations.State, '') AS ShippingState, 
       ISNULL(dbo.ShipLocations.ZipCode, '') AS ShippingZipCode, 
       ISNULL(dbo.ShipLocations.Phone, '') AS ShippingPhone, 
       ISNULL(dbo.ShipLocations.Fax, '') AS ShippingFax, 
       ISNULL(dbo.ShipLocations.EMail, '') AS ShippingEMail, 
       ISNULL(DistrictVendor.VendorsAccountCode, '') AS VendorsAccountCode, 
       dbo.Users.CometId, 
       dbo.ShipLocations.ShippingId, 
       ISNULL(dbo.Vendors.BusinessUnit, '') AS BusinessUnit, 
       dbo.Vendors.UploadType, 
       dbo.District.DistrictId, 
       ISNULL(dbo.Vendors.cXMLAddress, '') AS cXMLAddress, 
       ISNULL(dbo.Vendors.UploadEMailList, '') AS UploadEmailList
  FROM Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  Join School on School.SchoolId = Requisitions.SchoolId
  join ShipLocations on ShipLocations.ShippingId = ISNULL(dbo.Requisitions.ShippingId, dbo.School.ShippingId) 
  join Category on Category.CategoryId = Requisitions.CategoryId
  join Users on Users.UserId = Requisitions.UserId
  join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
  join Items on Items.ItemId = Detail.ItemId
  join BidHeaders on BidHeaders.BidHeaderId = 
    CASE isnull(Detail.BidHeaderId, 0) 
      WHEN 0 THEN Requisitions.BidHeaderId 
      ELSE Detail.BidHeaderId 
    END 
  join PO on PO.RequisitionId = Requisitions.RequisitionId
  join PODetailItems on PODetailItems.DetailId = Detail.DetailId
                    and PODetailItems.POId = PO.POId
  join Vendors on Vendors.VendorId = Detail.VendorId
  LEFT OUTER JOIN dbo.Awards ON dbo.Awards.VendorId = dbo.PO.VendorId 
                            AND dbo.Awards.Active = 1 
                            AND dbo.Awards.BidHeaderId = dbo.BidHeaders.BidHeaderId
  left outer join dbo.VendorContacts on VendorContacts.VendorContactId =
    (select Top 1 vc.VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.Active = 1
      order by vc.POContact desc, vc.VendorContactId)
  left outer join DistrictVendor on DistrictVendor.DistrictVendorId =
    (select Top 1 Dv.DistrictVendorId
       from DistrictVendor dv with (nolock)
      where dv.DistrictId = District.DistrictId
        and dv.VendorId = Vendors.VendorId
        and dv.Active = 1
      order by Dv.DistrictVendorId)
  left outer join CrossRefs on CrossRefs.CrossRefId =
    (select Top 1 xr.CrossRefId
       from CrossRefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
                       and cat.VendorId = Vendors.VendorId
                       and cat.Active = 1
      where xr.ItemId = Detail.ItemId
      ORDER BY cat.CatalogYear DESC, cat.CatalogId DESC, xr.CrossRefId DESC)
```
