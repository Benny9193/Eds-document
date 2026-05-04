# Function: scalar: `dbo.uf_EncryptPassword`

_Generated on 2026-05-04T13:43:19.006Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_EncryptPassword` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2024-10-18 02:10:25 |
| Modified | 2024-10-18 02:10:25 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@Password` | IN | varchar(100) |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_CXmlLogin` | SQL_STORED_PROCEDURE |
| `dbo.sp_FA_AttemptLogin` | SQL_STORED_PROCEDURE |
| `dbo.usp_GeneratePassword` | SQL_STORED_PROCEDURE |
| `dbo.usp_GeneratePassword_Print` | SQL_STORED_PROCEDURE |

## Definition

```sql
create function [dbo].[uf_EncryptPassword](@Password varchar(100))
    returns varchar(max) as
begin
    declare @encryptedPassword varchar(100);
    set @encryptedPassword = CONVERT(VARCHAR(100),HashBytes('SHA2_256', @Password),2);
    return @encryptedPassword
end
```
