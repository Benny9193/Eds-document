# Table: `dbo.MSRPOptions`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MSRPOptionId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `MSRPOptionName` | varchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_Name_OptionId` | no | NONCLUSTERED | `MSRPOptionName` | `MSRPOptionId`, `Active` |
