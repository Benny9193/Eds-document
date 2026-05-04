# Procedure: `dbo.sp_FA_RequisitionsTotals`

_Generated on 2026-05-04T13:43:18.837Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_RequisitionsTotals` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:05:52 |
| Modified | 2022-05-19 15:15:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@budgetID` | IN | int |  |
| 3 | `@categoryID` | IN | int |  |
| 4 | `@accountID` | IN | int |  |
| 5 | `@userID` | IN | int |  |
| 6 | `@schoolID` | IN | int |  |
| 7 | `@statusID` | IN | int |  |
| 8 | `@RSID` | IN | int |  |
| 9 | `@type` | IN | varchar(20) |  |
| 10 | `@statusDesc` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `uf_FA_Requisitions` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `vw_ApproveRequisitions` | VIEW |  |
| `vw_ApproveRequisitionsBySession` | VIEW |  |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec sp_FA_RequisitionsTotals 3500803,7183,null,null,null,null,null,null,'ApproveRequisitions'
CREATE PROCEDURE [dbo].[sp_FA_RequisitionsTotals] @sessionID int, @budgetID int,@categoryID int, @accountID int, @userID int, @schoolID int, @statusID int, @RSID int, @type varchar(20), @statusDesc varchar(255)

AS

/*
DECLARE	@sessionID int = 3282747
		, @budgetID int = 6531
		,@categoryID int = NULL
		, @accountID int = 21317
		, @userID int = 211072
		, @schoolID int = 14612
		, @statusID int = NULL
		, @RSID int = NULL
		, @type varchar(20) = 'ApproveRequisitions'
*/


CREATE TABLE #ReqTotals (
	SchoolID int NOT NULL
	, AccountID int null
	, AccountCode varchar(50) NULL
	, UserAccountID int NULL
	, Annual money NOT NULL
	, Incidental money NOT NULL
	, Spent money NOT NULL
)

CREATE TABLE #CodeTotals (
	AccountCode varchar(50) NULL
	, AccountID int null
	, SchoolID int NULL
	, BudgetAmount money NOT NULL
	, BudgetAvailable money NOT NULL
)

CREATE TABLE #TempReqs (
	RequisitionID int NOT NULL
	, SchoolID int NULL
	, AccountCode varchar(50) NULL
	, UserAccountID int NULL
	, TotalRequisitionCost money NULL
	, StatusID int NULL
	, OrderType int NULL
	, AccountID int NULL
	, BudgetID int NULL
	, CategoryID int NULL
	, UserID int NULL
)

/******** TEMP REQS - All reqs for this budget year (or by selected) ********/
if (@type = 'ApproveRequisitions' and @userID is null)
	BEGIN
		if (ISNULL(@RSID,0) = 0)
			BEGIN
				/* Approve Reqs with NO RSID is the Approve Reqs screen */
				INSERT	INTO #TempReqs(RequisitionID, SchoolID, AccountCode, UserAccountID, TotalRequisitionCost, StatusID, OrderType, AccountID, BudgetID, CategoryID, UserID)
				SELECT	RequisitionID, SchoolID, AccountCode, UserAccountID, TotalRequisitionCost, StatusID, ISNULL(OrderType,1), AccountID, BudgetID, CategoryID, UserID
				FROM	vw_ApproveRequisitionsBySession with (nolock)
				WHERE	SessionId = @sessionID
					AND BudgetID = COALESCE(@budgetID,BudgetID)
					AND AccountID = COALESCE(@accountID,AccountID)
					AND CategoryID = COALESCE(@categoryID,CategoryID)
					AND SchoolID = COALESCE(@schoolID,SchoolID)
					AND StatusID = COALESCE(@statusID,StatusID)
					AND UserID = COALESCE(@userID,UserID)
					AND StatusDesc = coalesce(@StatusDesc,StatusDesc)
					and dbo.uf_RequisitionIsVisible(@SessionId, RequisitionId) = 1
			END
		else
			BEGIN
				/* Approve Reqs with RSID is the subscreens that are running off selected approved reqs */
				INSERT	INTO #TempReqs(RequisitionID, SchoolID, AccountCode, UserAccountID, TotalRequisitionCost, StatusID, OrderType, AccountID, BudgetID, CategoryID, UserID)
				SELECT	uR.RequisitionID, uR.SchoolID, uR.AccountCode, uR.UserAccountID, uR.TotalRequisitionCost, StatusID, ISNULL(OrderType,1), AccountID, BudgetID, CategoryID, UserID
				FROM	ReportSession RS, ReportSessionLinks RSL, vw_ApproveRequisitions uR with (nolock)
				WHERE	uR.RequisitionId = RSL.IntId
					AND	uR.SessionId = @sessionID
					AND	uR.BudgetID = @budgetID
					AND	RSL.RSID = RS.RSID
					AND	RS.RSID = @RSID
					AND uR.BudgetID = COALESCE(@budgetID,BudgetID)
					AND uR.AccountID = COALESCE(@accountID,AccountID)
					AND uR.CategoryID = COALESCE(@categoryID,CategoryID)
					AND uR.SchoolID = COALESCE(@schoolID,SchoolID)
					AND uR.StatusID = COALESCE(@statusID,StatusID)
					AND uR.UserID = COALESCE(@userID,UserID)
