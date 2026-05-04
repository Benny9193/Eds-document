# Function: inline table-valued: `null.uf_CoverPages`

_Generated on 2026-05-04T13:04:00.222Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_CoverPages` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2002-09-09 16:57:59 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Awards` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PricePlans` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function EDSIQWebUser.uf_CoverPages (@pRSId int, @pCategoryId int, @pEffectiveDate datetime)
returns table AS
return(
select District.Name DistrictName, 
       District.Name + case isnull(District.Address1,'') when '' then '' else char(13) + char(10) + District.Address1 end + case isnull(District.Address2,'') when '' then '' else char(13) + char(10) + District.Address2 end + case isnull(District.Address3,'') when '' then '' else char(13) + char(10) + District.Address3 end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + ' ' + isnull(District.Zipcode,'') DistrictNameAndAddress, 
       School.Name SchoolName, 
       School.Name + case isnull(School.Address1,'') when '' then '' else char(13) + char(10) + School.Address1 end + case isnull(School.Address2,'') when '' then '' else char(13) + char(10) + School.Address2 end + case isnull(School.Address3,'') when '' then '' else char(13) + char(10) + School.Address3 end + char(13) + char(10) + isnull(School.City,'') + ', ' + isnull(School.State,'') + ' ' + isnull(School.Zipcode,'') SchoolNameAndAddress, 
       Users.Attention UserName, Users.CometId UserCode,
       case ss.Counter when 1 then Accounts.Code else '' end AccountCode, Awards.DiscountRate, VendorBidNumber,
       Vendors.Name + case isnull(Vendors.Address1,'') when '' then '' else char(13) + char(10) + Vendors.Address1 end + case isnull(Vendors.Address2,'') when '' then '' else char(13) + char(10) + Vendors.Address2 end + case isnull(Vendors.Address3,'') when '' then '' else char(13) + char(10) + Vendors.Address3 end + char(13) + char(10) + isnull(Vendors.City,'') + ', ' + isnull(Vendors.State,'') + ' ' + isnull(Vendors.Zipcode,'') + char(13) + char(10) + isnull(Vendors.Phone,'') VendorsNameAndAddress, 
       Budgets.StartDate, Budgets.EndDate, Awards.BidStartDate, Awards.BidEndDate,
       Category.Name CategoryName
  from ReportSessionLinks
  join Users on Users.UserId = ReportSessionLinks.IntId
            and Users.Active = 1
  join School on School.SchoolId = Users.SchoolId
  join District on District.DistrictId = School.DistrictId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join PricePlans on PricePlans.PricePlanId = DistrictPP.PricePlanid
  join Awards on Awards.PricePlanId = PricePlans.PricePlanId
             and Awards.Active = 1
             and Awards.BidStartDate >= @pEffectiveDate
             and Awards.BidEndDate <= @pEffectiveDate
  join Category on Category.CategoryId = Awards.CategoryId
  join Vendors on Vendors.VendorId = Awards.VendorId
  left outer join (
    select UserAccounts.UserId, UserAccounts.AccountId, BudgetAccounts.BudgetId, Budgets.StartDate, Budgets.EndDate, count(*) Counter
      from UserAccounts
      join BudgetAccounts on BudgetAccounts.BudgetAccountId = UserAccounts.BudgetAccountId
                         and BudgetAccounts.Active = 1
      join Budgets on Budgets.BudgetId = BudgetAccounts.BudgetId
                  and Budgets.Active = 1
     where UserAccounts.Active = 1
     group by UserAccounts.UserId, UserAccounts.AccountId, BudgetAccounts.BudgetId, Budgets.StartDate, Budgets.EndDate
                  ) ss on ss.UserId = Users.UserId
                      and ss.StartDate >= @pEffectiveDate
                      and ss.EndDate <= @pEffectiveDate
  left outer join Accounts on Accounts.AccountId = ss.AccountId
  left outer join Budgets on Budgets.BudgetId = ss.BudgetId
 where Category.CategoryId = @pCategoryId
   and ReportSessionLinks.RSId = @pRSId
)
```
