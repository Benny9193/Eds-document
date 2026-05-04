# Table: `dbo.Batches`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14507

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Batch-import job header (~14.5K rows). Parent of `BatchBook` rows — captures `BatchDate`, `Type`, `SourceId`, lifecycle timestamps (`Scheduled`, `Started`, `Loaded`, `Imported`, `Converted`, `Completed`), input / imported record counts, total `Amount`, and `ErrorCount`. One row per file ingestion attempt.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BatchId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BatchDate` | datetime | YES |  |  |
| 4 | `Imported` | datetime | YES |  |  |
| 5 | `Converted` | datetime | YES |  |  |
| 6 | `Records` | int | YES |  |  |
| 7 | `ErrorCount` | int | YES |  |  |
| 8 | `Amount` | money | YES |  |  |
| 9 | `Type` | char(1) | YES |  |  |
| 10 | `InputRecords` | int | YES |  |  |
| 11 | `ImportedRecords` | int | YES |  |  |
| 12 | `SourceId` | int | YES |  |  |
| 13 | `Scheduled` | datetime | YES |  |  |
| 14 | `Completed` | datetime | YES |  |  |
| 15 | `Description` | varchar(255) | YES |  |  |
| 16 | `Started` | datetime | YES |  |  |
| 17 | `Loaded` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Loaded` | no | NONCLUSTERED | `Loaded` |  |
