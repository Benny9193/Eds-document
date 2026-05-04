# View: `dbo.vw_RequisitionsPrint`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `RequisitionNumber` | varchar(24) | NO |  |  |
| 3 | `Attention` | varchar(50) | NO |  |  |
| 4 | `ItemsNotBid` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Detail` | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RequisitionsPrint] as
select RequisitionId, isnull(RequisitionNumber,'') RequisitionNumber, ISNULL(Requisitions.Attention,'') Attention,
       isnull((select COUNT(*) from Detail d with (nolock) where d.RequisitionId = Requisitions.RequisitionId and d.ItemMustBeBid = 1),0) ItemsNotBid
  from dbo.Requisitions
```
