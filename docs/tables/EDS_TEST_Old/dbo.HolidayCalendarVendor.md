# Table: `dbo.HolidayCalendarVendor`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Year` | int | NO |  | YES |
| 2 | `Month` | int | NO |  | YES |
| 3 | `Holidays` | varchar(100) | YES | `('')` |  |
| 4 | `VendorId` | int | NO | `((0))` | YES |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `HolidayCalendarVendor_Year_Month_index` | no | NONCLUSTERED | `Year`, `Month`, `VendorId` |  |
