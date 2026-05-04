# Table: `dbo.SDS_Rpt_Bridge`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 99

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

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
