# Table: `dbo.AdminPermission`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 39

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `GroupId` | uniqueidentifier | YES |  |  |
| 3 | `UserId` | uniqueidentifier | YES |  |  |
| 4 | `AllowExternalDataSources` | bit | NO | `((0))` |  |
| 5 | `AllowUsers` | bit | NO | `((0))` |  |
| 6 | `AllowGroups` | bit | NO | `((0))` |  |
| 7 | `AllowGlobalFields` | bit | NO | `((0))` |  |
| 8 | `AllowCatalogs` | bit | NO | `((0))` |  |
| 9 | `AllowPacketTemplates` | bit | NO | `((0))` |  |
| 10 | `AllowWorkflow` | bit | NO | `((0))` |  |
| 11 | `AllowMessageTemplates` | bit | NO | `((0))` |  |
| 12 | `AllowCustomMenuItems` | bit | NO | `((0))` |  |
| 13 | `AllowThemes` | bit | NO | `((0))` |  |
| 14 | `AllowEventViewer` | bit | NO | `((0))` |  |
| 15 | `AllowSystemFields` | bit | NO | `((0))` |  |
| 16 | `AllowReportTemplates` | bit | NO | `((0))` |  |
| 17 | `AllowExportDataTemplates` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_AdminPermission_Group` | `GroupId` | [`dbo.Group.Id`](dbo.Group.md) | CASCADE | CASCADE |
| `FK_AdminPermission_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AdminPermission_GroupId` | no | NONCLUSTERED | `GroupId` |  |
| `IX_AdminPermission_GroupId_UserId` | YES | NONCLUSTERED | `GroupId`, `UserId` |  |
| `IX_AdminPermission_UserId` | no | NONCLUSTERED | `UserId` |  |
