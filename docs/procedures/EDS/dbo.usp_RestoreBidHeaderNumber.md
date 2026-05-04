# Procedure: `dbo.usp_RestoreBidHeaderNumber`

_Generated on 2026-05-04T13:43:19.190Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_RestoreBidHeaderNumber` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-12-03 00:16:55 |
| Modified | 2015-12-03 00:41:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@OldBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderCheckList` | USER_TABLE |  |
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaderDocument` | USER_TABLE |  |
| `BidHeaderDocuments` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidMSRPResults` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidRequestManufacturer` | USER_TABLE |  |
| `BidRequestOptions` | USER_TABLE |  |
| `BidRequestPriceRanges` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidTrades` | USER_TABLE |  |
| `dbo.BidHeaderCheckList` | USER_TABLE | `EDS` |
| `dbo.BidHeaderDetail` | USER_TABLE | `EDS` |
| `dbo.BidHeaderDocument` | USER_TABLE | `EDS` |
| `dbo.BidHeaderDocuments` | USER_TABLE | `EDS` |
| `dbo.BidHeaders` | USER_TABLE | `EDS` |
| `dbo.BidImports` | USER_TABLE | `EDS` |
| `dbo.BidMSRPResults` | USER_TABLE | `EDS` |
| `dbo.BidRequestItems` | USER_TABLE | `EDS` |
| `dbo.BidRequestManufacturer` | USER_TABLE | `EDS` |
| `dbo.BidRequestOptions` | USER_TABLE | `EDS` |
| `dbo.BidRequestPriceRanges` | USER_TABLE | `EDS` |
| `dbo.BidResults` | USER_TABLE | `EDS` |
| `dbo.Bids` | USER_TABLE | `EDS` |
| `dbo.BidTrades` | USER_TABLE | `EDS` |
| `dbo.BidHeaderCheckList` | unresolved | `edsrestore` |
| `dbo.BidHeaderDetail` | unresolved | `edsrestore` |
| `dbo.BidHeaderDocument` | unresolved | `edsrestore` |
| `dbo.BidHeaderDocuments` | unresolved | `edsrestore` |
| `dbo.BidHeaders` | unresolved | `edsrestore` |
| `dbo.BidImports` | unresolved | `edsrestore` |
| `dbo.BidMSRPResults` | unresolved | `edsrestore` |
| `dbo.BidRequestItems` | unresolved | `edsrestore` |
| `dbo.BidRequestManufacturer` | unresolved | `edsrestore` |
| `dbo.BidRequestOptions` | unresolved | `edsrestore` |
| `dbo.BidRequestPriceRanges` | unresolved | `edsrestore` |
| `dbo.BidResults` | unresolved | `edsrestore` |
| `dbo.Bids` | unresolved | `edsrestore` |
| `dbo.BidTrades` | unresolved | `edsrestore` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[usp_RestoreBidHeaderNumber] @OldBidHeaderId int
as
begin

begin Transaction

set identity_insert BidHeaders on
insert BidHeaders (Active, AlertLink, AlertMsg, AllowAdditionalManufacturers, AllowAdditionalProductLines, AllowTotalAward, AwardMsg, BidAwardDate, BidDate, BidHeaderId, BidManagerId, BidMessage, BidType, BudgetYearOption, CalendarId, CategoryId, CompliantAlert, DateCreated, Description, DistrictId, EffectiveFrom, EffectiveUntil, HostAwardDate, HostDistrictId, MarkAsOriginal, MinimumPOAmount, ParentBidHeaderId, PricePlanId, PriceVarianceLevel, ScheduledReaward, Section, StateId, TotalAwardMinimumDiscount, UpdateHold, UseOptions)
  select bhr.Active, bhr.AlertLink, bhr.AlertMsg, bhr.AllowAdditionalManufacturers, bhr.AllowAdditionalProductLines, bhr.AllowTotalAward, bhr.AwardMsg, bhr.BidAwardDate, bhr.BidDate, bhr.BidHeaderId, bhr.BidManagerId, bhr.BidMessage, bhr.BidType, bhr.BudgetYearOption, bhr.CalendarId, bhr.CategoryId, bhr.CompliantAlert, bhr.DateCreated, bhr.Description, bhr.DistrictId, bhr.EffectiveFrom, bhr.EffectiveUntil, bhr.HostAwardDate, bhr.HostDistrictId, bhr.MarkAsOriginal, bhr.MinimumPOAmount, bhr.ParentBidHeaderId, bhr.PricePlanId, bhr.PriceVarianceLevel, bhr.ScheduledReaward, bhr.Section, bhr.StateId, bhr.TotalAwardMinimumDiscount, bhr.UpdateHold, bhr.UseOptions
    from edsrestore.dbo.BidHeaders bhr
    left outer join EDS.dbo.BidHeaders bhc on bhc.BidHeaderId = bhr.BidHeaderId
   where bhr.BidHeaderId = @OldBidHeaderId
     and bhc.BidHeaderId is null
