# Table: `dbo.CaptureJob`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 25

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `InputSource` | nvarchar(50) | NO | `('')` |  |
| 4 | `DescriptorType` | nvarchar(50) | NO | `('')` |  |
| 5 | `ProcessingType` | nvarchar(50) | YES |  |  |
| 6 | `Folder` | nvarchar(260) | YES |  |  |
| 7 | `LastImportTimeUtc` | datetime | YES |  |  |
| 8 | `Description` | nvarchar(128) | NO | `('')` |  |
| 9 | `NoDescriptorSkipCodingQueue` | bit | NO | `((0))` |  |
| 10 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 11 | `Enabled` | bit | NO | `((0))` |  |
| 12 | `EmailServerHostName` | nvarchar(50) | NO | `('')` |  |
| 13 | `EmailServerUsername` | nvarchar(50) | NO | `('')` |  |
| 14 | `EmailServerPassword` | nvarchar(256) | NO | `('')` |  |
| 15 | `EmailServerPort` | int | NO | `((0))` |  |
| 16 | `EmailServerPop3UseSpa` | bit | NO | `((0))` |  |
| 17 | `EmailServerEncryption` | nvarchar(50) | NO | `('')` |  |
| 18 | `EmailFromDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 19 | `EmailFromAddressDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 20 | `EmailFromNameDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 21 | `EmailToDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 22 | `EmailToAddressDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 23 | `EmailToNameDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 24 | `EmailCcDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 25 | `EmailCcAddressDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 26 | `EmailCcNameDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 27 | `EmailSubjectDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 28 | `EmailDateTimeDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 29 | `EmailBodyDocTypeFieldId` | uniqueidentifier | YES |  |  |
| 30 | `EmailBodyPreferredFormat` | nvarchar(50) | NO | `('')` |  |
| 31 | `EmailCaptureMessage` | bit | NO | `((0))` |  |
| 32 | `Priority` | int | YES |  |  |
| 33 | `DisableXmlOdbcLookup` | bit | YES |  |  |
| 34 | `DisableXmlWorkflowProcessing` | bit | YES |  |  |
| 35 | `ProcessSubFolders` | bit | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CaptureJob_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_CaptureJob_DocTypeField` | `EmailFromDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField1` | `EmailFromAddressDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField10` | `EmailDateTimeDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField11` | `EmailBodyDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField2` | `EmailFromNameDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField3` | `EmailToDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField4` | `EmailToAddressDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField5` | `EmailToNameDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField6` | `EmailCcDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField7` | `EmailCcAddressDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField8` | `EmailCcNameDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |
| `FK_CaptureJob_DocTypeField9` | `EmailSubjectDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CaptureJobInputItem`](dbo.CaptureJobInputItem.md) | `CaptureJobId` | `Id` | CASCADE | CASCADE |
| [`dbo.CaptureJobSinglePageImageItem`](dbo.CaptureJobSinglePageImageItem.md) | `CaptureJobId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CaptureJob_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_CaptureJob_EmailBodyDocTypeFieldId` | no | NONCLUSTERED | `EmailBodyDocTypeFieldId` |  |
| `IX_CaptureJob_EmailCcAddressDocTypeFieldId` | no | NONCLUSTERED | `EmailCcAddressDocTypeFieldId` |  |
| `IX_CaptureJob_EmailCcDocTypeFieldId` | no | NONCLUSTERED | `EmailCcDocTypeFieldId` |  |
| `IX_CaptureJob_EmailCcNameDocTypeFieldId` | no | NONCLUSTERED | `EmailCcNameDocTypeFieldId` |  |
| `IX_CaptureJob_EmailDateTimeDocTypeFieldId` | no | NONCLUSTERED | `EmailDateTimeDocTypeFieldId` |  |
| `IX_CaptureJob_EmailFromAddressDocTypeFieldId` | no | NONCLUSTERED | `EmailFromAddressDocTypeFieldId` |  |
| `IX_CaptureJob_EmailFromDocTypeFieldId` | no | NONCLUSTERED | `EmailFromDocTypeFieldId` |  |
| `IX_CaptureJob_EmailFromNameDocTypeFieldId` | no | NONCLUSTERED | `EmailFromNameDocTypeFieldId` |  |
| `IX_CaptureJob_EmailSubjectDocTypeFieldId` | no | NONCLUSTERED | `EmailSubjectDocTypeFieldId` |  |
| `IX_CaptureJob_EmailToAddressDocTypeFieldId` | no | NONCLUSTERED | `EmailToAddressDocTypeFieldId` |  |
| `IX_CaptureJob_EmailToDocTypeFieldId` | no | NONCLUSTERED | `EmailToDocTypeFieldId` |  |
| `IX_CaptureJob_EmailToNameDocTypeFieldId` | no | NONCLUSTERED | `EmailToNameDocTypeFieldId` |  |
