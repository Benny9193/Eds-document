# Table: `dbo.AuditTrail`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 59782

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `userId` | nvarchar(1000) | YES |  |  |
| 4 | `userName` | nvarchar(1000) | YES |  |  |
| 5 | `action` | nvarchar(1000) | NO |  |  |
| 6 | `entityType` | nvarchar(1000) | NO |  |  |
| 7 | `entityId` | nvarchar(1000) | YES |  |  |
| 8 | `entityLabel` | nvarchar(1000) | YES |  |  |
| 9 | `changes` | nvarchar(max) | YES |  |  |
| 10 | `metadata` | nvarchar(max) | YES |  |  |
| 11 | `ipAddress` | nvarchar(1000) | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AuditTrail_entityType_action_idx` | no | NONCLUSTERED | `entityType`, `action` |  |
| `AuditTrail_tenantId_createdAt_idx` | no | NONCLUSTERED | `tenantId`, `createdAt` |  |
| `AuditTrail_tenantId_entityType_entityId_idx` | no | NONCLUSTERED | `tenantId`, `entityType`, `entityId` |  |
| `AuditTrail_tenantId_userId_idx` | no | NONCLUSTERED | `tenantId`, `userId` |  |
