# Function: inline table-valued: `dbo.uf_RequisitionCategoriesTest`

_Generated on 2026-05-04T13:07:57.695Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RequisitionCategoriesTest` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2016-03-09 10:15:59 |
| Modified | 2016-03-09 10:17:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CXmlSession` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_RequisitionCategoriesTest] (@pSessionId int, @pBudgetId int)
returns table
as
return (
SELECT	Category.CategoryID, Category.Name CategoryName, Len(Category.Name) AS CategoryLength, Vendors.Name VendorName, Len(Vendors.Name) AS VendorNameLength, Vendors.VendorId
  from Budgets 
  join District on District.DistrictId = Budgets.DistrictId
  join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                         and DistrictCategories.Active = 1
  join Category on Category.CategoryId = DistrictCategories.CategoryId
               and Category.Type = 1
               and Category.Active = 1
  join BidHeaders on BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and BidHeaders.CategoryId = DistrictCategories.CategoryId
                 and GETDATE() Between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
                 and BidHeaders.Active = 1
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.VendorId not in (7691, 7692)
  left outer join SessionTable on SessionTable.SessionId = @pSessionId
  left outer join CXmlSession on cXmlSession.SessionId = SessionTable.SessionId
  left outer join Users on Users.UserId = SessionTable.UserId
 where Budgets.BudgetId = @pBudgetId
   and isnull(DistrictCategories.AllowIncidentals,0) = case when getdate() > Budgets.AnnualCutoff then 1 else isnull(DistrictCategories.AllowIncidentals,0) end
   and isnull(Users.AllowIncidentals,0) = case when isnull(District.AllowIncidentalOrdering,0) = 1 and getdate() > Budgets.AnnualCutoff then 1 else isnull(Users.AllowIncidentals,0) end
   and (   dateadd(day,-1,BidHeaders.EffectiveUntil) between case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(SessionTable.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.EditFrom) else Budgets.EditFrom end and Budgets.EditUntil
        or dateadd(day,1,BidHeaders.EffectiveFrom) between case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(SessionTable.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.EditFrom) else Budgets.EditFrom end and Budgets.EditUntil
        or case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(SessionTable.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.EditFrom) else Budgets.EditFrom end between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
        or Budgets.EditUntil between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil)
   and Category.CategoryId = case when CXmlSession.BrowserFormPost is null then Category.CategoryId else cXMLSession.CategoryId end
   and getdate() between case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(SessionTable.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.EditFrom) else Budgets.EditFrom end and Budgets.EditUntil
 group by Category.CategoryID, Category.Name, Vendors.Name, Vendors.VendorId
/*
union ( -- Supplemental Bid Categories
SELECT	Category.CategoryID, Category.Name CategoryName, Len(Category.Name) AS CategoryLength, Vendors.Name VendorName, Len(Vendors.Name) AS VendorNameLength, Vendors.VendorId
  from Budgets 
  join District on District.DistrictId = Budgets.DistrictId
  join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                         and DistrictCategories.Active = 1
                         and DistrictCategories.AllowAddenda = 1
  join Category on Category.CategoryId = DistrictCategories.CategoryId
               and Category.Type = 1
               and Category.Active = 1
  join PPCatalogs on PPCatalogs.CategoryId = Category.CategoryId
                 and PPCatalogs.PricePlanId = DistrictPP.PricePlanId
  join Catalog on Catalog.CatalogId = PPCatalogs.CatalogId
              and Catalog.Active = 1
  join Vendors on Vendors.VendorId = Catalog.VendorId
              and Vendors.VendorId not in (7691, 7692)
  left outer join SessionTable on SessionTable.SessionId = @pSessionId
  left outer join CXmlSession on cXmlSession.SessionId = SessionTable.SessionId
  left outer join Users on Users.UserId = SessionTable.UserId
 where Budgets.BudgetId = @pBudgetId
   and isnull(DistrictCategories.AllowIncidentals,0) = case when getdate() > Budgets.AnnualCutoff then 1 else isnull(DistrictCategories.AllowIncidentals,0) end
   and isnull(Users.AllowIncidentals,0) = case when isnull(District.AllowIncidentalOrdering,0) = 1 and getdate() > Budgets.AnnualCutoff then 1 else isnull(Users.AllowIncidentals,0) end
   and (select Users.AllowAddenda from SessionTable join Users on Users.UserId = SessionTable.UserId where SessionTable.SessionId = @pSessionId) = 1
   and Category.CategoryId = case when CXmlSession.BrowserFormPost is null then Category.CategoryId else cXMLSession.CategoryId end
   and getdate() between case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.EditFrom) else Budgets.EditFrom end and Budgets.EditUntil
group by Category.CategoryID, Category.Name, Vendors.Name, Vendors.VendorId
)
*/
)
```
