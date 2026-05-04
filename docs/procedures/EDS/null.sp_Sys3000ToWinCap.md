# Procedure: `null.sp_Sys3000ToWinCap`

_Generated on 2026-05-04T13:04:00.221Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_Sys3000ToWinCap` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-07-31 10:58:03 |
| Modified | 2002-07-31 10:58:03 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_Sys3000ToWinCap @pSourceFile varchar(255), @pBidId varchar(255)
AS

declare @InsertCmd varchar(255)

create table #NewFormat (
Type 		varchar(255) null,
RequestType	varchar(255) null,
PONumber	varchar(255) null,
Vendor		varchar(255) null,
ItemDescription varchar(255) null,
Quantity	varchar(255) null,
UnitCost	varchar(255) null,
UnitMeasure	varchar(255) null,
Fund		varchar(255) null,
BudgetAccount	varchar(255) null,
PODescription	varchar(255) null,
OtherRef	varchar(255) null,
BlanketOrder	varchar(255) null,
BidId		varchar(255) null,
Category	varchar(255) null,
ItemId		varchar(255) null,
IssueDate	varchar(255) null,
Requestor	varchar(255) null,
POTable1	varchar(255) null,
POTable2	varchar(255) null,
POTable3	varchar(255) null,
PONotes 	varchar(255) null)

create table #ImportBatch (
DataRow	varchar(512),
RowId	int identity(1,1)
)

/*  insert #NewFormat (Type, RequestType, PONumber, Vendor, ItemDescription, Quantity, 
                     UnitCost, UnitMeasure, Fund, BudgetAccount, PODescription, OtherRef, 
                     BlanketOrder, BidId, Category, ItemId, IssueDate, Requestor, 
                     POTable1, POTable2, POTable3, PONotes)
    values ('Type', 'RequestType', 'PONumber', 'Vendor', 'ItemDescription', 'Quantity', 
            'UnitCost', 'UnitMeasure', 'Fund', 'BudgetAccount', 'PODescription', 'OtherRef', 
            'BlanketOrder', 'BidId', 'Category', 'ItemId', 'IssueDate', 'Requestor', 
            'POTable1', 'POTable2', 'POTable3', 'PONotes')
*/
  insert #NewFormat (Type, RequestType, PONumber, Vendor, ItemDescription, Quantity, 
                     UnitCost, UnitMeasure, Fund, BudgetAccount, PODescription, OtherRef, 
                     BlanketOrder, BidId, Category, ItemId, IssueDate, Requestor, 
                     POTable1, POTable2, POTable3, PONotes)
    values ('C2', 'C3', 'C10', 'C6', 'C254', 'N12.2', 
            'N12.4', 'C4', 'C2', 'C21', 'C40', 'C10',
            'C1', 'C20', 'C10', 'C11', 'D', 'C6',
            'C4', 'C4', 'C4', 'C254')

  select @InsertCmd = 'BULK INSERT #ImportBatch FROM ''' + @pSourceFile + ''' WITH (FORMATFILE = ''C:\INETPUB\ASP\EDSIQ\ImportQty1.fmt'')'
  exec(@InsertCmd)

  insert #NewFormat (Type, RequestType, PONumber, Vendor, ItemDescription, Quantity, 
                     UnitCost, UnitMeasure, Fund, BudgetAccount, PODescription, OtherRef, 
                     BlanketOrder, BidId, Category, ItemId, IssueDate, Requestor, 
                     POTable1, POTable2, POTable3, PONotes)
    select 'M', null, substring(DataRow,90,10), substring(DataRow,1,6), substring(DataRow,142,78), substring(DataRow,84,6),
           substring(DataRow,125,8), substring(DataRow,120,4), substring(DataRow,221,1), substring(DataRow,221,21), substring(DataRow,44,40), null,
           null, left(@pBidId,20), null, substring(DataRow,134,8), convert(datetime,'07/01/2002',101), 'Req',
           substring(DataRow,41,2),substring(DataRow,231,3),null,null
      from #ImportBatch

  drop table #ImportBatch

  select * from #NewFormat

  drop table #NewFormat

  return
```
