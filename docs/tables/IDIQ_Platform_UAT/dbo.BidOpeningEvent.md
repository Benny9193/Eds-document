# Table: `dbo.BidOpeningEvent`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `openedAt` | datetime2 | NO |  |  |
| 4 | `authorizers` | nvarchar(max) | NO |  |  |
| 5 | `witnessCount` | int | NO |  |  |
| 6 | `totalBidsOpened` | int | NO |  |  |
| 7 | `openingHash` | nvarchar(1000) | NO |  |  |
| 8 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidOpeningEvent_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidOpeningEvent_solicitationId_key` | YES | NONCLUSTERED | `solicitationId` |  |
