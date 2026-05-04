# View: `dbo.vw_BAPCBG`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RepName` | varchar(30) | YES |  |  |
| 2 | `RepEmail` | varchar(128) | YES |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `FullName` | varchar(195) | YES |  |  |
| 5 | `Email` | varchar(255) | NO |  |  |
| 6 | `FullAddress` | varchar(170) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `Salutations` | USER_TABLE |
| `dbo.isValidEmail` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BAPCBG] as
select CSRep.name RepName, CSRep.EMail RepEmail, District.Name DistrictName, ltrim(case isnull(Salutations.Title,'') when '' then '' else Salutations.Title + ' ' end + isnull(DistrictContacts.FullName,'')) FullName, isnull(DistrictContacts.eMail,'') Email, case when DistrictContacts.Address1 like '%PAY%' then '' else ISNULL(DistrictContacts.Address1,'') + char(13) + char(10) end + case when DistrictContacts.Address2 like '%PAY%' then '' when ISNULL(DistrictContacts.Address2,'') = '' then '' else DistrictContacts.Address2 + char(13) + char(10) end + ISNULL(DistrictContacts.City,'') + ', ' + ISNULL(DistrictContacts.State,'') + '  ' + ISNULL(DistrictContacts.Zipcode,'') FullAddress
  from DistrictContacts with (nolock)
  join District on District.DistrictId = DistrictContacts.DistrictId
               and District.Active = 1
  join CSRep on CSRep.CSRepId = District.CSRepId
  left outer join Salutations on Salutations.SalutationId = DistrictContacts.SalutationId
 where DistrictContacts.DistrictContactTypeId in (1,2,4)
   and dbo.isValidEmail(DistrictContacts.eMail) = 1
-- order by CSRep.Name, District.Name, DistrictContacts.FullName
```
