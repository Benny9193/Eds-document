# View: `dbo.vw_SDSReferencedURLs`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | YES |  |  |
| 2 | `CrossRefId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `SDS_URL` | varchar(300) | YES |  |  |
| 5 | `Manufacturer` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_SDSReferencedURLs as
select Detail.ItemId, Detail.CrossRefId, Detail.VendorId, coalesce(bi.SDS_URL,xr.SDS_URL) SDS_URL, coalesce(bi.Manufacturer, xr.Manufacturer) Manufacturer
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  outer apply (select case 
                        when trim(BidResults.SDS_URL) = '' then null 
						else trim(BidResults.SDS_URL) 
					  end SDS_URL,
					  case
					    when trim(BidResults.ManufacturerBid) = '' then null
						else trim(BidResults.ManufacturerBid)
					  end Manufacturer
				 from BidItems 
				 join BidResults on BidResults.BidResultsId = BidItems.BidResultsId 
				where BidItems.BidItemId = Detail.BidItemId) bi
  outer apply (select case 
                        when trim(CrossRefs.MSDSRef) = '' then null 
						else trim(CrossRefs.MSDSRef) 
					  end SDS_URL,
					  case
					    when trim(CrossRefs.Manufacturor) = '' then null
						else trim(CrossRefs.Manufacturor)
					  end Manufacturer
				 from CrossRefs 
				where CrossRefs.CrossRefId = Detail.CrossRefId) xr
 where coalesce(bi.SDS_URL,xr.SDS_URL) is not null
 group by Detail.ItemId, Detail.CrossRefId, Detail.VendorId, coalesce(bi.SDS_URL,xr.SDS_URL), coalesce(bi.Manufacturer, xr.Manufacturer)
-- order by Requisitions.CategoryId, Detail.ItemCode, Detail.VendorId, coalesce(bi.SDS_URL,xr.SDS_URL)
```
