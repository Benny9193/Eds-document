# Cross-database outbound references: `NJ_RTK`

_Generated on 2026-05-04T14:51:40.427Z_

**Source database:** `NJ_RTK`

[← back to dependencies index](../README.md)

Routines, views, and triggers in this database that reference objects in another database.
Detected by text-scanning `sys.sql_modules.definition` for three-part names like `[OtherDb].schema.object` or `OtherDb.schema.object`.

## Summary

| Target database | Distinct edges |
|-----------------|----------------|
| `Documents` | 19 |
| `EDS` | 31 |

## → `Documents`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| `dbo.vw_DMSCheck` | View | `dbo.DocumentFiles` | `` | sed |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentFiles df` | `Documents.dbo.DocumentFiles df` | text |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentFiles DocumentFiles on DocumentFiles` | `Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles` | text |
| `dbo.vw_DMSCheck` | View | `dbo.Documents` | `` | sed |
| `dbo.vw_DMSCheck` | View | `dbo.Documents Documents with` | `Documents.dbo.Documents Documents with` | text |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentTypeFields` | `` | sed |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentTypeFields dtfFacilityNumber on dtfFacilityNumber` | `Documents.dbo.DocumentTypeFields dtfFacilityNumber on dtfFacilityNumber` | text |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentTypeFields dtfReportYear on dtfReportYear` | `Documents.dbo.DocumentTypeFields dtfReportYear on dtfReportYear` | text |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentTypeFields dtfStateSurvey on dtfStateSurvey` | `Documents.dbo.DocumentTypeFields dtfStateSurvey on dtfStateSurvey` | text |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentTypes` | `` | sed |
| `dbo.vw_DMSCheck` | View | `dbo.DocumentTypes DocumentTypes on DocumentTypes` | `Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes` | text |
| `dbo.vw_DMSCheck` | View | `dbo.FieldData` | `` | sed |
| `dbo.vw_DMSCheck` | View | `dbo.FieldData fdFacilityNumber on fdFacilityNumber` | `Documents.dbo.FieldData fdFacilityNumber on fdFacilityNumber` | text |
| `dbo.vw_DMSCheck` | View | `dbo.FieldData fdReportYear on fdReportYear` | `Documents.dbo.FieldData fdReportYear on fdReportYear` | text |
| `dbo.vw_DMSCheck` | View | `dbo.FieldData fdStateSurvey on fdStateSurvey` | `Documents.dbo.FieldData fdStateSurvey on fdStateSurvey` | text |
| `dbo.vw_DMSCheck` | View | `dbo.Fields` | `` | sed |
| `dbo.vw_DMSCheck` | View | `dbo.Fields fFacilityNumber on fFacilityNumber` | `Documents.dbo.Fields fFacilityNumber on fFacilityNumber` | text |
| `dbo.vw_DMSCheck` | View | `dbo.Fields fReportYear on fReportYear` | `Documents.dbo.Fields fReportYear on fReportYear` | text |
| `dbo.vw_DMSCheck` | View | `dbo.Fields fStateSurvey on fStateSurvey` | `Documents.dbo.Fields fStateSurvey on fStateSurvey` | text |

## → `EDS`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| [`dbo.sp_refreshFacility`](../../procedures/NJ_RTK/dbo.sp_refreshFacility.md) | Procedure | `dbo.RTK_Sites` | `EDS.dbo.RTK_Sites` | sed, text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Inventories` | `` | sed |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Inventories i where i` | `eds.dbo.RTK_Inventories i where i` | text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Inventories i1 where i1` | `eds.dbo.RTK_Inventories i1 where i1` | text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_ReportItems` | `` | sed |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_ReportItems ri where ri` | `eds.dbo.RTK_ReportItems ri where ri` | text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Sites` | `` | sed |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Sites s` | `eds.dbo.RTK_Sites s` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_ContainerCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_ContainerCodes cc on cc` | `EDS.dbo.RTK_ContainerCodes cc on cc` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_InventoryRangeCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_InventoryRangeCodes irc on irc` | `EDS.dbo.RTK_InventoryRangeCodes irc on irc` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_MixtureCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_MixtureCodes mc on mc` | `EDS.dbo.RTK_MixtureCodes mc on mc` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_UOMCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_UOMCodes uc on uc` | `EDS.dbo.RTK_UOMCodes uc on uc` | text |
| `dbo.vw_RTKChanges` | View | `dbo.Category` | `` | sed |
| `dbo.vw_RTKChanges` | View | `dbo.Category on Category` | `EDS.dbo.Category on Category` | text |
| `dbo.vw_RTKChanges` | View | `dbo.DistrictCategories` | `` | sed |
| `dbo.vw_RTKChanges` | View | `dbo.DistrictCategories dc on dc` | `eds.dbo.DistrictCategories dc on dc` | text |
| `dbo.vw_RTKChanges` | View | `dbo.vw_RTKInfo` | `` | sed |
| `dbo.vw_RTKChanges` | View | `dbo.vw_RTKInfo ri` | `EDS.dbo.vw_RTKInfo ri` | text |
| `dbo.vw_RTKChangesOrig` | View | `dbo.vw_RTKInfo` | `` | sed |
| `dbo.vw_RTKChangesOrig` | View | `dbo.vw_RTKInfo ri` | `EDS.dbo.vw_RTKInfo ri` | text |
| `dbo.vw_RTKChangesOrig` | View | `dbo.vw_rtkinfo ri on ri` | `eds.dbo.vw_rtkinfo ri on ri` | text |
| `dbo.vw_RTKData` | View | `dbo.Category` | `` | sed |
| `dbo.vw_RTKData` | View | `dbo.Category on Category` | `EDS.dbo.Category on Category` | text |
| `dbo.vw_RTKData` | View | `dbo.DistrictCategories` | `` | sed |
| `dbo.vw_RTKData` | View | `dbo.DistrictCategories dc on dc` | `eds.dbo.DistrictCategories dc on dc` | text |
| `dbo.vw_RTKData` | View | `dbo.vw_RTKInfoAnnual` | `` | sed |
| `dbo.vw_RTKData` | View | `dbo.vw_RTKInfoAnnual ri` | `EDS.dbo.vw_RTKInfoAnnual ri` | text |

## Source queries

- `sys.objects` joined to `sys.sql_modules` — full T-SQL definition of every procedure, function, view, and trigger.
- `sys.sql_expression_dependencies` — SQL Server's own resolved cross-DB references (used as a cross-check).
- Text-grep over the definition for `[<db>].` and `<db>.` patterns (after stripping comments).
