# Procedure: `dbo.sp_FixVendorItemCode`

_Generated on 2026-05-04T13:07:57.477Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FixVendorItemCode` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2009-07-23 13:29:04 |
| Modified | 2009-07-23 13:51:07 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@oldVendorItemCode` | IN | varchar(50) |  |
| 2 | `@newVendorItemCode` | IN | varchar(50) |  |
| 3 | `@newPackedVendorItemCode` | IN | varchar(50) |  |
| 4 | `@VendorId` | IN | int |  |
| 5 | `@BidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_FixVendorItemCode 
		@oldVendorItemCode varchar(50),
		@newVendorItemCode varchar(50),
		@newPackedVendorItemCode varchar(50),
		@VendorId int,
		@BidHeaderId int 
as
		
--2707, 2708, 2958 Sax
--2782, 2800, 2805, 2807 EE

update BidResults
   set VendorItemCode = @newVendorItemCode,
       PackedVendorItemCode = @newPackedVendorItemCode
--select *
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
                 and BidImports.VendorId = @VendorId
                 and BidImports.BidHeaderId = @BidHeaderId
 where BidResults.VendorItemCode = @oldVendorItemCode
 
update BidItems
   set VendorItemCode = @newVendorItemCode,
       PackedVendorItemCode = @newPackedVendorItemCode
--select *
  from BidItems
  join Bids on Bids.BidId = BidItems.BidId
           and Bids.VendorId = @VendorId
           and Bids.Active = 1
           and Bids.BidHeaderId = @BidHeaderId
 where BidItems.VendorItemCode = @oldVendorItemCode
 
update Detail
   set VendorItemCode = @newVendorItemCode         
--select *
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and BidHeaders.BidHeaderId = @BidHeaderId
 where Detail.VendorId = @VendorId
   and Detail.VendorItemCode = @oldVendorItemCode
  
update PODetailItems
   set VendorItemCode = @newVendorItemCode 
--select *
  from PODetailItems
  join Detail on Detail.DetailId = PODetailItems.DetailId
             and Detail.VendorId = @VendorId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
                 and BidHeaders.BidHeaderId = @BidHeaderId
 where PODetailItems.VendorItemCode = @oldVendorItemCode
```
