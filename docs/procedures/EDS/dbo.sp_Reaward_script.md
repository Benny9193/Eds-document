# Procedure: `dbo.sp_Reaward_script`

_Generated on 2026-05-04T14:49:07.313Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_Reaward_script` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-04-06 12:04:01 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `sp_AwardBidHeader` | unresolved |  |
| `sp_CreateOrderBook` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_Reaward_script as

declare @BidHeaderId int

declare bhcur cursor read_only fast_forward for
select BidHeaderId
  from BidHeaders
 where BidHeaderId between 1169 and 1190

open bhcur

fetch next from bhcur into @BidHeaderId

while @@fetch_status = 0
begin
  exec sp_AwardBidHeader @BidHeaderId

  exec sp_CreateOrderBook @BidHeaderId, 0

  fetch next from bhcur into @BidHeaderId
end

close bhcur
deallocate bhcur
```
