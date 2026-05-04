# View: `dbo.vw_Vendor0528Items`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemCode` | varchar(50) | YES |  |  |
| 2 | `VendorItemCode` | varchar(50) | NO |  |  |
| 3 | `description` | varchar(1024) | YES |  |  |
| 4 | `Code` | varchar(20) | YES |  |  |
| 5 | `atReq` | int | YES |  |  |
| 6 | `atPO` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Items` | USER_TABLE |
| `Units` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_RefList` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_Vendor0528Items] as
select rl.ItemCode, rl.VendorItemCode, rl.description, Units.Code, SUM(case isnull(RL.POId,0) when 0 then rl.Quantity else 0 end) atReq, SUM(case isnull(rl.POId,0) when 0 then 0 else rl.quantity end) atPO
  from vw_RefList rl
  join Vendors on Vendors.VendorId = rl.VendorId
              and Vendors.Code = '0528'
  join Items on Items.ItemId = rl.ItemId
  join Units on Units.UnitId = Items.UnitId
 group by rl.ItemCode, rl.VendorItemCode, rl.description, Units.Code, Items.SortSeq
 --order by Items.SortSeq
```
