# Function: scalar: `dbo.uf_ContactList`

_Generated on 2026-05-04T14:49:07.360Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ContactList` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2012-01-16 23:42:50 |
| Modified | 2012-01-16 23:59:12 |
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
CREATE function dbo.uf_ContactList (@DistrictId int)
returns varchar(max)
as
begin
declare @ContactList varchar(max)

select @ContactList = coalesce(@ContactList,'') + 
       DistrictContactTypes.Description + '<br/>' + 
       case isnull(Salutations.Title,'') when '' then '' else isnull(Salutations.Title,'') end + isnull(DistrictContacts.FullName,'') + '<br/>' + 
       case isnull(DistrictContacts.Address1,'') when '' then '' else isnull(DistrictContacts.Address1,'') + '<br/>' end + 
       case isnull(DistrictContacts.Address2,'') when '' then '' else isnull(DistrictContacts.Address2,'') + '<br/>' end + 
       case isnull(DistrictContacts.City,'') + isnull(DistrictContacts.State,'') + isnull(DistrictContacts.Zipcode,'')   when '' then '' else isnull(DistrictContacts.City,'') + ', ' + isnull(DistrictContacts.State,'') + ' ' + isnull(DistrictContacts.Zipcode,'')  + '<br/>' end + 
       'Phone: ' + isnull(DistrictContacts.Phone,'') + '<br/>' + 
       'Fax: ' + isnull(DistrictContacts.Fax,'') + '<br/>' + 
       'Email: ' + isnull(DistrictContacts.Email,'') + '<br/>' +
        '<br/>' 
  from DistrictContactTypes with (nolock)
  left outer join DistrictContacts on DistrictContacts.DistrictContactTypeId = DistrictContactTypes.DistrictContactTypeId
                                  and DistrictContacts.DistrictId = @DistrictId
  left outer join Salutations on Salutations.SalutationId = DistrictContacts.SalutationId
 order by DistrictContactTypes.DistrictContactTypeId
 
 return @ContactList
end
```
