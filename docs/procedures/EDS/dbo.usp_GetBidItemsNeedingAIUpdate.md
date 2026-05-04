# Procedure: `dbo.usp_GetBidItemsNeedingAIUpdate`

_Generated on 2026-05-04T13:04:24.360Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetBidItemsNeedingAIUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-07-10 09:22:52 |
| Modified | 2025-11-03 22:27:54 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE     procedure [dbo].[usp_GetBidItemsNeedingAIUpdate] as
begin
/* Table Changes 
alter table BidResults
add 	
HashKey			varbinary(64) null,
ProductNames	nvarchar(4000) null,
TypeAheads		nvarchar(4000) null,
AIShortDesc		nvarchar(1024) null,
AIFullDesc		nvarchar(4000) null,
AIUNSPSC		varchar(20) null,
AIDate			datetime null
*/

-- Return the list of Id's to process
select BidResults.BidResultsId BidResultsId, BidResults.[HashKey]
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
                 and BidHeaders.EffectiveUntil > getdate()
 where BidResults.ItemBidType in ('A','C','S')
   and BidResults.AIdate is null
   and BidResults.HashKey is not null

set nocount off
end
```
