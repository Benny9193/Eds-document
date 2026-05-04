# View: `dbo.vw_DistrictContactsList`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `DistrictContactId` | int | NO |  |  |
| 3 | `FullName` | varchar(174) | YES |  |  |
| 4 | `FullAddress` | varchar(167) | YES |  |  |
| 5 | `FullContacts` | varchar(316) | YES |  |  |
| 6 | `ContactPosition` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DistrictContacts` | USER_TABLE |
| `DistrictContactTypes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create     view [dbo].[vw_DistrictContactsList] as
select DistrictContacts.DistrictId,
	   DistrictContacts.DistrictContactId,
	   DistrictContacts.FullName,
	   case coalesce(trim(DistrictContacts.Address1),'') when '' then '' else coalesce(trim(DistrictContacts.Address1),'') + char(10) end +
	   case coalesce(trim(DistrictContacts.Address2),'') when '' then '' else coalesce(trim(DistrictContacts.Address2),'') + char(10) end +
	   case coalesce(trim(DistrictContacts.City),'') + coalesce(trim(DistrictContacts.State),'') + coalesce(trim(DistrictContacts.Zipcode),'') when '' then '' else coalesce(trim(DistrictContacts.City),'') + ', ' + coalesce(trim(DistrictContacts.State),'') + ' ' + coalesce(trim(DistrictContacts.Zipcode),'') end FullAddress,
	   case coalesce(trim(DistrictContacts.Phone),'') when '' then '' else 'Phone: ' + coalesce(trim(DistrictContacts.Phone),'') + char(10) end +
	   case coalesce(trim(DistrictContacts.Fax),'') when '' then '' else 'Fax: ' + coalesce(trim(DistrictContacts.Fax),'') + char(10) end +
	   case coalesce(trim(DistrictContacts.Email),'') when '' then '' else 'Email: ' + coalesce(trim(DistrictContacts.EMail),'') end FullContacts,
	   DistrictContactTypes.Description ContactPosition
  from DistrictContacts
  left outer join DistrictContactTypes on DistrictContactTypes.DistrictContactTypeId = DistrictContacts.DistrictContactTypeId
```
