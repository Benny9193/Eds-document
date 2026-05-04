# View: `dbo.BidMgrBidRequestAndWriteInMSRPView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `WriteIn` | int | NO |  |  |
| 3 | `ManufacturerName` | varchar(100) | NO |  |  |
| 4 | `ManufacturerId` | int | YES |  |  |
| 5 | `BidRequestManufacturerId` | int | NO |  |  |
| 6 | `SequenceNumber` | int | YES |  |  |
| 7 | `UniqueIdString` | varchar(60) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidMSRPResults`](dbo.BidMSRPResults.md) | USER_TABLE |
| [`dbo.BidRequestManufacturer`](dbo.BidRequestManufacturer.md) | USER_TABLE |
| [`dbo.Manufacturers`](dbo.Manufacturers.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrBidRequestAndWriteInMSRPView]
AS
-- Upper Union = All manufacturers that were bid
SELECT dbo.BidRequestManufacturer.BidHeaderId, 0 WriteIn, 
       -- dbo.BidRequestManufacturer.Active,  -- removed - problematic for write-in portion below
       dbo.Manufacturers.Name ManufacturerName, 
       dbo.BidRequestManufacturer.ManufacturerId, dbo.BidRequestManufacturer.BidRequestManufacturerId, dbo.BidRequestManufacturer.SequenceNumber,
       Cast(dbo.BidRequestManufacturer.BidRequestManufacturerId as Varchar) + Cast(dbo.BidRequestManufacturer.ManufacturerId as Varchar) as UniqueIdString
FROM dbo.BidRequestManufacturer
JOIN dbo.Manufacturers ON dbo.Manufacturers.ManufacturerId = dbo.BidRequestManufacturer.ManufacturerId
Where Isnull(dbo.BidRequestManufacturer.Active,0)=1
--      and dbo.BidRequestManufacturer.BidHeaderId=4932

UNION
-- Lower Union = All (unique) write-in manufacturers
SELECT dbo.BidMSRPResults.BidHeaderId, 1 WriteIn, 
       --dbo.BidMSRPResults.Active, 
       dbo.Manufacturers.Name ManufacturerName, 
       dbo.BidMSRPResults.ManufacturerId, 0 BidRequestManufacturerId, 0 SequenceNumber, 
       '0'+Cast(dbo.BidMSRPResults.ManufacturerId as Varchar) as UniqueIdString
FROM [dbo].[BidMSRPResults]
JOIN dbo.Manufacturers ON dbo.Manufacturers.ManufacturerId = dbo.BidMSRPResults.ManufacturerId
Where Isnull(dbo.BidMSRPResults.WriteInFlag,0)=1 
--      and Isnull(dbo.BidMSRPResults.Active,0)=1   -- include all, whether deactivated or not
--      and dbo.BidMSRPResults.BidHeaderId=4932 
Group by  dbo.BidMSRPResults.BidHeaderId, dbo.Manufacturers.Name, dbo.BidMSRPResults.ManufacturerId
--Group by  dbo.BidMSRPResults.BidHeaderId, dbo.BidMSRPResults.Active, dbo.Manufacturers.Name, dbo.BidMSRPResults.ManufacturerId

/*
-- Upper Union = All manufacturers that were bid
SELECT dbo.BidRequestManufacturer.BidHeaderId, 0 WriteIn, dbo.BidRequestManufacturer.Active, dbo.Manufacturers.Name ManufacturerName, 
       dbo.BidRequestManufacturer.ManufacturerId, dbo.BidRequestManufacturer.BidRequestManufacturerId, dbo.BidRequestManufacturer.SequenceNumber,
       Cast(dbo.BidRequestManufacturer.BidRequestManufacturerId as Varchar) + Cast(dbo.BidRequestManufacturer.ManufacturerId as Varchar) as UniqueIdString
FROM dbo.BidRequestManufacturer
JOIN dbo.Manufacturers ON dbo.Manufacturers.ManufacturerId = dbo.BidRequestManufacturer.ManufacturerId
Where Isnull(dbo.BidRequestManufacturer.Active,0)=1
--      and dbo.BidRequestManufacturer.BidHeaderId=4932

UNION
-- Lower Union = All (unique) write-in manufacturers
SELECT dbo.BidMSRPResults.BidHeaderId, 1 WriteIn, dbo.BidMSRPResults.Active, dbo.Manufacturers.Name ManufacturerName, 
       dbo.BidMSRPResults.ManufacturerId, 0 BidRequestManufacturerId, 0 SequenceNumber, 
       '0'+Cast(dbo.BidMSRPResults.ManufacturerId as Varchar) as UniqueIdString
FROM [dbo].[BidMSRPResults]
JOIN dbo.Manufacturers ON dbo.Manufacturers.ManufacturerId = dbo.BidMSRPResults.ManufacturerId
Where Isnull(dbo.BidMSRPResults.WriteInFlag,0)=1 and Isnull(dbo.BidMSRPResults.Active,0)=1
--      and dbo.BidMSRPResults.BidHeaderId=4932 
Group by  dbo.BidMSRPResults.BidHeaderId, dbo.BidMSRPResults.Active, dbo.Manufacturers.Name, dbo.BidMSRPResults.ManufacturerId
*/
```
