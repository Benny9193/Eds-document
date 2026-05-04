# View: `dbo.vw_RefList`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictName` | varchar(50) | YES |  |  |
| 2 | `Budgetname` | varchar(30) | YES |  |  |
| 3 | `SchoolName` | varchar(50) | YES |  |  |
| 4 | `CometId` | int | YES |  |  |
| 5 | `Attention` | varchar(50) | YES |  |  |
| 6 | `ItemCode` | varchar(50) | YES |  |  |
| 7 | `VendorItemCode` | varchar(50) | NO |  |  |
| 8 | `Quantity` | int | YES |  |  |
| 9 | `BidPrice` | money | YES |  |  |
| 10 | `description` | varchar(1024) | YES |  |  |
| 11 | `ItemBidType` | varchar(32) | NO |  |  |
| 12 | `Alternate` | varchar(1024) | NO |  |  |
| 13 | `ReqStatus` | varchar(255) | YES |  |  |
| 14 | `POId` | int | NO |  |  |
| 15 | `PONumber` | varchar(24) | NO |  |  |
| 16 | `ExportedToVendor` | datetime | YES |  |  |
| 17 | `BidHeaderId` | int | YES |  |  |
| 18 | `Category Name` | varchar(50) | YES |  |  |
| 19 | `Account Code` | varchar(50) | NO |  |  |
| 20 | `Account Balance` | varchar(30) | YES |  |  |
| 21 | `BudgetId` | int | NO |  |  |
| 22 | `DistrictId` | int | NO |  |  |
| 23 | `RequisitionId` | int | NO |  |  |
| 24 | `detailId` | int | NO |  |  |
| 25 | `ItemId` | int | YES |  |  |
| 26 | `CategoryId` | int | YES |  |  |
| 27 | `UserId` | int | NO |  |  |
| 28 | `BidItemId` | int | YES |  |  |
| 29 | `VendorId` | int | YES |  |  |
| 30 | `SortSeq` | varchar(64) | YES |  |  |
| 31 | `LastYearsQuantity` | int | YES |  |  |
| 32 | `ItemMustBeBid` | int | NO |  |  |
| 33 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 34 | `UniqueItemNumber` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |
| `dbo.uf_RequisitionStatus` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_DetailNotifications`](dbo.vw_DetailNotifications.md) | VIEW |
| [`dbo.vw_Vendor0528Items`](dbo.vw_Vendor0528Items.md) | VIEW |

## Definition

```sql
CREATE       view [dbo].[vw_RefList] as
select District.Name as DistrictName, 
       Budgets.Name as Budgetname, 
       School.Name as SchoolName, 
       Users.CometId, 
       Requisitions.Attention, 
       Detail.ItemCode, 
       isnull(detail.VendorItemCode, '') VendorItemCode,
       Detail.Quantity, 
       detail.BidPrice, 
       Detail.description, 
       case isnull(Detail.VendorId,7691) 
         when 7691 then 'No Bid' 
         else isnull(BidItems.ItemBidType,'Catalog') 
       end ItemBidType, 
       isnull(Detail.Alternate,'') Alternate, 
       dbo.uf_RequisitionStatus(Requisitions.RequisitionId) ReqStatus, 
       isnull(PO.POId,0) POId, 
       isnull(PO.PONumber,'') PONumber, 
       PO.ExportedToVendor, 
       BidHeaders.BidHeaderId,
	   Category.Name [Category Name],
	   isnull(Requisitions.AccountCode,'') [Account Code],
	   case 
		 when BudgetAccounts.UseAllocations = 1 and UserAccounts.UseAllocations = 1 and BudgetAccounts.AmountAvailable > UserAccounts.AllocationAvailable then cast(cast(UserAccounts.AllocationAvailable as decimal(11,2)) as varchar)
		 when BudgetAccounts.UseAllocations = 1 and UserAccounts.UseAllocations = 1 and BudgetAccounts.AmountAvailable <= UserAccounts.AllocationAvailable then cast(cast(BudgetAccounts.AmountAvailable as decimal(11,2)) as varchar)
		 when BudgetAccounts.UseAllocations = 1 and isnull(UserAccounts.UseAllocations,0) = 0 then cast(cast(BudgetAccounts.AmountAvailable as decimal(11,2)) as varchar)
		 when isnull(BudgetAccounts.UseAllocations,0) = 0 and UserAccounts.UseAllocations = 1 then cast(cast(UserAccounts.AllocationAvailable as decimal(11,2)) as varchar)
		 when isnull(BudgetAccounts.UseAllocations,0) = 0 and isnull(UserAccounts.UseAllocations,0) = 0 then 'N/A'
	   end [Account Balance],
       Budgets.BudgetId, 
       District.DistrictId, 
       Requisitions.RequisitionId, 
       detail.detailId, 
       detail.ItemId, 
       Requisitions.CategoryId, 
       Users.UserId, 
       Detail.BidItemId, 
       Detail.VendorId, 
       detail.SortSeq, 
       Detail.LastYearsQuantity, 
       ISNULL(Detail.ItemMustBeBid,0) as ItemMustBeBid,
       Requisitions.RequisitionNumber,
	   case 
	       when coalesce(trim(BidResults.UniqueItemNumber),'') = '' then
			   case 
			       when coalesce(trim(dxr.UniqueItemNumber),'') = '' then
					   case 
					       when coalesce(trim(BidItems.PackedVendorItemCode),'') = '' then
							   coalesce(trim(dxr.PackedCode),'')
						   else
						       coalesce(trim(BidItems.PackedVendorItemCode),'')
					   end
				   else
				       coalesce(trim(dxr.UniqueItemNumber),'')
			   end
		   else
		       coalesce(trim(BidResults.UniqueItemNumber),'')
	   end UniqueItemNumber
  from Detail with (nolock)
  join Requisitions on Requisitions.Requisitionid = Detail.RequisitionId
--                   and Requisitions.DateEntered > cast('11/01/' + cast(case when month(getdate()) between 11 and 12 then year(getdate()) else year(getdate()) - 1 end as varchar) as datetime)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.EditUntil > getdate()
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.DistrictCode,'') != ''
               and ISNULL(District.County,'') != 'TEST'
  join Category on Category.CategoryId = Requisitions.CategoryId
  join School on School.SchoolId = Requisitions.SchoolId
  join Users on Users.UserId = Requisitions.UserId
  join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end 
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil 
  left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
  left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
                    and PO.VendorId = isnull(Detail.VendorId,7691)
  left outer join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
  left outer join CrossRefs dxr on dxr.CrossRefId = Detail.CrossRefId
```
