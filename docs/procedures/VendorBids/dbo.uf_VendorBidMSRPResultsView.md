# Function: inline table-valued: `dbo.uf_VendorBidMSRPResultsView`

_Generated on 2026-05-04T13:43:22.358Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_VendorBidMSRPResultsView` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2013-09-24 19:50:49 |
| Modified | 2024-06-21 20:44:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@passPhrase` | IN | varchar(255) |  |
| 2 | `@VendorBidId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `VendorBidMSRPPriceRanges` | USER_TABLE |  |
| `VendorBidMSRPResults` | USER_TABLE |  |
| `VendorBidMSRPResultsJournal` | USER_TABLE |  |
| `VendorBids` | USER_TABLE |  |
| `VendorBidsJournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_VendorBidMSRPResultsView] (@passPhrase varchar(255), @VendorBidId int)
returns table as
return (select vbmr.VendorBidMSRPResultsId, 
               vb.VendorBidId, 
               isnull(vbmr.BidRequestManufacturerId,0) as BidRequestManufacturerId, 
               isnull(vbmr.ManufacturerName,'') as ManufacturerName, 
               isnull(vbmr.WriteInManufacturer,0) as WriteInManufacturer, 
               isnull(vbmr.PriceListType,0) as PriceListType, 
               isnull(vbmr.BidRequestProductLineId,0) as BidRequestProductLineId, 
               isnull(vbmr.ProductLineName,'') as ProductLineName, 
               isnull(vbmr.WriteInProductLine,0) as WriteInProductLine, 
               isnull(vbmr.BidRequestOptionId,0) as BidRequestOptionId, 
               isnull(vbmr.OptionName,'') as OptionName,
               isnull(vbmrj.VendorBidMSRPResultsJournalId,0) as VendorBidMSRPResultsJournalId, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbmrj.WeightedDiscount, 1, cast(vbmrj.VendorBidMSRPResultsId as varbinary)) as varchar),'') as WeightedDiscount, 
               isnull(vbmpr.VendorBidMSRPPriceRangeId,0) as VendorBidMSRPPriceRangeId, 
               isnull(vbmpr.BidRequestPriceRangeId,0) as BidRequestPriceRangeId, 
               isnull(vbmpr.PriceRangeLow,0) as PriceRangeLow, 
               isnull(vbmpr.PriceRangeWeight,0) as PriceRangeWeight, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbmpr.PriceRangeDiscount, 1, cast(vbmrj.VendorBidMSRPResultsId as varbinary)) as varchar),'') as PriceRangeDiscount, 
               isnull(vbmrj.Modified,cast('1970-01-01 00:00:00.000' as datetime)) as Modified,
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbmr.TotalAwardDiscount, 1, cast(vb.VendorBidId as varbinary)) as varchar),'') as TotalAwardDiscount
  from VendorBidMSRPResults as vbmr
  join VendorBids vb on vb.VendorBidId = vbmr.VendorBidId
                    and vb.VendorBidId = @VendorBidId
  left outer join VendorBidMSRPResultsJournal as vbmrj on vbmrj.VendorBidMSRPResultsJournalId = 
    (select top 1 VendorBidMSRPResultsJournal.VendorBidMSRPResultsJournalId 
       from VendorBidMSRPResultsJournal
      where VendorBidMSRPResultsJournal.VendorBidMSRPResultsId = vbmr.VendorBidMSRPResultsId
      order by VendorBidMSRPResultsJournal.VendorBidMSRPResultsJournalId desc)
  left outer join VendorBidMSRPPriceRanges vbmpr on vbmpr.VendorBidMSRPResultsJournalId = vbmrj.VendorBidMSRPResultsJournalId
  left outer join VendorBidsJournal vbj on vbj.vbjid =
    (select top 1 VendorBidsJournal.vbjid
       from VendorBidsJournal
      where VendorBidsJournal.VendorBidId = vb.VendorBidId
      order by VendorBidsJournal.vbjid desc)
 )
```
