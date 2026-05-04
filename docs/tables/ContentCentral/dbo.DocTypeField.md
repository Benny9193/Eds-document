# Table: `dbo.DocTypeField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 135

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `DataType` | nvarchar(50) | NO | `('Text')` |  |
| 4 | `Format` | nvarchar(50) | NO | `('')` |  |
| 5 | `Length` | int | NO | `((0))` |  |
| 6 | `MultiLineText` | bit | NO | `((0))` |  |
| 7 | `MultiLineTextHeight` | int | NO | `((0))` |  |
| 8 | `MultiLineTextWrap` | bit | NO | `((0))` |  |
| 9 | `UseNumberGroupSeparator` | bit | NO | `((1))` |  |
| 10 | `DecimalLength` | int | NO | `((0))` |  |
| 11 | `ZeroFillDecimal` | bit | NO | `((0))` |  |
| 12 | `AutoCaptureDate` | bit | NO | `((0))` |  |
| 13 | `UseFreeTextSearchInput` | bit | NO | `((1))` |  |
| 14 | `UseEntryList` | bit | NO | `((0))` |  |
| 15 | `AllowNewEntry` | bit | NO | `((0))` |  |
| 16 | `AddNewEntry` | bit | NO | `((0))` |  |
| 17 | `RequiredEntry` | bit | NO | `((0))` |  |
| 18 | `PrintEntry` | bit | NO | `((1))` |  |
| 19 | `TemplateField` | bit | NO | `((0))` |  |
| 20 | `TemplateFieldOrder` | int | NO | `((0))` |  |
| 21 | `DefaultEntryValue` | nvarchar(256) | NO | `('')` |  |
| 22 | `DefaultCurrentDate` | bit | NO | `((0))` |  |
| 23 | `KeepFieldChoicesSorted` | bit | NO | `((1))` |  |
| 24 | `UseCustomMask` | bit | NO | `((0))` |  |
| 25 | `LeftPad` | bit | NO | `((0))` |  |
| 26 | `LeftPadChar` | nvarchar(1) | YES | `(NULL)` |  |
| 27 | `RightPad` | bit | NO | `((0))` |  |
| 28 | `RightPadChar` | nvarchar(1) | YES | `(NULL)` |  |
| 29 | `DocTypeId` | uniqueidentifier | YES |  |  |
| 30 | `GlobalDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 31 | `RequiredEntryDependsOnDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 32 | `RequiredEntryDependsOnValue` | nvarchar(256) | YES | `(NULL)` |  |
| 33 | `CheckForDuplicateValue` | bit | NO | `((0))` |  |
| 34 | `AutoIncrement` | bit | NO | `((0))` |  |
| 35 | `StartValue` | bigint | YES | `((0))` |  |
| 36 | `AllowIncrementOverride` | bit | NO | `((0))` |  |
| 37 | `RequireUniqueValue` | bit | NO | `((0))` |  |
| 38 | `DuplicateValueDependsOnDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 39 | `ExternalDataSource` | uniqueidentifier | YES |  |  |
| 40 | `ExternalDataTable` | nvarchar(256) | YES |  |  |
| 41 | `ExternalDataColumn` | nvarchar(256) | YES |  |  |
| 42 | `DisplayName` | nvarchar(50) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeField_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_DocTypeField_DocTypeField` | `RequiredEntryDependsOnDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_DocTypeField_DocTypeField1` | `GlobalDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_DocTypeField_DocTypeField2` | `DuplicateValueDependsOnDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcessMemberFieldPermission`](dbo.ApprovalProcessMemberFieldPermission.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailFromDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailFromAddressDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailDateTimeDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailBodyDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailFromNameDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailToDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailToAddressDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailToNameDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailCcDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailCcAddressDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailCcNameDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CaptureJob`](dbo.CaptureJob.md) | `EmailSubjectDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.CustomMenuItemSource`](dbo.CustomMenuItemSource.md) | `GlobalDocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeDefaultAdminSearchField`](dbo.DocTypeDefaultAdminSearchField.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeDefaultAdminSearchResultField`](dbo.DocTypeDefaultAdminSearchResultField.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeDefaultUserSearchField`](dbo.DocTypeDefaultUserSearchField.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeDefaultUserSearchResultField`](dbo.DocTypeDefaultUserSearchResultField.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeField`](dbo.DocTypeField.md) | `RequiredEntryDependsOnDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeField`](dbo.DocTypeField.md) | `GlobalDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeField`](dbo.DocTypeField.md) | `DuplicateValueDependsOnDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeFieldCurrentNumericValue`](dbo.DocTypeFieldCurrentNumericValue.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFieldExternalLookupItem`](dbo.DocTypeFieldExternalLookupItem.md) | `DocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeFieldExternalLookupSelectItem`](dbo.DocTypeFieldExternalLookupSelectItem.md) | `DestinationDocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeFieldFieldChoices`](dbo.DocTypeFieldFieldChoices.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFieldRecognitionZone`](dbo.DocTypeFieldRecognitionZone.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFieldRecognitionZoneCondition`](dbo.DocTypeFieldRecognitionZoneCondition.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFieldSpentNumericValue`](dbo.DocTypeFieldSpentNumericValue.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFileBuildItem`](dbo.DocTypeFileBuildItem.md) | `DocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeFolderBuildItem`](dbo.DocTypeFolderBuildItem.md) | `DocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocumentField`](dbo.DocumentField.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.ExportDataElement`](dbo.ExportDataElement.md) | `DocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.PacketTemplate`](dbo.PacketTemplate.md) | `KeyDocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.PostScanDocumentField`](dbo.PostScanDocumentField.md) | `DocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ReportColumn`](dbo.ReportColumn.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportFilterDocTypeField`](dbo.ReportFilterDocTypeField.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.ReportSegment`](dbo.ReportSegment.md) | `DocTypeFieldId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `DocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `DocTypeFieldId2` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `DocTypeFieldId3` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowTrigger`](dbo.WorkflowTrigger.md) | `DocTypeFieldId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeField_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_DocTypeField_DocTypeId_Name` | YES | NONCLUSTERED | `DocTypeId`, `Name` |  |
| `IX_DocTypeField_DuplicateValueDependsOnDocTypeFieldId` | no | NONCLUSTERED | `DuplicateValueDependsOnDocTypeFieldId` |  |
| `IX_DocTypeField_GlobalDocTypeFieldId` | no | NONCLUSTERED | `GlobalDocTypeFieldId` |  |
| `IX_DocTypeField_RequiredEntryDependsOnDocTypeFieldId` | no | NONCLUSTERED | `RequiredEntryDependsOnDocTypeFieldId` |  |
| `SK_VendorBidDocuments` | no | NONCLUSTERED | `Id`, `DocTypeId` | `Name` |
