# View: `dbo.vw_VendorBlast_RegisteredBySchedule`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | YES |  |  |
| 2 | `BidScheduleId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.BidMgrVendorEmailListView` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorBlast_RegisteredBySchedule] as
select VendorId, BidScheduleId
  from VendorBids.dbo.BidMgrVendorEmailListView el with (nolock)
 group by VendorId, BidScheduleId
```
