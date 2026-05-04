# Table: `dbo.POQueueItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 400653

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POQueueItemId` | int | NO |  | YES |
| 2 | `POQueueId` | int | NO |  |  |
| 3 | `POId` | int | NO |  |  |
| 4 | `SendStarted` | datetime | YES |  |  |
| 5 | `SendEnded` | datetime | YES |  |  |
| 6 | `SendStatus` | varchar(255) | YES |  |  |
| 7 | `PayloadId` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_POIdPOQueue_Started` | no | NONCLUSTERED | `POId`, `POQueueId` | `SendStarted` |
| `SKI_Queue_Id` | no | NONCLUSTERED | `POQueueId` | `POQueueItemId` |
