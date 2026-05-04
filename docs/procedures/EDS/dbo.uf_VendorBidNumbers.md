# Function: scalar: `dbo.uf_VendorBidNumbers`

_Generated on 2026-05-04T13:43:19.125Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_VendorBidNumbers` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2014-04-01 12:52:43 |
| Modified | 2014-04-01 12:52:43 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@POId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select dbo.uf_VendorContacts(9)
--select dbo.uf_FirstWord(substring(Address1,6,len(Address1)-5)), dbo.uf_SecondWord(substring(Address1,6,len(Address1)-5)), * from VendorContacts where VendorId = 173
--select dbo.uf_SecondWord(' x  y12')
create function [dbo].[uf_VendorBidNumbers](@POId int)
returns varchar(max) as
begin
  declare @VendorBidList varchar(max)
  select @VendorBidList = COALESCE(@VendorBidList + ', ', '') + coalesce(BidImports.VendorBidNumber,cast(BidImports.BidHeaderId as varchar))
    from PO with (nolock)
    join PODetailItems on PODetailItems.POId = PO.POId
    join BidItems on BidItems.BidItemId = PODetailItems.BidItemId
    join Bids on Bids.BidId = BidItems.BidId
    join BidImports on BidImports.BidImportId = Bids.BidImportId
   where PO.POId = @POId
  return @VendorBidList
end
```
