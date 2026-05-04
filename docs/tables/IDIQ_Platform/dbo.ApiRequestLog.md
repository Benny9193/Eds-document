# Table: `dbo.ApiRequestLog`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `apiKeyId` | nvarchar(1000) | YES |  |  |
| 3 | `tenantId` | nvarchar(1000) | NO |  |  |
| 4 | `method` | nvarchar(1000) | NO |  |  |
| 5 | `path` | nvarchar(1000) | NO |  |  |
| 6 | `queryParams` | nvarchar(1000) | YES |  |  |
| 7 | `statusCode` | int | NO |  |  |
| 8 | `responseTime` | int | NO |  |  |
| 9 | `ipAddress` | nvarchar(1000) | YES |  |  |
| 10 | `userAgent` | nvarchar(1000) | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ApiRequestLog_apiKeyId_idx` | no | NONCLUSTERED | `apiKeyId` |  |
| `ApiRequestLog_createdAt_idx` | no | NONCLUSTERED | `createdAt` |  |
| `ApiRequestLog_path_idx` | no | NONCLUSTERED | `path` |  |
| `ApiRequestLog_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
