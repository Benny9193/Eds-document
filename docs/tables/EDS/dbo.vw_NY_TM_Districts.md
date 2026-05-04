# View: `dbo.vw_NY_TM_Districts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(50) | YES |  |  |
| 2 | `FullName` | varchar(174) | NO |  |  |
| 3 | `Email` | varchar(255) | NO |  |  |
| 4 | `Description` | varchar(50) | NO |  |  |
| 5 | `Address1` | varchar(50) | NO |  |  |
| 6 | `City` | varchar(50) | NO |  |  |
| 7 | `State` | char(2) | NO |  |  |
| 8 | `Zipcode` | varchar(10) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `DistrictContactTypes` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_NY_TM_Districts_Mailing`](dbo.vw_NY_TM_Districts_Mailing.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_NY_TM_Districts]
as
select ss.Name, isnull(ss.FullName,'') FullName, isnull(ss.eMail,'') Email, DistrictContactTypes.Description, isnull(ss.Address1,'') Address1, isnull(ss.City,'') City, ISNULL(ss.State,'') State, isnull(ss.Zipcode,'') Zipcode
  from (
	select District.DistrictId, District.Name, DistrictContacts.FullName, DistrictContacts.eMail, 
       case 
         when 
           case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Account%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Purchas%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Senior%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Assistant%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Board%' then 
		     case 
		       when DistrictContacts.Address2 is null then District.Address2 
		       else DistrictContacts.Address2 
		     end 
		 else 
		   case 
		     when DistrictContacts.Address1 is null then District.Address1
		     else DistrictContacts.Address1
		   end
	   end Address1,
	   DistrictContacts.City, DistrictContacts.State, DistrictContacts.Zipcode
	  from District
	  join DistrictContacts on DistrictContacts.DistrictId = District.DistrictId
						   and DistrictContacts.DistrictContactTypeId in (1,2,4)
	 where District.Active = 1
	   and District.TimeAndMaterialBids = 1
	   and District.County != 'TEST'
	   and District.State = 'NY'
	 group by District.DistrictId, District.Name, DistrictContacts.FullName, DistrictContacts.eMail,
	 case 
         when 
           case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Account%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Purchas%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Senior%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Assistant%' or 
		   case 
             when DistrictContacts.Address1 is null then District.Address1 
			 else DistrictContacts.Address1 
		   end like 'Board%' then 
		     case 
		       when DistrictContacts.Address2 is null then District.Address2 
		       else DistrictContacts.Address2 
		     end 
		 else 
		   case 
		     when DistrictContacts.Address1 is null then District.Address1
		     else DistrictContacts.Address1
		   end
	   end, DistrictContacts.City, DistrictContacts.State, DistrictContacts.Zipcode
       ) ss
  join DistrictContacts on DistrictContacts.DistrictId = ss.DistrictId
                       and DistrictContacts.DistrictContactId =
      (select Top 1 dc.DistrictContactId
         from DistrictContacts dc
        where dc.DistrictId = ss.DistrictId
          and dc.eMail = ss.eMail
        order by case dc.DistrictContactTypeId when 1 then 1 when 4 then 2 when 2 then 3 else 4 end)
  join DistrictContactTypes on DistrictContactTypes.DistrictContactTypeId = DistrictContacts.DistrictContactTypeId
```
