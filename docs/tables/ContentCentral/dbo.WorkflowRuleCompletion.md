# Table: `dbo.WorkflowRuleCompletion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowRuleId` | uniqueidentifier | NO |  |  |
| 3 | `DocumentId` | uniqueidentifier | YES |  |  |
| 4 | `PostScanDocumentId` | uniqueidentifier | YES |  |  |
| 5 | `ModifiedUtc` | datetime | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowRuleCompletion_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_WorkflowRuleCompletion_PostScanDocument` | `PostScanDocumentId` | [`dbo.PostScanDocument.Id`](dbo.PostScanDocument.md) | CASCADE | CASCADE |
| `FK_WorkflowRuleCompletion_WorkflowRule` | `WorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowRuleCompletion_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_WorkflowRuleCompletion_PostScanDocumentId` | no | NONCLUSTERED | `PostScanDocumentId` |  |
| `IX_WorkflowRuleCompletion_WorkflowRuleId` | no | NONCLUSTERED | `WorkflowRuleId` |  |
| `IX_WorkflowRuleCompletion_WorkflowRuleId_DocumentId_PostScanDocumentId` | YES | NONCLUSTERED | `WorkflowRuleId`, `DocumentId`, `PostScanDocumentId` |  |
