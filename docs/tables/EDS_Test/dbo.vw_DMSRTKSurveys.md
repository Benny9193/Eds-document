# View: `dbo.vw_DMSRTKSurveys`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | varchar(max) | YES |  |  |
| 2 | `FacilityNumber` | varchar(max) | YES |  |  |
| 3 | `FacilityName` | varchar(max) | YES |  |  |
| 4 | `ReportYear` | varchar(max) | YES |  |  |
| 5 | `DocId` | uniqueidentifier | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
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
CREATE   view  [dbo].[vw_DMSRTKSurveys] as
SELECT	coalesce(fdDistrictId.FieldValue,'') as DistrictId,
		coalesce(fdFacilityNumber.FieldValue,'') as FacilityNumber,
		coalesce(fdFacilityName.FieldValue,'') as FacilityName,
		coalesce(fdReportYear.FieldValue,'') as ReportYear,
        DocumentFiles.Id DocId
FROM	Documents.dbo.Documents Documents with (nolock)
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
-- Get Document Types of 'RTK Annual Reports'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'RTK Annual Reports'
                                              and DocumentTypes.deletedAt is null
-- Get 'State Survey' RTK Document Type
join Documents.dbo.DocumentTypeFields dtfDocType on dtfDocType.DocumentTypeId = Documents.DocumentTypeId
                                                   and dtfDocType.deletedAt IS null
join Documents.dbo.Fields fDocType on fDocType.Id = dtfDocType.FieldId
                                  and fDocType.Name = 'RTK Document Type'
                                  and fDocType.deletedAt is null
join Documents.dbo.FieldData fdDocType on fdDocType.DocumentId = Documents.Id
                                      and fdDocType.FieldId = dtfDocType.FieldId
                                      and fdDocType.deletedAt is null
-- Get DistrictId
join Documents.dbo.DocumentTypeFields dtfDistrictId on dtfDistrictId.DocumentTypeId = Documents.DocumentTypeId
                                                   and dtfDistrictId.deletedAt IS null
join Documents.dbo.Fields fDistrictId on fDistrictId.Id = dtfDistrictId.FieldId
                                     and fDistrictId.Name = 'DistrictId'
                                     and fDistrictId.deletedAt is null
left outer join Documents.dbo.FieldData fdDistrictId on fdDistrictId.DocumentId = Documents.Id
                                                    and fdDistrictId.FieldId = dtfDistrictId.FieldId
                                                    and fdDistrictId.deletedAt is null
-- Get Report Year
join Documents.dbo.DocumentTypeFields dtfReportYear on dtfReportYear.DocumentTypeId = Documents.DocumentTypeId
                                                   and dtfReportYear.deletedAt IS null
join Documents.dbo.Fields fReportYear on fReportYear.Id = dtfReportYear.FieldId
                                     and fReportYear.Name = 'Report Year'
                                     and fReportYear.deletedAt is null
left outer join Documents.dbo.FieldData fdReportYear on fdReportYear.DocumentId = Documents.Id
                                                    and fdReportYear.FieldId = dtfReportYear.FieldId
                                                    and fdReportYear.deletedAt is null
-- Get 'Facility Number'
join Documents.dbo.DocumentTypeFields dtfFacilityNumber on dtfFacilityNumber.DocumentTypeId = Documents.DocumentTypeId
                                                       and dtfFacilityNumber.deletedAt IS null
join Documents.dbo.Fields fFacilityNumber on fFacilityNumber.Id = dtfFacilityNumber.FieldId
                                         and fFacilityNumber.Name = 'Facility Number'
                                         and fFacilityNumber.deletedAt is null
left outer join Documents.dbo.FieldData fdFacilityNumber on fdFacilityNumber.DocumentId = Documents.Id
                                                        and fdFacilityNumber.FieldId = dtfFacilityNumber.FieldId
                                                        and fdFacilityNumber.deletedAt is null
-- Get 'Facility Name'
join Documents.dbo.DocumentTypeFields dtfFacilityName on dtfFacilityName.DocumentTypeId = Documents.DocumentTypeId
                                                       and dtfFacilityName.deletedAt IS null
join Documents.dbo.Fields fFacilityName on fFacilityName.Id = dtfFacilityName.FieldId
                                       and fFacilityName.Name = 'Facility Name'
                                       and fFacilityName.deletedAt is null
left outer join Documents.dbo.FieldData fdFacilityName on fdFacilityName.DocumentId = Documents.Id
                                                      and fdFacilityName.FieldId = dtfFacilityName.FieldId
                                                      and fdFacilityName.deletedAt is null
group by DocumentFiles.Id, coalesce(fdDistrictId.FieldValue,''), coalesce(fdFacilityNumber.FieldValue,''), coalesce(fdFacilityName.FieldValue,''), coalesce(fdReportYear.FieldValue,'')
```
