# View: `dbo.vw_DMSCheck`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FacilityNumber` | varchar(max) | YES |  |  |
| 2 | `ReportYear` | varchar(max) | YES |  |  |
| 3 | `DocId` | uniqueidentifier | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.DocumentFiles` | unresolved |
| `dbo.Documents` | unresolved |
| `dbo.DocumentTypeFields` | unresolved |
| `dbo.DocumentTypes` | unresolved |
| `dbo.FieldData` | unresolved |
| `dbo.Fields` | unresolved |
| [`Documents.dbo.DocumentFiles`](../Documents/dbo.DocumentFiles.md) | cross-database |
| [`Documents.dbo.Documents`](../Documents/dbo.Documents.md) | cross-database |
| [`Documents.dbo.DocumentTypeFields`](../Documents/dbo.DocumentTypeFields.md) | cross-database |
| [`Documents.dbo.DocumentTypes`](../Documents/dbo.DocumentTypes.md) | cross-database |
| [`Documents.dbo.FieldData`](../Documents/dbo.FieldData.md) | cross-database |
| [`Documents.dbo.Fields`](../Documents/dbo.Fields.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_DMSCheck] as
SELECT	coalesce(fdFacilityNumber.FieldValue,'') as FacilityNumber,
		coalesce(fdReportYear.FieldValue,'') as ReportYear,
        DocumentFiles.Id DocId
FROM	Documents.dbo.Documents Documents with (nolock)
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
-- Get Document Types of 'RTK Annual Reports'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'RTK Annual Reports'
                                              and DocumentTypes.deletedAt is null
-- Get State Survey
join Documents.dbo.DocumentTypeFields dtfStateSurvey on dtfStateSurvey.DocumentTypeId = Documents.DocumentTypeId
                                                    and dtfStateSurvey.deletedAt IS null
join Documents.dbo.Fields fStateSurvey on fStateSurvey.Id = dtfStateSurvey.FieldId
                                      and fStateSurvey.Name = 'RTK Document Type'
                                      and fStateSurvey.deletedAt is null
left outer join Documents.dbo.FieldData fdStateSurvey on fdStateSurvey.DocumentId = Documents.Id
                                                     and fdStateSurvey.FieldId = dtfStateSurvey.FieldId
                                                     and fdStateSurvey.deletedAt is null
                                                     and fdStateSurvey.FieldValue = 'State Survey'
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
group by DocumentFiles.Id, coalesce(fdFacilityNumber.FieldValue,''), coalesce(fdReportYear.FieldValue,'')
```
