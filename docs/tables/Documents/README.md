# Database: `Documents`

[← back to top](../../../SCHEMA.md)

## Schema: `dbo`

### Tables

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.AccessTypes`](dbo.AccessTypes.md) | 0 |  |
| [`dbo.Audit`](dbo.Audit.md) | 0 |  |
| [`dbo.DocumentFiles`](dbo.DocumentFiles.md) | 602149 |  |
| [`dbo.Documents`](dbo.Documents.md) | 600591 |  |
| [`dbo.DocumentTypeFields`](dbo.DocumentTypeFields.md) | 132 |  |
| [`dbo.DocumentTypeLookupKeys`](dbo.DocumentTypeLookupKeys.md) | 16 |  |
| [`dbo.DocumentTypeLookupResults`](dbo.DocumentTypeLookupResults.md) | 21 |  |
| [`dbo.DocumentTypeLookups`](dbo.DocumentTypeLookups.md) | 11 |  |
| [`dbo.DocumentTypes`](dbo.DocumentTypes.md) | 10 |  |
| [`dbo.DocumentWorkFiles`](dbo.DocumentWorkFiles.md) | 17741 |  |
| [`dbo.droppedDocs`](dbo.droppedDocs.md) | 3195 |  |
| [`dbo.droppedFieldData`](dbo.droppedFieldData.md) | 32374 |  |
| [`dbo.FieldData`](dbo.FieldData.md) | 6412792 |  |
| [`dbo.Fields`](dbo.Fields.md) | 142 |  |
| [`dbo.FileTypes`](dbo.FileTypes.md) | 5 |  |
| [`dbo.GroupMembers`](dbo.GroupMembers.md) | 0 |  |
| [`dbo.Groups`](dbo.Groups.md) | 0 |  |
| [`dbo.ImportTasks`](dbo.ImportTasks.md) | 7 |  |
| [`dbo.Modules`](dbo.Modules.md) | 0 |  |
| [`dbo.RecognitionFields`](dbo.RecognitionFields.md) | 0 |  |
| [`dbo.RecognitionZones`](dbo.RecognitionZones.md) | 0 |  |
| [`dbo.RTK_2010NJHSL`](dbo.RTK_2010NJHSL.md) | 3322 |  |
| [`dbo.savedFieldDataNJBRCAck`](dbo.savedFieldDataNJBRCAck.md) | 1645 |  |
| [`dbo.SecurityToken`](dbo.SecurityToken.md) | 0 |  |
| [`dbo.sysdiagrams`](dbo.sysdiagrams.md) | 1 |  |
| [`dbo.Users`](dbo.Users.md) | 0 |  |
| [`dbo.Vendor Bid Document Names`](dbo.Vendor_Bid_Document_Names.md) | 75 |  |
| [`dbo.ViewFields`](dbo.ViewFields.md) | 62 |  |
| [`dbo.Views`](dbo.Views.md) | 9 |  |
| [`dbo.ViewSelectors`](dbo.ViewSelectors.md) | 9 |  |
| [`dbo.workFields`](dbo.workFields.md) | 36 |  |
| [`dbo.WorkflowActions`](dbo.WorkflowActions.md) | 0 |  |
| [`dbo.Workflows`](dbo.Workflows.md) | 0 |  |
| [`dbo.WorkflowSteps`](dbo.WorkflowSteps.md) | 0 |  |
| [`dbo.WorkflowTriggers`](dbo.WorkflowTriggers.md) | 0 |  |
| [`dbo.ZonalActions`](dbo.ZonalActions.md) | 0 |  |
| [`dbo.ZonalAreas`](dbo.ZonalAreas.md) | 10 |  |
| [`dbo.ZonalEvents`](dbo.ZonalEvents.md) | 84 |  |
| [`dbo.Zonals`](dbo.Zonals.md) | 4 |  |

### Views

| View | Description |
|------|-------------|
| [`dbo.vw_AvailableFields`](dbo.vw_AvailableFields.md) |  |
| [`dbo.vw_Documents`](dbo.vw_Documents.md) |  |
| [`dbo.vw_DocumentTypeFields`](dbo.vw_DocumentTypeFields.md) |  |
| [`dbo.vw_DocumentTypeFieldWithDatas`](dbo.vw_DocumentTypeFieldWithDatas.md) |  |
| [`dbo.vw_DocumentTypeLookupKeys`](dbo.vw_DocumentTypeLookupKeys.md) |  |
| [`dbo.vw_DocumentTypeLookupResults`](dbo.vw_DocumentTypeLookupResults.md) |  |
| [`dbo.vw_DocumentTypes`](dbo.vw_DocumentTypes.md) |  |
| [`dbo.vw_FieldDataEmpty`](dbo.vw_FieldDataEmpty.md) |  |
| [`dbo.vw_FieldDatas`](dbo.vw_FieldDatas.md) |  |
| [`dbo.vw_FieldDatasOrig`](dbo.vw_FieldDatasOrig.md) |  |
| [`dbo.vw_Fields`](dbo.vw_Fields.md) |  |
| [`dbo.vw_ViewFields`](dbo.vw_ViewFields.md) |  |
| [`dbo.vw_Views`](dbo.vw_Views.md) |  |
| [`dbo.vw_ViewSelectors`](dbo.vw_ViewSelectors.md) |  |
| [`dbo.vw_ZonalItems`](dbo.vw_ZonalItems.md) |  |

## Routines

| Schema | Name | Type | Returns |
|--------|------|------|---------|
| `dbo` | `fn_diagramobjects` | FUNCTION | int |
| `dbo` | `sp_AcceptDocs` | PROCEDURE |  |
| `dbo` | `sp_alterdiagram` | PROCEDURE |  |
| `dbo` | `sp_creatediagram` | PROCEDURE |  |
| `dbo` | `sp_DeleteDocs` | PROCEDURE |  |
| `dbo` | `sp_dropdiagram` | PROCEDURE |  |
| `dbo` | `sp_FieldMerge` | PROCEDURE |  |
| `dbo` | `sp_helpdiagramdefinition` | PROCEDURE |  |
| `dbo` | `sp_helpdiagrams` | PROCEDURE |  |
| `dbo` | `sp_MultiEditCheck` | PROCEDURE |  |
| `dbo` | `sp_renamediagram` | PROCEDURE |  |
| `dbo` | `sp_UpdateDocumentFields` | PROCEDURE |  |
| `dbo` | `sp_upgraddiagrams` | PROCEDURE |  |
| `dbo` | `ufn_LookupSelectFields` | FUNCTION | varchar |
| `dbo` | `ufn_LookupSelectStatement` | FUNCTION | varchar |
| `dbo` | `ufn_LookupWhereFields` | FUNCTION | varchar |
