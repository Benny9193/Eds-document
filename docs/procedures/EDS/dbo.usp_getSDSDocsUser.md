# Procedure: `dbo.usp_getSDSDocsUser`

_Generated on 2026-05-04T13:43:19.176Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_getSDSDocsUser` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-09-14 16:48:46 |
| Modified | 2022-09-14 18:36:11 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@UserId` | IN | int |  |

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
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_getSDSDocsUser 2687384
CREATE   procedure [dbo].[usp_getSDSDocsUser] @UserId int
as
begin
declare @urls table(url varchar(512), Id bigint null)

insert @urls(url)
select trim(CrossRefs.MSDSRef)
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.DateEntered > dateadd(year,-5,getdate())
  join Users on Users.UserId = Requisitions.UserId
            and Users.UserId = @UserId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join CrossRefs on CrossRefs.CrossRefId = Detail.CrossRefId
                and CrossRefs.MSDSRef like 'http%'
 group by trim(CrossRefs.MSDSRef)

insert @urls(url)
select trim(BidResults.SDS_URL)
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.DateEntered > dateadd(year,-5,getdate())
  join Users on Users.UserId = Requisitions.UserId
            and Users.UserId = @UserId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join BidItems on BidItems.BidItemId = Detail.BidItemId
  join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
                 and BidResults.SDS_URL like 'http%'
  left outer join @urls u on u.url = trim(BidResults.SDS_URL)
 where u.url is null
 group by trim(BidResults.SDS_URL)

Update u
   set Id = sds.SafetyDataSheetId
  from @urls u
  join SafetyDataSheets sds on sds.SDSURL = u.url

select String_Agg(cast(u.Id as varchar(max)),',') IdList
  from @urls u
end
```
