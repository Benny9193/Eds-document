# View: `dbo.vw_DistrictsNeedingReview`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CSRepId` | int | NO |  |  |
| 2 | `CSRepName` | varchar(30) | NO |  |  |
| 3 | `DistrictId` | int | NO |  |  |
| 4 | `DistrictName` | varchar(50) | NO |  |  |
| 5 | `BudgetId` | int | NO |  |  |
| 6 | `BudgetName` | varchar(30) | NO |  |  |
| 7 | `Schedule` | varchar(50) | NO |  |  |
| 8 | `CategoryName` | varchar(50) | YES |  |  |
| 9 | `ReqsNeedingToBeBid` | int | NO |  |  |
| 10 | `BidAddendaReqsOnHold` | int | NO |  |  |
| 11 | `BidAddendaReqsBeingApproved` | int | NO |  |  |
| 12 | `BidAddendaReqsApproved` | int | NO |  |  |
| 13 | `BidAddendaReqsAtEDS` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Approvals` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `CSRep` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `ScheduleTypes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from StatusTable
--select * from vw_DistrictsNeedingReview order by CSREpName, DistrictName, BudgetName, CategoryName

create   view  [dbo].[vw_DistrictsNeedingReview] as
select CSRepId, CSRepName, DistrictId, DistrictName, BudgetId, BudgetName, Schedule, CategoryName, ReqsNeedingToBeBid, BidAddendaReqsOnHold, BidAddendaReqsBeingApproved, BidAddendaReqsApproved, BidAddendaReqsAtEDS
  from (
select isnull(District.CSRepId,0) CSRepId, isnull(CSRep.Name,'') CSRepName, District.DistrictId, isnull(District.Name,'') DistrictName, Budgets.BudgetId, isnull(Budgets.Name,'') BudgetName, ISNULL(ScheduleTypes.Name,'') Schedule, Category.Name CategoryName,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where R1.CategoryId = Category.CategoryId
    and exists(select Detail.DetailId
                 from Detail
                where Detail.RequisitionId = R1.RequisitionId
                  and Detail.ItemMustBeBid = 1)
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) not in ( 4, 6, 29, 35, 45, 49 )),0) ReqsNeedingToBeBid,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where R1.CategoryId = Category.CategoryId
    and exists(select Detail.DetailId
                 from Detail
                 join BidItems on BidItems.BidItemId = Detail.BidItemId
                 join Bids on Bids.BidId = BidItems.BidId
                 join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                                and isnull(BidHeaders.BidType,0) != 1
                where Detail.RequisitionId = R1.RequisitionId)
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) not in ( 4, 6, 29, 35, 45, 49 )
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) in (0, 1, 28)),0) BidAddendaReqsOnHold,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where R1.CategoryId = Category.CategoryId
    and exists(select Detail.DetailId
                 from Detail
                 join BidItems on BidItems.BidItemId = Detail.BidItemId
                 join Bids on Bids.BidId = BidItems.BidId
                 join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                                and isnull(BidHeaders.BidType,0) != 1
                where Detail.RequisitionId = R1.RequisitionId)
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) not in ( 4, 6, 29, 35, 45, 49 )
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) in (2, 3)
    and isnull((select top 1 ap.Level
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) < isnull(District.RequiredApprovalLevel,0)),0) BidAddendaReqsBeingApproved,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where R1.CategoryId = Category.CategoryId
    and exists(select Detail.DetailId
                 from Detail
                 join BidItems on BidItems.BidItemId = Detail.BidItemId
                 join Bids on Bids.BidId = BidItems.BidId
                 join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                                and isnull(BidHeaders.BidType,0) != 1
                where Detail.RequisitionId = R1.RequisitionId)
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) not in ( 4, 6, 29, 35, 45, 49 )
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) in (2, 3)
    and isnull((select top 1 ap.Level
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) = isnull(District.RequiredApprovalLevel,0)),0) BidAddendaReqsApproved,
isnull((select COUNT(*)
   from Requisitions R1 with (nolock)
   join Budgets B1 on B1.BudgetId = R1.BudgetId
                  and B1.BudgetId = Budgets.BudgetId
  where R1.CategoryId = Category.CategoryId
    and exists(select Detail.DetailId
                 from Detail
                 join BidItems on BidItems.BidItemId = Detail.BidItemId
                 join Bids on Bids.BidId = BidItems.BidId
                 join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                                and isnull(BidHeaders.BidType,0) != 1
                where Detail.RequisitionId = R1.RequisitionId)
    and isnull((select top 1 ap.StatusId
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) not in ( 4, 6, 29, 35, 45, 49 )
    and isnull((select top 1 ap.Level
         from Approvals ap
        where ap.RequisitionId = R1.RequisitionId
          and ap.StatusId != 23
        order by ap.ApprovalDate desc),0) > isnull(District.RequiredApprovalLevel,0)),0) BidAddendaReqsAtEDS
  from District with (nolock)
  join Budgets on Budgets.DistrictId = District.DistrictId
              and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
  join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                         and DistrictCategories.Active = 1
                         and DistrictCategories.AllowAddenda = 1
  join Category on Category.CategoryId = DistrictCategories.CategoryId
  left outer join CSRep on CSRep.CSRepId = District.CSRepId
  left outer join ScheduleTypes on ScheduleTypes.ScheduleId = isnull(District.ScheduleId,0)
 where District.Active = 1
   and District.County != 'TEST'
   and isnull(District.State,'') != ''
   and exists(select 1
			    from Requisitions R1 with (nolock)
			    join Budgets B1 on B1.BudgetId = R1.BudgetId
							   and B1.BudgetId = Budgets.BudgetId
			   where R1.CategoryId = Category.CategoryId)
 group by isnull(District.CSRepId,0), isnull(CSRep.Name,''), District.DistrictId, isnull(District.Name,''), Budgets.BudgetId, isnull(Budgets.Name,''), ISNULL(ScheduleTypes.name,''), ISNULL(District.RequiredApprovalLevel,0), Category.CategoryId, Category.Name
-- order by isnull(District.Name,''), isnull(Budgets.Name,'')
) DistrictsNeedingReview
where ReqsNeedingToBeBid != 0
   or BidAddendaReqsOnHold != 0
   or BidAddendaReqsBeingApproved != 0
   or BidAddendaReqsApproved != 0
   or BidAddendaReqsAtEDS != 0
```
