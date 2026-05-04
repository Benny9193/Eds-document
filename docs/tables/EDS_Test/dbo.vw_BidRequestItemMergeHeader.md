# View: `dbo.vw_BidRequestItemMergeHeader`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemCode` | varchar(50) | YES |  |  |
| 3 | `ItemDesc` | varchar(512) | YES |  |  |
| 4 | `BidRequestItemId` | int | NO |  |  |
| 5 | `ItemId` | int | YES |  |  |
| 6 | `BidRequest` | int | YES |  |  |
| 7 | `Active` | tinyint | YES |  |  |
| 8 | `RequisitionCount` | int | YES |  |  |
| 9 | `BidRequestAmount` | money | YES |  |  |
| 10 | `Checksum` | int | YES |  |  |
| 11 | `ExcludeFlag` | int | NO |  |  |
| 12 | `MergedFlag` | int | NO |  |  |
| 13 | `MasterItemFlag` | int | NO |  |  |
| 14 | `MasterItemCode` | varchar(50) | NO |  |  |
| 15 | `UnitCode` | varchar(20) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidRequestItemMergeActions` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `Items` | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view  [dbo].[vw_BidRequestItemMergeHeader]
AS

 

-- The MasterItemFlag is really a Super Item Flag
SELECT BRI.BidHeaderId, I.ItemCode, I.Description AS ItemDesc, BRI.BidRequestItemId, BRI.ItemId, BRI.BidRequest, BRI.Active, BRI.RequisitionCount, BRI.BidRequestAmount, BRI.Checksum,
       CASE WHEN ISNULL(MA.Merged,1)=0 AND ISNULL(BRI.Active,0)=1 THEN 1 ELSE 0 END as ExcludeFlag,
       CASE WHEN ISNULL(MA.Merged,0)=1 THEN 1 ELSE 0 END as MergedFlag,
       CASE 
         WHEN len(i.ItemCode) = 8 and i.ItemCode like 'EDS%' THEN 1
         WHEN (select count(*) 
                 from BidRequestItemMergeActions MA2 
                where isnull(MA2.Merged,0) = 1 
                  and MA2.DestinationBidRequestItemId = BRI.BidRequestItemId) > 1 THEN 1 
         ELSE 0 
       END As MasterItemFlag,
       ISNULL(ma.ItemCode,'') MasterItemCode,
       U.Code UnitCode
FROM dbo.BidRequestItems AS BRI WITH (nolock)
INNER JOIN dbo.BidHeaders AS BH WITH (nolock) ON BRI.BidHeaderId = BH.BidHeaderId 
INNER JOIN dbo.Items AS I WITH (nolock) ON I.ItemId = BRI.ItemId 
INNER JOIN dbo.Units U WITH (nolock) ON U.UnitId = I.UnitId
outer apply (select top 1 brima.*, i2.ItemCode
               from BidRequestItemMergeActions brima
               join BidRequestItems newbri on newbri.BidRequestItemId = brima.DestinationBidRequestItemId
               join Items i2 on i2.ItemId = newbri.ItemId
              where brima.BidRequestItemId = bri.BidRequestItemId
              order by BidRequestItemMergeActionsId desc
              ) ma
--LEFT OUTER JOIN BidRequestItemMergeActions MA on MA.BidRequestItemId = BRI.BidRequestItemId 
--left outer join BidRequestItems NewBRI on NewBRI.BidRequestItemId = MA.DestinationBidRequestItemId 
--left outer join dbo.Items I2 ON I2.ItemId = NewBRI.ItemId
--where BRI.BidHeaderId=4898
```
