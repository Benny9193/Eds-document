# Table: `dbo.DocumentVersionForm`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4082

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentVersionId` | uniqueidentifier | NO |  | YES |
| 2 | `FormType` | nvarchar(50) | NO | `('')` |  |
| 3 | `SubmitButtonName` | nvarchar(50) | NO | `('')` |  |
| 4 | `FormFieldsXml` | nvarchar(max) | NO | `('')` |  |
| 5 | `AllowSubmitRevisions` | bit | NO | `((0))` |  |
| 6 | `SubmitButtonVisibility` | nvarchar(50) | NO | `('')` |  |
| 7 | `ExpirationMultiplier` | int | NO | `((0))` |  |
| 8 | `ExpirationInterval` | nvarchar(50) | NO | `('')` |  |
| 9 | `AllowFieldUpdatesFromDocuments` | bit | NO | `((0))` |  |
| 10 | `IsDynamicSubmitOnlyForm` | bit | NO | `((0))` |  |
| 11 | `SubmitLeft` | decimal(7,2) | NO | `((0))` |  |
| 12 | `SubmitTop` | decimal(7,2) | NO | `((0))` |  |
| 13 | `SubmitWidth` | decimal(7,2) | NO | `((0))` |  |
| 14 | `SubmitHeight` | decimal(7,2) | NO | `((0))` |  |
| 15 | `AllowRevisionsByAnnotationsOnly` | bit | NO | `((0))` |  |
| 16 | `MinimumAnnotations` | int | NO | `((0))` |  |
| 17 | `SupportSignatureField` | bit | NO | `((0))` |  |
| 18 | `SignatureCount` | int | NO | `((0))` |  |
| 19 | `AllowSubmissionByEmailRecipients` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentVersionForm_DocumentVersion` | `DocumentVersionId` | [`dbo.DocumentVersion.Id`](dbo.DocumentVersion.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
