# Function: scalar: `dbo.isValidEmail`

_Generated on 2026-05-04T13:04:24.052Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `isValidEmail` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-08-24 14:44:35 |
| Modified | 2012-11-07 13:10:56 |
| Encrypted | no |
| Returns | bit |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@EmailAddress` | IN | nvarchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.ufn_RegExIsMatch` | unresolved | `master` |

## Called by

| Caller | Type |
|--------|------|
| `dbo.DistrictContactProblemView` | VIEW |
| `dbo.uf_UserEmailTree` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.UserContactProblemView` | VIEW |
| `dbo.VendorContactProblemView` | VIEW |
| `dbo.vw_BAPCBG` | VIEW |

## Definition

```sql
CREATE function [dbo].[isValidEmail](@EmailAddress nvarchar(255))
returns bit as
begin
--return(select [master].dbo.RegExpMatch(@EMailAddress, N'^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$',0))
--return(select [master].dbo.RegExpMatch(@EMailAddress, N'^((\"[^\"\f\n\r\t\v\b]+\")|([\w\!\#\$\%\&\''\*\+\-\~\/\^\`\|\{\}]+(\.[\w\!\#\$\%\&\''\*\+\-\~\/\^\`\|\{\}]+)*))@((\[(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))\])|(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))|((([A-Za-z0-9\-])+\.)+[A-Za-z\-]+))$',0))
return(select [master].dbo.ufn_RegExIsMatch(@EMailAddress, N'^((\"[^\"\f\n\r\t\v\b]+\")|([\w\!\#\$\%\&\''\*\+\-\~\/\^\`\|\{\}]+(\.[\w\!\#\$\%\&\''\*\+\-\~\/\^\`\|\{\}]+)*))@((\[(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))\])|(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))|((([A-Za-z0-9\-])+\.)+[A-Za-z\-]+))$',0))
--                                                     "^((\"[^\"\f\n\r\t\v\b]+\")|([\w\!\#\$\%\&\'\*\+\-\~\/\^\`\|\{\}]+(\.[\w\!\#\$\%\&\'\*\+\-\~\/\^\`\|\{\}]+)*))@((\[(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\"
end
```
