# Table: `dbo.DetailNotifications`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2777000

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailNotificationId` | bigint | NO |  | YES |
| 2 | `DetailId` | bigint | NO |  |  |
| 3 | `NotificationId` | bigint | YES |  |  |
| 4 | `DateCreated` | datetime | NO | `(getdate())` |  |
| 5 | `OrigItemId` | bigint | YES |  |  |
| 6 | `NewItemId` | bigint | YES |  |  |
| 7 | `OrigVendorId` | bigint | YES |  |  |
| 8 | `NewVendorId` | bigint | YES |  |  |
| 9 | `OrigBidPrice` | decimal(11,5) | YES |  |  |
| 10 | `NewBidPrice` | decimal(11,5) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_DetailDate_Etal` | no | NONCLUSTERED | `DetailId`, `DateCreated` | `DetailNotificationId`, `NotificationId`, `OrigItemId`, `NewItemId`, `OrigVendorId`, `NewVendorId`, `OrigBidPrice`, `NewBidPrice` |
| `SKI_DetailDateNewVendorOrigVendor_Id` | no | NONCLUSTERED | `DetailId`, `DateCreated`, `OrigVendorId`, `NewVendorId` | `DetailNotificationId`, `OrigItemId`, `NewItemId`, `OrigBidPrice`, `NewBidPrice` |
| `SKI_Notification_DetailId` | no | NONCLUSTERED | `NotificationId` | `DetailId`, `DetailNotificationId`, `DateCreated`, `OrigItemId`, `NewItemId`, `OrigVendorId`, `NewVendorId`, `OrigBidPrice`, `NewBidPrice` |
