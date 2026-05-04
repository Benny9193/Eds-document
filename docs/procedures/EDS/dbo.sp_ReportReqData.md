# Procedure: `dbo.sp_ReportReqData`

_Generated on 2026-05-04T14:49:07.316Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ReportReqData` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-01-24 00:55:08 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_ReportReqData @pRequisitionId int AS

Select	Requisitions.RequisitionId, Requisitions.RequisitionNumber, 
	Requisitions.Attention, convert(varchar(32),Requisitions.DateEntered,101) as DateEntered, 
	Requisitions.ShippingCost, Requisitions.TotalItemsCost, 
	Requisitions.TotalRequisitionCost, Requisitions.Comments,         
	Detail.ItemCode, Detail.AddendumItem, Detail.Quantity, 
	Detail.[Description] ItemDescription, Detail.UnitCode, 
	Detail.BidPrice, Detail.CatalogPrice,         
	Vendors.VendorId, Vendors.[Name] VendorName,         
	Detail.VendorItemCode,         
	District.[Name] DistrictName, District.Address1 DistrictAddress1, 
	District.Address2 DistrictAddress2, District.Address3 DistrictAddress3, 
	ISNULL(District.City,'') + ', ' + ISNULL(District.State,'') + '  ' + ISNULL(District.Zipcode,'') DistrictCSZ,         
	Budgets.[Name] BudgetName,         
	isnull(Accounts.Code,'') AccountCode, isnull(Accounts.[Description],'') AccountDescription,         
	Category.[Name] CategoryName,         
	ShipLocations.[Name] ShippingName, 
	ShipLocations.Address1 ShippingAddress1, 
	ShipLocations.Address2 ShippingAddress2, 
	ShipLocations.Address3 ShippingAddress3, 
	ISNULL(ShipLocations.City,'') + ', ' + ISNULL(ShipLocations.State,'') + '  ' + ISNULL(ShipLocations.ZipCode,'') ShippingCSZ, 
	ShipLocations.Phone ShippingPhone, ShipLocations.Fax ShippingFax,         
	case rtrim(isnull(Detail.Alternate,''))           
	when '' then             
	0           
	else             
	1         
	end UseAlternate,         
	Detail.Alternate PricesDescription,
	isnull(Detail.BidPrice,0) * isnull(Detail.Quantity,0) Extended,
	Detail.[Description] + char(13) + 'Vendor: ' + Vendors.[Name] + char(13) + case Detail.VendorItemCode when '' then '' else 'Vendor Item Code: ' + Detail.VendorItemCode + char(13) end + case rtrim(isnull(Detail.Alternate,'')) when '' then '' else 'Alternate Description: ' + Detail.Alternate end FullDescription,
        District.[Name] + case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + District.Address1 end + case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + District.Address2 end + case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + District.Address3 end + ISNULL(District.City,'') + ', ' + ISNULL(District.State,'') + '  ' + ISNULL(District.Zipcode,'') DistrictFullAddress,
        ShipLocations.[Name] + case rtrim(isnull(ShipLocations.Address1,'')) when '' then '' else char(13) + ShipLocations.Address1 end + case rtrim(isnull(ShipLocations.Address2,'')) when '' then '' else char(13) + ShipLocations.Address2 end + case rtrim(isnull(ShipLocations.Address3,'')) when '' then '' else char(13) + ShipLocations.Address3 end + ISNULL(ShipLocations.City,'') + ', ' + ISNULL(ShipLocations.State,'') + '  ' + ISNULL(ShipLocations.Zipcode,'') + case rtrim(Requisitions.Attention) when '' then '' else char(13) + 'Attention: ' + isnull(Requisitions.Attention,'') end ShipFullAddress
  from Requisitions    
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId    
  join School on School.SchoolId = Requisitions.SchoolId    
  join District on District.DistrictId = School.DistrictId    
  join Category on Category.CategoryId = Requisitions.CategoryId    
  left outer join Vendors on Vendors.VendorId = Detail.VendorId    
  left outer join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId    
  left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId    
  left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId    
  left outer join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
 where Requisitions.RequisitionId = @pRequisitionId
```
