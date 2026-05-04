# View: `dbo.vw_FA_Requisitions`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 3 | `StatusID` | int | NO |  |  |
| 4 | `StatusName` | varchar(50) | NO |  |  |
| 5 | `TotalRequisitionCost` | money | YES |  |  |
| 6 | `ApprovalLevel` | tinyint | NO |  |  |
| 7 | `Attention` | varchar(50) | YES |  |  |
| 8 | `CometId` | varchar(5) | YES |  |  |
| 9 | `DateUpdated` | datetime | YES |  |  |
| 10 | `NotesCount` | int | YES |  |  |
| 11 | `OrderType` | tinyint | YES |  |  |
| 12 | `OrderTypeDisplay` | varchar(10) | NO |  |  |
| 13 | `UsersFullName` | varchar(56) | YES |  |  |
| 14 | `CategoryID` | int | NO |  |  |
| 15 | `CategoryName` | varchar(50) | YES |  |  |
| 16 | `BudgetID` | int | NO |  |  |
| 17 | `AccountID` | int | NO |  |  |
| 18 | `AccountCode` | varchar(50) | NO |  |  |
| 19 | `DistrictID` | int | NO |  |  |
| 20 | `DistrictName` | varchar(50) | NO |  |  |
| 21 | `SchoolID` | int | NO |  |  |
| 22 | `SchoolName` | varchar(50) | YES |  |  |
| 23 | `UserID` | int | NO |  |  |
| 24 | `UserAccountId` | int | YES |  |  |
| 25 | `SessionId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `Approvals` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `RequisitionNotes` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_FA_UserDisplayName` | VIEW |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_FA_Requisitions] as
	SELECT	Requisitions.RequisitionId
			, Requisitions.RequisitionNumber
			
--			, ISNULL((SELECT TOP 1 Approvals.StatusID from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),0) AS StatusID
--			, ISNULL((SELECT TOP 1 StatusTable.Name from Approvals, StatusTable where StatusTable.StatusID = Approvals.StatusID AND Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),'On Hold') AS StatusName
			, ISNULL(Approvals.StatusID,0) AS StatusID
			, ISNULL(StatusTable.Name,'On Hold') AS StatusName
			
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
			, isnull(Accounts.Code,'') AccountCode /*Requisitions.AccountCode*/
			, ISNULL(District.DistrictId,0) AS DistrictID
			, isnull(District.Name,'') as DistrictName
			, isnull(Requisitions.SchoolId,0) AS SchoolID
			, School.[Name] as SchoolName
			, isnull(Requisitions.UserId,0) AS UserID
			, Requisitions.UserAccountId
			, SessionTable.SessionId
	FROM	SessionTable with (nolock)
	        join Budgets on Budgets.BudgetId = SessionTable.BudgetId
	        join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
			INNER JOIN vw_FA_UserDisplayName vwFAUDN ON vwFAUDN.UserID = Requisitions.UserId
			LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId
			LEFT OUTER JOIN District ON District.DistrictId = School.DistrictId
			LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
			LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId
			LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
			LEFT OUTER JOIN Accounts on Accounts.AccountId = BudgetAccounts.AccountId
			left outer join Approvals on Approvals.ApprovalId =
			  (select top 1 A.ApprovalId 
			     from Approvals A with (nolock) 
			    where A.RequisitionId = Requisitions.RequisitionId
			    order by A.ApprovalDate desc)
			left outer join StatusTable on StatusTable.StatusId = Approvals.StatusId
	WHERE	dbo.uf_RequisitionIsVisible(SessionTable.SessionId,Requisitions.RequisitionId) = 1
```
