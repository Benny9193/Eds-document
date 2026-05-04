# Procedure: `dbo.sp_UpdateShippingCode`

_Generated on 2026-05-04T13:07:57.551Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateShippingCode` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-01-31 12:16:25 |
| Modified | 2014-01-31 12:16:25 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pShippingId` | IN | int |  |
| 2 | `@pVendorId` | IN | int |  |
| 3 | `@pShippingCode` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ShipLocations` | USER_TABLE |  |
| `ShippingVendor` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_UpdateShippingCode @pShippingId int, @pVendorId int, @pShippingCode varchar(50)
as
declare @currentId int

select @currentId = sv.ShippingVendorId
  from ShipLocations sl
  join Vendors on Vendors.VendorId = @pVendorId
  left outer join ShippingVendor sv on sv.ShippingId = sl.ShippingId
                        and sv.VendorId = Vendors.VendorId
 where sl.ShippingId = @pShippingId

if isnull(@currentId,0) = 0
begin
  insert ShippingVendor (Active, ShippingId, VendorId, ShippingCode)
    values (1, @pShippingId, @pVendorId, ltrim(rtrim(@pShippingCode)))
end
else
begin
  update ShippingVendor
     set ShippingCode = rtrim(ltrim(@pShippingCode))
   where ShippingVendor.ShippingVendorId = @currentId
end
```
