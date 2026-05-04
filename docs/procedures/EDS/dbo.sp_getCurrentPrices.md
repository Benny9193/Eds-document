# Procedure: `dbo.sp_getCurrentPrices`

_Generated on 2026-05-04T13:43:18.847Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_getCurrentPrices` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-10-10 13:49:38 |
| Modified | 2012-10-10 13:49:38 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PricePlans` | USER_TABLE |  |
| `dbo.uf_LookupPricesAlt` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_getCurrentPrices @pItemId int
as
declare @TodaysDate datetime
select @TodaysDate = getdate()
select lp.*, PricePlans.Code PricePlanCode from dbo.uf_LookupPricesAlt(@pItemId,@TodaysDate) lp join PricePlans on PricePlans.PricePlanId = lp.PricePlanId order by PricePlans.Code, lp.BidHeaderId
```
