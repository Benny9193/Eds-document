# Procedure: `dbo.sp_RTKExport`

_Generated on 2026-05-04T13:04:24.181Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RTKExport` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-03-04 12:57:23 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure dbo.sp_RTKExport as

select 'Q' + case Category.CategoryId when 7 then '5' else '1' end + District.DistrictCode + substring(Category.Code,1,1) + right('00000' + convert(varchar(16),isnull(Users.CometId,0)),5) + right(replicate('0',15) + ltrim(rtrim(Detail.ItemCode)),15) + right(replicate('0',6) + convert(varchar(16),Detail.Quantity),6) DataRow
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.StartDate <= getdate()
              and Budgets.EndDate >= getdate()
  join District on District.DistrictId = Budgets.DistrictId
               and District.RTK = 1
  join Users on Users.UserId = Requisitions.UserId
  join Category on Category.CategoryId = Requisitions.CategoryId
               and substring(Category.Code,1,1) in ('J','E','7','R','H')
 order by DataRow
```
