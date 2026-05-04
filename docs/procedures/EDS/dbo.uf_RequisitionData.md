# Function: inline table-valued: `dbo.uf_RequisitionData`

_Generated on 2026-05-04T14:49:07.412Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RequisitionData` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2003-03-12 14:54:20 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function dbo.uf_RequisitionData (@pRSId int)
returns table AS
return(Select	Requisitions.RequisitionId, Requisitions.RequisitionNumber, 
	Requisitions.Attention, convert(varchar(32),Requisitions.DateEntered,101) as DateEntered, 
	Requisitions.ShippingCost, Requisitions.TotalItemsCost, 
	Requisitions.TotalRequisitionCost, Requisitions.Comments,         
	case Category.AllowAddenda when 1 then isnull(Detail.ItemCode,'') else case isnull(Detail.BidItemId,0) when 0 then isnull(Detail.VendorItemCode,'') else ISNULL(Detail.ItemCode,'') end end ItemCode, Detail.AddendumItem, Detail.Quantity, 
	Detail.[Description] ItemDescription, Detail.UnitCode, 
	Detail.BidPrice, Detail.GrossPrice, Detail.CatalogPrice,         
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
        District.[Name] + case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + District.Address1 end + case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + District.Address2 end + case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + District.Address3 end + char(13) + ISNULL(District.City,'') + ', ' + ISNULL(District.State,'') + '  ' + ISNULL(District.Zipcode,'') DistrictFullAddress,
        ShipLocations.[Name] + case rtrim(isnull(ShipLocations.Address1,'')) when '' then '' else char(13) + ShipLocations.Address1 end + case rtrim(isnull(ShipLocations.Address2,'')) when '' then '' else char(13) + ShipLocations.Address2 end + case rtrim(isnull(ShipLocations.Address3,'')) when '' then '' else char(13) + ShipLocations.Address3 end + char(13) + ISNULL(ShipLocations.City,'') + ', ' + ISNULL(ShipLocations.State,'') + '  ' + ISNULL(ShipLocations.Zipcode,'') + case rtrim(Requisitions.Attention) when '' then '' else char(13) + 'Attention: ' + isnull(Requisitions.Attention,'') + ' - ' + right('00000' + convert(varchar(10),Users.CometId),5) end ShipFullAddress,
        case isnull(Vendors.Code,'0000') when '0000' then 1 else 0 end NoBid,
        District.DistrictCode + char(Category.EDSId) + right('00000' + convert(varchar(5),Users.CometId),5) + '/' + Requisitions.RequisitionNumber FooterCode
  from Requisitions    
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId    
  join School on School.SchoolId = Requisitions.SchoolId    
  join District on District.DistrictId = School.DistrictId    
  join Category on Category.CategoryId = Requisitions.CategoryId    
  join Users on Users.UserId = Requisitions.UserId
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
  left outer join Vendors on Vendors.VendorId = Detail.VendorId    
  left outer join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId    
  left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId    
  left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId    
  left outer join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
 where ReportSessionLinks.RSId = @pRSId)
```