--					AND StatusDesc = coalesce(@StatusDesc,StatusDesc)
					and dbo.uf_RequisitionIsVisible(@SessionId, ur.RequisitionId) = 1
			END

		select CASE WHEN ISNULL(a.Code,'') = '' THEN 'Unassigned' ELSE a.Code END AS AccountCode, 
		       CASE WHEN ISNULL(a.Code,'') = '' THEN NULL ELSE a.AccountID END AS AccountID, 
			   isnull((select SUM(ua.AllocationAmount) from UserAccounts ua join Users on Users.UserId = ua.UserId and Users.Active = 1 where ua.AccountId = a.AccountId and ua.Active = 1 and ua.UseAllocations = 1 and ua.BudgetId = @budgetID),0) BudgetAmount, 
			   isnull((select SUM(ua.AllocationAvailable) from UserAccounts ua join Users on Users.UserId = ua.UserId and Users.Active = 1 where ua.AccountId = a.AccountId and ua.Active = 1 and ua.UseAllocations = 1 and ua.BudgetId = @budgetID),0) BudgetAvailable, 
			   sum(case isnull(tr.OrderType,1) when 1 then tr.TotalRequisitionCost else 0 end) Annual, 
			   sum(case isnull(tr.OrderType,1) when 1 then 0 else tr.TotalRequisitionCost end) Incidental, 
			   sum(tr.TotalRequisitionCost) Spent
		  from #TempReqs tr
		  left outer join UserAccounts ua on ua.UserAccountId = tr.UserAccountID
		  left outer join BudgetAccounts ba on ba.BudgetAccountId = ua.BudgetAccountId
		  left outer join Accounts a on a.AccountId = tr.AccountID
		 group by a.Code, a.AccountId, isnull(ba.BudgetAmount,0), isnull(ba.AmountAvailable,0)
		 order by a.Code, a.AccountId, isnull(ba.BudgetAmount,0), isnull(ba.AmountAvailable,0)
	END
