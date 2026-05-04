# View: `dbo.VendorBidLookup`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| `dbo.bidcalendar` | unresolved |
| `dbo.registrations` | unresolved |
| `dbo.vendorBids` | unresolved |
| [`VendorBids.dbo.bidcalendar`](../VendorBids/dbo.bidcalendar.md) | cross-database |
| [`VendorBids.dbo.registrations`](../VendorBids/dbo.registrations.md) | cross-database |
| [`VendorBids.dbo.vendorBids`](../VendorBids/dbo.vendorBids.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[VendorBidLookup] as
select cast(vendorbids.vendorbidid as varchar(50)) as vendorbidid, vendorbids.calendarid, registrations.code, registrations.name, bidcalendar.priceplan, bidcalendar.categoryname, bidcalendar.state
  from VendorBids.dbo.registrations registrations with (nolock)
  left outer join VendorBids.dbo.vendorBids vendorBids on vendorbids.registrationid = registrations.registrationid
  left outer join VendorBids.dbo.bidcalendar bidcalendar on bidcalendar.calendarid = vendorbids.calendarid
 where registrations.active = 1
```
