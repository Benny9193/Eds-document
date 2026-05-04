# View: `dbo.bidcalendardistricts`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CalendarId` | int | NO |  |  |
| 2 | `districtname` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendaritems` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[bidcalendardistricts] as
select CalendarId, case districtname when '' then '< Global Items >' else districtname end districtname
  from bidcalendaritems with (nolock)
 group by CalendarId, districtname
union (
select CalendarId, '< All Items >' districtname
  from bidcalendaritems with (nolock)
 group by CalendarId
)
```
