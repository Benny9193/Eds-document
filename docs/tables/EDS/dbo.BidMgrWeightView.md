# View: `dbo.BidMgrWeightView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `weight` | decimal(20,0) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrWeightView]  
AS
select dbo.BidRequestItems.BidRequestItemId, dbo.BidRequestItems.BidHeaderId,
       cast(
       cast(dbo.BidRequestItems.RequisitionCount as bigint) * cast(dbo.BidRequestItems.RequisitionCount as bigint) * cast(dbo.BidRequestItems.BidRequest as bigint)
       as decimal(20,0) ) weight
  from dbo.BidRequestItems with (nolock)
--where BidHeaderId=xxxx and BidRequestItemId=yyyy
```
