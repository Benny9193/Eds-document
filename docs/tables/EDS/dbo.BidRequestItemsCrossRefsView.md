# View: `dbo.BidRequestItemsCrossRefsView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `CrossReferencesText` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| `dbo.uf_CrossRefs2Text` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidRequestItemsCrossRefsView]  
AS
select dbo.BidRequestItems.BidRequestItemId, dbo.BidRequestItems.BidHeaderId,
       dbo.uf_CrossRefs2Text(BidRequestItems.ItemId) CrossReferencesText
  from dbo.BidRequestItems with (nolock)
--where BidHeaderId=3609 and BidRequestItemId=8257086
```
