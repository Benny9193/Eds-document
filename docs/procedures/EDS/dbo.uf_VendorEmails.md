# Function: scalar: `dbo.uf_VendorEmails`

_Generated on 2026-05-04T13:43:19.126Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_VendorEmails` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-09-19 10:25:40 |
| Modified | 2018-03-19 19:59:58 |
| Encrypted | no |
| Returns | varchar(2048) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pVendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.VendorContacts` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.vw_VendorsTable` | VIEW |

## Definition

```sql
CREATE   function [dbo].[uf_VendorEmails] (@pVendorId int)
returns varchar(2048)
as
begin
declare @ReturnValue varchar(2048)

select @ReturnValue = coalesce( @ReturnValue + ';','') + isnull(VendorContacts.Email,'') 
  from dbo.VendorContacts with (nolock)
 where VendorContacts.VendorId = @pVendorId

return(@ReturnValue)
end
```
