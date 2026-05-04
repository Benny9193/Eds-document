# Procedure: `dbo.sp_FA_RequisitionsForPurchaseOrderModal`

_Generated on 2026-05-04T14:49:07.277Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_RequisitionsForPurchaseOrderModal` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:07:52 |
| Modified | 2025-09-18 15:12:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@budgetID` | IN | int |  |
| 3 | `@RSID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Category` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `VendorOrders` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_POStatus` | VIEW |  |
| `dbo.uf_RequisitionStatus` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_RequisitionsForPurchaseOrderModal] @sessionID int, @budgetID int, @RSID int--, @processed bit

AS
/*
SELECT	R.RequisitionID, R.RequisitionNumber, u.StatusName, u.CategoryName, u.CometID, u.Attention, V.Name AS VendorName
		, D.VendorID, SUM(D.Quantity*D.BidPrice) AS VendorTotal, (SELECT CASE WHEN COUNT(POId) > 0 THEN 1 ELSE 0 END  FROM PO WHERE RequisitionId = R.RequisitionId) AS Processed
		, ISNULL(PO.PONumber,'') AS PONumber
		, CASE ISNULL(D.BidHeaderId,0)
			WHEN 0 THEN R.BidHeaderID
			ELSE ISNULL(D.BidHeaderId,0)
		END AS BidHeaderID
		, ISNULL(POST.StatusName,'') AS POStatus
		, NN.Prefix, NN.Suffix
		, COUNT(D.DetailID) AS NumberOfItems
--INTO	#TempRequisitions
FROM	ReportSession RS, ReportSessionLinks RSL, uf_FA_Requisitions (@sessionID,@budgetID) u, Requisitions R, Detail D
			LEFT OUTER JOIN PO ON PO.RequisitionId = D.RequisitionId AND PO.VendorId = D.VendorId AND PO.AwardID = D.AwardID
			LEFT OUTER JOIN POStatusTable POST ON POST.POStatusID = PO.POStatusID
			LEFT OUTER JOIN NextNumber NN ON NN.BudgetId=@budgetID AND NN.IdType='P'
		, Vendors V
WHERE	V.VendorId = D.VendorID
	AND	V.VendorId <> 7691
	AND	ISNULL(V.Code,'0000') != '0000'
	AND D.RequisitionID = R.RequisitionID
	AND R.RequisitionId = u.RequisitionID
	AND	u.RequisitionID = RSL.IntID
	AND RSL.RSID = RS.RSID
	AND	RS.RSID = @RSID
GROUP	BY R.RequisitionID, R.RequisitionNumber, u.StatusName, u.CategoryName, u.CometID, u.Attention, u.TotalRequisitionCost, D.VendorID, V.Name, ISNULL(POST.StatusName,'')
		, ISNULL(PO.PONumber,'')
		,CASE ISNULL(D.BidHeaderId,0)
			WHEN 0 THEN R.BidHeaderID
			ELSE ISNULL(D.BidHeaderId,0)
		END
		, POST.StatusName
		, NN.Prefix, NN.Suffix
ORDER	BY RequisitionNumber ASC, VendorName ASC
*/
SELECT	R.RequisitionID, R.RequisitionNumber, s.StatusName, c.Name CategoryName, u.CometID, R.Attention, coalesce(V.DisplayAs,V.Name,'') + '<br/>(Click to View Items)' AS VendorName
		, V.VendorID, PO.Amount AS VendorTotal, 1 AS Processed
		, ISNULL(PO.PONumber,'') AS PONumber
		, R.BidHeaderId AS BidHeaderID
		, ISNULL(case when POSS.POStatus like 'PO Transmitted%' then POSS.POStatus else '' end,'') AS POStatus
		, NN.Prefix, NN.Suffix
		, PO.ItemCount AS NumberOfItems
		, vo.VendorStatus
		, vo.LastUpdated VendorStatusLastUpdate
		, PO.POId
--INTO	#TempRequisitions
FROM	ReportSession RS with (nolock)
join ReportSessionLinks RSL on rsl.RSId = RS.RSId
--outer apply uf_FA_Requisitions (@sessionID,@budgetID) u
join Requisitions R on r.RequisitionId = rsl.IntId
join Category c on c.CategoryId = r.CategoryId
join Users U on U.UserId = R.UserId
JOIN PO ON PO.RequisitionId = R.RequisitionId 
join Vendors V on V.VendorId = PO.VendorId
              and v.VendorId != 7691
			  and coalesce(v.Code,'0000') != '0000'
LEFT OUTER JOIN NextNumber NN ON NN.BudgetId = @budgetID 
                             AND NN.IdType = 'P'
outer apply (Select dbo.uf_RequisitionStatus(r.RequisitionId) StatusName) s
outer apply (Select pos.POStatus from vw_POStatus pos where pos.POId = PO.POId) poss
outer apply (Select top 1 VendorStatus, LastUpdated from VendorOrders where VendorOrders.POId = PO.POId order by VendorOrders.LastUpdated desc) vo
WHERE	RS.RSID = @RSID
GROUP	BY R.RequisitionID, R.RequisitionNumber, s.StatusName, c.Name, u.CometID, R.Attention, coalesce(V.DisplayAs,V.Name,'')
		, V.VendorID, PO.Amount
		, ISNULL(PO.PONumber,'')
		, R.BidHeaderId
		, ISNULL(case when POSS.POStatus like 'PO Transmitted%' then POSS.POStatus else '' end,'')
		, NN.Prefix, NN.Suffix
		, PO.ItemCount
		, vo.VendorStatus
		, vo.LastUpdated
		, PO.POId
ORDER	BY RequisitionNumber ASC, VendorName ASC
```
