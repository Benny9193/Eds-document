# View: `dbo.vw_ReqDetailTab`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `RequisitionId` | int | YES |  |  |
| 3 | `Quantity` | int | YES |  |  |
| 4 | `BidPrice` | money | YES |  |  |
| 5 | `TabSelection` | varchar(7) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ReqDetailTab] as
SELECT Detail.DetailId as DetailId, Detail.RequisitionId, Detail.Quantity, Detail.BidPrice,
       case 
         when isnull(Detail.ItemMustBeBid,0) = 0
          and ISNULL(Vendors.Code,'0000') = '0000' then 'NoBid'
         when isnull(Detail.ItemMustBeBid,0) = 0
          and (   (ISNULL(Detail.BidItemId,0) != 0
                   and (   ISNULL(bh.BidType,2) = 1
                        or Detail.AddedFromAddenda is not null))
               or (ISNULL(Detail.BidItemId,0) = 0)) then 'Main'
         else 'Addenda' 
       end TabSelection
  FROM dbo.Detail  with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
  left outer join Bids on Bids.BidId = BidItems.BidId
  left outer JOIN Vendors on Vendors.VendorId = case isnull(Detail.ItemMustBeBid,0) 
                                                  when 0 then Detail.VendorId 
                                                  else 0 
                                                end
  left outer join BidHeaders on BidHeaders.BidHeaderId = Detail.BidHeaderId
  left outer join BidHeaders bh on bh.BidHeaderId = case 
                                                      when Bids.BidHeaderId is null then Requisitions.BidHeaderId
                                                      else Bids.BidHeaderId
                                                    end
```
