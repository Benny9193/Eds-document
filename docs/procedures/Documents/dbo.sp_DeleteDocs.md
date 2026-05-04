# Procedure: `dbo.sp_DeleteDocs`

_Generated on 2026-05-04T14:49:10.289Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteDocs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-11-19 11:15:20 |
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
| `FieldData` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure [dbo].[sp_DeleteDocs] @XmlIn varchar(max)
as
begin
declare	@hDoc int

exec sp_xml_preparedocument @hDoc output, @XmlIn

update FieldData
   set deletedAt = GETDATE()
  from OPENXML(@hDoc, '/Documents/Document') 
  with ( DocumentId varchar(max) './@id') xd
  join Documents on Documents.Id = xd.DocumentId
  join DocumentFiles on DocumentFiles.Id =
    (select top 1 df.Id
       from DocumentFiles df
      where df.DocumentId = Documents.Id
        and df.deletedAt is null
      order by df.Datestamp desc)
  join FieldData on FieldData.DocumentId = Documents.Id


update Documents
   set deletedAt = GETDATE()
  from OPENXML(@hDoc, '/Documents/Document') 
  with ( DocumentId varchar(max) './@id') xd
  join Documents on Documents.Id = xd.DocumentId
  join DocumentFiles on DocumentFiles.Id =
    (select top 1 df.Id
       from DocumentFiles df
      where df.DocumentId = Documents.Id
        and df.deletedAt is null
      order by df.Datestamp desc)

update DocumentFiles
   set deletedAt = GETDATE()
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
