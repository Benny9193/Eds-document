# View: `dbo.vw_IncidentalOrderDownloadsDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | YES |  |  |
| 2 | `DistrictRequisitionNumber` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_IncidentalOrderDownloadsDetail]
AS
SELECT RequisitionId, DistrictRequisitionNumber
FROM dbo.Detail
WHERE (DistrictRequisitionNumber IS NOT NULL)
--    and RequisitionId=   
GROUP BY RequisitionId, DistrictRequisitionNumber
```
