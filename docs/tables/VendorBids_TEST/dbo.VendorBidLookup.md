# View: `dbo.VendorBidLookup`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vendorbidid` | varchar(50) | YES |  |  |
| 2 | `calendarid` | int | YES |  |  |
| 3 | `code` | varchar(16) | YES |  |  |
| 4 | `name` | varchar(50) | YES |  |  |
| 5 | `priceplan` | varchar(16) | YES |  |  |
| 6 | `categoryname` | varchar(255) | YES |  |  |
| 7 | `state` | char(2) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendar` | USER_TABLE |
| `registrations` | USER_TABLE |
| `vendorBids` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[VendorBidLookup] as
select cast(vendorbids.vendorbidid as varchar(50)) as vendorbidid, vendorbids.calendarid, registrations.code, registrations.name, bidcalendar.priceplan, bidcalendar.categoryname, bidcalendar.state
  from registrations with (nolock)
  left outer join vendorBids on vendorbids.registrationid = registrations.registrationid
  left outer join bidcalendar on bidcalendar.calendarid = vendorbids.calendarid
```
