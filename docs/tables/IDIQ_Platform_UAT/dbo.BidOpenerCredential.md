# Table: `dbo.BidOpenerCredential`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `encShareA` | nvarchar(max) | NO |  |  |
| 4 | `encShareB` | nvarchar(max) | NO |  |  |
| 5 | `saltA` | nvarchar(1000) | NO |  |  |
| 6 | `saltB` | nvarchar(1000) | NO |  |  |
| 7 | `officialAId` | nvarchar(1000) | NO |  |  |
| 8 | `officialBId` | nvarchar(1000) | NO |  |  |
| 9 | `setupToken` | nvarchar(max) | YES |  |  |
| 10 | `pendingPinA` | bit | NO | `((0))` |  |
| 11 | `pendingPinB` | bit | NO | `((0))` |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidOpenerCredential_tenantId_key` | YES | NONCLUSTERED | `tenantId` |  |
