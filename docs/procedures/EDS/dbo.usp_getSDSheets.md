# Procedure: `dbo.usp_getSDSheets`

_Generated on 2026-05-04T13:04:00.722Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_getSDSheets` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-08-08 07:59:20 |
| Modified | 2022-08-08 07:59:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@districtId` | IN | int |  |
| 2 | `@SchoolId` | IN | int |  |
| 3 | `@UserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SafetyDataSheets` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_getSDSheets @districtId int, @SchoolId int, @UserId int as
begin
    select coalesce(bi.SafetyDataSheetId, xr.SafetyDataSheetId) SafetyDataSheetId, ItemId
            --,RequisitionNumber
        from Detail
        join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
        join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                    and Budgets.DistrictId = @districtId
                    and cast(left(Budgets.Name,4) as int) > year(getdate()) - 7
        outer apply (select SafetyDataSheets.SafetyDataSheetId 
                    from CrossRefs
                    join SafetyDataSheets on SafetyDataSheets.SDSURL = CrossRefs.MSDSRef
                    where CrossRefs.CrossRefId = Detail.CrossRefId) xr
        outer apply (select SafetyDataSheets.SafetyDataSheetId 
                    from BidItems
                    join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
                    join SafetyDataSheets on SafetyDataSheets.SDSURL = BidResults.SDS_URL
                    where BidItems.BidItemId = Detail.BidItemId) bi
    where coalesce(bi.SafetyDataSheetId, xr.SafetyDataSheetId) is not null
      and Requisitions.UserId = case when coalesce(@UserId,0) = 0 then Requisitions.UserId else @UserId end
      and Requisitions.SchoolId = case when coalesce(@SchoolId,0) = 0 then Requisitions.SchoolId else @SchoolId end
    group by coalesce(bi.SafetyDataSheetId, xr.SafetyDataSheetId), ItemId
end
```
