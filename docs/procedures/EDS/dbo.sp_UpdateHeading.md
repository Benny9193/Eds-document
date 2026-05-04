# Procedure: `dbo.sp_UpdateHeading`

_Generated on 2026-05-04T13:43:18.925Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateHeading` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-12-07 15:52:21 |
| Modified | 2015-11-24 23:37:41 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pHeadingId` | IN | int |  |
| 3 | `@pActive` | IN | tinyint |  |
| 4 | `@pCode` | IN | varchar(255) |  |
| 5 | `@pDescription` | IN | varchar(255) |  |
| 6 | `@rHeadingId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Headings` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UpdateHeading] @pSessionId int, @pHeadingId int, @pActive tinyint, @pCode varchar(255), @pDescription varchar(255), @rHeadingId int output as

declare @HeadingId int

select @HeadingId = @pHeadingId

if @pHeadingId = 0
begin
  -- Insert New Item
  insert Headings (Active, Code, [Description])
    values (1, @pCode, @pDescription)

  select @HeadingId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
end
else
begin
  -- Update Existing Item
  Update Headings
     set Active = @pActive,
         Code = @pCode,
         [Description] = @pDescription
   where HeadingId = @HeadingId
end

select @rHeadingId = @HeadingId
```
