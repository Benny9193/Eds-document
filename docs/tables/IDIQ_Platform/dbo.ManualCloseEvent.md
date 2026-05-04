# Table: `dbo.ManualCloseEvent`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `closedAt` | datetime2 | NO | `(getdate())` |  |
| 4 | `closedByUserIds` | nvarchar(max) | NO |  |  |
| 5 | `ipAddress` | nvarchar(1000) | YES |  |  |
| 6 | `reason` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ManualCloseEvent_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ManualCloseEvent_solicitationId_key` | YES | NONCLUSTERED | `solicitationId` |  |
