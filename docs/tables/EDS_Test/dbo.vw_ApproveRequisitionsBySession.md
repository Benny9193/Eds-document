# View: `dbo.vw_ApproveRequisitionsBySession`

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
| 5 | `TotalRequisitionCost` | money | NO |  |  |
| 6 | `ApprovalLevel` | tinyint | NO |  |  |
| 7 | `Attention` | varchar(50) | YES |  |  |
| 8 | `CometId` | varchar(5) | YES |  |  |
| 9 | `DateUpdated` | datetime | YES |  |  |
| 10 | `NotesCount` | int | NO |  |  |
| 11 | `OrderType` | tinyint | NO |  |  |
| 12 | `OrderTypeDisplay` | varchar(10) | NO |  |  |
| 13 | `UserDisplayName` | varchar(56) | YES |  |  |
| 14 | `CategoryID` | int | NO |  |  |
| 15 | `CategoryName` | varchar(50) | YES |  |  |
| 16 | `BudgetID` | int | NO |  |  |
| 17 | `AccountID` | int | NO |  |  |
| 18 | `AccountCode` | varchar(62) | NO |  |  |
| 19 | `DistrictID` | int | NO |  |  |
| 20 | `DistrictName` | varchar(50) | NO |  |  |
| 21 | `SchoolID` | int | NO |  |  |
| 22 | `SchoolName` | varchar(103) | YES |  |  |
| 23 | `UserID` | int | NO |  |  |
| 24 | `UserAccountId` | int | NO |  |  |
| 25 | `SessionId` | int | NO |  |  |
| 26 | `AllocationAvailable` | money | YES |  |  |
| 27 | `REQ_UAID` | int | YES |  |  |
| 28 | `UseBudgetAccountAllocations` | tinyint | NO |  |  |
| 29 | `BudgetAmount` | money | NO |  |  |
| 30 | `UseAllocations` | tinyint | NO |  |  |
| 31 | `AllocationAmount` | money | NO |  |  |
| 32 | `HistoryCount` | int | NO |  |  |
| 33 | `StatusDesc` | varchar(104) | NO |  |  |
| 34 | `AddendaTotal` | money | NO |  |  |
| 35 | `LastAlteredSessionId` | int | YES |  |  |
| 36 | `LowPOCount` | int | YES |  |  |
| 37 | `DistrictPOMinimum` | money | NO |  |  |
| 38 | `InactiveAccount` | int | NO |  |  |
| 39 | `AdditionalShipping` | int | YES |  |  |
| 40 | `AdditionalShippingCost` | decimal(38,2) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `Approvals` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_FA_UserDisplayName` | VIEW |
| `vw_RequisitionShippingCosts` | VIEW |
| `vw_RequisitionStatusBySession` | VIEW |
| `vw_StatusHistory` | VIEW |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_FA_RequisitionsTotals` | SQL_STORED_PROCEDURE |
| `dbo.sp_SmallPOCheck` | SQL_STORED_PROCEDURE |

## Definition

