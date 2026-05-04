# Table: `dbo.TieBreakParticipant`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `eventId` | nvarchar(1000) | NO |  |  |
| 3 | `proposalId` | nvarchar(1000) | NO |  |  |
| 4 | `rank` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `TieBreakParticipant_eventId_fkey` | `eventId` | [`dbo.TieBreakEvent.id`](dbo.TieBreakEvent.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `TieBreakParticipant_eventId_proposalId_key` | YES | NONCLUSTERED | `eventId`, `proposalId` |  |
| `TieBreakParticipant_proposalId_idx` | no | NONCLUSTERED | `proposalId` |  |
