# Procedure: `dbo.usp_getSDSDocsAll`

_Generated on 2026-05-04T13:07:57.782Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_getSDSDocsAll` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-09-14 18:34:46 |
| Modified | 2022-09-14 18:35:26 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `SafetyDataSheets` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_getSDSDocsUser 2687384
--exec usp_getSDSDocsSchool 16689
--exec usp_getSDSDocsDistrict 396
create   procedure [dbo].[usp_getSDSDocsAll]
as
begin
select String_Agg(cast(u.SafetyDataSheetId as varchar(max)),',') IdList
  from SafetyDataSheets u
end
```
