# Table: `dbo.SystemField`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | YES |  |  |
| 3 | `FieldType` | nvarchar(50) | NO | `('')` |  |
| 4 | `AllowUserAccess` | bit | NO | `((0))` |  |
| 5 | `AllowSearch` | bit | NO | `((0))` |  |
| 6 | `ApprovalProcessId` | uniqueidentifier | YES |  |  |
| 7 | `FieldOrder` | int | NO | `((0))` |  |
| 8 | `PacketTemplateId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_SystemField_ApprovalProcess` | `ApprovalProcessId` | [`dbo.ApprovalProcess.Id`](dbo.ApprovalProcess.md) | CASCADE | CASCADE |
| `FK_SystemField_PacketTemplate` | `PacketTemplateId` | [`dbo.PacketTemplate.Id`](dbo.PacketTemplate.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SystemField_ApprovalProcessId` | no | NONCLUSTERED | `ApprovalProcessId` |  |