else
	BEGIN
		/* My Requisitions */
		INSERT INTO	#TempReqs(RequisitionID, SchoolID, AccountCode, UserAccountID, TotalRequisitionCost, StatusID, OrderType, AccountID, BudgetID, CategoryID, UserID)
		SELECT	RequisitionID, SchoolID, AccountCode, UserAccountID, TotalRequisitionCost, StatusID, ISNULL(OrderType,1), AccountID, BudgetID, CategoryID, UserID
		FROM	uf_FA_Requisitions (@sessionID, @budgetID)

		select CASE WHEN ISNULL(a.Code,'') = '' THEN 'Unassigned' ELSE a.Code END AS AccountCode, CASE WHEN ISNULL(a.Code,'') = '' THEN NULL ELSE a.AccountID END AS AccountID, isnull((select SUM(ua.AllocationAmount) from UserAccounts ua where ua.AccountId = a.AccountId and ua.Active = 1 and ua.UseAllocations = 1 and ua.BudgetId = @budgetID and ua.UserId = tr.UserID),0) BudgetAmount, isnull((select SUM(ua.AllocationAvailable) from UserAccounts ua where ua.AccountId = a.AccountId and ua.Active = 1 and ua.UseAllocations = 1 and ua.BudgetId = @budgetID and ua.UserId = tr.UserID),0) BudgetAvailable, sum(case isnull(tr.OrderType,1) when 1 then tr.TotalRequisitionCost else 0 end) Annual, sum(case isnull(tr.OrderType,1) when 1 then 0 else tr.TotalRequisitionCost end) Incidental, sum(tr.TotalRequisitionCost) Spent
		  from #TempReqs tr
		  left outer join UserAccounts ua on ua.UserAccountId = tr.UserAccountID
		  left outer join BudgetAccounts ba on ba.BudgetAccountId = ua.BudgetAccountId
		  left outer join Accounts a on a.AccountId = tr.AccountID
		 group by a.Code, a.AccountId, isnull(ba.BudgetAmount,0), isnull(ba.AmountAvailable,0), tr.UserID
		 order by a.Code, a.AccountId, isnull(ba.BudgetAmount,0), isnull(ba.AmountAvailable,0)
	END

/*union (
  select a.Code AccountCode, a.AccountId, ba.BudgetAmount, ba.AmountAvailable BudgetAvailable, null Annual, null Incidental, null Spent
    from BudgetAccounts ba
    join Accounts a on a.AccountId = ba.AccountId
   where ba.BudgetId = @budgetID
     and ba.Active = 1
)*/
/* DCH Removed 4/7/2014
/******** REQTOTALS - Req Totals grouped by School, AccountCode, and User Account ********/
INSERT	INTO #ReqTotals
SELECT	SchoolID,  AccountID, AccountCode, UserAccountID,  ISNULL(SUM(Annual),0) AS Annual, ISNULL(SUM(Incidental),0) AS Incidental, ISNULL(SUM(Annual),0) + ISNULL(SUM(Incidental),0) AS Spent
FROM	(
	SELECT	SchoolID, AccountId, AccountCode, UserAccountID, ISNULL(SUM(TotalRequisitionCost),0) AS Annual, 0 AS Incidental
	FROM	#TempReqs
	WHERE	StatusID <> 4
		AND	OrderType = 1
		AND AccountID = COALESCE(@accountID,AccountID)
		AND BudgetID = COALESCE(@budgetID,BudgetID)
		AND CategoryID = COALESCE(@categoryID,CategoryID)
		AND SchoolID = COALESCE(@schoolID,SchoolID)
		AND StatusID = COALESCE(@statusID,StatusID)
		AND UserID = COALESCE(@userID,UserID)
	GROUP	BY SchoolID, AccountID, AccountCode, UserAccountID

	UNION ALL

	SELECT	SchoolID, AccountId, AccountCode, UserAccountID,  0 AS Annual, ISNULL(SUM(TotalRequisitionCost),0) AS Incidental
	FROM	#TempReqs
	WHERE	StatusID <> 4
		AND	OrderType = 2
		AND AccountID = COALESCE(@accountID,AccountID)
		AND BudgetID = COALESCE(@budgetID,BudgetID)
		AND CategoryID = COALESCE(@categoryID,CategoryID)
		AND SchoolID = COALESCE(@schoolID,SchoolID)
		AND StatusID = COALESCE(@statusID,StatusID)
		AND UserID = COALESCE(@userID,UserID)
	GROUP	BY SchoolID, AccountId, AccountCode, UserAccountID
) x
GROUP	BY SchoolID,  AccountId, AccountCode, UserAccountID

/******** CODETOTALS - TEMPREQS joined to UserAccounts ********/
INSERT	INTO #CodeTotals
SELECT	DISTINCT NULL AS AccountCode, null as AccountId, R.SchoolID, 0 AS BudgetAmount, 0 AS BudgetAvailable
FROM	#TempReqs R

