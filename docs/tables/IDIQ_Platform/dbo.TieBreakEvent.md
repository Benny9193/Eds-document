# Table: `dbo.TieBreakEvent`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 4 | `countyId` | nvarchar(1000) | YES |  |  |
| 5 | `method` | nvarchar(1000) | NO |  |  |
| 6 | `conductedById` | nvarchar(1000) | NO |  |  |
| 7 | `conductedAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `location` | nvarchar(500) | YES |  |  |
| 9 | `witnesses` | nvarchar(max) | YES |  |  |
| 10 | `notes` | nvarchar(max) | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `TieBreakEvent_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.TieBreakParticipant`](dbo.TieBreakParticipant.md) | `eventId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `TieBreakEvent_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `TieBreakEvent_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
