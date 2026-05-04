# Table: `dbo.WorkflowRulePacketCompletion`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `WorkflowRuleId` | uniqueidentifier | NO |  |  |
| 3 | `PacketTemplateId` | uniqueidentifier | NO |  |  |
| 4 | `PacketTemplateKeyFieldValue` | nvarchar(256) | NO |  |  |
| 5 | `ModifiedUtc` | datetime | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WorkflowRulePacketCompletion_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | CASCADE | CASCADE |
| `FK_WorkflowRulePacketCompletion_WorkflowRule` | `WorkflowRuleId` | [`dbo.WorkflowRule.Id`](dbo.WorkflowRule.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorkflowRulePacketCompletion_PacketTemplateId` | no | NONCLUSTERED | `PacketTemplateId` |  |
| `IX_WorkflowRulePacketCompletion_WorkflowRuleId` | no | NONCLUSTERED | `WorkflowRuleId` |  |
| `IX_WorkflowRulePacketCompletion_WorkflowRuleId_PacketTemplateId_PacketTemplateKeyFieldValue` | YES | NONCLUSTERED | `WorkflowRuleId`, `PacketTemplateId`, `PacketTemplateKeyFieldValue` |  |
