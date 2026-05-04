# Table: `dbo.BidHeaders`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9649

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid solicitation header (~9.6K rows). One row per RFP/IFB/cooperative bid issued to vendors. Drives the bid-response window and ultimately produces `Awards`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `PricePlanId` | int | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `BidDate` | datetime | YES |  |  |
| 7 | `BidAwardDate` | datetime | YES |  |  |
| 8 | `BidMessage` | varchar(1024) | YES |  |  |
| 9 | `BidType` | tinyint | YES |  |  |
| 10 | `PriceVarianceLevel` | decimal(9,5) | YES | `((2))` |  |
| 11 | `MinimumPOAmount` | money | YES |  |  |
| 12 | `Section` | int | YES |  |  |
| 13 | `BudgetYearOption` | tinyint | YES |  |  |
| 14 | `DateCreated` | datetime | YES | `(getdate())` |  |
| 15 | `EffectiveFrom` | datetime | YES |  |  |
| 16 | `EffectiveUntil` | datetime | YES |  |  |
| 17 | `Description` | varchar(512) | YES |  |  |
| 18 | `ParentBidHeaderId` | int | YES |  |  |
| 19 | `UpdateHold` | int | YES |  |  |
| 20 | `ScheduledReaward` | datetime | YES |  |  |
| 21 | `AllowTotalAward` | tinyint | YES |  |  |
| 22 | `TotalAwardMinimumDiscount` | decimal(9,5) | YES |  |  |
| 23 | `CalendarId` | int | YES |  |  |
| 24 | `StateId` | int | YES |  |  |
| 25 | `MarkAsOriginal` | int | YES |  |  |
| 26 | `HostDistrictId` | int | YES |  |  |
| 27 | `AwardMsg` | varchar(1024) | YES |  |  |
| 28 | `AlertLink` | varchar(255) | YES |  |  |
| 29 | `AlertMsg` | varchar(4096) | YES |  |  |
| 30 | `BidManagerId` | int | YES |  |  |
| 31 | `CompliantAlert` | tinyint | YES |  |  |
| 32 | `HostAwardDate` | datetime | YES |  |  |
| 33 | `AllowAdditionalManufacturers` | tinyint | YES |  |  |
| 34 | `AllowAdditionalProductLines` | tinyint | YES |  |  |
| 35 | `UseOptions` | tinyint | YES |  |  |
| 36 | `BidHeaderKey` | int | NO |  | YES |
| 37 | `ImageURLRuleset` | int | YES |  |  |
| 38 | `ReadyToUseDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidRequestManufacturer`](dbo.BidRequestManufacturer.md) | `BidHeaderId` | `BidHeaderId` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BidHeaders_12_2024706611__K9` | no | NONCLUSTERED | `BidType` |  |
| `_dta_index_BidHeaders_7_2024706611__K1_7_17` | no | NONCLUSTERED | `BidHeaderId` | `BidAwardDate`, `Description` |
| `_dta_index_BidHeaders_9_45243216__K2_K16_K15_K3_K4_K1` | no | NONCLUSTERED | `Active`, `CategoryId`, `EffectiveUntil`, `EffectiveFrom`, `PricePlanId`, `BidHeaderId` |  |
| `IX_BidHeaders` | YES | NONCLUSTERED | `Active`, `BidType`, `BidHeaderId` |  |
| `IX_BIdHeaders_BidHeaderId` | no | NONCLUSTERED | `BidHeaderId` |  |
| `SK_BHPricePlan` | no | NONCLUSTERED | `BidHeaderId`, `PricePlanId` | `BidAwardDate`, `Description`, `CategoryId` |
| `SK_BidGrouper` | no | NONCLUSTERED | `CategoryId`, `PricePlanId`, `BidAwardDate`, `BidType` | `BidHeaderId`, `EffectiveFrom`, `EffectiveUntil` |
| `SK_BidHeaderEffective` | YES | NONCLUSTERED | `BidHeaderId`, `Active`, `EffectiveFrom`, `EffectiveUntil` |  |
| `SK_CatAwardDate` | no | NONCLUSTERED | `PricePlanId`, `CategoryId`, `Active`, `BidAwardDate` |  |
| `SK_CatPPActive` | no | NONCLUSTERED | `CategoryId`, `PricePlanId`, `Active` | `EffectiveFrom`, `EffectiveUntil`, `BidDate`, `BidAwardDate`, `BidType`, `BidHeaderKey`, `BidHeaderId` |
| `SK_CatPPAwardDate` | no | NONCLUSTERED | `CategoryId`, `PricePlanId`, `BidAwardDate` |  |
| `SK_ParentBidHeaderId` | no | NONCLUSTERED | `ParentBidHeaderId` |  |
| `SKI_Active_BidDates` | no | NONCLUSTERED | `Active` | `BidHeaderId`, `BidDate`, `EffectiveFrom`, `EffectiveUntil` |
| `SKI_ActiveFromUntil_etc` | no | NONCLUSTERED | `Active`, `EffectiveFrom`, `EffectiveUntil` | `BidHeaderId`, `CategoryId`, `PricePlanId`, `DistrictId`, `BidType`, `ParentBidHeaderId` |
| `SKI_ActiveFromUntil_IdParent` | no | NONCLUSTERED | `Active`, `EffectiveFrom`, `EffectiveUntil` | `BidHeaderId`, `ParentBidHeaderId` |
| `SKI_ActiveParentFromUntil_CatPPDisType` | no | NONCLUSTERED | `Active`, `ParentBidHeaderId`, `EffectiveFrom`, `EffectiveUntil` | `BidHeaderId`, `CategoryId`, `PricePlanId`, `DistrictId`, `BidType` |
| `SKI_AwardDateActive_HeaderCatPPDistrictKey` | no | NONCLUSTERED | `BidAwardDate`, `Active` | `BidHeaderId`, `CategoryId`, `PricePlanId`, `DistrictId`, `BidHeaderKey` |
| `SKI_BidHeaderId_TypeAlert` | YES | NONCLUSTERED | `BidHeaderId` | `BidType`, `CompliantAlert` |
| `SKI_Date` | no | NONCLUSTERED | `EffectiveFrom`, `EffectiveUntil`, `CategoryId`, `Active`, `BidHeaderId` |  |
