# Table: `dbo.TaskOrderAmendment`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `taskOrderId` | nvarchar(1000) | NO |  |  |
| 3 | `amendmentNumber` | int | NO |  |  |
| 4 | `description` | nvarchar(max) | NO |  |  |
| 5 | `valueChange` | decimal(18,2) | NO |  |  |
| 6 | `justification` | nvarchar(max) | NO |  |  |
| 7 | `aiVerificationId` | nvarchar(1000) | YES |  |  |
| 8 | `aiVerificationStatus` | nvarchar(1000) | YES |  |  |
| 9 | `approvedById` | nvarchar(1000) | YES |  |  |
| 10 | `approvedAt` | datetime2 | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `TaskOrderAmendment_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `TaskOrderAmendment_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
