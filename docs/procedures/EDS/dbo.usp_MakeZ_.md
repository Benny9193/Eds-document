# Procedure: `dbo.usp_MakeZ$`

_Generated on 2026-05-04T13:04:24.374Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_MakeZ$` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-12-02 15:36:26 |
| Modified | 2023-12-01 08:13:51 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `sp_BidCopyChangePP` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec [usp_MakeZ$]
CREATE   procedure [dbo].[usp_MakeZ$] as
declare @BidHeaderId int
--select * from Priceplans where Code like 'Z%'
declare bc cursor for
select BidHeaderId
  from BidHeaders
 where PriceplanId = 7
   and CategoryId = 4
   and dateadd(day,2,getdate()) between EffectiveFrom and EffectiveUntil
union
select BidHeaderId
  from BidHeaders
 where PriceplanId = 25
   and CategoryId != 4
   and dateadd(day,2,getdate()) between EffectiveFrom and EffectiveUntil

open bc

fetch next from bc into @BidHeaderId

while @@FETCH_STATUS = 0
begin
	print 'Copying Bid ' + cast(@BidHeaderId as varchar) + ' to Z$'
	exec sp_BidCopyChangePP @BidHeaderId,1280564,1

	fetch next from bc into @BidHeaderId
end

close bc
deallocate bc
```
