# Function: table-valued: `dbo.uf_PODetail`

_Generated on 2026-05-04T13:04:24.304Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PODetail` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2004-09-30 10:04:33 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pBudgetId` | IN | int |  |
| 3 | `@pPOId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ShipLocations` | USER_TABLE |  |
| `dbo.Awards` | USER_TABLE |  |
| `dbo.Budgets` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PO` | USER_TABLE |  |
| `dbo.PODetailItems` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |
| `dbo.uf_DetailDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       function dbo.uf_PODetail ( @pDistrictId int, @pBudgetId int, @pPOId int)
returns @PODetail table (
PODetailItemId  int not null,
DetailId	int not null,
ItemCode	varchar(16) null,
Description	varchar(512) null,
Quantity	int null,
UnitCode	varchar(20) null,
GrossPrice	money null,
ExtendedGross	money null,
BidPrice	money null,
ExtendedBid	money null,
VendorData	varchar(533) not null,
Alternate	varchar(512) not null,
VendorItemCode	varchar(20) not null,
POId		int not null,
PONumber	varchar(24) null,
POTotal		money null,
POItemCount	int null,
DiscountRate	decimal(9,5) null,
TotalGross	money null,
DiscountAmount	money null,
VendorNameAddress varchar(189) null,
VendorPhone	varchar(14) null,
VendorFax	varchar(14) null,
VendorBidNumber	varchar(20) null,
VendorUseGross	tinyint null,
SchoolNameAddress varchar(189) null,
DistrictNameAddress varchar(189) null,
DistrictCode	varchar(2) null,
DistrictUseGross tinyint null,
AccountCode	varchar(30) null,
Attention	varchar(50) null,
CategoryName	varchar(30) null,
CategoryCode	char(1) null,
LocationCode    varchar(32) null,
SortSeq		varchar(255) null)
 
