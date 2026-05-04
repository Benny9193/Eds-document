# Table: `dbo.AuditLog`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AuditLogId` | bigint | NO |  | YES |
| 2 | `Timestamp` | datetime2 | NO | `(sysutcdatetime())` |  |
| 3 | `UserId` | int | YES |  |  |
| 4 | `UserName` | nvarchar(100) | YES |  |  |
| 5 | `UserEmail` | nvarchar(255) | YES |  |  |
| 6 | `DistrictId` | int | YES |  |  |
| 7 | `Action` | nvarchar(20) | NO |  |  |
| 8 | `EntityType` | nvarchar(50) | NO |  |  |
| 9 | `EntityId` | nvarchar(64) | YES |  |  |
| 10 | `BeforeState` | nvarchar(max) | YES |  |  |
| 11 | `AfterState` | nvarchar(max) | YES |  |  |
| 12 | `IpAddress` | nvarchar(45) | YES |  |  |
| 13 | `UserAgent` | nvarchar(500) | YES |  |  |
| 14 | `RequestPath` | nvarchar(500) | YES |  |  |
| 15 | `RequestMethod` | nvarchar(10) | YES |  |  |
| 16 | `Description` | nvarchar(500) | YES |  |  |
| 17 | `Success` | bit | NO | `((1))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AuditLog_Action_Timestamp` | no | NONCLUSTERED | `Action`, `Timestamp` |  |
| `IX_AuditLog_DistrictId` | no | NONCLUSTERED | `DistrictId`, `Timestamp` |  |
| `IX_AuditLog_Entity` | no | NONCLUSTERED | `EntityType`, `EntityId` |  |
| `IX_AuditLog_Timestamp` | no | NONCLUSTERED | `Timestamp` |  |
| `IX_AuditLog_UserId` | no | NONCLUSTERED | `UserId`, `Timestamp` |  |
