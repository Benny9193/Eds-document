# Table: `dbo.ScanJobs`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ScanJobId` | int | NO |  | YES |
| 2 | `CaptureName` | varchar(50) | NO |  |  |
| 3 | `CabinetName` | varchar(50) | NO |  |  |
| 4 | `SourceFolder` | varchar(512) | NO |  |  |
| 5 | `SplitFolder` | varchar(512) | NO |  |  |
| 6 | `ProcessedFolder` | varchar(512) | YES |  |  |
| 7 | `RejectedFolder` | varchar(512) | YES |  |  |
| 8 | `CCCaptureJobId` | uniqueidentifier | YES |  |  |
| 9 | `CatalogName` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
