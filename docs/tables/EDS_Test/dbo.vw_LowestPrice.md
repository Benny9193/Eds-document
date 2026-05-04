# View: `dbo.vw_LowestPrice`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidRequestItemId` | int | NO |  |  |
| 3 | `BidResultsId` | int | NO |  |  |
| 4 | `BidPrice` | decimal(34,13) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidAnalysisVendorSummary`](dbo.vw_BidAnalysisVendorSummary.md) | VIEW |
| [`dbo.vw_BidAnalysisVendorSummaryByDistrict`](dbo.vw_BidAnalysisVendorSummaryByDistrict.md) | VIEW |
| [`dbo.vw_BidAnalysisVendorSummaryTest`](dbo.vw_BidAnalysisVendorSummaryTest.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_LowestPrice] as
select BidRequestItems.BidHeaderId, 
       BidRequestItems.BidRequestItemId, 
       BidResults.BidResultsId,
       isnull(BidResults.UnitPrice,0) - round(isnull(BidResults.UnitPrice,0) * ISNULL(BidImports.BidItemDiscountRate,0) / 100,2) as BidPrice
  from BidRequestItems with (nolock)
  join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                 and BidResults.BidResultsId = 
       (select top 1 br.BidResultsId
          from BidResults br with (nolock)
          join BidImports bi on bi.BidImportId = br.BidImportId
                            and bi.Active = 1
         where br.BidRequestItemId = BidRequestItems.BidRequestItemId
           and br.ItemBidType in ('S','C')
           and isnull(br.Status,'') = ''
           and isnull(br.UnitPrice,0) - round(isnull(br.UnitPrice,0) * ISNULL(bi.BidItemDiscountRate,0) / 100,2) <> 0   -- added kjm 11/26/07
           and br.Active = 1  -- added 4/24/08 kjm
         --order by BidResults.UnitPrice                 -- removed kjm 11/26/07
         order by isnull(br.UnitPrice,0) - round(isnull(br.UnitPrice,0) * ISNULL(bi.BidItemDiscountRate,0) / 100,2) Asc, br.ItemBidType Desc, br.BidImportId Asc    -- added kjm 11/26/07   BidImportId is for a deterministic result.  This also provides consistency between the old and new BidMgr code  
       )
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
```
