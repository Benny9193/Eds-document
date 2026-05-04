# Table: `dbo.SDSSyncStatus`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26483

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SafetyDataSheetId` | int | NO |  | YES |
| 2 | `TotalItems` | int | YES |  |  |
| 3 | `TotalRequisitions` | int | YES |  |  |
| 4 | `SyncedItems` | int | NO | `((0))` |  |
| 5 | `SyncedRequisitions` | int | NO | `((0))` |  |
| 6 | `SyncStatus` | varchar(50) | NO | `('New')` |  |
| 7 | `CreatedAt` | datetime | NO | `(getdate())` |  |
| 8 | `UpdatedAt` | datetime | YES |  |  |
| 9 | `LastSyncedAt` | datetime | YES |  |  |
| 10 | `ItemSyncStatus` | varchar(50) | YES |  |  |
| 11 | `RequisitionSyncStatus` | varchar(50) | YES |  |  |
| 12 | `StartSyncAt` | datetime | YES |  |  |
| 13 | `EndSyncAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SDSSyncStatus_LastSyncedAt` | no | NONCLUSTERED | `LastSyncedAt` |  |
| `IX_SDSSyncStatus_SyncStatus` | no | NONCLUSTERED | `SyncStatus` |  |
