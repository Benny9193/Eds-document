# View: `dbo.vw_RptMarkedReadyEmailBlastStats`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `DistrictCode` | varchar(4) | YES |  |  |
| 5 | `RepName` | varchar(30) | YES |  |  |
| 6 | `BlastSent` | varchar(10) | YES |  |  |
| 7 | `NotifyByEmail` | varchar(5) | YES |  |  |
| 8 | `AssocReqsAll` | int | YES |  |  |
| 9 | `AssocReqsWtgForBidReady` | int | YES |  |  |
| 10 | `AssocUsers` | int | YES |  |  |
| 11 | `Approvers` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidheaders` | USER_TABLE |
| `category` | USER_TABLE |
| `CSRep` | USER_TABLE |
| `DistrictNotifications` | USER_TABLE |
| `EmailBlast` | USER_TABLE |
| `vw_Districts_Assoc_With_Bid` | VIEW |
| `vw_LastBidAwardDate` | VIEW |
| `vw_Reqs_Assoc_With_Bid` | VIEW |
| `vw_Users_Assoc_With_Bid` | VIEW |
| [`dbo.District`](dbo.District.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_RptMarkedReadyEmailBlastStats] as
select cat.name CategoryName, 
       bh.BidHeaderId, 
       --Stats.DistrictId, 
	   Stats.DistrictName,
	   Stats.DistrictCode,
	   Stats.RepName, 
       case when Stats.BlastSent is Null THEN '' ELSE CONVERT(varchar(10), convert(date,Stats.BlastSent)) END BlastSent, 
	   case when Stats.NotifyByEmail is Null Then 'Error' Else Stats.NotifyByEmail end NotifyByEmail,
	   Stats.AssocReqsAll,
	   Stats.AssocReqsWtgForBidReady,
	   Stats.AssocUsers,
	   Stats.Approvers 
from bidheaders bh
join category cat on cat.categoryid=bh.categoryid
left join vw_LastBidAwardDate AWA on AWA.BidHeaderId = BH.BidHeaderId
outer apply
(
SELECT  A.DISTRICTID, A.DISTRICTCODE, A.NAME DistrictName,
        CSRep.Name RepName, 
        (SELECT Top 1 SentDate FROM EmailBlast WHERE Reference1Id=bh.BidHeaderId and Reference2Id=A.DistrictId order by EmailBlastId) BlastSent,
		(Select Case When DN.NotifyList='' Then 'No' Else 'Yes' End from DistrictNotifications DN Where DN.DistrictId=A.DistrictId and DN.CategoryId=bh.CategoryId) NotifyByEmail,
        (SELECT COUNT(*) From (select approverid FROM vw_Users_Assoc_With_Bid where DistrictId=A.DistrictId and BidHeaderId = bh.BidHeaderId and ApproverId is not null group by approverid) ss) AssocReqsAll,
		(SELECT COUNT(*) FROM vw_Reqs_Assoc_With_Bid where DistrictId=A.DistrictId and WaitingBidReadyFlag=1 and BidHeaderId = bh.BidHeaderId) AssocReqsWtgForBidReady,
		(SELECT COUNT(*) FROM vw_Users_Assoc_With_Bid where DistrictId=A.DistrictId and BidHeaderId = bh.BidHeaderId) AssocUsers,
		(SELECT COUNT(*) FROM vw_Reqs_Assoc_With_Bid where DistrictId=A.DistrictId and BidHeaderId = bh.BidHeaderId) Approvers
FROM dbo.District A 
join CSRep on csrep.csrepid = A.CSRepId
WHERE ( A.DistrictId In (select DistrictId from vw_Districts_Assoc_With_Bid where BidHeaderId = bh.BidHeaderId) )  
) Stats
--where bh.BidHeaderId = 10942 
where BH.CategoryId in (12,44) 
  and AWA.LastAwardDate != 'Not Awarded' 
  and Stats.DistrictName is not null 
  and BH.BidAwardDate >= DateFromParts( Year(GetDate()), 1, 1 )  -- BH.BidAwardDate = bid opening date e.g. all bids with opening date of Jan 1, current year
--order by CategoryName, DistrictName
```