as
begin
  insert @PODetail (PODetailItemId, DetailId, ItemCode, Description, Quantity, UnitCode, 
                    GrossPrice, ExtendedGross, BidPrice, ExtendedBid,
                    VendorData, Alternate, VendorItemCode, POId, PONumber,
                    POTotal, POItemCount, DiscountRate, TotalGross, DiscountAmount,
                    VendorNameAddress, VendorPhone, VendorFax, VendorBidNumber,
                    VendorUseGross, SchoolNameAddress, DistrictNameAddress,
                    DistrictCode, DistrictUseGross, AccountCode, Attention,
                    CategoryName, CategoryCode, LocationCode, SortSeq)
    select dbo.PODetailItems.PODetailItemId PODetailItemsId, (dbo.Detail.DetailId) DetailId, 
           case isnull(Detail.ItemMustBeBid,0)
             when 1 then isnull(Detail.ItemCode,'')
             else
               case isnull(Detail.BidItemId,0)
                 when 0 then isnull(Detail.VendorItemCode,isnull(Detail.ItemCode,''))
                 else ISNULL(Detail.ItemCode,'')
               end
           end ItemCode,
           dbo.uf_DetailDescription(Detail.DetailId) Description, 
           (dbo.PODetailItems.Quantity) Quantity, 
           (dbo.Detail.UnitCode) UnitCode, (dbo.PODetailItems.GrossPrice) GrossPrice, ((isnull(dbo.PODetailItems.Quantity,0)) * (isnull(dbo.PODetailItems.GrossPrice,0))) ExtendedGross, 
           case isnull(dbo.Detail.UseGrossPrices,0) when 0 then (round(dbo.PODetailItems.BidPrice,2)) else (dbo.PODetailItems.BidPrice) end BidPrice, ((isnull(dbo.PODetailItems.Quantity,0)) * case isnull(dbo.Detail.UseGrossPrices,0) when 0 then (round(isnull(dbo.PODetailItems.BidPrice,0),2)) else (isnull(dbo.PODetailItems.BidPrice,0)) end) ExtendedBid, 
           (case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else isnull(PODetailItems.Alternate,'') end + ' ' + isnull(dbo.PODetailItems.VendorItemCode,'')) VendorData, 
           (case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else isnull(PODetailItems.Alternate,'') end) Alternate, (isnull(dbo.PODetailItems.VendorItemCode,'')) VendorItemCode,
           (dbo.PO.POId) POId, PO.PONumber, (PO.Amount) POTotal, (PO.ItemCount) POItemCount,
           (dbo.PO.DiscountRate) DiscountRate, (PO.TotalGross) TotalGross, (PO.DiscountAmount) DiscountAmount,
           (dbo.Vendors.[Name] + case isnull(dbo.Vendors.Address1,'') when '' then '' else char(13) + char(10) + dbo.Vendors.Address1 end + case isnull(dbo.Vendors.Address2,'') when '' then '' else char(13) + char(10) + Vendors.Address2 end + case isnull(dbo.Vendors.Address3,'') when '' then '' else char(13) + char(10) + Vendors.Address3 end + char(13) + char(10) + isnull(dbo.Vendors.City,'') + ', ' + isnull(dbo.Vendors.State,'') + '  ' + isnull(dbo.Vendors.ZipCode,'')) VendorNameAddress, 
           (dbo.Vendors.Phone) VendorPhone, (dbo.Vendors.Fax) VendorFax, 
           (dbo.Awards.VendorBidNumber) VendorBidNumber, (dbo.Vendors.UseGrossPrices) VendorUseGross,
           (dbo.School.[Name] + case isnull(dbo.School.Address1,'') when '' then '' else char(13) + char(10) + dbo.School.Address1 end + case isnull(dbo.School.Address2,'') when '' then '' else char(13) + char(10) + School.Address2 end + case isnull(dbo.School.Address3,'') when '' then '' else char(13) + char(10) + School.Address3 end + char(13) + char(10) + isnull(dbo.School.City,'') + ', ' + isnull(dbo.School.State,'') + '  ' + isnull(dbo.School.ZipCode,'')) SchoolNameAddress,
           (dbo.District.[Name] + case isnull(dbo.District.Address1,'') when '' then '' else char(13) + char(10) + dbo.District.Address1 end + case isnull(dbo.District.Address2,'') when '' then '' else char(13) + char(10) + District.Address2 end + case isnull(dbo.District.Address3,'') when '' then '' else char(13) + char(10) + District.Address3 end + char(13) + char(10) + isnull(dbo.District.City,'') + ', ' + isnull(dbo.District.State,'') + '  ' + isnull(dbo.District.ZipCode,'')) DistrictNameAddress, 
           (dbo.District.DistrictCode) DistrictCode, (dbo.Detail.UseGrossPrices) DistrictUseGross, (dbo.Requisitions.AccountCode) AccountCode, (dbo.Requisitions.Attention) Attention,
           (dbo.Category.[Name]) CategoryName, (char(dbo.Category.EDSId)) CategoryCode, (isnull(dbo.ShipLocations.LocationCode,'')) LocationCode, dbo.Detail.SortSeq
      from dbo.PO
      join dbo.PODetailItems on dbo.PODetailItems.POId = dbo.PO.POId
      join dbo.Vendors on dbo.Vendors.VendorId = dbo.PO.VendorId
      join dbo.Detail on dbo.Detail.DetailId = dbo.PODetailItems.DetailId
      join dbo.Items on dbo.Items.ItemId = dbo.Detail.ItemId
      join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
      join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
      left outer join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
      join dbo.Category on dbo.Category.CategoryId = dbo.Requisitions.CategoryId
      join dbo.District on dbo.District.DistrictId = dbo.School.DistrictId
      join dbo.Budgets on dbo.Budgets.BudgetId = dbo.Requisitions.BudgetId
      left outer join dbo.Awards on dbo.Awards.AwardId = dbo.PODetailItems.AwardId
--      join (Select s1.DistrictId, r1.BudgetId, po1.PONumber, sum(po1.Amount) Amount, sum(po1.DiscountAmount) DiscountAmount, sum(po1.TotalGross) TotalGross, sum(ItemCount) ItemCount from dbo.PO po1 join dbo.Requisitions r1 on r1.RequisitionId = po1.RequisitionId join dbo.School s1 on s1.SchoolId = r1.SchoolId group by s1.DistrictId, r1.BudgetId, po1.PONumber) ss on ss.DistrictId = dbo.District.DistrictId and ss.BudgetId = dbo.Requisitions.BudgetId and ss.PONumber = dbo.PO.PONumber
     where dbo.PO.POId = @pPOId
--     where dbo.District.DistrictId = @pDistrictId
--       and dbo.Budgets.BudgetId = @pBudgetId
--       and dbo.PO.POId = @pPOId
--     group by dbo.Detail.ItemCode, dbo.PO.PONumber, dbo.Detail.SortSeq, dbo.Detail.UseGrossPrices

  return
end
```
