# Procedure: `dbo.sp_retrieveTagsetDMS`

_Generated on 2026-05-04T13:07:57.520Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_retrieveTagsetDMS` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-01-05 16:46:30 |
| Modified | 2015-01-05 16:46:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@tagSet` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vw_DMSAllDocuments` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure [dbo].[sp_retrieveTagsetDMS] @tagSet varchar(max)
as
declare @hDoc int

set nocount on

--insert debugmsgs (Msg) values (@tagSet)
 
exec sp_xml_preparedocument @hDoc output, @tagSet

select sd.DocumentType, sd.DocId, sd.DocName
  from OPENXML(@hDoc, '/tagset/tag') 
				  with (Id uniqueidentifier '@Id') x
  join vw_DMSAllDocuments sd on sd.DocId = x.Id

exec sp_xml_removedocument @hDoc

--select top 10 * from debugmsgs order by sysid desc
```
