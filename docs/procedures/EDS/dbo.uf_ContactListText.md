# Function: scalar: `dbo.uf_ContactListText`

_Generated on 2026-05-04T13:04:00.522Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ContactListText` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2012-01-17 00:23:25 |
| Modified | 2012-01-17 00:23:25 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@DistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DistrictContacts` | USER_TABLE |  |
| `DistrictContactTypes` | USER_TABLE |  |
| `Salutations` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function dbo.uf_ContactListText (@DistrictId int)
returns varchar(max)
as
begin
declare @ContactList varchar(max)

select @ContactList = coalesce(@ContactList,'') + 
       DistrictContactTypes.Description + char(13) + char(10) + 
       case isnull(Salutations.Title,'') when '' then '' else isnull(Salutations.Title,'') end + isnull(DistrictContacts.FullName,'') + char(13) + char(10) + 
       case isnull(DistrictContacts.Address1,'') when '' then '' else isnull(DistrictContacts.Address1,'') + char(13) + char(10) end + 
       case isnull(DistrictContacts.Address2,'') when '' then '' else isnull(DistrictContacts.Address2,'') + char(13) + char(10) end + 
       case isnull(DistrictContacts.City,'') + isnull(DistrictContacts.State,'') + isnull(DistrictContacts.Zipcode,'')   when '' then '' else isnull(DistrictContacts.City,'') + ', ' + isnull(DistrictContacts.State,'') + ' ' + isnull(DistrictContacts.Zipcode,'')  + char(13) + char(10) end + 
       'Phone: ' + isnull(DistrictContacts.Phone,'') + char(13) + char(10) + 
       'Fax: ' + isnull(DistrictContacts.Fax,'') + char(13) + char(10) + 
       'Email: ' + isnull(DistrictContacts.Email,'') + char(13) + char(10) +
        char(13) + char(10) 
  from DistrictContactTypes with (nolock)
  left outer join DistrictContacts on DistrictContacts.DistrictContactTypeId = DistrictContactTypes.DistrictContactTypeId
                                  and DistrictContacts.DistrictId = @DistrictId
  left outer join Salutations on Salutations.SalutationId = DistrictContacts.SalutationId
 order by DistrictContactTypes.DistrictContactTypeId
 
 return @ContactList
end
```
