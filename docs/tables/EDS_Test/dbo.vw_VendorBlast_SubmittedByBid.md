# View: `dbo.vw_VendorBlast_SubmittedByBid`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `dbo.registrations` | unresolved |
| `dbo.vendorbids` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorBlast_SubmittedByBid] as
select Vendors.VendorId, BidHeaders.BidHeaderId
  from Vendors with (nolock)
  left outer join BidImports with (nolock) on BidImports.VendorId = Vendors.VendorId
  left outer join VendorBids.dbo.registrations reg with (nolock) on reg.vendorid = Vendors.VendorId
  left outer join VendorBids.dbo.vendorbids vb with (nolock) on vb.registrationid = reg.registrationid
  join BidHeaders with (nolock) on BidHeaders.BidHeaderId = coalesce(BidImports.BidHeaderId, vb.calendarId)
 where Vendors.Active = 1
 group by Vendors.VendorId, BidHeaders.BidHeaderId
```