set identity_insert BidHeaders off

set identity_insert BidHeaderDetail on
insert BidHeaderDetail (BidHeaderDetailId, BidHeaderId, BidRequestItemId, DateAdded, DetailId, Quantity)
  select r.BidHeaderDetailId, r.BidHeaderId, r.BidRequestItemId, r.DateAdded, r.DetailId, r.Quantity
    from edsrestore.dbo.BidHeaderDetail r
    left outer join EDS.dbo.BidHeaderDetail c on c.BidHeaderDetailId = r.BidHeaderDetailId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidHeaderDetailId is null
set identity_insert BidHeaderDetail off

set identity_insert BidRequestItems on
insert BidRequestItems (BidRequestItemId, Active, BidHeaderId, BidRequest, BidRequestAmount, Checksum, Comments, ItemId, MasterItemCodePtr, RequisitionCount, Status)
  select r.BidRequestItemId, r.Active, r.BidHeaderId, r.BidRequest, r.BidRequestAmount, r.Checksum, r.Comments, r.ItemId, r.MasterItemCodePtr, r.RequisitionCount, r.Status
    from edsrestore.dbo.BidRequestItems r
    left outer join EDS.dbo.BidRequestItems c on c.BidRequestItemId = r.BidRequestItemId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidRequestItemId is null
set identity_insert BidRequestItems off

--set identity_insert BidImports on
insert BidImports (BidImportId, Active, AdditionalHandlingAmount, AmountBid, BidHeaderId, BidItemDiscountRate, BidVendorContactId, CatalogDiscountComments, CatalogDiscountRate, CatalogId, Comments, ContactEmail, ContactFax, ContactName, ContactPhone, DateModified, FreeDeliveryMinimum, FreeHandlingAmount, FreeHandlingEnd, FreeHandlingStart, ItemsBid, MinimumOrder, POVendorContactId, StateContractDiscount, Status, UseVendorContactInfo, VendorBidId, VendorBidNumber, VendorId, WebsiteLink)
  select r.BidImportId, r.Active, r.AdditionalHandlingAmount, r.AmountBid, r.BidHeaderId, r.BidItemDiscountRate, r.BidVendorContactId, r.CatalogDiscountComments, r.CatalogDiscountRate, r.CatalogId, r.Comments, r.ContactEmail, r.ContactFax, r.ContactName, r.ContactPhone, r.DateModified, r.FreeDeliveryMinimum, r.FreeHandlingAmount, r.FreeHandlingEnd, r.FreeHandlingStart, r.ItemsBid, r.MinimumOrder, r.POVendorContactId, r.StateContractDiscount, r.Status, r.UseVendorContactInfo, r.VendorBidId, r.VendorBidNumber, r.VendorId, r.WebsiteLink
    from edsrestore.dbo.BidImports r
    left outer join EDS.dbo.BidImports c on c.BidImportId = r.BidImportId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidImportId is null
--set identity_insert BidImports off

