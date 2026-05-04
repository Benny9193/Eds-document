# View: `dbo.PODetailJavaExport`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PODetailItemId` | int | NO |  |  |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | NO |  |  |
| 4 | `Description` | nvarchar(max) | YES |  |  |
| 5 | `Quantity` | int | NO |  |  |
| 6 | `UnitCode` | varchar(20) | YES |  |  |
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
| 42 | `DistrictAddress1` | varchar(50) | NO |  |  |
| 43 | `DistrictAddress2` | varchar(50) | NO |  |  |
| 44 | `DistrictAddress3` | varchar(1) | NO |  |  |
| 45 | `DistrictCity` | varchar(50) | NO |  |  |
| 46 | `DistrictState` | varchar(2) | NO |  |  |
| 47 | `DistrictZip` | varchar(10) | NO |  |  |
| 48 | `DistrictPhone` | nvarchar(max) | YES |  |  |
| 49 | `DistrictFax` | nvarchar(max) | YES |  |  |
| 50 | `DistrictEMail` | varchar(255) | NO |  |  |
| 51 | `ShippingName` | varchar(50) | NO |  |  |
| 52 | `ShippingAddress1` | varchar(61) | YES |  |  |
| 53 | `ShippingAddress2` | varchar(30) | NO |  |  |
| 54 | `ShippingAddress3` | varchar(30) | NO |  |  |
| 55 | `ShippingCity` | varchar(25) | NO |  |  |
| 56 | `ShippingState` | varchar(2) | NO |  |  |
| 57 | `ShippingZipCode` | varchar(10) | NO |  |  |
| 58 | `ShippingPhone` | nvarchar(max) | YES |  |  |
| 59 | `ShippingFax` | nvarchar(max) | YES |  |  |
| 60 | `ShippingEMail` | varchar(255) | YES |  |  |
| 61 | `VendorsAccountCode` | varchar(50) | YES |  |  |
| 62 | `CometId` | int | YES |  |  |
| 63 | `ShippingId` | varchar(50) | YES |  |  |
| 64 | `BusinessUnit` | varchar(17) | NO |  |  |
| 65 | `UploadType` | int | YES |  |  |
| 66 | `DistrictId` | int | NO |  |  |
| 67 | `cXMLAddress` | varchar(1024) | NO |  |  |
| 68 | `UploadEmailList` | varchar(4096) | NO |  |  |
| 69 | `cXMLFromDomain` | varchar(50) | NO |  |  |
| 70 | `cXMLFromIdentity` | varchar(50) | NO |  |  |
| 71 | `cXMLToDomain` | varchar(50) | NO |  |  |
| 72 | `cXMLToIdentity` | varchar(50) | NO |  |  |
| 73 | `cXMLSenderDomain` | varchar(50) | NO |  |  |
| 74 | `cXMLSenderIdentity` | varchar(50) | NO |  |  |
| 75 | `cXMLSenderSharedSecret` | varchar(50) | NO |  |  |
| 76 | `dateSubmitted` | datetime | NO |  |  |
| 77 | `isActualNumber` | tinyint | NO |  |  |
| 78 | `hostUserName` | varchar(255) | NO |  |  |
| 79 | `hostPassword` | varchar(255) | NO |  |  |
| 80 | `RequestedDeliveryDate` | date | YES |  |  |
| 81 | `DistrictContactId` | int | YES |  |  |
| 82 | `PerishableItem` | bit | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `Awards` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `Items` | USER_TABLE |
| `NextNumber` | USER_TABLE |
| `PO` | USER_TABLE |
| `PODetailItems` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `ShippingVendor` | USER_TABLE |
| `Users` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_DetailDescription` | VIEW |
| `dbo.uf_PackCodeExport` | SQL_SCALAR_FUNCTION |
| `dbo.ufn_RegExReplace` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from Vendors where VendorId = 29

--select * from PODetailJavaExport where POId = 715003772
CREATE             VIEW [dbo].[PODetailJavaExport]
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
       coalesce(dd.ShortDescription, dd.ItemDescription) AS Description, 
       ISNULL(dbo.PODetailItems.Quantity, 0) AS Quantity, 
       coalesce(case when trim(CrossRefs.UOM) = '' then null else CrossRefs.UOM end, dbo.Detail.UnitCode, '') AS UnitCode, 
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
/*       dbo.uf_PackCodeExport(CASE coalesce(trim(PODetailItems.VendorItemCode), '') 
                               WHEN '' THEN 
                                 coalesce(bi.UniqueItemNumber), bi.VendorItemCode, CrossRefs.UniqueItemNumber, CrossRefs.VendorItemCode, '') 
                               ELSE PODetailItems.VendorItemCode 
                            END, 
       PO.VendorId) AS VendorItemCode, */
       dbo.uf_PackCodeExport(coalesce(bi.UniqueItemNumber, bi.VendorItemCode, CrossRefs.UniqueItemNumber, CrossRefs.VendorItemCode, trim(PODetailItems.VendorItemCode), ''), PO.VendorId) AS VendorItemCode, 
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
/*       CASE PO.VendorId 
         WHEN 9 THEN isnull(rtrim(PODetailItems.ContractNumber), '') 
         WHEN 29 THEN isnull(rtrim(PODetailItems.ContractNumber), '') 
         ELSE CASE isnull(rtrim(PODetailItems.ContractNumber), '') 
                WHEN '' THEN dbo.Awards.VendorBidNumber 
                ELSE rtrim(PODetailItems.ContractNumber) 
              END 
       END*/Awards.VendorBidNumber AS VendorBidNumber, 
       ISNULL(Awards.UseGrossPrices, 0) AS VendorUseGross, 
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
       CASE 
         when isnull(District.Address1, '') = '' then ''
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
       case
	     when DistrictContacts.DistrictContactId is null or trim(isnull(DistrictContacts.Address1,'') + isnull(DistrictContacts.Address2,'')) = '' then
		   case
			 when ISNULL(dbo.District.Address1, '') = '' then ISNULL(dbo.District.Address2, '')
			 when PATINDEX('%PAY%',ISNULL(dbo.District.Address1, '')) != 0 then ISNULL(dbo.District.Address2, '')
			 else ISNULL(dbo.District.Address1, '')
		   end
		 else
		   case
			 when ISNULL(dbo.DistrictContacts.Address1, '') = '' then ISNULL(dbo.DistrictContacts.Address2, '')
			 when PATINDEX('%PAY%',ISNULL(dbo.DistrictContacts.Address1, '')) != 0 then ISNULL(dbo.DistrictContacts.Address2, '')
			 else ISNULL(dbo.DistrictContacts.Address1, '')
		   end
       end AS DistrictAddress1, 
       case
	     when DistrictContacts.DistrictContactId is null or trim(isnull(DistrictContacts.Address1,'') + isnull(DistrictContacts.Address2,'')) = '' then
		   case
			 when PATINDEX('%PAY%',ISNULL(dbo.District.Address1, '')) != 0 then isnull(District.Address3,'')
			 else ISNULL(dbo.District.Address2, '')
		   end
		 else
		   case
			 when PATINDEX('%PAY%',ISNULL(dbo.DistrictContacts.Address1, '')) != 0 then ''
			 else ISNULL(dbo.DistrictContacts.Address2, '')
		   end
       end AS DistrictAddress2,
       '' AS DistrictAddress3, 
       case
	     when DistrictContacts.DistrictContactId is null or trim(isnull(DistrictContacts.Address1,'') + isnull(DistrictContacts.Address2,'')) = '' then
		   ISNULL(dbo.District.City, '') 
		 else
		   ISNULL(dbo.DistrictContacts.City, '') 
       end AS DistrictCity, 
       case
	     when DistrictContacts.DistrictContactId is null or trim(isnull(DistrictContacts.Address1,'') + isnull(DistrictContacts.Address2,'')) = '' then
		   ISNULL(dbo.District.State, '')
		 else
		   ISNULL(dbo.DistrictContacts.State, '')
	   end AS DistrictState, 
       case
	     when DistrictContacts.DistrictContactId is null or trim(isnull(DistrictContacts.Address1,'') + isnull(DistrictContacts.Address2,'')) = '' then
           ISNULL(dbo.District.Zipcode, '') 
		 else
           ISNULL(dbo.DistrictContacts.Zipcode, '') 
	   end AS DistrictZip, 
       master.dbo.ufn_RegExReplace(isnull(DistrictContacts.Phone,''),'1?\s*\W?\s*([2-9][0-8][0-9])\s*\W?\s*([2-9][0-9]{2})\s*\W?\s*([0-9]{4})(\se?x?t?(\d*))?','1$1$2-$3',1) AS DistrictPhone, 
       master.dbo.ufn_RegExReplace(isnull(DistrictContacts.Fax,''),'1?\s*\W?\s*([2-9][0-8][0-9])\s*\W?\s*([2-9][0-9]{2})\s*\W?\s*([0-9]{4})(\se?x?t?(\d*))?','1$1$2-$3',1) AS DistrictFax, 
       ISNULL(dbo.DistrictContacts.EMail, '') AS DistrictEMail, 
       ISNULL(dbo.ShipLocations.Name, '') AS ShippingName, 
       ISNULL(dbo.ShipLocations.Address1, '') + case when isnull(trim(ShipLocations.Address2),'') = '' then '' else char(10) + isnull(trim(ShipLocations.Address2),'') end AS ShippingAddress1, 
       ISNULL(dbo.ShipLocations.Address2, '') AS ShippingAddress2, 
       ISNULL(dbo.ShipLocations.Address3, '') AS ShippingAddress3, 
       ISNULL(dbo.ShipLocations.City, '') AS ShippingCity, 
       ISNULL(dbo.ShipLocations.State, '') AS ShippingState, 
       ISNULL(dbo.ShipLocations.ZipCode, '') AS ShippingZipCode, 
       master.dbo.ufn_RegExReplace(isnull(ShipLocations.Phone,''),'1?\s*\W?\s*([2-9][0-8][0-9])\s*\W?\s*([2-9][0-9]{2})\s*\W?\s*([0-9]{4})(\se?x?t?(\d*))?','1$1$2-$3',1) AS ShippingPhone, 
       master.dbo.ufn_RegExReplace(isnull(ShipLocations.Fax,''),'1?\s*\W?\s*([2-9][0-8][0-9])\s*\W?\s*([2-9][0-9]{2})\s*\W?\s*([0-9]{4})(\se?x?t?(\d*))?','1$1$2-$3',1) AS ShippingFax, 
--       ISNULL(dbo.Users.EMail, '') AS ShippingEMail, 
       case Vendors.UploadType 
	     when 6 then coalesce(/*dbo.Users.EMail,*/ dbo.ShipLocations.EMail, dbo.School.Email, '')
		 else coalesce(dbo.ShipLocations.EMail, dbo.School.Email, /*dbo.Users.EMail,*/ '')
	   end AS ShippingEMail, 
       ISNULL(DistrictVendor.VendorsAccountCode, case when Vendors.VendorId = 541 then cast(District.DistrictId as varchar) else '' end) AS VendorsAccountCode, 
       dbo.Users.CometId, 
       case 
	     when dbo.Vendors.UploadType = 3 then isnull((select sv.ShippingCode from ShippingVendor sv where sv.VendorId = Vendors.VendorId and sv.ShippingId = ShipLocations.ShippingId),'') 
		 when dbo.Vendors.VendorId = 552 then isnull((select sv.ShippingCode from ShippingVendor sv where sv.VendorId = Vendors.VendorId and sv.ShippingId = ShipLocations.ShippingId),'') 
		 else cast(dbo.ShipLocations.ShippingId as varchar) 
	   end ShippingId, 
       ISNULL(dbo.Vendors.BusinessUnit, '') AS BusinessUnit, 
       dbo.Vendors.UploadType, 
       dbo.District.DistrictId, 
       ISNULL(dbo.Vendors.cXMLAddress, '') AS cXMLAddress, 
       ISNULL(dbo.Vendors.UploadEMailList, '') AS UploadEmailList,
       ISNULL(dbo.Vendors.cXMLFromDomain,'') as cXMLFromDomain,
       ISNULL(case when dbo.Vendors.UploadType = 3 then DistrictVendor.VendorsAccountCode else dbo.Vendors.cXMLFromIdentity end,'') as cXMLFromIdentity,
       ISNULL(dbo.Vendors.cXMLToDomain,'') as cXMLToDomain,
       ISNULL(dbo.Vendors.cXMLToIdentity,'') as cXMLToIdentity,
       ISNULL(dbo.Vendors.cXMLSenderDomain,'') as cXMLSenderDomain,
	   ISNULL(case when dbo.Vendors.UploadType = 3 then DistrictVendor.VendorsAccountCode else dbo.Vendors.cXMLSenderIdentity end,'') as cXMLSenderIdentity,
--       ISNULL(dbo.Vendors.cXMLSenderIdentity,'') as cXMLSenderIdentity,
       ISNULL(dbo.Vendors.cXMLSenderSharedSecret,'') as cXMLSenderSharedSecret,
	   isnull(ap.ApprovalDate,'') as dateSubmitted,
	   isnull(nn.ActualNumber,0) isActualNumber,
	   isnull(trim(Vendors.hostUserName),'') hostUserName,
	   isnull(trim(Vendors.HostPassword),'') hostPassword,
	   Detail.DeliveryDate RequestedDeliveryDate,
	   DistrictContacts.DistrictContactId,
	   Detail.PerishableItem
  FROM Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  left outer join DistrictContacts on DistrictContacts.DistrictId = District.DistrictId
                                  and DistrictContacts.DistrictContactId =
    (select Top 1 dc.DistrictContactId
       from DistrictContacts dc
      where dc.DistrictId = District.DistrictId
        and dc.DistrictContactTypeId in (1,2,5)
      order by dc.DistrictContactTypeId desc)
  Join School on School.SchoolId = Requisitions.SchoolId
  join ShipLocations on ShipLocations.ShippingId = ISNULL(dbo.Requisitions.ShippingId, dbo.School.ShippingId) 
  join Category on Category.CategoryId = Requisitions.CategoryId
  join Users on Users.UserId = Requisitions.UserId
  join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
  join Items on Items.ItemId = Detail.ItemId
  join PO on PO.RequisitionId = Requisitions.RequisitionId
  join PODetailItems on PODetailItems.DetailId = Detail.DetailId
                    and PODetailItems.POId = PO.POId
  join Vendors on Vendors.VendorId = Detail.VendorId
  outer apply (Select Bids.BidHeaderId, Bids.BidId, case when coalesce(trim(BidItems.VendorItemCode),'') = '' then null else trim(BidItems.VendorItemCode) end VendorItemCode, case when coalesce(trim(BidResults.UniqueItemNumber),'') = '' then null else trim (BidResults.UniqueItemNumber) end UniqueItemNumber
                 from BidItems
				 join Bids on Bids.BidId = BidItems.BidId
				 join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
				where BidItems.BidItemId = Detail.BidItemId) bi
  outer apply (Select A.VendorBidNumber, A.UseGrossPrices
                 from Awards A
				where A.VendorId = PO.VendorId
				  and A.Active = 1
				  and A.BidHeaderId = coalesce(bi.BidHeaderId, case when isnull(Detail.BidHeaderId,0) = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId)) Awards
  outer apply (Select top 1 Approvals.ApprovalDate from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId > 1 order by Approvals.ApprovalDate) ap 
  outer apply (select top 1 bi.*
                 from BidImports bi
				 join (select Bids.BidImportId, 0 Ob
				         from Bids 
						where Bids.BidId = bi.BidId
					   union (
					    select top 1 Bids.BidImportId, 1 ob
						  from Bids
						 where Bids.BidHeaderId = Requisitions.BidHeaderId
						   and Bids.VendorId = Detail.VendorId
						   and Bids.Active = 1) ) bis on bis.BidImportId = bi.BidImportId order by ob) BidImports
/*
	left outer join dbo.BidImports on BidImports.VendorId = Vendors.VendorId
                                and BidImports.BidImportId = (select top 1 BidImportId
                                                                from (select Bids.BidImportId 
																	    from Bids
																	    join BidItems on BidItems.BidId = Bids.BidId
																		  		     and BidItems.BidItemId = PODetailItems.BidItemId
																	   where Bids.VendorId = PODetailItems.VendorId
																	  union(
                                                                        select Bids.BidImportId 
																	      from PODetailItems PDI with (nolock)
																	      join Detail on Detail.DetailId = PDI.DetailId
																	      join Requisitions r on r.RequisitionId = Detail.RequisitionId
																	      join Bids on Bids.VendorId = PDI.VendorId
                                                                                   and Bids.BidHeaderId = r.BidHeaderId
                                                                                   and Bids.Active = 1
															             where PDI.POId = PO.POId
															          )) bis)
*/
  outer apply (Select top 1 vc.*
                 from VendorContacts vc
				where vc.VendorId = Vendors.VendorId
				  and vc.Active = 1
				order by case vc.VendorContactId when BidImports.POVendorContactId then 0 else 1 end, vc.POContact desc, vc.VendorContactId) VendorContacts
  outer apply (Select top 1 dv.VendorsAccountCode
                 from DistrictVendor dv
				where dv.DistrictId = District.DistrictId
				  and dv.VendorId = Vendors.VendorId
				  and dv.Active = 1
				order by dv.DistrictVendorId) DistrictVendor
  outer apply (Select top 1 xr.UOM, case when coalesce(trim(xr.VendorItemCode),'') = '' then null else trim(xr.VendorItemCode) end VendorItemCode, case when coalesce(trim(xr.UniqueItemNumber),'') = '' then null else trim(xr.UniqueItemNumber) end UniqueItemNumber
                 from CrossRefs xr
				where xr.CrossRefId = Detail.CrossRefId) CrossRefs
  outer apply (Select top 1 ActualNumber
                 from NextNumber
				where NextNumber.DistrictId = Budgets.DistrictId
				  and NextNumber.BudgetId = Budgets.BudgetId
				  and NextNumber.IdType = 'P') nn
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
  left outer join DistrictVendor on DistrictVendor.VendorId = Vendors.VendorId
                                and DistrictVendor.DistrictVendorId =
    (select Top 1 Dv.DistrictVendorId
       from DistrictVendor dv with (nolock)
      where dv.DistrictId = District.DistrictId
        and dv.VendorId = Vendors.VendorId
        and dv.Active = 1
      order by Dv.DistrictVendorId)
  left outer join CrossRefs on CrossRefs.CrossRefId =
    (select Top 1 xr.CrossRefId
       from CrossRefs xr with (nolock)
      where xr.CrossRefId = Detail.CrossRefId
      ORDER BY xr.CrossRefId)
*/
```
