# View: `dbo.vw_IncidentalOrderDownloads`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `BudgetId` | int | YES |  |  |
| 3 | `RequisitionId` | int | YES |  |  |
| 4 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 5 | `UploadDate` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Approvals`](dbo.Approvals.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.School`](dbo.School.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[vw_IncidentalOrderDownloads] AS SELECT dbo.District.DistrictId, dbo.Requisitions.BudgetId, dbo.Detail.RequisitionId, dbo.Requisitions.RequisitionNumber, 
       dbo.Approvals.ApprovalDate AS UploadDate
FROM dbo.Detail 
JOIN dbo.Requisitions ON dbo.Detail.RequisitionId = dbo.Requisitions.RequisitionId
JOIN dbo.School ON dbo.Requisitions.SchoolId = dbo.School.SchoolId
JOIN dbo.District ON dbo.School.DistrictId = dbo.District.DistrictId
left JOIN dbo.Approvals ON dbo.Approvals.ApprovalId = (SELECT TOP (1) ApprovalId
                                                       FROM dbo.Approvals
                                                       WHERE (StatusId = 35) AND (RequisitionId = dbo.Detail.RequisitionId)
                                                       ORDER BY ApprovalId)
WHERE (dbo.Detail.DistrictRequisitionNumber IS NOT NULL)
--       and requisitions.budgetid=5140 and district.districtid=576
GROUP BY dbo.District.DistrictId, dbo.Requisitions.BudgetId, dbo.Detail.RequisitionId, dbo.Requisitions.RequisitionNumber, 
         dbo.Approvals.ApprovalDate
```
