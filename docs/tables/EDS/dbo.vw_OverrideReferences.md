# View: `dbo.vw_OverrideReferences`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `FilterByDetailId` | int | NO |  |  |
| 3 | `DetailId` | int | NO |  |  |
| 4 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 5 | `Requisitions_Attention` | varchar(50) | YES |  |  |
| 6 | `AccountCode` | varchar(50) | YES |  |  |
| 7 | `TotalRequisitionCost` | money | YES |  |  |
| 8 | `School_Name` | varchar(50) | YES |  |  |
| 9 | `District_Name` | varchar(50) | YES |  |  |
| 10 | `CometId` | int | YES |  |  |
| 11 | `Status` | varchar(104) | NO |  |  |
| 12 | `CategoryName` | varchar(50) | YES |  |  |
| 13 | `ApprovalDate` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Category` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_RequisitionStatus` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_OverrideReferences] as
SELECT SourceBH.BidHeaderId, SourceDetail.DetailId FilterByDetailId, Detail.DetailId, Requisitions.RequisitionNumber, Requisitions.Attention AS Requisitions_Attention, Requisitions.AccountCode, Requisitions.TotalRequisitionCost, School.Name AS School_Name,
District.Name AS District_Name, Users.CometId,
rs.StatusDesc [Status],
Category.Name [CategoryName],
rs.ApprovalDate
FROM Detail with (nolock)
join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
join Users on Users.UserId = Requisitions.UserId
join School on School.SchoolId = Requisitions.SchoolId
join District on District.DistrictId = School.DistrictId
join Detail SourceDetail on SourceDetail.ItemId = Detail.ItemId
join Requisitions SourceReq on SourceReq.RequisitionId = SourceDetail.RequisitionId
join vw_RequisitionStatus rs on rs.RequisitionId = Requisitions.RequisitionId
join Category on Category.CategoryId = Requisitions.CategoryId
join BidHeaders SourceBH on SourceBH.BidHeaderId = case ISNULL(SourceDetail.BidHeaderId,0) when 0 then SourceReq.BidHeaderId else SourceDetail.BidHeaderId end
WHERE case isnull(Detail.BidHeaderId,0) 
        when 0 then isnull(Requisitions.BidHeaderId,0) 
        else Detail.BidHeaderId 
      end = SourceBH.BidHeaderId
--ORDER BY Users.CometId
```
