# Table: `dbo.PacketTemplate`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `Description` | nvarchar(128) | NO | `('')` |  |
| 4 | `KeyDocTypeFieldId` | uniqueidentifier | NO |  |  |
| 5 | `Enabled` | bit | NO | `((0))` |  |
| 6 | `PrimaryDocTypeId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PacketTemplate_DocType` | `PrimaryDocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | NO_ACTION | NO_ACTION |
| `FK_PacketTemplate_DocTypeField` | `KeyDocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcessStep`](dbo.ApprovalProcessStep.md) | `PacketTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.PacketCompletion`](dbo.PacketCompletion.md) | `PacketTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.PacketTemplateDocType`](dbo.PacketTemplateDocType.md) | `PacketTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.SystemField`](dbo.SystemField.md) | `PacketTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `PacketTemplateId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkflowRulePacketCompletion`](dbo.WorkflowRulePacketCompletion.md) | `PacketTemplateId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowTrigger`](dbo.WorkflowTrigger.md) | `PacketTemplateId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkQueueDocument`](dbo.WorkQueueDocument.md) | `PacketTemplateId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PacketTemplate_KeyDocTypeFieldId` | no | NONCLUSTERED | `KeyDocTypeFieldId` |  |
| `IX_PacketTemplate_PrimaryDocTypeId` | no | NONCLUSTERED | `PrimaryDocTypeId` |  |
