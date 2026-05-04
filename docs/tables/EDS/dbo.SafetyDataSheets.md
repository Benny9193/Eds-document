# Table: `dbo.SafetyDataSheets`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 158524

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SafetyDataSheetId` | bigint | NO |  | YES |
| 2 | `SDSURL` | varchar(512) | NO |  |  |
| 3 | `Seq` | bigint | YES |  |  |
| 4 | `Created` | datetime | NO | `(getdate())` |  |
| 5 | `Updated` | datetime | YES |  |  |
| 6 | `Deleted` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_URL_SeqIdDates` | no | NONCLUSTERED | `SDSURL` | `SafetyDataSheetId`, `Seq`, `Created`, `Updated`, `Deleted` |
