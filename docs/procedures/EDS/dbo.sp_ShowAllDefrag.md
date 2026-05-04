# Procedure: `dbo.sp_ShowAllDefrag`

_Generated on 2026-05-04T13:04:00.455Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ShowAllDefrag` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-11-28 11:07:51 |
| Modified | 2001-11-28 11:07:51 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_ShowAllDefrag as

declare @TableName varchar(255)

declare TableCursor CURSOR FORWARD_ONLY READ_ONLY FOR
select name from sysobjects where xtype = 'U'

open TableCursor

fetch next from TableCursor into @TableName

while @@fetch_status = 0
begin
  DBCC SHOWCONTIG (@TableName) WITH ALL_INDEXES, ALL_LEVELS

  fetch next from TableCursor into @TableName
end

close TableCursor
deallocate TableCursor
```
