# View: `dbo.vw_DistrictBudgetList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `selected` | int | NO |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `BudgetName` | varchar(30) | NO |  |  |
| 4 | `DistrictId` | int | NO |  |  |
| 5 | `DistrictName` | varchar(50) | NO |  |  |
| 6 | `DistrictCode` | varchar(4) | NO |  |  |
| 7 | `BAName` | varchar(194) | NO |  |  |
| 8 | `DistrictNameAndAddress` | varchar(189) | YES |  |  |
| 9 | `BudgetsFilterId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `Salutations` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_DistrictBudgetList] as
select 0 selected, Budgets.BudgetId, isnull(Budgets.Name,'') BudgetName, District.DistrictId, isnull(District.Name,'') DistrictName, isnull(District.DistrictCode,'') DistrictCode, isnull(Salutations.Title,'') + isnull(rtrim(BAC.FullName),'') BAName, isnull(rtrim(District.Name),'') + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictNameAndAddress, cast(substring(Budgets.Name,1,4) as int) BudgetsFilterId
  from Budgets with (nolock)
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.State,'') != ''
  left outer join DistrictContacts BAC on BAC.DistrictContactId =
    (select top 1 DistrictContactId
       from DistrictContacts with (nolock)
      where DistrictContacts.DistrictId = District.DistrictId
        and DistrictContacts.DistrictContactTypeId = 1
      order by DistrictContacts.DistrictContactId)
  left outer join Salutations on Salutations.SalutationId = BAC.SalutationId
 where Budgets.Active = 1
   and ISNUMERIC(substring(Budgets.Name,1,4)) = 1
   and CAST(substring(Budgets.Name,1,4) as int) > YEAR(getdate()) - 2
```
