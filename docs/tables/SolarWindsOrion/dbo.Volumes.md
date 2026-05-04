# Table: `dbo.Volumes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 751

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO | `((0))` | YES |
| 2 | `VolumeID` | int | NO |  | YES |
| 3 | `LastSync` | datetime | YES |  |  |
| 4 | `VolumeIndex` | int | YES | `((0))` |  |
| 5 | `Caption` | nvarchar(75) | YES |  |  |
| 6 | `PollInterval` | int | YES | `((0))` |  |
| 7 | `StatCollection` | int | YES | `((0))` |  |
| 8 | `RediscoveryInterval` | int | YES |  |  |
| 9 | `VolumeDescription` | nvarchar(512) | YES |  |  |
| 10 | `VolumeTypeID` | int | YES |  |  |
| 11 | `VolumeType` | nvarchar(40) | YES |  |  |
| 12 | `VolumeTypeIcon` | varchar(20) | YES |  |  |
| 13 | `VolumePercentUsed` | real | YES | `((0))` |  |
| 14 | `VolumeSpaceUsed` | float | YES | `((0))` |  |
| 15 | `VolumeSpaceAvailable` | float | YES |  |  |
| 16 | `VolumeSize` | float | YES | `((0))` |  |
| 17 | `Status` | int | YES |  |  |
| 18 | `StatusLED` | varchar(20) | YES |  |  |
| 19 | `VolumeResponding` | char(1) | NO | `((0))` |  |
| 20 | `VolumeAllocationFailuresThisHour` | int | YES | `((0))` |  |
| 21 | `VolumeAllocationFailuresToday` | int | YES | `((0))` |  |
| 22 | `NextPoll` | datetime | YES |  |  |
| 23 | `NextRediscovery` | datetime | YES |  |  |
| 24 | `FullName` | nvarchar(255) | YES |  |  |
| 25 | `DiskQueueLength` | float | YES |  |  |
| 26 | `DiskTransfer` | float | YES |  |  |
| 27 | `DiskReads` | float | YES |  |  |
| 28 | `DiskWrites` | float | YES |  |  |
| 29 | `TotalDiskIOPS` | float | YES |  |  |
| 30 | `DeviceId` | nvarchar(512) | YES |  |  |
| 31 | `DiskSerialNumber` | nvarchar(255) | YES |  |  |
| 32 | `InterfaceType` | nvarchar(20) | YES |  |  |
| 33 | `SCSITargetId` | int | YES |  |  |
| 34 | `SCSILunId` | int | YES |  |  |
| 35 | `SCSIPortId` | int | YES |  |  |
| 36 | `SCSIControllerId` | nvarchar(255) | YES |  |  |
| 37 | `SCSIPortOffset` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VolumeID` | no | NONCLUSTERED | `VolumeID` |  |
| `IX_Volumes_Caption` | no | NONCLUSTERED | `NodeID`, `Caption` |  |
| `IX_Volumes_VolumeDescription` | no | NONCLUSTERED | `NodeID`, `VolumeDescription` |  |
