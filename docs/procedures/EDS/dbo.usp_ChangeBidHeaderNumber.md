# Procedure: `dbo.usp_ChangeBidHeaderNumber`

_Generated on 2026-05-04T13:43:19.150Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_ChangeBidHeaderNumber` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-12-02 21:11:23 |
| Modified | 2015-12-02 21:34:49 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@OldBidHeaderId` | IN | int |  |
| 2 | `@NewBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
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
| `OrderBooks` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[usp_ChangeBidHeaderNumber] @OldBidHeaderId int, @NewBidHeaderId int
as
begin

set identity_insert BidHeaders on
insert BidHeaders (Active, AlertLink, AlertMsg, AllowAdditionalManufacturers, AllowAdditionalProductLines, AllowTotalAward, AwardMsg, BidAwardDate, BidDate, BidHeaderId, BidManagerId, BidMessage, BidType, BudgetYearOption, CalendarId, CategoryId, CompliantAlert, DateCreated, Description, DistrictId, EffectiveFrom, EffectiveUntil, HostAwardDate, HostDistrictId, MarkAsOriginal, MinimumPOAmount, ParentBidHeaderId, PricePlanId, PriceVarianceLevel, ScheduledReaward, Section, StateId, TotalAwardMinimumDiscount, UpdateHold, UseOptions)
  select Active, AlertLink, AlertMsg, AllowAdditionalManufacturers, AllowAdditionalProductLines, AllowTotalAward, AwardMsg, BidAwardDate, BidDate, @NewBidHeaderId, BidManagerId, BidMessage, BidType, BudgetYearOption, CalendarId, CategoryId, CompliantAlert, DateCreated, Description, DistrictId, EffectiveFrom, EffectiveUntil, HostAwardDate, HostDistrictId, MarkAsOriginal, MinimumPOAmount, ParentBidHeaderId, PricePlanId, PriceVarianceLevel, ScheduledReaward, Section, StateId, TotalAwardMinimumDiscount, UpdateHold, UseOptions
    from BidHeaders
   where BidHeaderId = @OldBidHeaderId
set identity_insert BidHeaders off

Update BidHeaderDetail
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidRequestItems
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidImports
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidResults
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update Bids
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidHeaderCheckList
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidHeaderDocument
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidHeaderDocuments
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidHeaderDocuments
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidMSRPResults
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidRequestManufacturer
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidRequestOptions
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidRequestPriceRanges
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidTrades
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update BidRequestItems
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update OrderBooks
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

Update Awards
   set BidHeaderId = @NewBidHeaderId
 where BidHeaderId = @OldBidHeaderId

delete BidHeaders
 where BidHeaderId = @OldBidHeaderId

end
```
