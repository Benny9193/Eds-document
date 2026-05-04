# View: `dbo.vw_BidDescriptions`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `BidRequestItemId` | int | NO |  |  |
| 4 | `ItemDescription` | varchar(1024) | YES |  |  |
| 5 | `ExtraDescription` | varchar(1024) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Detail` | USER_TABLE |
| [`dbo.BidHeaderDetail`](dbo.BidHeaderDetail.md) | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| `dbo.uf_DetailItemDescription` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidRequestDetail`](dbo.BidRequestDetail.md) | VIEW |
| [`dbo.BidRequestDetail1`](dbo.BidRequestDetail1.md) | VIEW |
| [`dbo.BidRequestItemsView1`](dbo.BidRequestItemsView1.md) | VIEW |
| `dbo.uf_BidAnalysisDetail` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailTest` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| [`dbo.vw_BidAnalysisDetail`](dbo.vw_BidAnalysisDetail.md) | VIEW |

## Definition

```sql
CREATE        view [dbo].[vw_BidDescriptions] as
    select BidHeaders.BidHeaderId, Detail.ItemId, BidRequestItems.BidRequestItemId, did.Description as ItemDescription, isnull(Detail.ExtraDescription,'') ExtraDescription
/*
      from dbo.BidRequestItems with (nolock)
      join dbo.BidHeaderDetail on BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
      join dbo.BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
                         and BidHeaders.BidType = 2
      join dbo.Detail on Detail.DetailId = BidHeaderDetail.DetailId
*/
      from dbo.BidHeaderDetail with (nolock)
      join dbo.BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId
                         and BidHeaders.BidType = 2
      join dbo.BidRequestItems on BidRequestItems.BidRequestItemId = BidHeaderDetail.BidRequestItemId
      join dbo.Detail on Detail.DetailId = BidHeaderDetail.DetailId
	 outer apply (select dbo.uf_DetailItemDescription(Detail.RequisitionId, Detail.ItemId) Description from Detail where Detail.DetailId = BidHeaderDetail.DetailId) did
     group by BidHeaders.BidHeaderId, Detail.ItemId, BidRequestItems.BidRequestItemId, did.Description, isnull(Detail.ExtraDescription,'')
```
