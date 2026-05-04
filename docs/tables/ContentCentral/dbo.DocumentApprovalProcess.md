# Table: `dbo.DocumentApprovalProcess`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessGroupId` | uniqueidentifier | NO |  |  |
| 4 | `ApprovalProcessGroupMemberId` | uniqueidentifier | NO |  |  |
| 5 | `ModifiedUtc` | datetime | NO | `(getutcdate())` |  |
| 6 | `ApprovalProcessGroupMemberUserId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentApprovalProcess_ApprovalProcessGroup` | `ApprovalProcessGroupId` | [`dbo.ApprovalProcessGroup.Id`](dbo.ApprovalProcessGroup.md) | CASCADE | CASCADE |
| `FK_DocumentApprovalProcess_ApprovalProcessGroupMember` | `ApprovalProcessGroupMemberId` | [`dbo.ApprovalProcessGroupMember.Id`](dbo.ApprovalProcessGroupMember.md) | NO_ACTION | NO_ACTION |
| `FK_DocumentApprovalProcess_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_DocumentApprovalProcess_User` | `ApprovalProcessGroupMemberUserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocumentApprovalProcess_ApprovalProcessGroupId` | no | NONCLUSTERED | `ApprovalProcessGroupId` |  |
| `IX_DocumentApprovalProcess_ApprovalProcessGroupMemberId` | no | NONCLUSTERED | `ApprovalProcessGroupMemberId` |  |
| `IX_DocumentApprovalProcess_ApprovalProcessGroupMemberUserId` | no | NONCLUSTERED | `ApprovalProcessGroupMemberUserId` |  |
| `IX_DocumentApprovalProcess_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_DocumentApprovalProcess_DocumentId_ApprovalProcessGroupId` | YES | NONCLUSTERED | `DocumentId`, `ApprovalProcessGroupId` |  |
