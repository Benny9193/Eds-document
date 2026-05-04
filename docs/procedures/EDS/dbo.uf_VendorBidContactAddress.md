# Function: scalar: `dbo.uf_VendorBidContactAddress`

_Generated on 2026-05-04T13:43:19.123Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_VendorBidContactAddress` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-09-01 11:51:17 |
| Modified | 2011-09-01 11:51:17 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@VendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Salutations` | USER_TABLE |  |
| `VendorContacts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select dbo.uf_VendorContacts(9)
--select dbo.uf_FirstWord(substring(Address1,6,len(Address1)-5)), dbo.uf_SecondWord(substring(Address1,6,len(Address1)-5)), * from VendorContacts where VendorId = 173
--select dbo.uf_SecondWord(' x  y12')
create function [dbo].[uf_VendorBidContactAddress](@VendorId int)
returns varchar(max) as
begin
  declare @ContactList varchar(max)
  select @ContactList = COALESCE(@ContactList + char(13) + char(10), '') + 
         coalesce(Salutations.Title + ' ','') + coalesce(VendorContacts.FirstName + ' ','') + coalesce(VendorContacts.LastName + ' ','') + coalesce(VendorContacts.Suffix,'') + case rtrim(isnull(VendorContacts.Address1,'')) when '' then '' else char(13) + char(10) + rtrim(VendorContacts.Address1) end + case rtrim(isnull(VendorContacts.Address2,'')) when '' then '' else char(13) + char(10) + rtrim(VendorContacts.Address2) end + case rtrim(isnull(VendorContacts.City,'') + isnull(VendorContacts.State,'') + isnull(VendorContacts.Zipcode,'')) when '' then '' else char(13) + char(10) + rtrim(isnull(VendorContacts.City,'')) + ', ' + rtrim(isnull(VendorContacts.State,'')) + '  ' + rtrim(isnull(VendorContacts.Zipcode,'')) end 
    from VendorContacts with (nolock)
    left outer join Salutations on Salutations.SalutationId = VendorContacts.SalutationId
   where VendorContacts.VendorId = @VendorId
     and VendorContacts.BidContact = 1
  return @ContactList
end
```
