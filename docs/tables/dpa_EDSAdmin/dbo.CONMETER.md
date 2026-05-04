# Table: `dbo.CONMETER`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `REPORT_DATE` | datetime | NO |  |  |
| 2 | `USAGE_DATE` | smalldatetime | NO |  |  |
| 3 | `QUANTITY` | smallint | NO |  |  |
| 4 | `MESSAGE` | varchar(1000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONMETER_USAGE_DATE` | no | NONCLUSTERED | `USAGE_DATE` |  |
