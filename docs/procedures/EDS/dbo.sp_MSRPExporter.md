# Procedure: `dbo.sp_MSRPExporter`

_Generated on 2026-05-04T13:04:24.152Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MSRPExporter` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-09-08 19:29:31 |
| Modified | 2014-09-16 16:59:56 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidManufacturers` | USER_TABLE |  |
| `BidProductLinePrices` | USER_TABLE |  |
| `BidProductLines` | USER_TABLE |  |
| `BidRequestManufacturer` | USER_TABLE |  |
| `BidRequestOptions` | USER_TABLE |  |
| `BidRequestPriceRanges` | USER_TABLE |  |
| `BidRequestProductLines` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `ManufacturerProductLines` | USER_TABLE |  |
| `Manufacturers` | USER_TABLE |  |
| `MSRPOptions` | USER_TABLE |  |
| `dbo.MSRPExcelExport` | USER_TABLE | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_MSRPExporter] @BidHeaderId int 
as

Truncate Table eds.dbo.MSRPExcelExport

insert eds.dbo.MSRPExcelExport(ManufacturerName, ProductLine, OptionName, ManufWebsite, RangeBase1, RangeWeight1, RangeBase2, RangeWeight2, RangeBase3, RangeWeight3, RangeBase4, RangeWeight4, RangeBase5, RangeWeight5, RangeBase6, RangeWeight6)
select 'MANUFACTURER' ManufacturerName,	'PRODUCT LINE/GROUP' ProductLine, 'DELIVERY OPTION' OptionName, 'MANUFACTURER WEBSITE' ManufWebsite, 'Base 1' RangeBase1, 'Weight 1' RangeWeight1, 'Base 2' RangeBase2, 'Weight 2' RangeWeight2,	'Base 3' RangeBase3, 'Weight 3' RangeWeight3, 'Base 4' RangeBase4, 'Weight 4' RangeWeight4, 'Base 5' RangeBase5, 'Weight 5' RangeWeight5, 'Base 6' RangeBase6, 'Weight 6' RangeWeight6

insert eds.dbo.MSRPExcelExport(ManufacturerName, ProductLine, OptionName, ManufWebsite, RangeBase1, RangeWeight1, RangeBase2, RangeWeight2, RangeBase3, RangeWeight3, RangeBase4, RangeWeight4, RangeBase5, RangeWeight5, RangeBase6, RangeWeight6)
select Manufacturers.Name ManufacturerName, isnull(ManufacturerProductLines.Name,'') ProductLine, isnull(MSRPOptions.MSRPOptionName,'') OptionName, '' ManufWebsite,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 1) as varchar),'') RangeBase1, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 1) as varchar),'') RangeWeight1,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 2) as varchar),'') RangeBase2, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 2) as varchar),'') RangeWeight2,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 3) as varchar),'') RangeBase3, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 3) as varchar),'') RangeWeight3,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 4) as varchar),'') RangeBase4, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 4) as varchar),'') RangeWeight4,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 5) as varchar),'') RangeBase5, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 5) as varchar),'') RangeWeight5,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 6) as varchar),'') RangeBase6, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 6) as varchar),'') RangeWeight6
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join BidRequestManufacturer on BidRequestManufacturer.BidHeaderId = BidHeaders.BidHeaderId
  join BidRequestProductLines on BidRequestProductLines.BidRequestManufacturerId = BidRequestManufacturer.BidRequestManufacturerId
  left outer join BidRequestOptions on BidRequestOptions.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId
  left outer join Manufacturers on Manufacturers.ManufacturerId = BidRequestManufacturer.ManufacturerId
  left outer join ManufacturerProductLines on ManufacturerProductLines.ManufacturerProductLineId = BidRequestProductLines.ManufacturerProductLineId
  left outer join MSRPOptions on MSRPOptions.MSRPOptionId = BidRequestOptions.OptionId  
 where BidHeaders.BidHeaderId = @BidHeaderId
union (
select Manufacturers.Name ManufacturerName, ManufacturerProductLines.Name ProductLine, isnull(MSRPOptions.MSRPOptionName,'') OptionName, '' ManufWebsite,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 1) as varchar),'') RangeBase1, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 1) as varchar),'') RangeWeight1,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 2) as varchar),'') RangeBase2, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 2) as varchar),'') RangeWeight2,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 3) as varchar),'') RangeBase3, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 3) as varchar),'') RangeWeight3,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 4) as varchar),'') RangeBase4, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 4) as varchar),'') RangeWeight4,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 5) as varchar),'') RangeBase5, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 5) as varchar),'') RangeWeight5,
       isnull(cast((select RangeBase from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 6) as varchar),'') RangeBase6, 
       isnull(cast((select RangeWeight from (select row_Number() over(order by RangeBase) RangeNumber, BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight from BidRequestPriceRanges where BidRequestPriceRanges.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId and (BidRequestPriceRanges.BidRequestMSRPOptionId is null or BidRequestPriceRanges.BidRequestMSRPOptionId = BidRequestOptions.BidRequestOptionId)) rs where rs.RangeNumber = 6) as varchar),'') RangeWeight6
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidManufacturers on BidManufacturers.BidId = Bids.BidId
  join BidProductLines on BidProductLines.BMAId = BidManufacturers.BMAId
  join BidProductLinePrices on BidProductLinePrices.BidProductLineId = BidProductLines.BidProductLineId
  left outer join Manufacturers on Manufacturers.ManufacturerId = BidManufacturers.ManufacturerId
  left outer join ManufacturerProductLines on ManufacturerProductLines.ManufacturerProductLineId = BidProductLines.ManufacturerProductLineId
  left outer join MSRPOptions on MSRPOptions.MSRPOptionId = BidProductLines.MSRPOptionId
  left outer join BidRequestManufacturer on BidRequestManufacturer.BidHeaderId = BidHeaders.BidHeaderId
                                        and BidRequestManufacturer.ManufacturerId = BidManufacturers.ManufacturerId
  left outer join BidRequestProductLines on BidRequestProductLines.BidRequestManufacturerId = BidRequestManufacturer.BidRequestManufacturerId
                                        and BidRequestProductLines.ManufacturerProductLineId = BidProductLines.ManufacturerProductLineId
  left outer join BidRequestOptions on BidRequestOptions.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId
                                   and BidRequestOptions.OptionId = BidProductLines.MSRPOptionId
 where BidHeaders.BidHeaderId = @BidHeaderId
   and (BidRequestManufacturer.BidRequestManufacturerId is null
       /* or Manufacturers.Name = '(WRITEINS)'*/)
) 
order by ManufacturerName, ProductLine, OptionName
```
