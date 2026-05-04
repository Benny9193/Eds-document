# View: `dbo.BidMgrBidRequestMSRPView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `ManufacturerName` | varchar(100) | NO |  |  |
| 4 | `ManufacturerId` | int | YES |  |  |
| 5 | `BidRequestManufacturerId` | int | NO |  |  |
| 6 | `SequenceNumber` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestManufacturer`](dbo.BidRequestManufacturer.md) | USER_TABLE |
| [`dbo.Manufacturers`](dbo.Manufacturers.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrBidRequestMSRPView]
AS
SELECT dbo.BidRequestManufacturer.BidHeaderId, dbo.BidRequestManufacturer.Active, dbo.Manufacturers.Name ManufacturerName, 
       dbo.BidRequestManufacturer.ManufacturerId, dbo.BidRequestManufacturer.BidRequestManufacturerId,  
       dbo.BidRequestManufacturer.SequenceNumber
FROM dbo.BidRequestManufacturer
JOIN dbo.Manufacturers ON dbo.Manufacturers.ManufacturerId = dbo.BidRequestManufacturer.ManufacturerId
```
