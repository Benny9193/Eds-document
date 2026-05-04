# Procedure: `dbo.sp_MultiEditCheck`

_Generated on 2026-05-04T13:43:21.510Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MultiEditCheck` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-11-25 14:57:27 |
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
| `DocumentTypeFields` | USER_TABLE |  |
| `FieldData` | USER_TABLE |  |
| `Fields` | USER_TABLE |  |
| `wf` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_MultiEditCheck] @XmlIn varchar(max)
as
begin
declare	@hDoc int

exec sp_xml_preparedocument @hDoc output, @XmlIn

select DocumentTypeFields.Id, DocumentTypeFields.DocumentTypeId, DocumentTypeFields.Sequence, 
		Fields.Id FieldId, Fields.Name FieldName, Fields.Prompt, Fields.FieldType, Fields.MultiLine, Fields.Decimals, Fields.Height, Fields.EditMask, Fields.MaxLength, Fields.Required, Fields.UseChoices, Fields.ValidationExp, Fields.AllowNewChoices, Fields.UpdateChoices, Fields.FieldChoices ChoiceValues, Fields.ExternalSource, Fields.TableName, Fields.ColumnName,
		Documents.Id DocumentId, FieldData.FieldValue, FieldData.Id FieldDataId, cast(0 as int) docCount, CAST(0 as int) dataCount into #workFields
  from OPENXML(@hDoc, '/Documents/Document') 
	with ( DocumentId varchar(max) './@id') xd
  join Documents on Documents.Id = xd.DocumentId
  join DocumentFiles on DocumentFiles.Id =
    (select top 1 df.Id
       from DocumentFiles df
      where df.DocumentId = Documents.Id
        and df.deletedAt is null
      order by df.Datestamp desc)
  join DocumentTypeFields on DocumentTypeFields.DocumentTypeId = Documents.DocumentTypeId
                         and DocumentTypeFields.deletedAt is null
  join Fields on Fields.Id = DocumentTypeFields.FieldId
             and Fields.deletedAt is null
             and Fields.Name not like '*%'
  left outer join FieldData on FieldData.FieldId = Fields.Id
                           and FieldData.DocumentId = Documents.Id
                           and FieldData.deletedAt is null

Update wf
   set docCount = (select COUNT(*) from #WorkFields wfs where wfs.FieldId = wf.FieldId),
	   dataCount = (select count(*) from (select wfs.FieldValue from #WorkFields wfs where wfs.FieldId = wf.FieldId group by wfs.FieldValue) wfss)
  from #WorkFields wf

--select * into workFields from #WorkFields

-- Return Data
select * from #WorkFields

-- Drop Temp Table
drop table #WorkFields

exec sp_xml_removedocument @hDoc
end
```
