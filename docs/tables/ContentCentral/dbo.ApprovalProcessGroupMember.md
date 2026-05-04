# Table: `dbo.ApprovalProcessGroupMember`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ApprovalProcessGroupId` | uniqueidentifier | NO |  |  |
| 3 | `ApprovalProcessId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessGroupMember_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | NO_ACTION | NO_ACTION |
| `FK_ApprovalProcessGroupMember_ApprovalProcessGroup` | `ApprovalProcessGroupId` | [`dbo.ApprovalProcessGroup.Id`](dbo.ApprovalProcessGroup.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocumentApprovalProcess`](dbo.DocumentApprovalProcess.md) | `ApprovalProcessGroupMemberId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.PostScanDocumentApprovalProcess`](dbo.PostScanDocumentApprovalProcess.md) | `ApprovalProcessGroupMemberId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessGroupMember_ApprovalProcessGroupId` | no | NONCLUSTERED | `ApprovalProcessGroupId` |  |
| `IX_ApprovalProcessGroupMember_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
