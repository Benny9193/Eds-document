# Table: `dbo.BidAuditLog`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 27

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `bidId` | nvarchar(1000) | NO |  |  |
| 4 | `action` | nvarchar(1000) | NO |  |  |
| 5 | `actorId` | nvarchar(1000) | YES |  |  |
| 6 | `actorRole` | nvarchar(1000) | YES |  |  |
| 7 | `ipAddress` | nvarchar(1000) | YES |  |  |
| 8 | `metadata` | nvarchar(max) | YES |  |  |
| 9 | `prevHash` | nvarchar(1000) | YES |  |  |
| 10 | `entryHash` | nvarchar(1000) | NO |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidAuditLog_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidAuditLog_bidId_createdAt_idx` | no | NONCLUSTERED | `bidId`, `createdAt` |  |
