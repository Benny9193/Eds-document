# Table: `dbo.DocTypeCaptureForm`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 3 | `Name` | nvarchar(50) | NO | `('')` |  |
| 4 | `Description` | nvarchar(128) | NO | `('')` |  |
| 5 | `FormType` | nvarchar(50) | NO | `('')` |  |
| 6 | `SubmitButtonName` | nvarchar(50) | NO | `('')` |  |
| 7 | `Enabled` | bit | NO | `((0))` |  |
| 8 | `AllowSubmitRevisions` | bit | NO | `((0))` |  |
| 9 | `SubmitButtonVisibility` | nvarchar(50) | NO | `('')` |  |
| 10 | `ExpirationMultiplier` | int | NO | `((0))` |  |
| 11 | `ExpirationInterval` | nvarchar(50) | NO | `('')` |  |
| 12 | `AllowFieldUpdatesFromDocuments` | bit | NO | `((0))` |  |
| 13 | `IsDynamicSubmitOnlyForm` | bit | NO | `((0))` |  |
| 14 | `SubmitLeft` | decimal(7,2) | NO | `((0))` |  |
| 15 | `SubmitTop` | decimal(7,2) | NO | `((0))` |  |
| 16 | `SubmitWidth` | decimal(7,2) | NO | `((0))` |  |
| 17 | `SubmitHeight` | decimal(7,2) | NO | `((0))` |  |
| 18 | `AllowRevisionsByAnnotationsOnly` | bit | NO | `((0))` |  |
| 19 | `MinimumAnnotations` | int | NO | `((0))` |  |
| 20 | `DisableDelete` | bit | NO | `((0))` |  |
| 21 | `SupportSignatureField` | bit | NO | `((0))` |  |
| 22 | `IgnoreSignatureFieldOnCreate` | bit | NO | `((0))` |  |
| 23 | `AllowSubmissionByEmailRecipients` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeCaptureForm_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CaptureFormSession`](dbo.CaptureFormSession.md) | `DocTypeCaptureFormId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeCaptureFormData`](dbo.DocTypeCaptureFormData.md) | `DocTypeCaptureFormId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeCaptureForm_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_DocTypeCaptureForm_DocTypeId_Name` | YES | NONCLUSTERED | `DocTypeId`, `Name` |  |
