# Table: `dbo.ApprovalProcessStep`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3509

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessId` | uniqueidentifier | NO |  |  |
| 4 | `ApprovalProcessMemberId` | uniqueidentifier | NO |  |  |
| 5 | `Note` | nvarchar(256) | YES |  |  |
| 6 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 7 | `Priority` | int | NO | `((5))` |  |
| 8 | `UserId` | uniqueidentifier | YES |  |  |
| 9 | `PacketTemplateId` | uniqueidentifier | YES |  |  |
| 10 | `PacketTemplateKeyFieldValue` | nvarchar(256) | YES |  |  |
| 11 | `AssigningUserId` | uniqueidentifier | YES |  |  |
| 12 | `AssigningUserName` | nvarchar(50) | YES |  |  |
| 13 | `ActingUserName` | nvarchar(60) | YES |  |  |
| 14 | `Direction` | nvarchar(50) | NO | `('')` |  |
| 15 | `CurrentNote` | nvarchar(256) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessStep_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessStep_ApprovalProcessMember` | `ApprovalProcessMemberId` | [`dbo.ApprovalProcessMember.Id`](dbo.ApprovalProcessMember.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessStep_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessStep_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessStep_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprovalProcessStepCompletion`](dbo.ApprovalProcessStepCompletion.md) | `ApprovalProcessStepId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessStep_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
| `IX_ApprovalProcessStep_ApprovalProcessMemberId` | no | NONCLUSTERED | `ApprovalProcessMemberId` |  |
| `IX_ApprovalProcessStep_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_ApprovalProcessStep_PacketTemplateId` | no | NONCLUSTERED | `PacketTemplateId` |  |
| `IX_ApprovalProcessStep_UserId` | no | NONCLUSTERED | `UserId` |  |
