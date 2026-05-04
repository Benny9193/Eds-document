# View: `dbo.vw_DMSAllDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentType` | varchar(255) | NO |  |  |
| 2 | `DocName` | varchar(8000) | YES |  |  |
| 3 | `DocId` | uniqueidentifier | NO |  |  |
| 4 | `PagesCaptured` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.DocumentFiles` | unresolved |
| `dbo.Documents` | unresolved |
| `dbo.DocumentTypes` | unresolved |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_retrieveTagsetDMS` | SQL_STORED_PROCEDURE |

## Definition

```sql
--select * from Documents.dbo.DocumentFiles
--select * from ContentCentral.dbo.[vw_ScannedDocumentDataAll]
--select * from Documents.dbo.Fields where deletedAt is null order by Name
--select * from vw_DMSVendorBidDocuments

CREATE     view  [dbo].[vw_DMSAllDocuments] as
SELECT	DocumentTypes.Name DocumentType,
        replace(replace(DocumentFiles.FileName,'\\192.168.1.102','\\ed-data.local'),'\\ed-data.local\','\\fileserver-atl.ed-data.local\') DocName,
        DocumentFiles.Id DocId, 
        DocumentFiles.PageCount PagesCaptured
FROM	Documents.dbo.Documents Documents with (nolock)
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
-- Get Document Types --of 'Bid Documents'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
--                                              and DocumentTypes.Name = 'Vendor Bid Documents'
                                              and DocumentTypes.deletedAt is null
-- Get Document SubTypes
/*
join Documents.dbo.FieldData fdDocType on fdDocType.DocumentId = Documents.Id
                                      and fdDocType.deletedAt is null
join Documents.dbo.Fields fDocType on fDocType.Id = fdDocType.FieldId
                                  and fDocType.deletedAt is null
*/
group by DocumentTypes.Name,
        DocumentFiles.FileName,
        DocumentFiles.Id, 
        DocumentFiles.PageCount
```
