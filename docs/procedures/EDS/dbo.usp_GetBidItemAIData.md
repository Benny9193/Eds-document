# Procedure: `dbo.usp_GetBidItemAIData`

_Generated on 2026-05-04T14:49:07.463Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetBidItemAIData` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-07-10 09:25:50 |
| Modified | 2025-10-31 13:40:39 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@IdList` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidResults` | USER_TABLE |  |
| `Items` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_GetBidItemAIData] @IdList varchar(max)
as
-- Return Existing Data for AI Process
select BidResults.BidResultsId,
	   coalesce(trim(Items.Description),'') BidItemDescription,
       coalesce(trim(BidResults.Alternate),'') ShortDescription,
	   coalesce(trim(BidResults.ManufacturerBid),'') Manufacturer,
	   coalesce(trim(BidResults.ManufPartNoBid),'') ManufacturerPartNumber,
	   coalesce(trim(BidResults.UNSPSC),'') UNSPSC
  from BidResults with (nolock)
  join Items on Items.ItemId = BidResults.ItemId
 where BidResults.BidResultsId in (Select cast(ss.value as int) Id from string_split(@IdList,',') ss)
```
