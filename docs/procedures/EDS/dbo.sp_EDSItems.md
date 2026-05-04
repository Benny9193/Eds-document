# Procedure: `dbo.sp_EDSItems`

_Generated on 2026-05-04T13:07:57.442Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_EDSItems` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-10-18 09:07:39 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemCode` | IN | varchar(255) |  |
| 2 | `@CategoryId` | IN | int |  |
| 3 | `@DistrictId` | IN | int |  |
| 4 | `@ReturnValue` | INOUT | int |  |
| 5 | `@ItemId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `EDSIQWebUser.uf_LookupItemCode` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE          procedure sp_EDSItems @pItemCode varchar(255), @CategoryId int, @DistrictId int, @ReturnValue int output, @ItemId int output as
declare @TodaysDate datetime

      select @TodaysDate = getdate()

      select @ItemId = ItemId 
        from EDSIQWebUser.uf_LookupItemCode(@pItemCode, @CategoryId, 0, @TodaysDate, 0, @DistrictId)

      if @@rowcount = 0
      begin
      --  RAISERROR('Bad Item Code Specified',16,1)
        select @ReturnValue = 4
      end
```
