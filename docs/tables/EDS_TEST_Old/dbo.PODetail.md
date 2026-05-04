# View: `dbo.PODetail`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PODetailItemId` | int | NO |  |  |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | NO |  |  |
| 4 | `Description` | varchar(8000) | YES |  |  |
| 5 | `Quantity` | int | YES |  |  |
| 6 | `UnitCode` | varchar(20) | YES |  |  |
| 7 | `GrossPrice` | money | YES |  |  |
| 8 | `ExtendedGross` | money | YES |  |  |
| 9 | `BidPrice` | money | NO |  |  |
| 10 | `ExtendedBid` | money | YES |  |  |
| 11 | `VendorData` | varchar(68) | NO |  |  |
| 12 | `Alternate` | varchar(17) | NO |  |  |
| 13 | `VendorItemCode` | varchar(50) | NO |  |  |
| 14 | `POId` | int | NO |  |  |
| 15 | `PONumber` | varchar(24) | YES |  |  |
| 16 | `POTotal` | money | YES |  |  |
| 17 | `POItemCount` | int | YES |  |  |
| 18 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 19 | `TotalGross` | money | YES |  |  |
| 20 | `DiscountAmount` | money | YES |  |  |
| 21 | `VendorNameAddress` | varchar(320) | YES |  |  |
| 22 | `VendorPhone` | varchar(25) | YES |  |  |
| 23 | `VendorFax` | varchar(20) | YES |  |  |
| 24 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 25 | `VendorUseGross` | int | YES |  |  |
| 26 | `SchoolNameAddress` | varchar(189) | YES |  |  |
| 27 | `DistrictNameAddress` | varchar(189) | YES |  |  |
| 28 | `DistrictCode` | varchar(4) | YES |  |  |
| 29 | `DistrictUseGross` | tinyint | YES |  |  |
| 30 | `AccountCode` | varchar(50) | YES |  |  |
| 31 | `Attention` | varchar(50) | YES |  |  |
| 32 | `CategoryName` | varchar(50) | YES |  |  |
| 33 | `CategoryCode` | char(1) | YES |  |  |
| 34 | `LocationCode` | varchar(32) | NO |  |  |
| 35 | `SortSeq` | varchar(64) | YES |  |  |
| 36 | `ShippingNameAddress` | varchar(189) | YES |  |  |
| 37 | `ShippingPercentage` | decimal(9,5) | YES |  |  |
| 38 | `ShippingAmount` | money | YES |  |  |
| 39 | `VendorId` | int | NO |  |  |
| 40 | `DistrictVendorCode` | varchar(20) | YES |  |  |
| 41 | `BidAwardDate` | datetime | YES |  |  |
| 42 | `BidHeaderId` | int | YES |  |  |
| 43 | `VendorName` | varchar(50) | YES |  |  |
| 44 | `VendorInfo` | varchar(249) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `PO` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.DistrictVendor`](dbo.DistrictVendor.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.PODetailItems`](dbo.PODetailItems.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.School`](dbo.School.md) | USER_TABLE |
| [`dbo.ShipLocations`](dbo.ShipLocations.md) | USER_TABLE |
| [`dbo.VendorContacts`](dbo.VendorContacts.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |
| [`dbo.vw_DetailDescription`](dbo.vw_DetailDescription.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_GetPODetailByIds` | SQL_STORED_PROCEDURE |
| `dbo.sp_PODetail` | SQL_STORED_PROCEDURE |
| `dbo.sp_PODetailLastItemOnly` | SQL_STORED_PROCEDURE |

## Definition

```sql
--946254790.0508
--select sum(ExtendedBid) from PODetail_04272018

CREATE   view  [dbo].[PODetail]   as
select PODetailItems.PODetailItemId, Detail.DetailId, 
       case isnull(Detail.ItemMustBeBid,0)
         when 1 then isnull(Detail.ItemCode,'')
         else
           case isnull(Detail.BidItemId,0)
             when 0 then isnull(Detail.VendorItemCode,isnull(Detail.ItemCode,''))
             else ISNULL(Detail.ItemCode,'')
           end
       end ItemCode,
       /*dbo.uf_DetailDescription(Detail.DetailId)*/ /*dd.ItemDescription*/ coalesce(dd.ShortDescription,dd.ItemDescription)  Description, -- Now uses Short Description DCH 5/4/2020
       PODetailItems.Quantity, 
       Detail.UnitCode, PODetailItems.GrossPrice, (isnull(PODetailItems.Quantity,0) * isnull(PODetailItems.GrossPrice,0)) ExtendedGross, 
       case isnull(Detail.UseGrossPrices,0) when 0 then round(isnull(PODetailItems.BidPrice,0),2) else round(isnull(PODetailItems.BidPrice,0),2) end BidPrice, (isnull(PODetailItems.Quantity,0) * case isnull(Detail.UseGrossPrices,0) when 0 then round(isnull(PODetailItems.BidPrice,0),2) else isnull(PODetailItems.BidPrice,0) end) ExtendedBid, 
       (case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price ' else 'Bid Item ' end + isnull(PODetailItems.VendorItemCode,'') ) VendorData, 
--       (case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else isnull(PODetailItems.Alternate,'') end + ' ' + isnull(PODetailItems.VendorItemCode,'')) VendorData, 
       case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else '' end Alternate, 
--       case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else isnull(PODetailItems.Alternate,'') end Alternate, 
	   isnull(PODetailItems.VendorItemCode,'') VendorItemCode,
       PO.POId, PO.PONumber, PO.Amount POTotal, PO.ItemCount POItemCount,
       PO.DiscountRate, PO.TotalGross, PO.DiscountAmount,
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
	   end +
	   case
	     when ISNULL(Awards.VendorBidNumber,'') = '' then ''
	     else char(13) + char(10) + 'Vendor Bid Number: ' + Awards.VendorBidNumber
	   end as VendorNameAddress, 
       case 
         when VendorContacts.VendorContactId is null then Vendors.Phone 
         else VendorContacts.Phone
       end VendorPhone, 
       case 
         when VendorContacts.VendorContactId is null then Vendors.Fax 
         else VendorContacts.Fax
       end VendorFax, 
       Awards.VendorBidNumber VendorBidNumber, 
       Awards.UseGrossPrices VendorUseGross,
       (School.[Name] + case isnull(School.Address1,'') when '' then '' else char(13) + char(10) + School.Address1 end + case isnull(School.Address2,'') when '' then '' else char(13) + char(10) + School.Address2 end + case isnull(School.Address3,'') when '' then '' else char(13) + char(10) + School.Address3 end + char(13) + char(10) + isnull(School.City,'') + ', ' + isnull(School.State,'') + '  ' + isnull(School.ZipCode,'')) SchoolNameAddress, 
       (District.[Name] + case isnull(District.Address1,'') when '' then '' else char(13) + char(10) + District.Address1 end + case isnull(District.Address2,'') when '' then '' else char(13) + char(10) + District.Address2 end + case isnull(District.Address3,'') when '' then '' else char(13) + char(10) + District.Address3 end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.ZipCode,'')) DistrictNameAddress, 
       District.DistrictCode, Detail.UseGrossPrices DistrictUseGross, Requisitions.AccountCode, Requisitions.Attention,
       Category.[Name] CategoryName, char(Category.EDSId) CategoryCode, isnull(ShipLocations.LocationCode,'') LocationCode, Detail.SortSeq,
       ShipLocations.[Name] + case isnull(ShipLocations.Address1,'') when '' then '' else char(13) + char(10) + ShipLocations.Address1 end + case isnull(ShipLocations.Address2,'') when '' then '' else char(13) + char(10) + ShipLocations.Address2 end + case isnull(ShipLocations.Address3,'') when '' then '' else char(13) + char(10) + ShipLocations.Address3 end + char(13) + char(10) + isnull(ShipLocations.City,'') + ', ' + isnull(ShipLocations.State,'') + '  ' + isnull(ShipLocations.Zipcode,'') ShippingNameAddress,
       Vendors.ShippingPercentage ShippingPercentage, PO.ShippingAmount ShippingAmount,
       Vendors.VendorId, 
       (select top 1 Value from dbo.DistrictVendor with (nolock) where DistrictVendor.DistrictId = District.DistrictId and DistrictVendor.VendorId = Vendors.VendorId and DistrictVendor.Active = 1 order by DistrictVendorId desc) DistrictVendorCode,
       BidHeaders.BidAwardDate BidAwardDate,
/*       (select top 1 BidAwardDate from BidHeaders with (nolock) where BidHeaders.BidHeaderId = Awards.BidHeaderId order by BidHeaders.BidHeaderId desc) BidAwardDate */
       BidHeaders.BidHeaderId BidHeaderId, -- kjm
       Vendors.Name VendorName,             -- kjm
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
	   end as VendorInfo   -- kjm      
  from dbo.PODetailItems with (nolock)
  join PO on PO.POId = PODetailItems.POId
  join dbo.Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join dbo.Detail on Detail.DetailId = PODetailItems.DetailId
                 and Detail.RequisitionId = Requisitions.RequisitionId
  join dbo.School on School.SchoolId = Requisitions.SchoolId
  join dbo.District on District.DistrictId = School.DistrictId
  join dbo.ShipLocations on ShipLocations.ShippingId = isnull(Requisitions.ShippingId,School.ShippingId)
  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
  join dbo.Vendors on Vendors.VendorId = PO.VendorId
                  and Vendors.VendorId != 7691
  join dbo.vw_DetailDescription dd on dd.DetailId = Detail.DetailId
  join dbo.Items on Items.ItemId = Detail.ItemId
  left outer join BidItems on BidItems.BidItemId = PODetailItems.BidItemId
                          and BidItems.ItemId = PODetailItems.ItemId
  left outer join Bids bb on bb.BidId = BidItems.BidId
  left outer join Bids bc on bc.VendorId = PODetailItems.VendorId
                         and bc.BidHeaderId = coalesce(Detail.BidHeaderId,Requisitions.BidHeaderId)
                         and bc.Active = 1
  left outer join dbo.BidImports bib on bib.VendorId = Vendors.VendorId
                                    and bib.BidImportId = bb. BidImportId
  left outer join dbo.BidImports bic on bic.VendorId = Vendors.VendorId
                                    and bic.BidImportId = bc.BidImportId
  left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = case coalesce(bib.BidHeaderId,bic.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else coalesce(bib.BidHeaderId,bic.BidHeaderId) end
  left outer join dbo.Awards on Awards.VendorId = PO.VendorId
                            and Awards.Active = 1
                            and Awards.BidHeaderId = BidHeaders.BidHeaderId
  left outer join dbo.VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                    and VendorContacts.VendorContactId =
    case coalesce(bib.POVendorContactId,bic.POVendorContactId,0)
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
			and vc.VendorContactId = coalesce(bib.POVendorContactId,bic.POVendorContactId,0))
    end
```
