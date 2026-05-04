# View: `dbo.vw_DocumentTypes`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidDocumentTypeId` | int | NO |  |  |
| 2 | `BidType` | varchar(30) | NO |  |  |
| 3 | `Name` | varchar(50) | NO |  |  |
| 4 | `Description` | varchar(4096) | YES |  |  |
| 5 | `VendorSpecific` | varchar(3) | NO |  |  |
| 6 | `State` | char(2) | YES |  |  |
| 7 | `Sequence` | int | YES |  |  |
| 8 | `DistrictVisible` | varchar(3) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidDocumentTypes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_DocumentTypes] as
select BidDocumentTypeId,            case isnull(BidType,0) 
             when 1 then 'Pre-Bid' 
             when 2 then 'Supplemental' 
             when 3 then 'Time and Materials' 
             when 4 then 'Time and Materials - Line Item' 
             when 5 then 'MSRP' 
             else 'Unknown'
           end
BidType, Name, Description, case isnull(VendorSpecific,0) when 0 then 'No' else 'Yes' end VendorSpecific, State, Sequence, case isnull(DistrictVisible,0) when 0 then 'No' else 'Yes' end DistrictVisible
  from BidDocumentTypes
```
