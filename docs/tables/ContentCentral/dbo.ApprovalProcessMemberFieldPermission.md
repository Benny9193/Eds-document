# Table: `dbo.ApprovalProcessMemberFieldPermission`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ApprovalProcessMemberId` | uniqueidentifier | NO |  |  |
| 3 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |
| 4 | `AllowEdit` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ApprovalProcessMemberFieldPermission_ApprovalProcessMember` | `ApprovalProcessMemberId` | [`dbo.ApprovalProcessMember.Id`](dbo.ApprovalProcessMember.md) | CASCADE | CASCADE |
| `FK_ApprovalProcessMemberFieldPermission_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ApprovalProcessMemberFieldPermission_ApprovalProcessMemberId` | no | NONCLUSTERED | `ApprovalProcessMemberId` |  |
| `IX_ApprovalProcessMemberFieldPermission_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