set identity_insert BidResults on
insert BidResults (BidResultsId, Active, AdditionalShipping, Alternate, BidHeaderId, BidImportId, BidRequestItemId, CategoryId, Comments, ContractNumber, Cost, DistrictId, ItemBidType, ItemCode, ItemId, ItemsPerUnit, LinerCaseWeight, LinerDimDepth, LinerDimLength, LinerDimWidth, LinerGaugeMicrons, LinerGaugeMil, ManufacturerBid, ManufPartNoBid, ModifiedBy, ModifiedDate, ModifiedSessionId, OriginalAwardedItem, PackedManufPartNoBid, PackedVendorItemCode, PageNo, Quantity, QuantityBid, RTK_MSDSId, RTK_MSDSNotNeeded, Status, UnitId, UnitPrice, Units, VendorItemCode, VOMId)
  select r.BidResultsId, r.Active, r.AdditionalShipping, r.Alternate, r.BidHeaderId, r.BidImportId, r.BidRequestItemId, r.CategoryId, r.Comments, r.ContractNumber, r.Cost, r.DistrictId, r.ItemBidType, r.ItemCode, r.ItemId, r.ItemsPerUnit, r.LinerCaseWeight, r.LinerDimDepth, r.LinerDimLength, r.LinerDimWidth, r.LinerGaugeMicrons, r.LinerGaugeMil, r.ManufacturerBid, r.ManufPartNoBid, r.ModifiedBy, r.ModifiedDate, r.ModifiedSessionId, r.OriginalAwardedItem, r.PackedManufPartNoBid, r.PackedVendorItemCode, r.PageNo, r.Quantity, r.QuantityBid, r.RTK_MSDSId, r.RTK_MSDSNotNeeded, r.Status, r.UnitId, r.UnitPrice, r.Units, r.VendorItemCode, r.VOMId
    from edsrestore.dbo.BidResults r
    left outer join EDS.dbo.BidResults c on c.BidResultsId = r.BidResultsId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidResultsId is null
set identity_insert BidResults off

set identity_insert Bids on
insert Bids (BidId, Active, AdditionalHandlingAmount, AmountBid, BidDiscountRate, BidHeaderId, BidImportId, CatalogId, CategoryId, ClosingDate, CoopId, DateModified, Description, DistrictId, EffectiveFrom, EffectiveUntil, FreeHandlingAmount, FreeHandlingEnd, FreeHandlingStart, ItemsBid, Name, OpeningDate, PricePlanId, UseGrossPrices, VendorBidNumber, VendorId, WebsiteLink)
  select r.BidId, r.Active, r.AdditionalHandlingAmount, r.AmountBid, r.BidDiscountRate, r.BidHeaderId, r.BidImportId, r.CatalogId, r.CategoryId, r.ClosingDate, r.CoopId, r.DateModified, r.Description, r.DistrictId, r.EffectiveFrom, r.EffectiveUntil, r.FreeHandlingAmount, r.FreeHandlingEnd, r.FreeHandlingStart, r.ItemsBid, r.Name, r.OpeningDate, r.PricePlanId, r.UseGrossPrices, r.VendorBidNumber, r.VendorId, r.WebsiteLink
    from edsrestore.dbo.Bids r
    left outer join EDS.dbo.Bids c on c.BidId = r.BidId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidId is null
set identity_insert Bids off

set identity_insert BidHeaderCheckList on
insert BidHeaderCheckList (BidderCheckListId, BidHeaderCheckListId, BidHeaderId, DisplaySequence)
  select r.BidderCheckListId, r.BidHeaderCheckListId, r.BidHeaderId, r.DisplaySequence
    from edsrestore.dbo.BidHeaderCheckList r
    left outer join EDS.dbo.BidHeaderCheckList c on c.BidderCheckListId = r.BidderCheckListId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidderCheckListId is null
set identity_insert BidHeaderCheckList off

set identity_insert BidHeaderDocument on
insert BidHeaderDocument (BidHeaderDocumentId, BidDocumentId, BidHeaderId, DisplaySequence)
  select r.BidHeaderDocumentId, r.BidDocumentId, r.BidHeaderId, r.DisplaySequence
    from edsrestore.dbo.BidHeaderDocument r
    left outer join EDS.dbo.BidHeaderDocument c on c.BidHeaderDocumentId = r.BidHeaderDocumentId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidHeaderDocumentId is null
set identity_insert BidHeaderDocument off

set identity_insert BidHeaderDocuments on
insert BidHeaderDocuments (BidHeaderDocumentId, BidHeaderId, DisplaySeq, DocumentData, DocumentDate, DocumentFile, DocumentTitle)
  select r.BidHeaderDocumentId, r.BidHeaderId, r.DisplaySeq, r.DocumentData, r.DocumentDate, r.DocumentFile, r.DocumentTitle
    from edsrestore.dbo.BidHeaderDocuments r
    left outer join EDS.dbo.BidHeaderDocuments c on c.BidHeaderDocumentId = r.BidHeaderDocumentId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidHeaderDocumentId is null
set identity_insert BidHeaderDocuments off

