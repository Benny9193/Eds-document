# View: `dbo.PODetailExport_old`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PODetailItemId` | int | NO |  |  |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | NO |  |  |
| 4 | `Description` | varchar(1024) | YES |  |  |
| 5 | `Quantity` | int | YES |  |  |
| 6 | `UnitCode` | varchar(20) | YES |  |  |
| 7 | `GrossPrice` | money | YES |  |  |
| 8 | `ExtendedGross` | money | YES |  |  |
| 9 | `BidPrice` | money | NO |  |  |
| 10 | `ExtendedBid` | money | YES |  |  |
| 11 | `VendorData` | varchar(1075) | NO |  |  |
| 12 | `Alternate` | varchar(1024) | NO |  |  |
| 13 | `VendorItemCode` | varchar(50) | YES |  |  |
| 14 | `POId` | int | NO |  |  |
| 15 | `PONumber` | varchar(24) | YES |  |  |
| 16 | `POTotal` | money | YES |  |  |
| 17 | `POItemCount` | int | YES |  |  |
| 18 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 19 | `TotalGross` | money | YES |  |  |
| 20 | `DiscountAmount` | money | YES |  |  |
| 21 | `VendorNameAddress` | varchar(249) | YES |  |  |
| 22 | `VendorPhone` | varchar(20) | YES |  |  |
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
| 39 | `PODate` | datetime | YES |  |  |
| 40 | `VendorId` | int | NO |  |  |
| 41 | `DistrictName` | varchar(50) | YES |  |  |
| 42 | `DistrictAddress1` | varchar(30) | YES |  |  |
| 43 | `DistrictAddress2` | varchar(30) | YES |  |  |
| 44 | `DistrictAddress3` | varchar(30) | YES |  |  |
| 45 | `DistrictCity` | varchar(25) | YES |  |  |
| 46 | `DistrictState` | varchar(2) | YES |  |  |
| 47 | `DistrictZip` | varchar(10) | YES |  |  |
| 48 | `DistrictPhone` | varchar(20) | YES |  |  |
| 49 | `DistrictFax` | varchar(20) | YES |  |  |
| 50 | `DistrictEMail` | varchar(255) | YES |  |  |
| 51 | `ShippingName` | varchar(50) | YES |  |  |
| 52 | `ShippingAddress1` | varchar(30) | YES |  |  |
| 53 | `ShippingAddress2` | varchar(30) | YES |  |  |
| 54 | `ShippingAddress3` | varchar(30) | YES |  |  |
| 55 | `ShippingCity` | varchar(25) | YES |  |  |
| 56 | `ShippingState` | varchar(2) | YES |  |  |
| 57 | `ShippingZipCode` | varchar(10) | YES |  |  |
| 58 | `ShippingPhone` | varchar(20) | YES |  |  |
| 59 | `ShippingFax` | varchar(14) | YES |  |  |
| 60 | `ShippingEMail` | varchar(255) | YES |  |  |
| 61 | `VendorsAccountCode` | varchar(50) | YES |  |  |
| 62 | `CometId` | int | YES |  |  |
| 63 | `ShippingId` | int | NO |  |  |
| 64 | `BusinessUnit` | varchar(17) | YES |  |  |
| 65 | `UploadType` | int | YES |  |  |
| 66 | `DistrictId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.DistrictVendor`](dbo.DistrictVendor.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.PO`](dbo.PO.md) | USER_TABLE |
| [`dbo.PODetailItems`](dbo.PODetailItems.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.School`](dbo.School.md) | USER_TABLE |
| [`dbo.ShipLocations`](dbo.ShipLocations.md) | USER_TABLE |
| `dbo.uf_DetailDescription` | SQL_SCALAR_FUNCTION |
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[PODetailExport_old]
AS
SELECT     dbo.PODetailItems.PODetailItemId, dbo.Detail.DetailId, CASE isnull(Detail.ItemMustBeBid, 0) WHEN 1 THEN isnull(Detail.ItemCode, '') 
                      ELSE CASE isnull(Detail.BidItemId, 0) WHEN 0 THEN isnull(Detail.VendorItemCode, isnull(Detail.ItemCode, '')) ELSE ISNULL(Detail.ItemCode, '') 
                      END END AS ItemCode, dbo.uf_DetailDescription(dbo.Detail.DetailId) AS Description, dbo.PODetailItems.Quantity, dbo.Detail.UnitCode, 
                      dbo.PODetailItems.GrossPrice, ISNULL(dbo.PODetailItems.Quantity, 0) * ISNULL(dbo.PODetailItems.GrossPrice, 0) AS ExtendedGross, 
                      CASE isnull(Detail.UseGrossPrices, 0) WHEN 0 THEN round(isnull(PODetailItems.BidPrice, 0), 2) ELSE round(isnull(PODetailItems.BidPrice, 0), 2) 
                      END AS BidPrice, ISNULL(dbo.PODetailItems.Quantity, 0) * CASE isnull(Detail.UseGrossPrices, 0) WHEN 0 THEN round(isnull(PODetailItems.BidPrice, 
                      0), 2) ELSE isnull(PODetailItems.BidPrice, 0) END AS ExtendedBid, CASE isnull(Detail.BidItemId, 0) 
                      WHEN 0 THEN 'Catalog Bid Price' ELSE isnull(PODetailItems.Alternate, '') END + ' ' + ISNULL(dbo.PODetailItems.VendorItemCode, '') AS VendorData, 
                      CASE isnull(Detail.BidItemId, 0) WHEN 0 THEN 'Catalog Bid Price' ELSE isnull(PODetailItems.Alternate, '') END AS Alternate, 
                      CASE isnull(PODetailItems.VendorItemCode, '') WHEN '' THEN isnull
                          ((SELECT     TOP 1 VendorItemCode
                              FROM         CrossRefs with (nolock) JOIN
                                                    Catalog ON Catalog.CatalogId = CrossRefs.CatalogId AND Catalog.Active = 1 AND Catalog.VendorId = Vendors.VendorId
                              WHERE     CrossRefs.ItemId = Detail.ItemId
                              ORDER BY Catalog.CatalogYear DESC, Catalog.CatalogId DESC, CrossRefs.CrossRefId DESC), '') 
                      ELSE PODetailItems.VendorItemCode END AS VendorItemCode, dbo.PO.POId, dbo.PO.PONumber, dbo.PO.Amount AS POTotal, 
                      dbo.PO.ItemCount AS POItemCount, dbo.PO.DiscountRate, dbo.PO.TotalGross, dbo.PO.DiscountAmount, 
                      dbo.Vendors.Name + CASE isnull(Vendors.Address1, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + Vendors.Address1 END + CASE isnull(Vendors.Address2, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + Vendors.Address2 END + CASE isnull(Vendors.Address3, '') WHEN '' THEN '' ELSE char(13) + char(10) + Vendors.Address3 END + CHAR(13) 
                      + CHAR(10) + ISNULL(dbo.Vendors.City, '') + ', ' + ISNULL(dbo.Vendors.State, '') + '  ' + ISNULL(dbo.Vendors.ZipCode, '') AS VendorNameAddress, 
                      dbo.Vendors.Phone AS VendorPhone, dbo.Vendors.Fax AS VendorFax, CASE PO.VendorId WHEN 9 THEN isnull(rtrim(PODetailItems.ContractNumber), '') 
                      WHEN 29 THEN isnull(rtrim(PODetailItems.ContractNumber), '') ELSE CASE isnull(rtrim(PODetailItems.ContractNumber), '') 
                      WHEN '' THEN dbo.Awards.VendorBidNumber ELSE rtrim(PODetailItems.ContractNumber) END END AS VendorBidNumber, 
                      dbo.Awards.UseGrossPrices AS VendorUseGross, dbo.School.Name + CASE isnull(School.Address1, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + School.Address1 END + CASE isnull(School.Address2, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + School.Address2 END + CASE isnull(School.Address3, '') WHEN '' THEN '' ELSE char(13) + char(10) + School.Address3 END + CHAR(13) + CHAR(10) 
                      + ISNULL(dbo.School.City, '') + ', ' + ISNULL(dbo.School.State, '') + '  ' + ISNULL(dbo.School.Zipcode, '') AS SchoolNameAddress, 
                      dbo.District.Name + CASE isnull(District.Address1, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + District.Address1 END + CASE isnull(District.Address2, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + District.Address2 END + CASE isnull(District.Address3, '') WHEN '' THEN '' ELSE char(13) + char(10) + District.Address3 END + CHAR(13) + CHAR(10) 
                      + ISNULL(dbo.District.City, '') + ', ' + ISNULL(dbo.District.State, '') + '  ' + ISNULL(dbo.District.Zipcode, '') AS DistrictNameAddress, 
                      dbo.District.DistrictCode, dbo.Detail.UseGrossPrices AS DistrictUseGross, dbo.Requisitions.AccountCode, dbo.Requisitions.Attention, 
                      dbo.Category.Name AS CategoryName, CHAR(dbo.Category.EDSId) AS CategoryCode, ISNULL(dbo.ShipLocations.LocationCode, '') AS LocationCode, 
                      dbo.Detail.SortSeq, dbo.ShipLocations.Name + CASE isnull(ShipLocations.Address1, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + ShipLocations.Address1 END + CASE isnull(ShipLocations.Address2, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + ShipLocations.Address2 END + CASE isnull(ShipLocations.Address3, '') WHEN '' THEN '' ELSE char(13) + char(10) 
                      + ShipLocations.Address3 END + CHAR(13) + CHAR(10) + ISNULL(dbo.ShipLocations.City, '') + ', ' + ISNULL(dbo.ShipLocations.State, '') 
                      + '  ' + ISNULL(dbo.ShipLocations.ZipCode, '') AS ShippingNameAddress, dbo.Vendors.ShippingPercentage, dbo.PO.ShippingAmount, dbo.PO.PODate, 
                      dbo.Vendors.VendorId, dbo.District.Name AS DistrictName, dbo.District.Address1 AS DistrictAddress1, dbo.District.Address2 AS DistrictAddress2, 
                      dbo.District.Address3 AS DistrictAddress3, dbo.District.City AS DistrictCity, dbo.District.State AS DistrictState, dbo.District.Zipcode AS DistrictZip, 
                      dbo.District.PhoneNumber AS DistrictPhone, dbo.District.Fax AS DistrictFax, dbo.District.EMail AS DistrictEMail, 
                      dbo.ShipLocations.Name AS ShippingName, dbo.ShipLocations.Address1 AS ShippingAddress1, dbo.ShipLocations.Address2 AS ShippingAddress2, 
                      dbo.ShipLocations.Address3 AS ShippingAddress3, dbo.ShipLocations.City AS ShippingCity, dbo.ShipLocations.State AS ShippingState, 
                      dbo.ShipLocations.ZipCode AS ShippingZipCode, dbo.ShipLocations.Phone AS ShippingPhone, dbo.ShipLocations.Fax AS ShippingFax, 
                      dbo.ShipLocations.EMail AS ShippingEMail,
                          (SELECT     TOP 1 VendorsAccountCode
                            FROM          dbo.DistrictVendor with (nolock)
                            WHERE      (DistrictId = dbo.District.DistrictId) AND (VendorId = dbo.Vendors.VendorId) AND (Active = 1)
                            ORDER BY DistrictVendorId DESC) AS VendorsAccountCode, dbo.Users.CometId,
                      dbo.ShipLocations.ShippingId, dbo.Vendors.BusinessUnit, dbo.Vendors.UploadType, dbo.District.DistrictId
FROM         dbo.District WITH (nolock) INNER JOIN
                      dbo.School ON dbo.School.DistrictId = dbo.District.DistrictId INNER JOIN
                      dbo.Requisitions ON dbo.Requisitions.SchoolId = dbo.School.SchoolId INNER JOIN
                      dbo.ShipLocations ON dbo.ShipLocations.ShippingId = ISNULL(dbo.Requisitions.ShippingId, dbo.School.ShippingId) INNER JOIN
                      dbo.Category ON dbo.Category.CategoryId = dbo.Requisitions.CategoryId INNER JOIN
                      dbo.PO ON dbo.PO.RequisitionId = dbo.Requisitions.RequisitionId INNER JOIN
                      dbo.Vendors ON dbo.Vendors.VendorId = dbo.PO.VendorId INNER JOIN
                      dbo.Detail ON dbo.Detail.RequisitionId = dbo.Requisitions.RequisitionId INNER JOIN
                      dbo.Items ON dbo.Items.ItemId = dbo.Detail.ItemId INNER JOIN
                      dbo.PODetailItems ON dbo.PODetailItems.POId = dbo.PO.POId AND dbo.PODetailItems.DetailId = dbo.Detail.DetailId INNER JOIN
                      dbo.Users ON dbo.Users.UserId = dbo.Requisitions.UserId /* LEFT OUTER JOIN
                      dbo.Awards ON dbo.Awards.AwardId = dbo.PODetailItems.AwardId */
                               join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                      left outer join dbo.Awards on Awards.VendorId = PO.VendorId
                                                and Awards.Active = 1
                                                and Awards.BidHeaderId = BidHeaders.BidHeaderId
```