```sql
--select * from vw_ApproveRequisitionsBySession where SessionId = 1784625165

CREATE       view  [dbo].[vw_ApproveRequisitionsBySession] as
	SELECT	Requisitions.RequisitionId,
			Requisitions.RequisitionNumber,
			ISNULL(vwRS.StatusID,cast(0 as int)) AS StatusID,
--			ISNULL(Approvals.StatusID,cast(0 as int)) AS StatusID,
			ISNULL(StatusTable.Name,'On Hold') AS StatusName,
			isnull(Requisitions.TotalRequisitionCost,CAST(0 as money)) as TotalRequisitionCost,
			isnull(Requisitions.ApprovalLevel,0) ApprovalLevel,
			Requisitions.Attention,
			RIGHT('00000' + convert(varchar(6),Users.CometId),5) as CometId,
			Requisitions.DateUpdated,
			ISNULL(Requisitions.NotesCount,0) AS NotesCount,
			isnull(Requisitions.OrderType,0) as OrderType,
			CASE Requisitions.OrderType
				WHEN 1 THEN 'Annual'
				WHEN 2 THEN 'Incidental'
				ELSE ''
			END AS OrderTypeDisplay,
			vwFAUDN.UserDisplayName AS UserDisplayName,
			isnull(Requisitions.CategoryId,0) AS CategoryID,
			trim(coalesce(DistrictCategories.Title, Category.[Name])) as CategoryName,
			isnull(Requisitions.BudgetId,0) AS BudgetID,
			isnull(Accounts.AccountId,0) AS AccountID,
			' ' + isnull(trim(Accounts.Code),'') + case when BudgetAccounts.Active + UserAccounts.Active + Accounts.Active = 3 then '' else ' (inactive)' end /*isnull(Requisitions.AccountCode,'') */as AccountCode,
			ISNULL(District.DistrictId,0) AS DistrictID,
			isnull(District.Name,'') as DistrictName,
			isnull(Requisitions.SchoolId,0) AS SchoolID,
			School.[Name] + case when Requisitions.ShippingId = 0 or Requisitions.ShippingId is null then '** Missing Shipping Info **' when Requisitions.ShippingId != School.ShippingId then ' (' + ShipLocations.Name + ')' else '' end as SchoolName,
			isnull(Requisitions.UserId,0) AS UserID,
			isnull(Requisitions.UserAccountId,0) as UserAccountId,
			SessionTable.SessionId,
	        case 
	          when isnull(BudgetAccounts.UseAllocations,0) = 1 and UserAccounts.UseAllocations = 1 and isnull(BudgetAccounts.AmountAvailable,0) < UserAccounts.AllocationAvailable then isnull(BudgetAccounts.AmountAvailable,0)
	          when isnull(BudgetAccounts.UseAllocations,0) = 1 and UserAccounts.UseAllocations = 1 and isnull(BudgetAccounts.AmountAvailable,0) >= UserAccounts.AllocationAvailable then UserAccounts.AllocationAvailable
	          when isnull(BudgetAccounts.UseAllocations,0) = 1 and UserAccounts.UseAllocations = 0 then isnull(BudgetAccounts.AmountAvailable,0)
	          when isnull(BudgetAccounts.UseAllocations,0) = 0 and UserAccounts.UseAllocations = 1 then UserAccounts.AllocationAvailable
	          else isnull(BudgetAccounts.AmountAvailable,0)
	        end as AllocationAvailable,
/*
		case isnull(UserAccounts.UseAllocations,0) 
		  when 1 then ISNULL(UserAccounts.AllocationAvailable,0) 
		  else cast(0 as money) 
		end AS AllocationAvailable, 
*/
		Requisitions.UserAccountID AS REQ_UAID,
		isnull(BudgetAccounts.UseAllocations,0) UseBudgetAccountAllocations,
		CASE ISNULL(BudgetAccounts.UseAllocations,0)
		    WHEN 1 THEN ISNULL(BudgetAccounts.BudgetAmount,0)
			ELSE 0
		END AS BudgetAmount,
		isnull(UserAccounts.UseAllocations,0) | ISNULL(BudgetAccounts.UseAllocations,0) UseAllocations,
		CASE ISNULL(UserAccounts.UseAllocations,0)
			WHEN 1 THEN ISNULL(UserAccounts.AllocationAmount,0)
			ELSE 0
		END AS AllocationAmount,
		ISNULL((select count(*) from vw_StatusHistory where RequisitionId=Requisitions.RequisitionID),0) AS HistoryCount,
		vwRS.StatusDesc,
		isnull(Requisitions.AddendaTotal,0) AddendaTotal
		, Requisitions.LastAlteredSessionId,
		(select COUNT(*) 
		   from (
		     select VendorId
		       from vw_RequisitionShippingCosts rsc
		      where rsc.RequisitionId = Requisitions.RequisitionId
		        and ISNULL(District.MinimumPOAmount,0) > 0
		        and rsc.VendorId != 7691
		        and rsc.extended + rsc.ShippingCost < District.MinimumPOAmount) spoc) LowPOCount,
/*		(select COUNT(*) 
		   from (
		     select VendorId
		       from Detail 
		      where Detail.RequisitionId = Requisitions.RequisitionId
		        and isnull(Detail.ItemMustBeBid,0) = 0
		        and ISNULL(District.MinimumPOAmount,0) > 0
		        and Detail.VendorId != 7691
		       group by VendorId
		       having sum((Detail.Quantity * Detail.BidPrice) + case when Detail.AdditionalShipping = 1 then Detail.ShippingCost else 0 end) + Requisitions.ShippingCost < District.MinimumPOAmount) spoc) LowPOCount,
*/
isnull(District.MinimumPOAmount,0) DistrictPOMinimum,
		 case when BudgetAccounts.Active + UserAccounts.Active + Accounts.Active = 3 then 0 else 1 end InactiveAccount,
		 coalesce(/*(select top 1 1 from Detail where Detail.RequisitionId = Requisitions.RequisitionId and Detail.AdditionalShipping = 1)*/Requisitions.AdditionalFreight,0) AdditionalShipping,
		 coalesce((select sum(Detail.ShippingCost) ShippingCost from Detail where Detail.RequisitionId = Requisitions.RequisitionId and Detail.AdditionalShipping = 1),0) AdditionalShippingCost
	FROM	SessionTable with (nolock)
	        join Budgets on Budgets.BudgetId = SessionTable.BudgetId
	        join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
			JOIN vw_FA_UserDisplayName vwFAUDN ON vwFAUDN.UserID = Requisitions.UserId
			join vw_RequisitionStatusBySession vwRS on vwRS.RequisitionId = Requisitions.RequisitionId
			                                       and vwRS.SessionId = SessionTable.SessionId
			LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId
			LEFT OUTER JOIN ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
			LEFT OUTER JOIN District ON District.DistrictId = School.DistrictId
			LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
			left outer join DistrictCategories on DistrictCategories.CategoryId = Requisitions.CategoryId
			                                  and DistrictCategories.DistrictId = Budgets.DistrictId
			LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId
			LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
			left outer JOIN UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
			LEFT OUTER JOIN Accounts on Accounts.AccountId = UserAccounts.AccountId
			left outer join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
			                         and Approvals.ApprovalId =
			  (select top 1 A.ApprovalId 
			     from Approvals A with (nolock) 
			    where A.RequisitionId = Requisitions.RequisitionId
			    order by A.ApprovalDate desc)
			left outer join StatusTable on StatusTable.StatusId = Approvals.StatusId
	WHERE	dbo.uf_RequisitionIsVisible(SessionTable.SessionId,Requisitions.RequisitionId) = 1
```
