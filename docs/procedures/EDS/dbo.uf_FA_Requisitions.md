# Function: inline table-valued: `dbo.uf_FA_Requisitions`

_Generated on 2026-05-04T14:49:07.375Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FA_Requisitions` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2012-06-14 00:05:22 |
| Modified | 2025-06-26 14:28:31 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@budgetID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `cxmlsession` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `RequisitionNotes` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `VendorUploads` | USER_TABLE |  |
| `vw_FA_UserDisplayName` | VIEW |  |
| `vw_RequisitionStatus` | VIEW |  |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_FA_RequisitionsTotals` | SQL_STORED_PROCEDURE |
| `dbo.sp_GetUserRequisitions` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE FUNCTION [dbo].[uf_FA_Requisitions] (@sessionID int,@budgetID int)
RETURNS TABLE
AS
RETURN(
	SELECT	Requisitions.RequisitionId
			, Requisitions.RequisitionNumber
			, Requisitions.TotalRequisitionCost
			, isnull(Requisitions.ApprovalLevel,0) ApprovalLevel
			, Requisitions.Attention
			, RIGHT('00000' + convert(varchar(6),Users.CometId),5) as CometId
			, Requisitions.DateUpdated
			, (SELECT COUNT(RequisitionNoteID) FROM RequisitionNotes WHERE RequisitionID = Requisitions.RequisitionID) AS NotesCount
			, Requisitions.OrderType
			, CASE Requisitions.OrderType
				WHEN 1 THEN 'Annual'
				WHEN 2 THEN 'Incidental'
				ELSE ''
			END AS OrderTypeDisplay
			, vwFAUDN.UserDisplayName AS UsersFullName
			, isnull(Requisitions.CategoryId,0) AS CategoryID
			, trim(coalesce(DistrictCategories.Title, Category.Name)) as CategoryName
			, isnull(Requisitions.BudgetId,0) AS BudgetID
			, isnull(Accounts.AccountId,0) AS AccountID
			, Requisitions.AccountCode
			, ISNULL(District.DistrictId,0) AS DistrictID
			, isnull(District.Name,'') as DistrictName
			, isnull(Requisitions.SchoolId,0) AS SchoolID
			, School.[Name] as SchoolName
			, isnull(Requisitions.UserId,0) AS UserID
			, Requisitions.UserAccountId
			, ISNULL(vrs.StatusID,0) AS StatusID
			, vrs.StatusDesc
			, ISNULL(ST.Name,'On Hold') AS StatusName
			, (select COUNT(*) 
			   from (
				 select VendorId
				   from Detail 
				  where Detail.RequisitionId = Requisitions.RequisitionId
					and isnull(Detail.ItemMustBeBid,0) = 0
					and ISNULL(District.MinimumPOAmount,0) > 0
					and Detail.VendorId != 7691
				   group by VendorId
				   having sum(Detail.Quantity * Detail.BidPrice) < District.MinimumPOAmount) spoc) LowPOCount
			, isnull(District.MinimumPOAmount,0) DistrictPOMinimum
			, coalesce(/*(select top 1 1 from Detail where Detail.RequisitionId = Requisitions.RequisitionId and Detail.AdditionalShipping = 1)*/Requisitions.AdditionalFreight,0) AdditionalShipping
			, coalesce((select sum(Detail.ShippingCost) ShippingCost from Detail where Detail.RequisitionId = Requisitions.RequisitionId and Detail.AdditionalShipping = 1),0) AdditionalShippingCost
			, isnull(Requisitions.AddendaTotal,0) AddendaTotal
			, pl.POCount
			, coalesce(pl.POList,'') POList
			, [Tracking]
	FROM	Requisitions with (nolock)
			LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId
			LEFT OUTER JOIN District ON District.DistrictId = School.DistrictId
			LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
			left outer join DistrictCategories on DistrictCategories.CategoryId = Requisitions.CategoryId
			                                  and DistrictCategories.DistrictId = District.DistrictId
			LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId
			LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
			LEFT OUTER JOIN Budgets ON Budgets.BudgetID = Requisitions.BudgetId
			LEFT OUTER JOIN Accounts on Accounts.AccountId = BudgetAccounts.AccountId
			INNER JOIN vw_FA_UserDisplayName vwFAUDN ON vwFAUDN.UserID = Requisitions.UserId
			INNER JOIN vw_RequisitionStatus vrs ON vrs.RequisitionId = Requisitions.RequisitionId
			LEFT OUTER JOIN StatusTable ST ON ST.StatusId = vrs.StatusID
			left outer join cxmlsession on cxmlsession.SessionId = @SessionId -- DCH Added for cXML 1/28/2014
			outer apply (Select count(*) POCount, STRING_AGG(cast(PO.POId as varchar) + '|' + cast(PO.VendorId as varchar),',') POList , max(coalesce(vu.tracking,0)) [tracking]
			               from PO with (nolock) 
							outer apply (Select top 1 1 [tracking]
							                from VendorUploads
											where VendorUploads.POId = PO.POId
											order by VendorUploads.DateUploaded desc) vu
						   where PO.RequisitionId = Requisitions.RequisitionId 
						     and PO.VendorId != 7691) pl
	WHERE	dbo.uf_RequisitionIsVisible(@sessionID,Requisitions.RequisitionId) = 1
		AND Requisitions.BudgetId = @budgetID
		and coalesce(cxmlsession.CategoryId,Requisitions.CategoryId,0) = coalesce(Requisitions.CategoryId,0) -- DCH Added for cXML 1/28/2014
		and case when coalesce(cxmlsession.SessionId,0) != 0 and Requisitions.DateExported is not null then 1 else 0 end = 0
)