set identity_insert BidMSRPResults on
insert BidMSRPResults (BidMSRPResultsId, Active, AuthorizationLetter, BidHeaderId, BidImportId, BidRequestManufacturerId, DiscountRate, DiscountRateString, ExcelFileApproved, ManufacturerId, Modified, PriceListTypeId, ProductCatalog, SubmittedExcel, TotalAward, TotalAwardDiscount, TotalAwardString, VendorNotes, VendorPriceFile, WinningBidOverride, WriteInFlag, WriteInManufacturer)
  select r.BidMSRPResultsId, r.Active, r.AuthorizationLetter, r.BidHeaderId, r.BidImportId, r.BidRequestManufacturerId, r.DiscountRate, r.DiscountRateString, r.ExcelFileApproved, r.ManufacturerId, r.Modified, r.PriceListTypeId, r.ProductCatalog, r.SubmittedExcel, r.TotalAward, r.TotalAwardDiscount, r.TotalAwardString, r.VendorNotes, r.VendorPriceFile, r.WinningBidOverride, r.WriteInFlag, r.WriteInManufacturer
    from edsrestore.dbo.BidMSRPResults r
    left outer join EDS.dbo.BidMSRPResults c on c.BidMSRPResultsId = r.BidMSRPResultsId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidMSRPResultsId is null
set identity_insert BidMSRPResults off

set identity_insert BidRequestManufacturer on
insert BidRequestManufacturer (BidRequestManufacturerId, Active, AllowAdditionalProductLines, BidHeaderId, ManufacturerId, SequenceNumber, UseOptions)
  select r.BidRequestManufacturerId, r.Active, r.AllowAdditionalProductLines, r.BidHeaderId, r.ManufacturerId, r.SequenceNumber, r.UseOptions
    from edsrestore.dbo.BidRequestManufacturer r
    left outer join EDS.dbo.BidRequestManufacturer c on c.BidRequestManufacturerId = r.BidRequestManufacturerId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidRequestManufacturerId is null
set identity_insert BidRequestManufacturer off

set identity_insert BidRequestOptions on
insert BidRequestOptions (BidRequestOptionId, BidHeaderId, BidRequestManufacturerId, BidRequestProductLineId, ManufacturerId, ManufacturerProductLineId, Name, OptionId, Weight)
  select r.BidRequestOptionId, r.BidHeaderId, r.BidRequestManufacturerId, r.BidRequestProductLineId, r.ManufacturerId, r.ManufacturerProductLineId, r.Name, r.OptionId, r.Weight
    from edsrestore.dbo.BidRequestOptions r
    left outer join EDS.dbo.BidRequestOptions c on c.BidRequestOptionId = r.BidRequestOptionId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidRequestOptionId is null
set identity_insert BidRequestOptions off

set identity_insert BidRequestPriceRanges on
insert BidRequestPriceRanges (BidRequestPriceRangeId, BidHeaderId, BidRequestManufacturerId, BidRequestMSRPOptionId, BidRequestProductLineId, RangeBase, RangeWeight)
  select r.BidRequestPriceRangeId, r.BidHeaderId, r.BidRequestManufacturerId, r.BidRequestMSRPOptionId, r.BidRequestProductLineId, r.RangeBase, r.RangeWeight
    from edsrestore.dbo.BidRequestPriceRanges r
    left outer join EDS.dbo.BidRequestPriceRanges c on c.BidRequestPriceRangeId = r.BidRequestPriceRangeId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidRequestPriceRangeId is null
set identity_insert BidRequestPriceRanges off

set identity_insert BidTrades on
insert BidTrades (BidTradeId, BidHeaderId, Specifications, Title, TradeId)
  select r.BidTradeId, r.BidHeaderId, r.Specifications, r.Title, r.TradeId
    from edsrestore.dbo.BidTrades r
    left outer join EDS.dbo.BidTrades c on c.BidTradeId = r.BidTradeId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidTradeId is null
set identity_insert BidTrades off

set identity_insert BidRequestItems on
insert BidRequestItems (BidRequestItemId, Active, BidHeaderId, BidRequest, BidRequestAmount, Checksum, Comments, ItemId, MasterItemCodePtr, RequisitionCount, Status)
  select r.BidRequestItemId, r.Active, r.BidHeaderId, r.BidRequest, r.BidRequestAmount, r.Checksum, r.Comments, r.ItemId, r.MasterItemCodePtr, r.RequisitionCount, r.Status
    from edsrestore.dbo.BidRequestItems r
    left outer join EDS.dbo.BidRequestItems c on c.BidRequestItemId = r.BidRequestItemId
 where r.BidHeaderId = @OldBidHeaderId
   and c.BidRequestItemId is null
set identity_insert BidRequestItems off

commit Transaction

end
```
