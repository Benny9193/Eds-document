# View: `dbo.BidMgrVendorEmailLogCount`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidScheduleId` | int | YES |  |  |
| 2 | `EmailCount` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VendorEmailLog`](dbo.VendorEmailLog.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[BidMgrEmailLogCount]
AS
SELECT     BidScheduleId, COUNT(*) AS EmailCount
FROM         dbo.VendorEmailLog
group by BidScheduleId
```
