# View: `dbo.BidRequestItemsWeightView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `Weight` | real | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidRequestItemsWeightView]  
AS
select dbo.BidRequestItems.BidRequestItemId, dbo.BidRequestItems.BidHeaderId,
       convert(real, dbo.BidRequestItems.RequisitionCount) * convert(real, dbo.BidRequestItems.RequisitionCount) * convert(real, dbo.BidRequestItems.BidRequest) Weight 
  from dbo.BidRequestItems with (nolock)
--where BidHeaderId=xxxx and BidRequestItemId=yyyy
```
