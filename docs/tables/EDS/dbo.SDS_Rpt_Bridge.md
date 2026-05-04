# Table: `dbo.SDS_Rpt_Bridge`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 100

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Working bridge for SDS reports (~100 rows). Per (`SessionId`, `ItemId`) → `SDSDoc` mapping populated mid-run when generating an SDS-by-requisition report so the report can join consistent results without re-running the SDS resolver.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `SDSDoc` | varchar(500) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SDS_Rpt_Bridge` | no | CLUSTERED | `SessionId` |  |
