# Table: `dbo.DocTypePermission`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 89

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `GroupId` | uniqueidentifier | YES |  |  |
| 3 | `UserId` | uniqueidentifier | YES |  |  |
| 4 | `AllowDocView` | bit | NO | `((0))` |  |
| 5 | `AllowDocSearch` | bit | NO | `((0))` |  |
| 6 | `AllowDocBrowse` | bit | NO | `((0))` |  |
| 7 | `AllowDocAdd` | bit | NO | `((0))` |  |
| 8 | `AllowDocEdit` | bit | NO | `((0))` |  |
| 9 | `AllowDocMetaEdit` | bit | NO | `((0))` |  |
| 10 | `AllowDocDelete` | bit | NO | `((0))` |  |
| 11 | `AllowApprovalProcessAssign` | bit | NO | `((0))` |  |
| 12 | `AllowWorkQueueAssign` | bit | NO | `((0))` |  |
| 13 | `AllowRetentionOverride` | bit | NO | `((0))` |  |
| 14 | `AllowDocTypeAdmin` | bit | NO | `((0))` |  |
| 15 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 16 | `AllowApprovalProcessAdmin` | bit | NO | `((0))` |  |
| 17 | `AllowWorkQueueAdmin` | bit | NO | `((0))` |  |
| 18 | `Type` | nvarchar(50) | NO |  |  |
| 19 | `AllowDocShare` | bit | NO | `((0))` |  |
| 20 | `AllowDocViewInApprovalQueue` | bit | YES | `((0))` |  |
| 21 | `AllowAnnotationWrite` | bit | NO | `((0))` |  |
| 22 | `AllowAnnotationPrint` | bit | NO | `((0))` |  |
| 23 | `AllowDocDownload` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypePermission_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_DocTypePermission_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | CASCADE | CASCADE |
| `FK_DocTypePermission_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypePermission_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_DocTypePermission_DocTypeId_GroupId_UserId` | YES | NONCLUSTERED | `DocTypeId`, `GroupId`, `UserId` |  |
| `IX_DocTypePermission_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_DocTypePermission_UserId` | no | NONCLUSTERED | `UserId` |  |
