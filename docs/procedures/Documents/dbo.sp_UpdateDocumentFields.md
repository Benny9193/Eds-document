# Procedure: `dbo.sp_UpdateDocumentFields`

_Generated on 2026-05-04T13:43:21.511Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateDocumentFields` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-12-30 19:58:32 |
| Modified | 2024-06-21 20:33:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@XmlIn` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `FieldData` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UpdateDocumentFields] @XmlIn varchar(max)
as
begin
declare @hDoc int

exec sp_xml_preparedocument @hDoc output, @XmlIn

declare @updates table(DocumentId uniqueidentifier, FieldId uniqueidentifier, Value varchar(max), parentDocumentId uniqueidentifier null)

-- Save Values to Update
insert @updates(DocumentId, FieldId, Value, parentDocumentId)
 select xd.DocumentId, xd.FieldId, case when isnull(xd.Value,'') != '' then xd.Value when ISNULL(xd.Value,'') = '' and ISNULL(copyData.FieldValue,'') != '' then copyData.FieldValue else xd.Value end, xd.parentDocumentId
  from OPENXML(@hDoc, '/Documents/Document/Fields/Field') 
	with ( DocumentId varchar(50) './../../@id',
		   ParentDocumentId varchar(50) './../../@parentId',
	       FieldId varchar(50) './@fieldId',
	       Value varchar(max) '.') xd 
  left outer join FieldData editData on editData.DocumentId = xd.DocumentId
                                    and editData.FieldId = xd.FieldId
                                    and editData.deletedAt is null	                                 
  left outer join FieldData copyData on copyData.DocumentId = xd.parentDocumentId
                                    and copyData.FieldId = xd.FieldId
                                    and copyData.deletedAt is null	                                 
 where (    xd.Value != ''
        and xd.Value != ISNULL(editData.FieldValue,''))
    or (isnull(xd.Value,'') = '' and ISNULL(copyData.FieldValue,'') != '')

begin transaction FieldUpdate

-- Delete Current Values
update FieldData
   set deletedAt = GETDATE()
  from FieldData 
  join @updates up on up.DocumentId = FieldData.DocumentId 
                  and up.FieldId = FieldData.FieldId
 where FieldData.deletedAt is null	                                 

-- Insert New Values
insert FieldData (DocumentId, FieldId, FieldValue, updatedAt)   
 select up.DocumentId, up.FieldId, up.Value, GETDATE()
  from @updates up

commit transaction FieldUpdate

exec sp_xml_removedocument @hDoc

end
```
