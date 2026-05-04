# View: `dbo.vw_MSRPProductLineExceptions`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ManufacturerId` | int | YES |  |  |
| 3 | `ProductLineExceptions` | varchar(8000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMgrMSRP2VendorReportView` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_MSRPProductLineExceptions]
AS
Select  ss.BidHeaderId, ss.ManufacturerId, STRING_AGG(ss.ProdLineOrWriteIn, ', ') WITHIN GROUP (ORDER BY ProdLineOrWriteIn) ProductLineExceptions
From
(
Select BidHeaderId,ManufacturerId,ProdLineOrWriteIn 
FROM BidMgrMSRP2VendorReportView 
where AllActive=1 and WinningBidFlag=1 and AllProductLine=0 
  and (VendorAllWinner=0 or FakeRecord=0) -- Note: have to list "real" bids because they might have been bid at a different rate
group by BidHeaderId, ManufacturerId, ProdLineOrWriteIn 
) ss
--where  ss.BidHeaderId=9781 and ss.ManufacturerId=621 
group by ss.BidHeaderId, ss.ManufacturerId
```
