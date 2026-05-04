# Procedure: `dbo.sp_retrieveTagset`

_Generated on 2026-05-04T14:49:07.317Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_retrieveTagset` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-04-02 17:32:17 |
| Modified | 2012-05-18 16:20:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@tagSet` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.vw_ScannedDocumentDataAll` | unresolved | `ContentCentral` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_retrieveTagset] @tagSet varchar(max)
as
declare @hDoc int

set nocount on

--insert debugmsgs (Msg) values (@tagSet)
 
exec sp_xml_preparedocument @hDoc output, @tagSet

select sd.DocType, sd.DocId, sd.DocFolder, sd.DocName, sd.BaseName
  from OPENXML(@hDoc, '/tagset/tag') 
				  with (Id uniqueidentifier '@Id') x
  join ContentCentral.dbo.vw_ScannedDocumentDataAll sd on sd.DocId = x.Id

exec sp_xml_removedocument @hDoc

--select top 10 * from debugmsgs order by sysid desc
```
