# View: `dbo.vw_RptMissingURLsByBidAndVendor`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `bidheaderid` | int | YES |  |  |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `Vendor Code` | varchar(16) | NO |  |  |
| 4 | `Awarded Vendor Name` | varchar(50) | NO |  |  |
| 5 | `AwardedItems` | int | YES |  |  |
| 6 | `MissingURLs` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_AwardedBidResults` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view [dbo].[vw_RptMissingURLsByBidAndVendor] as
select bidheaderid, VendorId, [Vendor Code], [Awarded Vendor Name], 
   count(*) AwardedItems,
   sum( case when isnull([Image Url],'')='' then 1 Else 0 end ) MissingURLs
from vw_AwardedBidResults A
--where BidHeaderId = 11961
--where BidHeaderId IN ( select BidHeaderId from [vw_AwardedVendorsAllCurrentAndFutureBids] where categorytype=1 GROUP BY BidHeaderId)
group by bidheaderid, vendorid, [Vendor Code], [Awarded Vendor Name]
--ORDER BY bidheaderid, [Awarded Vendor Name]
```
