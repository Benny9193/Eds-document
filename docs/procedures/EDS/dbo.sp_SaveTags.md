# Procedure: `dbo.sp_SaveTags`

_Generated on 2026-05-04T13:07:57.523Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SaveTags` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-03-06 12:43:45 |
| Modified | 2012-03-06 18:39:00 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@xmlTagList` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_SaveTags @xmlTagList varchar(max)
as
declare @hDoc int,
		@RSId int

SET NOCOUNT ON;

exec sp_xml_preparedocument @hDoc output, @xmlTagList

insert ReportSession (RSData) values ('')

select @RSId = SCOPE_IDENTITY()

insert ReportSessionLinks (RSId, IntId)
  select @RSId, TagId
    from OPENXML(@hDoc, '/tagset/tag') 
    with (TagId int '@Id') tagset

exec sp_xml_removedocument @hDoc

select @RSId as RSId
```
