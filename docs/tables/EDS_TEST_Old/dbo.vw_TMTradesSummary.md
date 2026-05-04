# View: `dbo.vw_TMTradesSummary`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | NO |  |  |
| 2 | `BidTradeCountyId` | int | NO |  |  |
| 3 | `CountyId` | int | NO |  |  |
| 4 | `AwardType` | varchar(50) | YES |  |  |
| 5 | `VendorName` | varchar(101) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidTradeCounties` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_TMTradeVendorSummary` | SQL_SCALAR_FUNCTION |

## Definition

```sql
create   view  [dbo].[vw_TMTradesSummary] as
select TMAwards.BidHeaderId, BidTradeCounties.BidTradeCountyId, BidTradeCounties.CountyId, TMAwards.AwardType, case when vendors.VendorId in (7691, 7692) then 'N/A' else coalesce(Vendors.Name,'N/A') end + ' ' + TMAwards.AwardType VendorName
  from TMAwards
  join BidTradeCounties on BidTradeCounties.BidTradeCountyId = TMAwards.BidTradeCountyId
  left outer join Vendors on Vendors.VendorId = TMAwards.VendorId
 where TMAwards.Active = 1
-- order by TMAwards.BidHeaderId, BidTradeCounties.CountyId, TMAwards.AwardType
```
