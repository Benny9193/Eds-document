# Function: table-valued: `dbo.uf_Status`

_Generated on 2026-05-04T13:04:24.330Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_Status` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2007-06-20 09:51:23 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@CurrentDate` | IN | datetime |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function dbo.uf_Status(@CurrentDate datetime)
returns @StatusTable table (
DistrictId	int null,
CategoryId	int null,
LYBudgetId	int null,
CYBudgetId	int null,
LYRequisitionCount int null,
LYPOCount	int null,
LYLineItems	int null,
LYPOsCreated	int null,
LYAllPOsCreated	int null,
CYRequisitionCount int null,
CYPOCount	int null,
CYLineItems	int null,
CYPOsCreated	int null,
CYAllPOsCreated	int null)
as
begin
declare @LastYearDate datetime,
	@ThisYearDate datetime

  select @ThisYearDate = @CurrentDate,
         @LastYearDate = dateadd(year,-1,@CurrentDate)
  
  -- Gather Last Years to Date
  insert @StatusTable (DistrictId, CategoryId, LYBudgetId, LYRequisitionCount, LYPOCount, LYLineItems, LYPOsCreated, LYAllPOsCreated)
    select Budgets.DistrictId, Category.CategoryId, Budgets.BudgetId, 
           (select count(*) from Requisitions r1 with (nolock) where r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId and r1.DateEntered <= @LastYearDate),
           (select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId where PO.DatePrintedDetail <= @LastYearDate),
           (select count(*) from PODetailItems with (nolock) join PO on PO.POId = PODetailItems.POId join Requisitions r1 on r1.RequisitionId = PO.RequisitionId  and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId where PO.DatePrintedDetail <= @LastYearDate),
           (select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId where r1.OrderDate <= @LastYearDate),
           (select count(*) from (select Detail.VendorId from Detail with (nolock) join Requisitions r1 on r1.RequisitionId = Detail.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId group by r1.RequisitionId, r1.CategoryId, r1.BudgetId, Detail.VendorId) ss)
      from Budgets with (nolock)
      join (
        select r2.BudgetId, r2.CategoryId from Requisitions r2 with (nolock) join Budgets on Budgets.BudgetId = r2.BudgetId and Budgets.StartDate <= @ThisYearDate and Budgets.EndDate >= @ThisYearDate group by r2.BudgetId, r2.CategoryId
           ) cs on cs.BudgetId = Budgets.BudgetId
      join Category on Category.CategoryId = cs.CategoryId
     where Budgets.StartDate <= @ThisYearDate
       and Budgets.EndDate >= @ThisYearDate
       and Budgets.Active = 1

  -- Update Counts for This Year
  Update @StatusTable
     set CYBudgetId = (select Budgets.BudgetId from Budgets with (nolock) where Budgets.DistrictId = st.DistrictId and Budgets.StartDate <= dateadd(year,1,@ThisYearDate) and Budgets.EndDate >= dateadd(year,1,@ThisYearDate) and Budgets.Active = 1)
    from @StatusTable st

  Update @StatusTable
     set CYRequisitionCount = (select count(*) from Requisitions r1 with (nolock) where r1.BudgetId = st.CYBudgetId and r1.CategoryId = st.CategoryId and r1.DateEntered <= @ThisYearDate),
         CYPOCount = (select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = st.CYBudgetId and r1.CategoryId = st.CategoryId where PO.DatePrintedDetail <= @ThisYearDate),
         CYLineItems = (select count(*) from PODetailItems with (nolock) join PO on PO.POId = PODetailItems.POId join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = st.CYBudgetId and r1.CategoryId = st.CategoryId where PO.DatePrintedDetail <= @ThisYearDate),
         CYPosCreated = (select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = st.CYBudgetId and r1.CategoryId = st.CategoryId where r1.OrderDate <= @ThisYearDate),
         CYAllPOsCreated = /*(select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = st.CYBudgetId and r1.CategoryId = st.CategoryId)*/
           (select count(*) from (select Detail.VendorId from Detail with (nolock) join Requisitions r1 on r1.RequisitionId = Detail.RequisitionId and r1.BudgetId = st.CYBudgetId and r1.CategoryId = st.CategoryId group by r1.RequisitionId, r1.CategoryId, r1.BudgetId, Detail.VendorId) ss)
    from @StatusTable st

  -- Gather This Years to Date if Didn't exist last Year
  insert @StatusTable (DistrictId, CategoryId, CYBudgetId, CYRequisitionCount, CYPOCount, CYLineItems, CYPOsCreated, CYAllPOsCreated)
    select Budgets.DistrictId, Category.CategoryId, Budgets.BudgetId, 
           (select count(*) from Requisitions r1 with (nolock) where r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId and r1.DateEntered <= @ThisYearDate),
           (select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId where PO.DatePrintedDetail <= @ThisYearDate),
           (select count(*) from PODetailItems with (nolock) join PO on PO.POId = PODetailItems.POId join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId where PO.DatePrintedDetail <= @ThisYearDate),
           (select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId where r1.OrderDate <= @ThisYearDate),
--           (select count(*) from PO with (nolock) join Requisitions r1 on r1.RequisitionId = PO.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId)
           (select count(*) from (select Detail.VendorId from Detail with (nolock) join Requisitions r1 on r1.RequisitionId = Detail.RequisitionId and r1.BudgetId = Budgets.BudgetId and r1.CategoryId = Category.CategoryId group by r1.RequisitionId, r1.CategoryId, r1.BudgetId, Detail.VendorId) ss)
      from Budgets with (nolock)
      join (
        select r2.BudgetId, r2.CategoryId from Requisitions r2 with (nolock) join Budgets on Budgets.BudgetId = r2.BudgetId and Budgets.StartDate <= dateadd(year,1,@ThisYearDate) and Budgets.EndDate >= Dateadd(year,1,@ThisYearDate) group by r2.BudgetId, r2.CategoryId
           ) cs on cs.BudgetId = Budgets.BudgetId
      join Category on Category.CategoryId = cs.CategoryId
      left outer join @StatusTable st on st.DistrictId = Budgets.DistrictId
                                     and st.CategoryId = Category.CategoryId
     where Budgets.StartDate <= Dateadd(year,1,@ThisYearDate)
       and Budgets.EndDate >= Dateadd(year,1,@ThisYearDate)
       and Budgets.Active = 1
       and st.DistrictId is null

  return
end
```
