# View: `dbo.vw_POHeaderBidImports`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POId` | int | YES |  |  |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `BidType` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Detail` | USER_TABLE |
| `PODetailItems` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.POHeader`](dbo.POHeader.md) | VIEW |
| [`dbo.POHeader_Test`](dbo.POHeader_Test.md) | VIEW |
| [`dbo.POHeaderSummary`](dbo.POHeaderSummary.md) | VIEW |
| [`dbo.POHeaderSummary_04232018`](dbo.POHeaderSummary_04232018.md) | VIEW |
| [`dbo.POHeaderTest`](dbo.POHeaderTest.md) | VIEW |
| `dbo.usp_GetPOs_Test` | SQL_STORED_PROCEDURE |

## Definition

```sql
--select * from District where DistrictId = 53




--select * from vw_POHeaderBidImports where POId = 21841890
--select * from PODetailItems where POId = 21841890

CREATE         view  [dbo].[vw_POHeaderBidImports]
as
select PDI.POId, b.BidImportId BidImportId, b.VendorId, 0 BidType
			from PODetailItems PDI with (nolock)
			join Detail on Detail.DetailId = PDI.DetailId
			join Requisitions r on r.RequisitionId = Detail.RequisitionId
			join BidItems bi on bi.BidItemId = PDI.BidItemId
			join Bids b on b.BidId = bi.BidId
					   and b.VendorId = PDI.VendorId
--					   and b.BidHeaderId = case when coalesce(detail.BidHeaderId,0) = 0 then r.BidHeaderId else Detail.BidHeaderId end
 group by PDI.POId, b.BidImportId, b.VendorId
union
select PDI.POId, Bids.BidImportId BidImportId, Bids.VendorId, 1 BidType
			from PODetailItems PDI with (nolock)
			join Detail on Detail.DetailId = PDI.DetailId
			join Requisitions r on r.RequisitionId = Detail.RequisitionId
			join Awards on Awards.AwardId = pdi.AwardId
			join Bids on Bids.BidId = Awards.BidId
 group by PDI.POId, Bids.BidImportId, Bids.VendorId
/* DCH replaced 03/14/2016
select PDI.POId, case when b.BidId is null then Bids.BidImportId else b.BidImportId end BidImportId, case when b.BidId is null then 1 else 0 end BidType
			from PODetailItems PDI with (nolock)
			join Detail on Detail.DetailId = PDI.DetailId
			join Requisitions r on r.RequisitionId = Detail.RequisitionId
			join Bids on Bids.VendorId = PDI.VendorId
					 and Bids.BidHeaderId = r.BidHeaderId
					 and Bids.Active = 1
			left outer join BidItems bi on bi.BidItemId = PDI.BidItemId
			left outer join Bids b on b.BidId = bi.BidId
								  and b.VendorId = PDI.VendorId
 group by PDI.POId, case when b.BidId is null then Bids.BidImportId else b.BidImportId end, case when b.BidId is null then 1 else 0 end
*/
```
