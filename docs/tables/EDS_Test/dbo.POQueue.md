# Table: `dbo.POQueue`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26735

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POQueueId` | int | NO |  | YES |
| 2 | `UserId` | int | NO |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `SessionId` | int | NO |  |  |
| 5 | `RequestDate` | datetime | NO | `(getdate())` |  |
| 6 | `SendStarted` | datetime | YES |  |  |
| 7 | `SendEnded` | datetime | YES |  |  |
| 8 | `SendAddress` | varchar(512) | YES |  |  |
| 9 | `SendStatus` | varchar(50) | YES |  |  |
| 10 | `EarliestDeliveryDate` | date | YES |  |  |
| 11 | `RequestedDeliveryDate` | date | YES |  |  |
| 12 | `OrderComments` | varchar(4096) | YES |  |  |
| 13 | `ScheduledSendDate` | date | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_QueueRequestDate` | no | NONCLUSTERED | `POQueueId`, `RequestDate` |  |
