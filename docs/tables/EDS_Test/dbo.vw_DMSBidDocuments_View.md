# View: `dbo.vw_DMSBidDocuments_View`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | varchar(30) | YES |  |  |
| 2 | `BidNbr` | varchar(max) | YES |  |  |
| 3 | `DocType` | varchar(max) | YES |  |  |
| 4 | `DocId` | uniqueidentifier | NO |  |  |
| 5 | `DistrictVisible` | varchar(max) | NO |  |  |
| 6 | `PagesCaptured` | int | YES |  |  |
| 7 | `FileName` | varchar(1024) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_BidGrouper` | VIEW |
| `dbo.DocumentFiles` | unresolved |
| `dbo.Documents` | unresolved |
| `dbo.DocumentTypeFields` | unresolved |
| `dbo.DocumentTypes` | unresolved |
| `dbo.FieldData` | unresolved |
| `dbo.Fields` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_DMSBidDocuments_View] as
SELECT	cast(bg1.AltBidHeaderId as varchar) as BidHeaderId, fdBidNbr.FieldValue BidNbr,
        isnull(fdDocType.FieldValue,'') + 
          case 
            when isnull(fdDocType.FieldValue,'') != '' and isnull(fdAddDesc.FieldValue,'') != '' then ' - ' 
            else ''
          end +
          isnull(fdAddDesc.FieldValue,'') + 
            case
              when cast(bg1.AltBidHeaderId as varchar) != isnull(fdBidNbr.FieldValue,'') then 
                ' (Bid ' + cast(bg1.MainBidHeaderId as varchar) + ')' 
              else '' 
            end as DocType, DocumentFiles.Id DocId, isnull(fdDistrictVis.FieldValue,'Yes') DistrictVisible, coalesce(DocumentFiles.PageCount,0) PagesCaptured, isnull(DocumentFiles.FileName,'') FileName
FROM	Documents.dbo.Documents Documents with (nolock)
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
-- Get Document Types of 'Bid Documents'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'Bid Documents'
                                              and DocumentTypes.deletedAt is null
-- Get Bid Nbr from Data
join Documents.dbo.FieldData fdBidNbr on fdBidNbr.DocumentId = Documents.Id
                                     and fdBidNbr.deletedAt is null
join Documents.dbo.Fields fBidNbr on fBidNbr.Id = fdBidNbr.FieldId
                                 and fBidNbr.Name = 'Bid Number*'
                                 and fBidNbr.deletedAt is null
-- Cross Match Bids as needed
join vw_BidGrouper bg1 on cast(bg1.MainBidHeaderId as varchar) = fdBidNbr.FieldValue
-- Get Document SubTypes
join Documents.dbo.FieldData fdDocType on fdDocType.DocumentId = Documents.Id
                                      and fdDocType.deletedAt is null
join Documents.dbo.Fields fDocType on fDocType.Id = fdDocType.FieldId
                                  and fDocType.Name = 'Bid Document Type'
                                  and fDocType.deletedAt is null
-- Get 'District Visible'
join Documents.dbo.DocumentTypeFields dtfDistrictVis on dtfDistrictVis.DocumentTypeId = Documents.DocumentTypeId
                                                    and dtfDistrictVis.deletedAt IS null
join Documents.dbo.Fields fDistrictVis on fDistrictVis.Id = dtfDistrictVis.FieldId
                                      and fDistrictVis.Name = 'District Visible'
                                      and fDistrictVis.deletedAt is null
left outer join Documents.dbo.FieldData fdDistrictVis on fdDistrictVis.DocumentId = Documents.Id
                                                     and fdDistrictVis.FieldId = dtfDistrictVis.FieldId
                                                     and fdDistrictVis.deletedAt is null
-- Get 'Additional Description'
join Documents.dbo.DocumentTypeFields dtfAddDesc on dtfAddDesc.DocumentTypeId = Documents.DocumentTypeId
                                                and dtfAddDesc.deletedAt IS null
join Documents.dbo.Fields fAddDesc on fAddDesc.Id = dtfAddDesc.FieldId
                                  and fAddDesc.Name = 'Additional Description'
                                  and fAddDesc.deletedAt is null
left outer join Documents.dbo.FieldData fdAddDesc on fdAddDesc.DocumentId = Documents.Id
                                                 and fdAddDesc.FieldId = dtfAddDesc.FieldId
                                                 and fdAddDesc.deletedAt is null
where Documents.deletedAt is null
Group by cast(bg1.AltBidHeaderId as varchar), fdBidNbr.FieldValue,
        isnull(fdDocType.FieldValue,'') + 
          case 
            when isnull(fdDocType.FieldValue,'') != '' and isnull(fdAddDesc.FieldValue,'') != '' then ' - ' 
            else ''
          end +
          isnull(fdAddDesc.FieldValue,'') + 
            case
              when cast(bg1.AltBidHeaderId as varchar) != isnull(fdBidNbr.FieldValue,'') then 
                ' (Bid ' + cast(bg1.MainBidHeaderId as varchar) + ')' 
              else '' 
            end, DocumentFiles.Id, isnull(fdDistrictVis.FieldValue,'Yes'), DocumentFiles.PageCount, isnull(DocumentFiles.FileName,'')
```
