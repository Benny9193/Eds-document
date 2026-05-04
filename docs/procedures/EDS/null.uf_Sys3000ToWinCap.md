# Function: table-valued: `null.uf_Sys3000ToWinCap`

_Generated on 2026-05-04T13:04:00.232Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_Sys3000ToWinCap` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2003-06-27 19:04:01 |
| Modified | 2003-06-27 19:04:01 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function EDSIQWebUser.uf_Sys3000ToWinCap (@pSource varchar(255))
returns @NewFormat table (
Type 		varchar(255) null,
RequestType	varchar(255) null,
PONumber	varchar(255) null,
Vendor		varchar(255) null,
ItemDescription varchar(255) null,
Quantity	varchar(255) null,
UnitCost	varchar(255) null,
UnitCode	varchar(255) null,
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
WITH schemabinding
AS
begin

  insert @NewFormat (Type, RequestType, PONumber, Vendor, ItemDescription, Quantity, 
                     UnitCost, UnitCode, Fund, BudgetAccount, PODescription, OtherRef, 
                     BlanketOrder, BidId, Category, ItemId, IssueDate, Requestor, 
                     POTable1, POTable2, POTable3, PONotes)
    values ('Type', 'RequestType', 'PONumber', 'Vendor', 'ItemDescription', 'Quantity', 
            'UnitCost', 'UnitCode', 'Fund', 'BudgetAccount', 'PODescription', 'OtherRef', 
            'BlanketOrder', 'BidId', 'Category', 'ItemId', 'IssueDate', 'Requestor', 
            'POTable1', 'POTable2', 'POTable3', 'PONotes')

  insert @NewFormat (Type, RequestType, PONumber, Vendor, ItemDescription, Quantity, 
                     UnitCost, UnitCode, Fund, BudgetAccount, PODescription, OtherRef, 
                     BlanketOrder, BidId, Category, ItemId, IssueDate, Requestor, 
                     POTable1, POTable2, POTable3, PONotes)
    values ('C2', 'C3', 'C10', 'C6', 'C254', 'N12.2', 
            'N12.4', 'C4', 'C2', 'C21', 'C40', 'C10',
            'C1', 'C20', 'C10', 'C11', 'D', 'C6',
            'C4', 'C4', 'C4', 'C254')

  return
end
```
