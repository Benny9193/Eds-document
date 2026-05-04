# Procedure: `dbo.sp_AcceptDocs`

_Generated on 2026-05-04T14:49:10.287Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AcceptDocs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-11-18 23:31:13 |
| Modified | 2024-06-21 20:33:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@XmlIn` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DocumentFiles` | USER_TABLE |  |
| `Documents` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_AcceptDocs] @XmlIn varchar(max)
as
begin
declare	@hDoc int

exec sp_xml_preparedocument @hDoc output, @XmlIn

update DocumentFiles
   set AcceptedAt = GETDATE(),
	   AcceptedById = null
  from OPENXML(@hDoc, '/Documents/Document') 
  with ( DocumentId varchar(max) './@id') xd
  join Documents on Documents.Id = xd.DocumentId
  join DocumentFiles on DocumentFiles.Id =
    (select top 1 df.Id
       from DocumentFiles df
      where df.DocumentId = Documents.Id
        and df.deletedAt is null
      order by df.Datestamp desc)

exec sp_xml_removedocument @hDoc
end
```