UNION ALL

SELECT	DISTINCT AccountCode, AccountId, SchoolID, SUM(AllocationAmount), SUM(AllocationAvailable)
FROM	(
	select	distinct v.Code AS AccountCode, v.AccountId, R.SchoolID, CASE WHEN ISNULL(v.UseAllocations,0)= 0 THEN 0 ELSE v.AllocationAmount END AS AllocationAmount, CASE WHEN ISNULL(v.UseAllocations,0)= 0 THEN 0 ELSE v.AllocationAvailable END AS AllocationAvailable
	from	#TempReqs R, vw_FA_ALLUserAccounts v
	where	v.Code = R.AccountCode --BH 5/26/2014 - change this to look for Code instead of UserAccountID for "recalculating" totals after someone changes an Account Code to something that doesn't exist in the PO screen
		and	v.UserId = r.UserID -- david added this? this shouldn't be here
		and	v.sessionID=@sessionID
		and	v.BudgetID = @budgetID -- BH 1/13/2014
) x
GROUP	BY AccountCode, AccountId, SchoolID

/* This is for requisitions that have Account Codes that are not in the Accounts table */
INSERT	INTO #CodeTotals
SELECT	R.AccountCode, r.AccountId, R.SchoolID, 0 AS BudgetAmount, 0 AS BudgetAvailable
FROM	#TempReqs R
WHERE	R.AccountCode NOT IN (SELECT ISNULL(AccountCode,'') FROM #CodeTotals)

if (@schoolID > 0)
	begin
		
		SELECT	DISTINCT CASE WHEN ISNULL(CT.AccountCode,'') = '' THEN 'Unassigned' ELSE CT.AccountCode END AS AccountCode, CT.BudgetAmount, CT.BudgetAvailable, RTT.Annual, RTT.Incidental, RTT.Spent
		FROM	#CodeTotals CT, (
			SELECT	CASE WHEN ISNULL(RT.AccountCode,'') = '' THEN 'Unassigned' ELSE RT.AccountCode END AS AccountCode, CASE WHEN ISNULL(RT.AccountCode,'') = '' THEN null ELSE RT.AccountID END AS AccountID, SUM(RT.Annual) AS Annual, SUM(RT.Incidental) AS Incidental, SUM(RT.Spent) AS Spent
			FROM	#ReqTotals RT
			WHERE	RT.SchoolID=@schoolID
			GROUP	BY AccountCode, AccountId
		) RTT
		WHERE	RTT.AccountCode = CT.AccountCode
		  and   RTT.AccountID = CT.AccountID
		ORDER	BY AccountCode ASC

	end
	
else
	begin

		SELECT	DISTINCT CASE WHEN ISNULL(CT.AccountCode,'') = '' THEN 'Unassigned' ELSE CT.AccountCode END AS AccountCode, CASE WHEN ISNULL(CT.AccountCode,'') = '' THEN NULL ELSE CT.AccountID END AS AccountID, CT.BudgetAmount, CT.BudgetAvailable, RTT.Annual, RTT.Incidental, RTT.Spent
		FROM	#CodeTotals CT, (
			SELECT	CASE WHEN ISNULL(RT.AccountCode,'') = '' THEN 'Unassigned' ELSE RT.AccountCode END AS AccountCode, CASE WHEN ISNULL(RT.AccountCode,'') = '' THEN NULL ELSE RT.AccountID END AS AccountID, SUM(RT.Annual) AS Annual, SUM(RT.Incidental) AS Incidental, SUM(RT.Spent) AS Spent
			FROM	#ReqTotals RT
			GROUP	BY AccountCode, AccountID
		) RTT
		WHERE	RTT.AccountCode = CT.AccountCode
		  AND	RTT.AccountID = CT.AccountID
		ORDER	BY AccountCode ASC
	
	end
*/
DROP TABLE #ReqTotals
DROP TABLE #CodeTotals
DROP TABLE #TempReqs
```