/*
ALTER FUNCTION [dbo].[uf_FA_Requisitions] (@sessionID int,@budgetID int)
RETURNS TABLE
AS
RETURN(
	SELECT	Requisitions.RequisitionId
			, Requisitions.RequisitionNumber
			
			, ISNULL((SELECT TOP 1 Approvals.StatusID from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),0) AS StatusID
			, ISNULL((SELECT TOP 1 StatusTable.Name from Approvals, StatusTable where StatusTable.StatusID = Approvals.StatusID AND Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),'On Hold') AS StatusName
			
			, Requisitions.TotalRequisitionCost
			, isnull(Requisitions.ApprovalLevel,0) ApprovalLevel
			, Requisitions.Attention
			, RIGHT('00000' + convert(varchar(6),Users.CometId),5) as CometId
			, Requisitions.DateUpdated
			, (SELECT COUNT(RequisitionNoteID) FROM RequisitionNotes WHERE RequisitionID = Requisitions.RequisitionID) AS NotesCount
			, Requisitions.OrderType
			, CASE Requisitions.OrderType
				WHEN 1 THEN 'Annual'
				WHEN 2 THEN 'Incidental'
				ELSE ''
			END AS OrderTypeDisplay
			, vwFAUDN.UserDisplayName AS UsersFullName
			, isnull(Requisitions.CategoryId,0) AS CategoryID
			, Category.[Name] as CategoryName
			, isnull(Requisitions.BudgetId,0) AS BudgetID
			, isnull(Accounts.AccountId,0) AS AccountID
			, Requisitions.AccountCode
			, ISNULL(District.DistrictId,0) AS DistrictID
			, isnull(District.Name,'') as DistrictName
			, isnull(Requisitions.SchoolId,0) AS SchoolID
			, School.[Name] as SchoolName
			, isnull(Requisitions.UserId,0) AS UserID
			, Requisitions.UserAccountId
	FROM	Requisitions with (nolock)
			
			LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId
			LEFT OUTER JOIN District ON District.DistrictId = School.DistrictId
			LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
			LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId
			LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
			LEFT OUTER JOIN Budgets ON Budgets.BudgetID = Requisitions.BudgetId
			LEFT OUTER JOIN Accounts on Accounts.AccountId = BudgetAccounts.AccountId
			INNER JOIN vw_FA_UserDisplayName vwFAUDN ON vwFAUDN.UserID = Requisitions.UserId
	WHERE	dbo.uf_RequisitionIsVisible(@sessionID,Requisitions.RequisitionId) = 1
		AND Requisitions.BudgetId = @budgetID
)
*/
```
