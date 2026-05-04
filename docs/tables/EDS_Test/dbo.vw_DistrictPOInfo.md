# View: `dbo.vw_DistrictPOInfo`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RepName` | varchar(30) | YES |  |  |
| 2 | `DistrictName` | varchar(50) | YES |  |  |
| 3 | `State` | varchar(2) | YES |  |  |
| 4 | `LY Estimated PO Count` | int | YES |  |  |
| 5 | `LY PO Count` | int | YES |  |  |
| 6 | `LY PO Printed Count` | int | YES |  |  |
| 7 | `LY PO Exported Count` | int | YES |  |  |
| 8 | `LY PIT Estimated PO Count` | int | YES |  |  |
| 9 | `LY PIT PO Count` | int | YES |  |  |
| 10 | `LY PIT PO Printed Count` | int | YES |  |  |
| 11 | `LY PIT PO Exported Count` | int | YES |  |  |
| 12 | `CY Estimated PO Count` | int | YES |  |  |
| 13 | `CY PO Count` | int | YES |  |  |
| 14 | `CY PO Printed Count` | int | YES |  |  |
| 15 | `CY PO Exported Count` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `CSRep` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_DistrictPOInfo] as
select csRep.Name RepName, District.Name DistrictName, District.State, 
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY Estimated PO Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY PO Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId and COALESCE(PO.DatePrinted, PO.DatePrintedDetail/*, PO.DateExported*/) is not null where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY PO Printed Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId and PO.DateExported is not null where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY PO Exported Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 and Requisitions.DateEntered <= DATEADD(year,-1,getdate()) group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY PIT Estimated PO Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 and Requisitions.OrderDate <= DATEADD(year,-1,getdate()) group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY PIT PO Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId and COALESCE(PO.DatePrinted, PO.DatePrintedDetail/*, PO.DateExported*/) is not null where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 and Requisitions.OrderDate <= DATEADD(year,-1,getdate()) group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY PIT PO Printed Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId and PO.DateExported is not null where Requisitions.BudgetId = b0.BudgetId and Requisitions.StatusId != 4 and Requisitions.OrderDate <= DATEADD(year,-1,getdate()) group by Requisitions.RequisitionId, Detail.VendorId) ss) [LY PIT PO Exported Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 where Requisitions.BudgetId = b1.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [CY Estimated PO Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId where Requisitions.BudgetId = b1.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [CY PO Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId and COALESCE(PO.DatePrinted, PO.DatePrintedDetail/*, PO.DateExported*/) is not null where Requisitions.BudgetId = b1.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [CY PO Printed Count],
(select COUNT(*) from (select Requisitions.RequisitionId, Detail.VendorId from Requisitions with (nolock) join Detail on Detail.RequisitionId = Requisitions.RequisitionId and Detail.VendorId != 7691 join PO on PO.RequisitionId = Requisitions.RequisitionId and PO.VendorId = Detail.VendorId and PO.DateExported is not null where Requisitions.BudgetId = b1.BudgetId and Requisitions.StatusId != 4 group by Requisitions.RequisitionId, Detail.VendorId) ss) [CY PO Exported Count]
  from District with (nolock)
  left outer join CSRep on CSRep.CSRepId = District.CSRepId
  left outer join Budgets b0 on b0.DistrictId = District.DistrictId
                            and substring(b0.Name,1,4) = cast(year(getdate())-1 as char(4))
                            and b0.Active = 1
  left outer join Budgets b1 on b1.DistrictId = District.DistrictId
                            and SUBSTRING(b1.name,1,4) = cast(year(getdate()) as char(4))
                            and b1.Active = 1
 where District.Active = 1
   and ISNULL(District.DistrictCode,'') != ''
   and ISNULL(District.State,'') != ''
   and ISNULL(District.County,'') != 'TEST'
```
