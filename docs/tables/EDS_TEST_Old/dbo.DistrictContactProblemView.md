# View: `dbo.DistrictContactProblemView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `District` | varchar(50) | YES |  |  |
| 2 | `ContactType` | varchar(50) | NO |  |  |
| 3 | `MissingContact` | int | NO |  |  |
| 4 | `MissingEmail` | int | NO |  |  |
| 5 | `ErrorMessage` | varchar(270) | NO |  |  |
| 6 | `DistrictId` | int | NO |  |  |
| 7 | `DistrictContactId` | int | YES |  |  |
| 8 | `DistrictContactTypeId` | int | NO |  |  |
| 9 | `CSRepId` | int | YES |  |  |
| 10 | `RepName` | varchar(30) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `DistrictContactTypes` | USER_TABLE |
| `dbo.IsValidEmail` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
/*order by D.Name, DCT.Description*/
create   view  [dbo].[DistrictContactProblemView]
AS
Select D.Name District, DCT.Description ContactType, 
       case when DC.DistrictContactId is null then 1 else 0 end MissingContact, 
       case when isnull(DC.eMail,'')='' then 1 else 0 end MissingEmail, 
       case 
       when DC.DistrictContactId is null 
       then 'Missing Contact'
       else
         case
         when isnull(DC.eMail,'')=''
         then 'Missing email'
         when dbo.IsValidEmail(DC.eMail)!= 1
         then 'Invalid email: ' + isnull(DC.eMail,'')
         else ''
         end  
       end ErrorMessage,
       D.DistrictId, DC.DistrictContactId, DCT.DistrictContactTypeId, D.CSRepId, REP.Name RepName
from District D
left outer join CSRep REP ON REP.CSRepId = D.CSRepId
cross join DistrictContactTypes DCT
left outer join DistrictContacts DC ON DC.DistrictId = D.DistrictId AND DC.DistrictContactTypeId = DCT.DistrictContactTypeId
where D.Active = 1 and D.Name NOT like '%demo%' and D.Name NOT like '%test%' and D.Name <> '' 
      and (DC.DistrictContactId is null or isnull(DC.eMail,'')='' or dbo.IsValidEmail(DC.eMail)!= 1 )
--order by D.Name, DCT.Description
```
