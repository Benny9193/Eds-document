# View: `dbo.vw_BidRequestItemsBidMgr`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `BidRequest` | int | YES |  |  |
| 5 | `Active` | tinyint | YES |  |  |
| 6 | `RequisitionCount` | int | YES |  |  |
| 7 | `Status` | varchar(50) | NO |  |  |
| 8 | `Comments` | varchar(1024) | NO |  |  |
| 9 | `CrossReferencesText` | varchar(1024) | NO |  |  |
| 10 | `ItemCode` | varchar(50) | YES |  |  |
| 11 | `SortSeq` | varchar(64) | YES |  |  |
| 12 | `Description` | varchar(512) | YES |  |  |
| 13 | `UnitId` | int | NO |  |  |
| 14 | `Code` | varchar(20) | YES |  |  |
| 15 | `BIDMGRTAGFILEID` | int | NO |  |  |
| 16 | `TAGUSR` | int | YES |  |  |
| 17 | `TAGTBL` | int | YES |  |  |
| 18 | `TAGPTR` | int | YES |  |  |
| 19 | `TAGVAL` | char(10) | YES |  |  |
| 20 | `WEIGHT` | real | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidMgrTagFile`](dbo.BidMgrTagFile.md) | USER_TABLE |
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| `dbo.uf_CrossRefs2Text` | SQL_SCALAR_FUNCTION |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidRequestItemsBidMgr]  
AS
select BRI.BidRequestItemId
       ,BRI.BidHeaderId
       ,BRI.ItemId
       ,BRI.BidRequest
       ,BRI.Active
       ,BRI.RequisitionCount
       ,ISNULL(BRI.Status,'') Status
       ,ISNULL(BRI.Comments,'') Comments
       ,ISNULL(dbo.uf_CrossRefs2Text(BRI.ItemId),'') CrossReferencesText
       ,Items.ItemCode, Items.SortSeq, Items.Description
       ,Units.UnitId, Units.Code
       ,TAG.BIDMGRTAGFILEID, TAG.USR TAGUSR, TAG.TBL TAGTBL, TAG.PTR TAGPTR, TAG.VAL TAGVAL 
       ,convert(real, BRI.RequisitionCount) * convert(real, BRI.RequisitionCount) * convert(real, BRI.BidRequest) WEIGHT 
from dbo.BidRequestItems BRI with (nolock)
join dbo.Items ON Items.ItemId=BRI.ItemId
join dbo.Units ON Units.UnitId=Items.UnitId
Join dbo.BidMgrTagFile TAG on TAG.Ptr=BRI.BIDREQUESTITEMID
--WHERE BRI.BIDHEADERID = 7965 AND BRI.ACTIVE = 1 AND TAG.TBL = 30 AND TAG.USR = {sessionid}  -- Note: 30 is field equate of list in bidmgr

/*
select BRI.BidRequestItemId
       ,BRI.BidHeaderId
       ,BRI.ItemId
       ,BRI.BidRequest
       ,BRI.Active
       ,BRI.RequisitionCount
       ,ISNULL(BRI.Status,'') Status
       ,ISNULL(BRI.Comments,'') Comments
       ,XREF.BidHeaderId XREFBidHeaderId, XREF.BidRequestItemId XREFBidRequestItemId, ISNULL(XREF.CrossReferencesText,'') CrossReferencesText
       ,Items.ItemCode, Items.SortSeq, Items.Description
       ,Units.UnitId, Units.Code
       ,TAG.BIDMGRTAGFILEID, TAG.USR TAGUSR, TAG.TBL TAGTBL, TAG.PTR TAGPTR, TAG.VAL TAGVAL 
       ,ItemWeight.BIDREQUESTITEMID ItemWeightBIDREQUESTITEMID, ItemWeight.BIDHEADERID ItemWeightBIDHEADERID, ItemWeight.WEIGHT 
from dbo.BidRequestItems BRI with (nolock)
join dbo.BidRequestItemsCrossRefsView XREF on XREF.BidRequestItemId = BRI.BidRequestItemId and XREF.BidHeaderId = BRI.BidHeaderId
join dbo.Items ON Items.ItemId=BRI.ItemId
join dbo.Units ON Units.UnitId=Items.UnitId
Join dbo.BidMgrTagFile TAG on TAG.Ptr=BRI.BIDREQUESTITEMID
join dbo.BidRequestItemsWeightView ItemWeight on ItemWeight.BIDREQUESTITEMID = BRI.BIDREQUESTITEMID 
                                             AND ItemWeight.BIDHEADERID =  BRI.BIDHEADERID
--WHERE BRI.BIDHEADERID = 7965 AND BRI.ACTIVE = 1 AND TAG.TBL = 30 AND TAG.USR = 2571264 
--ORDER BY  BRI.BIDHEADERID,  Items.SORTSEQ,  BRI.BIDREQUESTITEMID
*/
```
