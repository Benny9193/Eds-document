# Table: `dbo.PostScanDocumentApprovalProcess`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `PostScanDocumentId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessGroupId` | uniqueidentifier | NO |  |  |
| 4 | `ApprovalProcessGroupMemberId` | uniqueidentifier | NO |  |  |
| 5 | `ModifiedUtc` | datetime | NO | `(getutcdate())` |  |
| 6 | `ApprovalProcessGroupMemberUserId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PostScanDocumentApprovalProcess_ApprovalProcessGroup` | `ApprovalProcessGroupId` | [`dbo.ApprovalProcessGroup.Id`](dbo.ApprovalProcessGroup.md) | NO_ACTION | NO_ACTION |
| `FK_PostScanDocumentApprovalProcess_ApprovalProcessGroupMember` | `ApprovalProcessGroupMemberId` | [`dbo.ApprovalProcessGroupMember.Id`](dbo.ApprovalProcessGroupMember.md) | NO_ACTION | NO_ACTION |
| `FK_PostScanDocumentApprovalProcess_PostScanDocument` | `PostScanDocumentId` | [`dbo.PostScanDocument.Id`](dbo.PostScanDocument.md) | CASCADE | CASCADE |
| `FK_PostScanDocumentApprovalProcess_User` | `ApprovalProcessGroupMemberUserId` | [`dbo.User.Id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PostScanDocumentApprovalProcess_ApprovalProcessGroupId` | no | NONCLUSTERED | `ApprovalProcessGroupId` |  |
| `IX_PostScanDocumentApprovalProcess_ApprovalProcessGroupMemberId` | no | NONCLUSTERED | `ApprovalProcessGroupMemberId` |  |
| `IX_PostScanDocumentApprovalProcess_ApprovalProcessGroupMemberUserId` | no | NONCLUSTERED | `ApprovalProcessGroupMemberUserId` |  |
| `IX_PostScanDocumentApprovalProcess_PostScanDocumentId` | no | NONCLUSTERED | `PostScanDocumentId` |  |
| `IX_PostScanDocumentApprovalProcess_PostScanDocumentId_ApprovalProcessGroupId` | YES | NONCLUSTERED | `PostScanDocumentId`, `ApprovalProcessGroupId` |  |
