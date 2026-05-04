# View: `dbo.vw_JavaReqDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `RequisitionId` | int | YES |  |  |
| 3 | `Alternate` | varchar(1024) | NO |  |  |
| 4 | `BidPrice` | money | NO |  |  |
| 5 | `CatalogPage` | char(4) | NO |  |  |
| 6 | `CatalogPrice` | money | NO |  |  |
| 7 | `Description` | varchar(1024) | NO |  |  |
| 8 | `DistrictRequisitionNumber` | varchar(50) | NO |  |  |
| 9 | `ExtraDescription` | varchar(1024) | NO |  |  |
| 10 | `HeadingTitle` | varchar(255) | NO |  |  |
| 11 | `ItemCode` | varchar(50) | NO |  |  |
| 12 | `ItemMustBeBid` | int | NO |  |  |
| 13 | `Keyword` | varchar(50) | NO |  |  |
| 14 | `LastYearsQuantity` | int | NO |  |  |
| 15 | `Modified` | datetime | YES |  |  |
| 16 | `Quantity` | int | NO |  |  |
| 17 | `SectionName` | varchar(255) | NO |  |  |
| 18 | `SortSeq` | varchar(64) | NO |  |  |
| 19 | `UnitCode` | varchar(20) | NO |  |  |
| 20 | `VendorItemCode` | varchar(50) | NO |  |  |
| 21 | `UserNbr` | int | NO |  |  |
| 22 | `Attention` | varchar(50) | NO |  |  |
| 23 | `VendorName` | varchar(50) | NO |  |  |
| 24 | `DistrictVendorCode` | varchar(20) | NO |  |  |
| 25 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 26 | `CatalogName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Detail` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Users` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_JavaReqDetail] as
select Detail.DetailId, Detail.RequisitionId, 
       isnull(Detail.Alternate,'') Alternate, isnull(Detail.BidPrice,0) BidPrice, 
       isnull(Detail.CatalogPage,'') CatalogPage, isnull(Detail.CatalogPrice,0) CatalogPrice, 
       isnull(Detail.Description,'') Description, isnull(Detail.DistrictRequisitionNumber,'') DistrictRequisitionNumber, 
       isnull(Detail.ExtraDescription,'') ExtraDescription, isnull(Detail.HeadingTitle,'') HeadingTitle, 
       isnull(Detail.ItemCode,'') ItemCode, isnull(Detail.ItemMustBeBid,0) ItemMustBeBid, 
       isnull(Detail.Keyword,'') Keyword, isnull(Detail.LastYearsQuantity,0) LastYearsQuantity, 
       Detail.Modified, isnull(Detail.Quantity,0) Quantity, isnull(Detail.SectionName,'') SectionName, 
       isnull(Detail.SortSeq,'') SortSeq, isnull(Detail.UnitCode,'') UnitCode, 
       isnull(Detail.VendorItemCode,'') VendorItemCode, isnull(Users.CometId,0) UserNbr, 
       isnull(Users.Attention,'') Attention, isnull(Vendors.Name,'') VendorName, 
       isnull(DistrictVendor.Value,'') DistrictVendorCode, 
       isnull(DistrictVendor.VendorsAccountCode,'') VendorsAccountCode, 
       isnull(Catalog.Name,'') CatalogName
  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  left outer join Vendors on Vendors.VendorId = Detail.VendorId
  left outer join DistrictVendor on DistrictVendor.DistrictId = Budgets.DistrictId
                                and DistrictVendor.VendorId = Detail.VendorId
  left outer join Users on Users.UserId = Detail.ModifiedById
  left outer join Catalog on Catalog.CatalogId = Detail.CatalogId
```
